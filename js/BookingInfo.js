"use strict";
// Make a booking



// Plan a booking - section of the rubric 




// R3. 3) Save booking data 

// save local storage first (or as booking instance)

/**
 * Checks if a booking is to be confirmed
 */
function checkConfirm(data)
{
if (confirm("Confirm trip and view booking summary?"))
{   
    backwardGeocode(document.getElementById("pickUpAddress").value)
    // data is all the input from booking
    storeData(USER_DATA,data);
    window.location.assign("summary.html")
    confirmInfo();
}
else 
{
    window.location.assign("homepage.html")
}
}
