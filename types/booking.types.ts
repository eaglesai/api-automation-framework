
export interface BookingID{
    bookingid : number;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates; //it is an object so this need to be defined separately.
  additionalneeds?: string;  // ← ? means optional
}


/*
Success 200
Field	Type	Description
firstname	String	
Firstname for the guest who made the booking

lastname	String	
Lastname for the guest who made the booking

totalprice	Number	
The total price for the booking

depositpaid	Boolean	
Whether the deposit has been paid or not

bookingdates	Object	
Sub-object that contains the checkin and checkout dates

  checkin	Date	
Date the guest is checking in

  checkout	Date	
Date the guest is checking out

additionalneeds	String	
Any other needs the guest has
*/