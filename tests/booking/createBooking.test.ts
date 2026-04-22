import { test, expect } from '@playwright/test';
import { BookingID, Booking, BookingAndID } from '../../types/booking.types';
import testData from '../../testData/bookingTestData';
import { request } from 'http';

const newBookingRecord: Booking []= {
  firstname: "Ripple",
  lastname: 'Museum',
  totalprice: 25000,
  depositpaid: false,
  bookingdates: {
    checkin: '2024-06-01',
    checkout: '2025-06-10',
  },
  additionalneeds: 'Late checkout'
}
test("POST /booking Record Creation  ", async({request}) => {
    const resp = await request.post('/booking', {
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: newBookingRecord
    }); 
    expect(resp.status()).toBe(200);
    const respBody: BookingAndID = await resp.json();
    expect(typeof respBody.bookingid).toBe('number');
   
    console.log(`New booking created with ID: ${respBody.bookingid}`);
    console.log(`New booking created with firstname: ${respBody.booking.firstname}`);
    console.log(`New booking created with lastname: ${respBody.booking.lastname}`);

});


