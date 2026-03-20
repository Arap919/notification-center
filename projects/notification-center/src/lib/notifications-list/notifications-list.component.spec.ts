import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsListComponent } from './notifications-list.component';
import { Component, ElementRef, SimpleChanges, SimpleChange, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Notification } from '../models/notification.model';
import {randomString} from "../functions/random-string";

@Component({
    selector: 'ff-test',
    template: `<div #test id="test"></div>`,
    standalone: false
})
export class TestComponent {
  @ViewChild('test') testElem: ElementRef;
}

describe('NotificationsListComponent', () => {
  let component: NotificationsListComponent;
  let fixture: ComponentFixture<NotificationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NotificationsListComponent
      ]
    });
    fixture = TestBed.createComponent(NotificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update notifications on changes', () => {
    const notifications: Notification[] = [
      {
        id: randomString(),
        component: TestComponent,
        isNew: true
      }
    ];

    const changesObj: SimpleChanges = {
      notifications: new SimpleChange(null, notifications, true),
    };
    component.ngOnChanges(changesObj);
    fixture.detectChanges();

    component['_notifications$$'].subscribe((ffNotifications: Notification[]) => {
      expect(ffNotifications).toEqual(notifications);
    });
  });

  it('should create portal for notification component', () => {
    const notifications: Notification[] = [
      {
        id: randomString(),
        component: TestComponent,
        isNew: true
      }
    ];

    const changesObj: SimpleChanges = {
      notifications: new SimpleChange(null, notifications, true),
    };
    component.ngOnChanges(changesObj);
    fixture.detectChanges();

    component['_notifications$$'].subscribe(() => {
      expect(component.portals.length).toBeGreaterThan(0);
    });
  });

  it('should start animation if component is created and new notifications is pushed', () => {
    const notifications: Notification[] = [
      {
        id: randomString(),
        component: TestComponent,
        isNew: true
      }
    ];

    const newNotifications: Notification[] = [
      {
        id: randomString(),
        component: TestComponent,
        isNew: true
      }
    ];

    let changesObj: SimpleChanges = {
      notifications: new SimpleChange(null, notifications, true),
    };
    component.ngOnChanges(changesObj);
    fixture.detectChanges();

    changesObj = {
      notifications: new SimpleChange(null, newNotifications, false),
    };
    component.ngOnChanges(changesObj);
    fixture.detectChanges();

    component['_notifications$$'].subscribe(() => {
      expect(component._itemAnimationState).toEqual('showing');
    });
  });
});
