import { ElementRef, inject, Injectable, Injector, Renderer2, RendererFactory2, Type } from '@angular/core';
import { ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { fromEventPattern, Observable, Subject, tap, timer } from 'rxjs';
import { FFNotification } from './models/notification.model';
import { ComponentPortal } from '@angular/cdk/portal';
import { NotificationsPortalComponent } from './notifications-portal/notifications-portal.component';
import { NotificationsPositionX, NotificationsPositionY } from './models/notifications-positions.model';
import { FF_NOTIFICATIONS_DATA, FF_NOTIFICATIONS_TITLE } from './const/notifications-token';
import { FFNotificationsOverlayConfig } from './models/notifications-overlay.config';

@Injectable()
export class FFNotificationCenterService {
  private _unsubscribe$: Subject<void> = new Subject<void>();
  private _overlayRef: OverlayRef;
  private _onScroll$: Observable<Event>;
  private _parentElement: ElementRef;
  private _config: FFNotificationsOverlayConfig;

  private readonly _overlay: Overlay = inject(Overlay);
  private readonly _rendererFactory2: RendererFactory2 = inject(RendererFactory2);

  constructor() {
    const renderer: Renderer2 = this._rendererFactory2.createRenderer(null, null);
    this._createOnClickObservable(renderer);
    this._onScroll$.pipe(
      tap(() => this._recalculatePosition())
    ).subscribe();
  }

  attachNotifications(parentElement: ElementRef, data: Observable<FFNotification[]>): void;
  attachNotifications(parentElement: ElementRef, data: Observable<FFNotification[]>, positionConfig: FFNotificationsOverlayConfig | null): void;
  attachNotifications(parentElement: ElementRef, data: Observable<FFNotification[]>, titleComponent: Type<unknown> | null): void;
  attachNotifications(parentElement: ElementRef, data: Observable<FFNotification[]>, positionConfig: FFNotificationsOverlayConfig | null, titleComponent: Type<unknown> | null): void;
  attachNotifications(
    parentElement: ElementRef,
    data: Observable<FFNotification[]>,
    positionConfigOrTitle?: FFNotificationsOverlayConfig | null | Type<unknown>,
    titleComponent?: Type<unknown> | null
  ): void {
    this._config = {
      positionX: positionConfigOrTitle instanceof Type ? 'start' : positionConfigOrTitle?.positionX ?? 'start',
      positionY: positionConfigOrTitle instanceof Type ? 'bottom' : positionConfigOrTitle?.positionY ?? 'bottom'
    };
    if (this._overlayRef != null) {
      this._overlayRef.dispose();
    }
    this._parentElement = parentElement;

    const overlayConfig: OverlayConfig = this._getOverlayConfig();
    // Returns an OverlayRef (which is a PortalHost)
    this._overlayRef = this._overlay.create(overlayConfig);

    this._overlayRef.backdropClick().pipe(
      tap(() => {
        this.disposeNotifications();
      })
    ).subscribe();

    // Create ComponentPortal that can be attached to a PortalHost
    const notificationsPortal: ComponentPortal<NotificationsPortalComponent> = new ComponentPortal(
      NotificationsPortalComponent,
      null,
      Injector.create({
        providers: [
          { provide: FF_NOTIFICATIONS_DATA, useValue: data },
          { provide: FF_NOTIFICATIONS_TITLE, useValue: positionConfigOrTitle instanceof Type ? positionConfigOrTitle : titleComponent }
        ],
      })
    );

    // Attach ComponentPortal to PortalHost
    this._overlayRef.attach(notificationsPortal);

    // Reposition after init portals
    this._recalculatePosition();
  }

  disposeNotifications(): void {
    if (this._overlayRef != null) {
      this._overlayRef.dispose();
      this._unsubscribe$.next();
      this._unsubscribe$.complete();
    }
  }

  private _getOverlayConfig(): OverlayConfig {
    const positionStrategy: FlexibleConnectedPositionStrategy = this._calculateOverlayPosition();

    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'mat-spinner-fullscreen-background',
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy,
      disposeOnNavigation: true
    });
  }

  private _createOnClickObservable(renderer: Renderer2): void {
    let removeClickEventListener: () => void;
    const createClickEventListener = (
      handler: (e: Event) => boolean | void
    ): void => {
      removeClickEventListener = renderer.listen('document', 'scroll', handler);
    };

    this._onScroll$ = fromEventPattern<Event>(createClickEventListener, () =>
      removeClickEventListener()
    );
  }

  private _calculateOverlayPosition(): FlexibleConnectedPositionStrategy {
    const position: FlexibleConnectedPositionStrategy = this._overlay.position().flexibleConnectedTo(this._parentElement);

    position.withPositions([{
      originX: this._config.positionX,
      originY: this._config.positionY,
      overlayX: this._config.positionX,
      overlayY: this._config.positionY === 'top' ? 'bottom' : 'top'
    }]);

    return position;
  }

  private _recalculatePosition(): void {
    const config: OverlayConfig = this._overlayRef?.getConfig();
    if (config == null) { return; }
    const positionStrategy: FlexibleConnectedPositionStrategy = config.positionStrategy as FlexibleConnectedPositionStrategy;

    if (this._overlayRef?.hasAttached()) {
      timer(0).pipe( // wait next render cycle to calculate position
        tap(() => {
          const overlayElement: HTMLElement = this._overlayRef?.overlayElement;

          // Resize after content init
          this._overlayRef.updateSize({ width: overlayElement?.getBoundingClientRect().width });
          positionStrategy.detach();
          positionStrategy.attach(this._overlayRef);

          const closestPositionToSetY: NotificationsPositionY = this._closestPositionToSetY();
          const closestPositionToSetX: NotificationsPositionX = this._closestPositionToSetX();
          const currentPosition: ConnectionPositionPair | null = positionStrategy.positions[0] ?? null;

          if (currentPosition != null) {
            positionStrategy.withPositions([{
              originX: closestPositionToSetX,
              originY: closestPositionToSetY,
              overlayX: closestPositionToSetX,
              overlayY: closestPositionToSetY === 'top' ? 'bottom' : 'top'
            }]);
          }

          this._overlayRef.updatePosition();
        })
      ).subscribe();
    }
  }

  private _closestPositionToSetY(): NotificationsPositionY {
    const backdropElement = this._overlayRef?.backdropElement;
    const overlayElement = this._overlayRef?.overlayElement;
    if (this._config.positionY === 'bottom'
      && overlayElement?.offsetHeight > (backdropElement?.offsetHeight ?? 0)
        - (this._parentElement.nativeElement.getBoundingClientRect().top + this._parentElement.nativeElement.getBoundingClientRect().height)
    ) {
      return 'top';
    }
    if (this._config.positionY === 'top'
      && overlayElement?.offsetHeight > this._parentElement.nativeElement.getBoundingClientRect().top + this._parentElement.nativeElement.getBoundingClientRect().height
    ) {
      return 'bottom';
    }
    return this._config.positionY;
  }

  private _closestPositionToSetX(): NotificationsPositionX {
    const backdropElement = this._overlayRef?.backdropElement;
    const overlayElement = this._overlayRef?.overlayElement;
    if ((this._config.positionX === 'start' || this._config.positionX === 'center')
      && overlayElement?.offsetWidth > (backdropElement?.offsetWidth ?? 0)
        - (this._parentElement.nativeElement.getBoundingClientRect().left + this._parentElement.nativeElement.getBoundingClientRect().width)
    ) {
      return 'end';
    }
    if ((this._config.positionX === 'end' || this._config.positionX === 'center')
      && overlayElement?.offsetWidth > this._parentElement.nativeElement.getBoundingClientRect().left + this._parentElement.nativeElement.getBoundingClientRect().width
    ) {
      return 'start';
    }
    return this._config.positionX;
  }

  // Оставил для глобального позиционирования. Пригодится для sidebar
  // private _callPositionMethod<
  //   M extends PropertyKey,
  //   C extends {[K in M]: (param?: string) => any},
  //   T extends {new(): C}
  // >(_class: InstanceType<T>, method: M, param?: string): void {
  //   _class[method](param);
  // }
}
