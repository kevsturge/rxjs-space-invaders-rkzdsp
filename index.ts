console.clear();
import { fromEvent, interval } from 'rxjs';
import { map, scan, tap, startWith, withLatestFrom, takeUntil, repeat } from 'rxjs/operators';
import { gameUpdate, initialState } from './game';
import { State, Input } from './interfaces';
import { paint } from './html-renderer';

const spaceInvaders$ =
  interval(100).pipe(
    withLatestFrom(fromEvent(document, 'keydown').pipe(
      startWith({ code: '' }),
      takeUntil(fromEvent(document, 'keyup')),
      repeat()
    )),
    map(([intrvl, event]: [number, KeyboardEvent]): Input =>
      ({ dlta: intrvl, key: event.code })),
    scan<Input, State>(gameUpdate, initialState),
    tap(e => paint(e.game, e.playerLives, e.score, e.isGameOver)),
  );

spaceInvaders$.subscribe();