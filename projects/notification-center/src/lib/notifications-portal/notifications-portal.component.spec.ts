import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPortalComponent } from './notifications-portal.component';
import { FF_NOTIFICATIONS_DATA, FF_NOTIFICATIONS_TITLE } from '../const/notifications-token';
import { of } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'ff-test',
    template: `<div #test id="test"></div>`,
    standalone: false
})
export class TestTitleComponent {
  @ViewChild('test') testElem: ElementRef;
}

describe('NotificationsPortalComponent', () => {
  let component: NotificationsPortalComponent;
  let fixture: ComponentFixture<NotificationsPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NotificationsPortalComponent
      ],
      providers: [
        { provide: FF_NOTIFICATIONS_DATA, useValue: of([]) },
        { provide: FF_NOTIFICATIONS_TITLE, useValue: TestTitleComponent }
      ]
    });
    fixture = TestBed.createComponent(NotificationsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create title portal', () => {
    expect(component.portal).not.toBeNull();
  });

  it('should start animation after view init', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component._panelAnimationState).toEqual('enter');
  });

  it('should run hide animation on destroy', () => {
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(component._panelAnimationState).toEqual('void');
  });
});
