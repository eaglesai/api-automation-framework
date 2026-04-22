import { test, expect } from '@playwright/test';
import { BookingID, Booking, BookingAndID } from '../../types/booking.types';
import testData from '../../testData/bookingTestData.json';

test.only('GET API Call - Fetch all Booking records',async({request})=>{

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
//--.only means playwright instruct to exucute only that test from the test-suite.
//test.only('API request validaation through loop',async ({request}) => { 
test('API request validaation through loop',async ({request}) => {
    console.log("Test Only executed");
    const respActual = await request.get('/booking'); //this will return booking id's only 
    expect(respActual.status()).toBe(200);

    const respActualBody: respBookingArray[] = await respActual.json(); 

    console.log(`\n Total number of records  ${respActualBody.length}`);
    console.log(`\n Total number of expected records  ${testData.length}`);

    const matchedRecord: BookingAndID [] = [];
    let counter = 1;
    for (const bookID of respActualBody as BookingID[]){
        
        const respActualDetailBody = await request.get(`/booking/${bookID.bookingid}`); 
        //expect(respActualDetailBody.status()).toBe(200); // if the status does return 200 then the program  will exit
        if (respActualDetailBody.status() !== 200) continue; // if status is not 200 it skips 
        const actualDetailBody :  Booking = await respActualDetailBody.json();
        console.log(`checking the output  ${bookID.bookingid}`);
        console.log(`checking the output from Detail   ${actualDetailBody.firstname}`);
        
        for (const expectedbookID of testData as Booking[]){
            console.log(`checking the output  ${expectedbookID.firstname}`);
            const isMatch = expectedbookID.firstname === actualDetailBody.firstname &&
            expectedbookID.lastname === actualDetailBody.lastname;
            if(isMatch){
                console.log(`Matching Record   \n Expected :  ${expectedbookID.firstname}   Actual  ${actualDetailBody.firstname}`);
                matchedRecord.push({
                    bookingid: bookID.bookingid,
                    ...actualDetailBody
                });
            }
        }
        if(counter == 20){
                break;
            }
        counter++;
    }

    for(const temp of matchedRecord){
        console.log(`✅ Booking ID ${temp.bookingid} matched! 
                    → Name     : ${temp.firstname}  ${temp.lastname}
                    → Price    : ${temp.totalprice}
                    → Checkin  : ${temp.bookingdates.checkin}
                    → Checkout : ${temp.bookingdates.checkout}`);
    }
});