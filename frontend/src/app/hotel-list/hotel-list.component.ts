import { Component, OnInit } from '@angular/core';
import { BookingService, Hotel, Booking } from '../services/booking.service';

// Declare the Bootstrap variable
declare var bootstrap: any;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  location: string = 'All';
  locations: string[] = [];
  selectedHotel: Hotel | null = null;
  booking: Booking = {
    hotelId: 0,
    userName: '',
    userAddress: '',
    numberOfRooms: 1,
    checkInDate: '',
    checkOutDate: ''
  };

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadHotels();
    this.loadLocations();
  }

  loadHotels() {
    if (this.location === 'All') {
      this.bookingService.getHotels().subscribe((data: Hotel[]) => {
        this.hotels = data;
      });
    } else {
      this.bookingService.filterHotels(this.location).subscribe((data: Hotel[]) => {
        this.hotels = data;
      });
    }
  }

  loadLocations() {
    this.bookingService.getLocations().subscribe((data: string[]) => {
      this.locations = ['All', ...data];  // Add "All" option
    });
  }

  onFilter() {
    this.loadHotels();
  }

  selectHotel(hotel: Hotel) {
    this.selectedHotel = hotel;
    this.booking.hotelId = hotel.id;
  }

  createBooking() {
    if (this.selectedHotel) {
      this.bookingService.createBooking(this.selectedHotel.id, this.booking).subscribe(() => {
        alert('Booking created successfully!');
        this.resetBookingForm();
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal')!);
        bookingModal.hide();
      });
    }
  }

  resetBookingForm() {
    this.booking = {
      hotelId: this.selectedHotel!.id,
      userName: '',
      userAddress: '',
      numberOfRooms: 1,
      checkInDate: '',
      checkOutDate: ''
    };
  }
}
