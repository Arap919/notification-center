import { InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { FFNotification } from '../models/notification.model';

export const FF_NOTIFICATIONS_DATA: InjectionToken<Observable<FFNotification[]>> = new InjectionToken<Observable<FFNotification[]>>('Notification data');
export const FF_NOTIFICATIONS_TITLE: InjectionToken<Type<unknown> | null> = new InjectionToken<Type<unknown> | null>('Notifications title component');
