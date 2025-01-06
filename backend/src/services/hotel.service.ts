import { promises as fs } from 'fs';
import { Hotel } from '../models/hotel.model';
import { Booking } from '../models/booking.model';
import * as path from 'path';

const dataFilePath = path.join(__dirname, '../data/hotels.json');

export class HotelService {
    public static async getAllHotels(): Promise<Hotel[]> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data) as Hotel[];
    }

    public static async getHotelsByLocation(location: string): Promise<Hotel[]> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const hotels = JSON.parse(data) as Hotel[];
        return hotels.filter(hotel => hotel.location.toLowerCase() === location.toLowerCase());
    }

    public static async getUniqueLocations(): Promise<string[]> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const hotels = JSON.parse(data) as Hotel[];
        const locations = hotels.map(hotel => hotel.location);
        return Array.from(new Set(locations));  // Remove duplicates
    }

    public static async createBooking(hotelId: number, booking: Booking): Promise<void> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const hotels = JSON.parse(data) as Hotel[];
        const hotel = hotels.find(h => h.id === hotelId);
        if (hotel) {
            booking.id = hotel.bookings.length > 0 ? Math.max(...hotel.bookings.map(b => b.id)) + 1 : 1;
            hotel.bookings.push(booking);
            await fs.writeFile(dataFilePath, JSON.stringify(hotels, null, 2), 'utf-8');
        } else {
            throw new Error('Hotel not found');
        }
    }

    public static async getAllBookings(): Promise<Booking[]> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const hotels = JSON.parse(data) as Hotel[];
        const bookings: Booking[] = [];
        hotels.forEach(hotel => {
            hotel.bookings.forEach(booking => {
                bookings.push({ ...booking, hotelId: hotel.id });
            });
        });
        return bookings;
    }

    public static async updateBooking(hotelId: number, bookingId: number, updatedBooking: Booking): Promise<void> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const hotels = JSON.parse(data) as Hotel[];
        const hotel = hotels.find(h => h.id === hotelId);
        if (hotel) {
            const bookingIndex = hotel.bookings.findIndex(b => b.id === bookingId);
            if (bookingIndex !== -1) {
                hotel.bookings[bookingIndex] = updatedBooking;
                await fs.writeFile(dataFilePath, JSON.stringify(hotels, null, 2), 'utf-8');
            } else {
                throw new Error('Booking not found');
            }
        } else {
            throw new Error('Hotel not found');
        }
    }

    public static async deleteBooking(hotelId: number, bookingId: number): Promise<void> {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const hotels = JSON.parse(data) as Hotel[];
        const hotel = hotels.find(h => h.id === hotelId);
        if (hotel) {
            hotel.bookings = hotel.bookings.filter(b => b.id !== bookingId);
            await fs.writeFile(dataFilePath, JSON.stringify(hotels, null, 2), 'utf-8');
        } else {
            throw new Error('Hotel not found');
        }
    }
}
