import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Venue } from './dataTypes/venue';

@Component({
  selector: 'search-performances',
  templateUrl: './search-performances.html'
})

export class SearchPerformancesComponent {
@Input() shows: any;
@Output() setVenue: EventEmitter<any> = new EventEmitter<any>();
@Output() setShow: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  searchShows = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.shows.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  selectSearchedShow($event) {
    this.setVenue.emit($event.item.venue);
    this.setShow.emit($event.item);
  }

  getShowName(show: any): string {
    return show.name;
  }
};
