import { test, expect } from '@playwright/test';
//import { request } from 'node:http';

test('GET API Call - Fetch all Booking records',async({request})=>{

    const response = await request.get('/booking'); // Wait and get all the booking records and assign it to "response"
    expect(response.status()).toBe(200); // status to be 200
    const resBody = await response.json();
    expect(Array.isArray(resBody)).toBeTruthy();
    expect(resBody.length).toBeGreaterThan(0);
    console.log('First Booking:  ', JSON.stringify(resBody[0], null, 2));
    console.log('Last Booking:   ', JSON.stringify(resBody[resBody.length-1],null,2));
});