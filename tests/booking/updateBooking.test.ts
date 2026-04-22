import { test, expect } from '@playwright/test';
import { BookingID, Booking, BookingAndID, USERPWD,BookingToken } from '../../types/booking.types';
import testData from '../../testData/bookingTestData.json';


const authCredentials: USERPWD = {
    username: 'admin',
    password: 'password123'
};
let _authToken : string;
test.beforeAll("Generate Auth token  ", async ({request})=>{

    const respAuth = await request.post('/auth',{
        data:{
        username: authCredentials.username, 
        password: authCredentials.password }
     });
        
    expect(respAuth.status()).toBe(200);
    const respAuthTkn: BookingToken = await respAuth.json();
     _authToken = respAuthTkn.token;
    console.log(`the token is  ${respAuthTkn.token}`);
});

test.only("Check Auth token generated   ", async({request}) => {
    expect(_authToken).toBeTruthy();
   console.log(`TEST The TOKEN is  ${_authToken}`);

});