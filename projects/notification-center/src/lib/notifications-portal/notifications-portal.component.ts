import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from '../notifications-list/notifications-list.component';
import { FFNotification } from '../models/notification.model';
import { Observable, Subject } from 'rxjs';
import { FF_NOTIFICATIONS_DATA, FF_NOTIFICATIONS_TITLE } from '../const/notifications-token';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { transformMenu } from '../animations/notification-animations';
import { AnimationEvent } from '@angular/animations';

@Component({
    selector: 'of-notifications-portal',
    imports: [CommonModule, NotificationsListComponent, PortalModule],
    templateUrl: './notifications-portal.component.html',
    styleUrls: ['./notifications-portal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [transformMenu()]
})
export class NotificationsPortalComponent implements AfterViewInit, OnDestroy {
  readonly _animationDone: Subject<AnimationEvent> = new Subject<AnimationEvent>();
  _panelAnimationState: 'void' | 'enter' = 'void';
  _isAnimating: boolean;
  portal: ComponentPortal<unknown>;

  readonly data: Observable<FFNotification[]> = inject<Observable<FFNotification[]>>(FF_NOTIFICATIONS_DATA);
  readonly titleComponent: Type<unknown> | null = inject<Type<unknown> | null>(FF_NOTIFICATIONS_TITLE);

  constructor() {
    if (this.titleComponent != null) {
      this.portal = new ComponentPortal(this.titleComponent);
    }
  }

  ngAfterViewInit(): void {
    this.startPanelAnimation();
  }

  ngOnDestroy(): void {
    this.resetPanelAnimation();
  }

  startPanelAnimation(): void {
    this._panelAnimationState = 'enter';
  }

  resetPanelAnimation(): void {
    this._panelAnimationState = 'void';
  }

  onAnimationDone(event: AnimationEvent): void {
    this._animationDone.next(event);
    this._isAnimating = false;
  }

  onAnimationStart(): void {
    this._isAnimating = true;
  }
}
