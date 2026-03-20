import { InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

export const NOTIFICATIONS_DATA: InjectionToken<Observable<Notification[]>> = new InjectionToken<Observable<Notification[]>>('Notification data');
export const NOTIFICATIONS_TITLE: InjectionToken<Type<unknown> | null> = new InjectionToken<Type<unknown> | null>('Notifications title component');
