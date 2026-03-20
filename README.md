# Notification Center

This Angular library provides a simple and customizable notification center for displaying notifications to users.

## Features
- Easy to use: just provide FFNotificationCenterService and use it to show notifications.
- Customizable: you can use any title component and notification component with its own built-in logic.
- Support for different types of notifications: just provide different components for different ui and behaviour.
- Optional configurations: adjust settings such as container positions (by X and Y coordinates).

## Installation
To install the library, simply run:

```
NOT PUBLISHED npm install notification-center
```
Then provide the NotificationCenterService into your Angular project (in module providers or in standalone component providers):

```typescript
import { NotificationCenterService } from 'notification-center';

@NgModule({
  declarations: [
  // your declarations here
  ],
  imports: [],
  providers: [NotificationCenterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## NotificationCenterService methods

1) attachNotifications - attach notification center to the dom:
```typescript
attachNotifications(parentElement: ElementRef, data: Observable<Notification[]>, titleComponent: Type<unknown> | null = null): void {}
```
### Parameters

- parentElement - the element to which the notifications overlay is linked
- data - observable of notifications
- titleComponent - component to display custom title

2) disposeNotifications - dispose notifications from the dom :
```typescript
disposeNotifications(): void {}
```

## Usage
After importing, you can use the NotificationCenterService to display notifications in your components. Here's an example:

```typescript
import { Component } from '@angular/core';
import { NotificationCenterService, Notification } from 'notification-center';

@Component({
  selector: 'app-my-component',
  template: `<button (click)="showNotification()">Show Notification</button>`
})
export class MyComponent {
  @ViewChild('parentElement') parentElement: MatIconButton;
  notifications$$: Observable<Notification[]> = this._persistRepo.notifications$$;

  constructor(
    private notificationCenterService: NotificationCenterService,
    private _persistRepo: PersistenceRepository
  ) {}
  
  showNotification() {
    this.notificationCenterService.attachNotifications(this.parentElement._elementRef, this.notifications$$);
  }

}
```

## Configuration
You can configure the notification center by providing config:

```typescript
const notificationsConfig:NotificationsOverlayConfig = {
  positionX: 'end',
  positionY: 'top'
};
...

{ provide: NOTIFICATIONS_CONFIG, useValue: notificationsConfig }
```

- positionX: specify the horizontal position of the notification center (start, center, end).
- positionY: specify the vertical position of the notification center (top, bottom).
