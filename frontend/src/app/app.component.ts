import { Component } from '@angular/core';
import { Hotel } from './services/booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedHotel: Hotel | null = null;

  onHotelSelected(hotel: Hotel) {
    this.selectedHotel = hotel;
  }
}
