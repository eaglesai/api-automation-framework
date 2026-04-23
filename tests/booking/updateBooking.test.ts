import { test, expect } from '@playwright/test';
import { BookingID, Booking, BookingAndID, USERPWD,BookingToken } from '../../types/booking.types';
import testData from '../../testData/bookingTestData.json';


const authCredentials: USERPWD = {
    username: 'admin',
    password: 'password123'
};
const updatedBookingRecord: Booking = {
  firstname: "Train",
  lastname: 'Station',
  totalprice: 5000,
  depositpaid: false,
  bookingdates: {
    checkin: '2024-06-01',
    checkout: '2025-06-10',
  },
  additionalneeds: 'Breakfast'
}
let _authToken : string;
test.beforeAll("Generate Auth token  ", async ({request})=>{
    
    const respAuth = await request.post('/auth',{
        data:{
        username: authCredentials.username, 
        password: authCredentials.password }
     });
    console.log(`Before generating the token`);
    expect(respAuth.status()).toBe(200);
    const respAuthTkn: BookingToken = await respAuth.json();
     _authToken = respAuthTkn.token;
    console.log(`the token is  ${respAuthTkn.token}`);
});

test.only("Check Auth token generated   ", async({request}) => {
    expect(_authToken).toBeTruthy();
   console.log(`Auth TOKEN. is  ${_authToken}`);

});
let id: string = 3;
test.only("PUT Update the record ", async({request})=> {
    //const resp = await request.get(`\booking\::id`);
    const respPut = await request.put(`\booking\id`, {
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookies': `token=${_authToken}`
        },
        data: updatedBookingRecord
    });
  
    console.log(`PUT Update the Auth TOKEN. is  ${_authToken}`);

});