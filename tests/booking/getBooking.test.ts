import { test, expect } from '@playwright/test';
import { BookingID, Booking } from '../../types/booking.types';
import testData from '../../testData/bookingTestData';

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

test.only('API request validaation through loop',async ({request}) => {

    console.log("Test Only executed");
    const respActual = await request.get('/booking'); //this will return booking id's only 
    expect(respActual.status()).toBe(200);

    const respActualBody: respBookingArray[] = await respActual.json(); 

    console.log(`\n Total number of records  ${respActualBody.length}`);
    console.log(`\n Total number of expected records  ${testData.length}`);

    const matchedRecord: Booking [] = [];
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
            const isMatch = expectedbookID.firstname === actualDetailBody.firstname;
            if(isMatch){
                console.log(`Matching Record   \n Expected :  ${expectedbookID.firstname}   Actual  ${actualDetailBody.firstname}`);
                matchedRecord.push(expectedbookID);
            }
            
        }
        if(counter == 20){
                break;
            }
        counter++;
    }
});