import { Type } from '@angular/core';

export interface FFNotification {
  id: string;
  isNew: boolean;
  component: Type<unknown> | null;
}
