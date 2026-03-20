import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterService } from './notification-center.service';
import { NotificationsOverlayConfig } from './models/notifications-overlay.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'ff-test',
    template: `<div #test id="test"></div>`,
    standalone: false
})
export class TestComponent {
  @ViewChild('test') testElem: ElementRef;
}

describe('NotificationCenterService', () => {
  let fixture: ComponentFixture<TestComponent>;
  const notificationsConfig: NotificationsOverlayConfig = {
    positionX: 'end',
    positionY: 'top'
  };
  let service: NotificationCenterService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [TestComponent],
      providers: [
        NotificationCenterService
      ]
    });
    service = TestBed.inject(NotificationCenterService);
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should define overlay', () => {
    expect(service['_overlay']).toBeDefined();
  });

  it('should define config', () => {
    const parentElement = fixture.componentInstance.testElem;

    service.attachNotifications(parentElement, of([]), notificationsConfig);
    expect(service['_config']).toEqual(notificationsConfig);
  });

  it('should attach overlayRef', () => {
    const parentElement = fixture.componentInstance.testElem;

    service.attachNotifications(parentElement, of([]));
    expect(service['_overlayRef']).toBeTruthy();
    expect(service['_overlayRef'].hasAttached()).toBeTrue();
  });

  it('should dispose notifications', () => {
    service.disposeNotifications();
    expect(service['_overlayRef']).toBeFalsy();
  });
});
