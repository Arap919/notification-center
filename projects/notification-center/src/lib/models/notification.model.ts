import { Type } from '@angular/core';

export interface Notification {
  id: string;
  isNew: boolean;
  component: Type<unknown> | null;
}
