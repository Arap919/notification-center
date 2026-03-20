import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FFNotification } from '../models/notification.model';
import { BehaviorSubject, tap } from 'rxjs';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { fadeInItems, transformMenu } from '../animations/notification-animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { nextOnChangeComparePrevValue } from '../functions/next-on-change-compare-prev-value';

@Component({
    selector: 'of-notifications-list',
    imports: [CommonModule, PortalModule],
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [transformMenu(), fadeInItems()]
})
export class NotificationsListComponent implements OnChanges {
  private _notifications$$: BehaviorSubject<FFNotification[]> = new BehaviorSubject<FFNotification[]>([]);
  private _isFirstOpened: boolean = true;

  _itemAnimationState: 'void' | 'showing' = 'void';

  @Input() notifications: FFNotification[];
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  portals: { id: string; portal: ComponentPortal<unknown> }[] = [];

  constructor() {
    this._notifications$$
      .pipe(
        tap((notifications) => {
          if (notifications.length > 0) {
            notifications.forEach((notification) => {
              if (notification.component != null) {
                if (!this.portals.some(portal => portal.id === notification.id)) {
                  this.portals.push({ id: notification.id, portal: new ComponentPortal(notification.component) });
                  if (!this._isFirstOpened) {
                    this.startItemAnimation();
                  }
                }
              }
            });
            this._isFirstOpened = false;
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    nextOnChangeComparePrevValue(changes.notifications, this._notifications$$);
  }

  startItemAnimation(): void {
    this._itemAnimationState = 'showing';
  }
}
