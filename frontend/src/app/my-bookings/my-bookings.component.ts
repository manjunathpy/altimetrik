import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    });
  }

  editBooking(booking: Booking) {
    this.selectedBooking = { ...booking };
  }

  saveBooking() {
    if (this.selectedBooking) {
      this.bookingService.updateBooking(this.selectedBooking.hotelId, this.selectedBooking.id!, this.selectedBooking).subscribe(() => {
        alert('Booking updated successfully!');
        this.selectedBooking = null;
        this.loadBookings();
      });
    }
  }

  cancelBooking(booking: Booking) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.deleteBooking(booking.hotelId, booking.id!).subscribe(() => {
        alert('Booking canceled successfully!');
        this.loadBookings();
      });
    }
  }

  closeEdit() {
    this.selectedBooking = null;
  }
}
