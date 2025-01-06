import { Router } from 'express';
import { HotelController } from '../controllers/hotel.controller';

const router = Router();

router.get('/hotels', HotelController.getAllHotels);
router.get('/hotels/filter', HotelController.getHotelsByLocation);
router.get('/hotels/locations', HotelController.getUniqueLocations);
router.post('/hotels/:hotelId/bookings', HotelController.createBooking);
router.get('/bookings', HotelController.getAllBookings);
router.put('/hotels/:hotelId/bookings/:bookingId', HotelController.updateBooking);
router.delete('/hotels/:hotelId/bookings/:bookingId', HotelController.deleteBooking);

export default router;
