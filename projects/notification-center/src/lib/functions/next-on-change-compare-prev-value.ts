import { deepEquals } from './deep-equals';
import { BehaviorSubject } from 'rxjs';
import { SimpleChange } from '@angular/core';

/**
 * Handles ngOnChanges routine. Emits new event to BehaviourSubject
 * @param change SimpleChange object from ngOnChanges argument
 * @param subject BehaviourSubject<T> to emit value to
 * @param options additional options.
 * deepCompare -> perform deepEquals operation
 * valueIfNull -> if null value comes from changes, emit provided value
 * @example
 * ngOnChanges(changes: SimpleChanges): void {
 *  const searchResultsChange = changes.searchResults;
 *  if (searchResultsChange) {
 *    const searchResults = searchResultsChange.currentValue as Customer[];
 *    if (!deepEquals(searchResults, this.initialSearchResults$.getValue())) {
 *      this.initialSearchResults$.next(searchResults);
 *    }
 *  }
 *
 *  // turns into
 *  ngOnChanges(changes: SimpleChanges): void {
 *    nextOnChangeComparePrevValue(changes.searchResults, this.initialSearchResults$, { deepCompare: true });
 *  }
 */
export function nextOnChangeComparePrevValue<T>(change: SimpleChange | null | undefined, subject: BehaviorSubject<T>, options: Partial<{
  deepCompare: boolean;
  valueIfNull: T;
}> | null = null): void {
  const innerParam = {
    deepCompare: false,
    ...(options == null ? {} : options)
  };
  const compareFn = (oldVal: T | null, newVal: T | null): boolean => innerParam.deepCompare ? deepEquals(oldVal, newVal) : oldVal === newVal;
  if (change != null) {
    let valueToNext = change.currentValue as T;
    if (valueToNext == null && innerParam.valueIfNull != null) {
      valueToNext = innerParam.valueIfNull;
    }
    // noinspection PointlessBooleanExpressionJS
    if (compareFn(subject.getValue(), valueToNext) === false) {
      subject.next(valueToNext);
    }
  }
}
