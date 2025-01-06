import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
  id: number;
  name: string;
  location: string;
}

export interface Booking {
  id?: number;
  hotelId: number;
  userName: string;
  userAddress: string;
  numberOfRooms: number;
  checkInDate: string;
  checkOutDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`);
  }

  filterHotels(location: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels/filter`, { params: { location } });
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/hotels/locations`);
  }

  createBooking(hotelId: number, booking: Booking): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/hotels/${hotelId}/bookings`, booking);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  updateBooking(hotelId: number, bookingId: number, booking: Booking): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/hotels/${hotelId}/bookings/${bookingId}`, booking);
  }

  deleteBooking(hotelId: number, bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/hotels/${hotelId}/bookings/${bookingId}`);
  }
}
