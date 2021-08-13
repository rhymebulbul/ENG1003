"use strict";

// displayBookings()
// This function displays a list of all bookings to the user
// argument: data: total bookings data 
function displayBookings(data,id) 
{
    // Defining and initialise output variable
  let output = "";

  // Generating html for the list using a for loop
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== null) {
            output += `  <ul class="mdl-list">
            <h4>Past Bookings:</h4>
            <h6></h6>
            <span>Pick Up Time: ${data[i].pickUpTime}</span>
            <span>, Drop Off Address: ${data[i].dropOffAddress}</span>
                  <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" onclick="view(${i})"><i
                            class="material-icons">info</i></a>
              </span>
             </ul>`
        }
    }
    let contentRef = document.getElementById(id);
    contentRef.innerHTML = output;

}

function view(index)
{
    // add here 
    storeData(BOOKING_INDEX, index);
    window.location.assign("view.html");
}

// Need input 

bookingInstance = new totalBooking();
let pastBookings = bookingInstance.getPastBookings();
let commencedBookings = bookingInstance.getCommencedBookings();
let futureBookings = bookingInstance.getFutureBookings();
displayBookings(pastBookings,"pastBookings");
displayBookings(commencedBookings,"commencedBookings");
displayBookings(futureBookings,"futureBookings");

