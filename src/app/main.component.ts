import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Venue } from './venue';
import { Customer } from './customer';
import { TicketService } from './ticket.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  venues: Venue[];
  customers: Customer[];
  selectedCustomer: Customer;
  selectedVenue: Venue;
  selectedShow: any;
  selectedPerformance: any;
  selectedLevels: any;
  levelOptions: any;
  numOfSeats: number;
  orderConfirmation: any;
  shows: any;
  searchCustomers = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.customers.filter(v => v.firstName.concat(v.lastName).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  searchShows = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.shows.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getVenues();
    this.getCustomers();
  }

  getVenues(): void {
    this.ticketService.getVenues()
    .subscribe(
      venues => { this.venues = venues; this.shows = []; venues.forEach(venue => { venue.shows.forEach(show => { show.venue = venue; this.shows.push(show); }) }) }
    );
  }

  getCustomers(): void {
    this.ticketService.getCustomers()
    .subscribe(customers => this.customers = customers);
  }

  getCustomerName(customer: Customer): string {
    return customer.firstName + ' ' + customer.lastName;
  }

  getShowName(show: any): string {
    return show.name;
  }

  selectVenue(venue: Venue): void {
    this.selectedVenue = venue;
    this.clearShow();
  }

  selectShow(show: any): void {
    this.selectedShow = show;
    this.clearPerformance();
  }

  selectSearchedShow(selectEvent: any): void {
    let show = selectEvent.item;
    this.selectedVenue = show.venue;
    this.selectedShow = show;
  }

  clearSearchedShow(): void {
    this.clearVenue();
  }

  selectPerformance(performance: any): void {
    this.selectedPerformance = performance;
    let levels = [];
    this.selectedVenue.levels.forEach(level => levels.push({name: level.name, id: level.id}));
    this.ticketService.getLevelAvailability(this.selectedVenue.id, this.selectedShow.id, this.selectedPerformance.id, levels.map(level => level.name))
      .subscribe(options => { this.levelOptions = options.map((numAvail,index) => { return {name: levels[index].name, id: levels[index].id, seatsAvailable: numAvail}} ); });
    this.clearLevels();
  }

  selectLevel(level: any): void {
    if (level.selected) {
      delete(level.selected);
    } else {
      level.selected = true;
      level.numOfSeats = 1;
    }
  }

  clearCustomer(): void {
    this.selectedCustomer = null;
    this.clearVenue();
  }

  clearVenue(): void {
    this.selectedVenue = null;
    this.clearShow();
  }

  clearShow(): void {
    this.selectedShow = null;
    this.clearPerformance();
  }

  clearPerformance(): void {
    this.selectedPerformance = null;
    this.clearLevels();
  }

  clearLevels(): void {
    this.levelOptions = null;
    this.selectedLevels = [];
  }

  clearOrder(): void {
    this.orderConfirmation = null;
  };

  canReserve(): boolean {
    return this.showErrors() == "";
  };

  showErrors(): string {
    if (!this.selectedCustomer) return "A customer must be selected.";
    let hasSeats = false;
    this.levelOptions.forEach(level => {if (level.selected && level.seatsAvailable > 0) { hasSeats = true}});
    if (!hasSeats) return "One or more seats must be selected.";
    return "";
  }

  reserve(): void {
    let seatRequests = [];
    this.levelOptions.forEach(level => { if (level.selected) {
      seatRequests.push( { level: { name:level.name }, numSeats: level.numOfSeats } )
      }});
    let orderData = {
      customer: {
        email: this.selectedCustomer.email
      },
      seatRequests: seatRequests
    };
    this.ticketService.reserveSeats(this.selectedVenue.id, this.selectedShow.id, this.selectedPerformance.id, orderData)
      .subscribe(confirmation => { this.orderConfirmation = confirmation; console.log(confirmation); });
  }

  getTotal(): number {
    if (!this.orderConfirmation) return 0;
    return this.orderConfirmation.seats.reduce((total, seat) => {return total + seat.level.price}, 0);
  }

  confirmSeats(): void {
    this.ticketService.confirmSeats(this.selectedVenue.id, this.selectedShow.id, this.selectedPerformance.id, this.orderConfirmation.reservationNumber)
      .subscribe(result => console.log(result));
  }
}
