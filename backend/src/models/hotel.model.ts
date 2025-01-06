import { Booking } from './booking.model';

export interface Hotel {
    id: number;
    name: string;
    location: string;
    bookings: Booking[];
}
