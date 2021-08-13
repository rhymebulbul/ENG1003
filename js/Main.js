"use strict";
// Saving information for booking 
// NEED TO SAVE TO STORE ALL THE INFO



/**
 * Function to confirm the booking & save to local storage
 */
function bookTaxi(pickUpTime,taxiType){
  let data = bookingInstance.addBooking(pickUpTime,taxiType);
  checkConfirm(data);
}

function returnMainPage() {
  window.location.assign("homepage.html");
}