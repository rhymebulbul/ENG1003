"use strict";

<<<<<<< HEAD:A2/app/js/taxi.js
=======
/**
 * Updates the time, taxi type and fare on display
 */
>>>>>>> c5f4bb551ec4a0f8d00a6444e4ffcc642e6c17eb:A2/app/js/Taxi.js
function updateDisplay()
{
    //booking instance
    let pickUpTime = Booking.getpickUpTime()
    let taxiType = Booking.getTaxiType()
    let totalFare 

    let timeRef = document.getElementById("pickUpTime");
    let taxiRef = document.getElementById("taxiType");
    let fareRef = document.getElementById("totalFare");

    timeRef.innerHTML += `${pickUpTime}`
    taxiRef.innerHTML += `${taxiType}`
    fareRef.innerHTML += `${totalFare}`
}

/**
 * Cancels the current booking
 * @returns whether the booking has been cancelled
 */
function cancelBooking()
{
    let userConfirmation = confirm("Are you sure you want to cancel your Booking?")
    if (userConfirmation == false)
    {
        return false;
    }
    else 
    {
        removeBooking();
        window.location = "homepage.html";
    }
}

/**
 * Changes taxi type 
 * @returns if the taxi has been successfully changed
 */
function changeTaxi()
{
    let taxiList = getData(TAXI_LIST);

    let chosenTaxi = document.getElementById("taxiType");

    // checking Car avaliability 
    if (chosenTaxi == "1")
    {
        if (taxiList(0).available == true)
        {           
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(0).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
        else if (taxiList(3).available == true)
        {
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(3).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
        else if (taxiList(5).available == true)
        {
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(5).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
    }
    else
    {
        alert("No Car's available at this time")
        return false
    }
    // checking SUV avaliability 
    if (chosenTaxi == "2")
    {
        if (taxiList(2).available == true)
        {           
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(2).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
        else if (taxiList(4).available == true)
        {
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(4).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
        else if (taxiList(6).available == true)
        {
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(6).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
        else if (taxiList(8).available == true)
        {
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(8).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
    }
    else
    {
        alert("No SUV's available at this time")
        return false
    }
    // checking Van avaliability 
    if (chosenTaxi == "3")
    {
        if (taxiList(1).available == true)
        {           
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(1).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
<<<<<<< HEAD:A2/app/js/taxi.js
    }
    else 
    {
        alert("No VAN's available at this time")
        return false
=======
        else 
        {
            alert("No VAN's available at this time")
            return false
        }
>>>>>>> c5f4bb551ec4a0f8d00a6444e4ffcc642e6c17eb:A2/app/js/Taxi.js
    }
    // checking Minibus avaliability 
    if (chosenTaxi == "4")
    {
        if (taxiList(7).available == true)
        {           
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(7).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
<<<<<<< HEAD:A2/app/js/taxi.js
        }
=======
        }   
>>>>>>> c5f4bb551ec4a0f8d00a6444e4ffcc642e6c17eb:A2/app/js/Taxi.js
        else if (taxiList(9).available == true)
        {
            let userConfirmation = confirm("Are you sure you want to change your Taxi Type?")
            if (userConfirmation == false)
            {
                return false;
            }
            else 
            {
            taxiList(9).available = false;
            storeData(TAXI_LIST, taxiList);
            window.location.assign("homepage.html");
            }
        }
    }
    else 
    {
        alert("No Minibus's available at this time")
        return false
    }
}
