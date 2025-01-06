import { Request, Response } from 'express';
import { HotelService } from '../services/hotel.service';
import { Booking } from '../models/booking.model';

export class HotelController {
    public static async getAllHotels(req: Request, res: Response) {
        try {
            const hotels = await HotelService.getAllHotels();
            res.json(hotels);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public static async getHotelsByLocation(req: Request, res: Response) {
        try {
            const location = req.query.location as string;
            const hotels = await HotelService.getHotelsByLocation(location);
            res.json(hotels);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public static async getUniqueLocations(req: Request, res: Response) {
        try {
            const locations = await HotelService.getUniqueLocations();
            res.json(locations);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public static async createBooking(req: Request, res: Response) {
        try {
            const hotelId = parseInt(req.params.hotelId, 10);
            const booking: Booking = req.body;
            await HotelService.createBooking(hotelId, booking);
            res.status(201).send();
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public static async getAllBookings(req: Request, res: Response) {
        try {
            const bookings = await HotelService.getAllBookings();
            res.json(bookings);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public static async updateBooking(req: Request, res: Response) {
        try {
            const hotelId = parseInt(req.params.hotelId, 10);
            const bookingId = parseInt(req.params.bookingId, 10);
            const updatedBooking: Booking = req.body;
            await HotelService.updateBooking(hotelId, bookingId, updatedBooking);
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public static async deleteBooking(req: Request, res: Response) {
        try {
            const hotelId = parseInt(req.params.hotelId, 10);
            const bookingId = parseInt(req.params.bookingId, 10);
            await HotelService.deleteBooking(hotelId, bookingId);
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
