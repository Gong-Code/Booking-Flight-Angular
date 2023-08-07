import { Component } from '@angular/core';
import { FlightService } from './../api/services/flight.service';
import { FlightRm } from '../api/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent {

  searchResult: FlightRm[] = []

  constructor(
    private flightService: FlightService,
    private fb: FormBuilder
  ) { }

  searchForm: any = this.fb.group({
    from: [''],
    destination: [''],
    fromDate: [''],
    toDate: [''],
    numberOfPassengers: [1]
  })

  ngOnInit(): void {
    this.search();
  }
  

  search() {
    this.flightService.searchFlight(this.searchForm.value)
      .subscribe(response => this.searchResult = response,
        this.handleError);
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err);
  }

}


