"use strict";

// R3. 2) Booking summary for confirmation 
/**
 * Confirms all of the users booking info
 */
function confirmInfo()
{
    let bookingAll = localStorage.getItem(USER_DATA);
    let bookingIndex = bookingAll.length -1;

    let bookingInfo = bookingInstance.getBooking(bookingIndex);
    
    let dateTimeRef = document.getElementById("dateTime");
    let routeRef = document.getElementById("route");
    let numberStopsRef = document.getElementById("numberOfStops");
    
    dateTimeRef.innerHTML += `${bookingInfo.pickUpTime}`
    routeRef.innerHTML += `${bookingInfo.pickUpAddress}`
    routeRef.innerHTML += `${bookingInfo.dropOffAddress}`
    numberStopsRef.innerHTML += `${bookingInfo.route.length - 1}`

    assignTaxi(bookingInfo);
}

confirmInfo();

/**
 * Assigns taxi based on user selection
 * @param {String} data 
 */
function assignTaxi(data) 
{
    let found = 0;
    let taxiAvail = retrieveData(TAXI_LIST);
    for (i = 0; i < taxiAvail.length; i++) 
    {
        while (found < 1) 
        {
            if (data.taxiType == taxiAvail[i].type) 
            {
                taxiAvail[i].available = false;
                found = 1;
            }
        }
    }
    storeData(TAXI_LIST,taxiAvail);
}
    