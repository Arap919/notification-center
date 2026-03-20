import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function transformMenu(): AnimationTriggerMetadata {
  return trigger('transformMenu', [
    state(
      'void',
      style({
        opacity: 0,
        transform: 'scale(0.8)',
      }),
    ),
    transition(
      'void => enter',
      animate(
        '120ms cubic-bezier(0, 0, 0.2, 1)',
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
      ),
    ),
    transition('* => void', animate('100ms 25ms linear', style({ opacity: 0 }))),
  ]);
}

export function fadeInItems(): AnimationTriggerMetadata {
  return trigger('fadeInItems', [
    state('showing', style({ opacity: 1 })),
    transition('void => *', [
      style({ opacity: 0 }),
      animate('200ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
    ]),
  ]);
}
