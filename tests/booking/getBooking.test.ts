import { test, expect } from '@playwright/test';
import { BookingID, Booking } from '../../types/booking.types';

test('GET API Call - Fetch all Booking records',async({request})=>{

    const response = await request.get('/booking'); // Wait and get all the booking records and assign it to "response"
    expect(response.status()).toBe(200); // status to be 200
    const resBody = await response.json();
    expect(Array.isArray(resBody)).toBeTruthy();
    expect(resBody.length).toBeGreaterThan(0);
    console.log('First Booking:  ', JSON.stringify(resBody[0], null, 2));
    console.log('Last Booking:   ', JSON.stringify(resBody[resBody.length-1],null,2));
});

test('GET DETAILS ABOUT THE BOOKING REQUEST ', async({request}) =>{
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
    const respBody : BookingID[] = await response.json();
    // I would like to have a for loop or while loop -- STARTING FROM HERE
    const respBookingID : number = respBody[0].bookingid;

    const respBookingSingleID = await request.get(`/booking/${respBookingID}`);
    expect(respBookingSingleID.status()).toBe(200);

    const respBodyDetail : Booking = await respBookingSingleID.json();
        expect(respBodyDetail).toHaveProperty('firstname');
        expect(respBodyDetail).toHaveProperty('lastname');
        expect(respBodyDetail).toHaveProperty('totalprice');
        expect(respBodyDetail).toHaveProperty('depositpaid');
        expect(respBodyDetail.bookingdates).toHaveProperty('checkin');
        expect(respBodyDetail.bookingdates).toHaveProperty('checkout');
    
    console.log('Booking Details  ', JSON.stringify(respBodyDetail,null,2));
    // I would like to have a for loop or while loop -- END FROM HERE  

});