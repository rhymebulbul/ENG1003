"use strict";
/* Name: shared.js
Purpose: Create 3 classes (Route, Booking and TotalBookings)
This file is loaded on all pages and contains the shared code that will execute on all pages. */ 

// Keys for localStorage
const USER_DATA = "userBookingData";
const TAXI_LIST = "taxiList";
const BOOKING_INDEX = "bookingIndex";

let taxiList = [
    {"rego":"VOV-887","type":"Car","available":true},
    {"rego":"OZS-293","type":"Van","available":false},
    {"rego":"WRE-188","type":"SUV","available":true},
    {"rego":"FWZ-490","type":"Car","available":true},
    {"rego":"NYE-874","type":"SUV","available":true},
    {"rego":"TES-277","type":"Car","available":false},
    {"rego":"GSP-874","type":"SUV","available":false},
    {"rego":"UAH-328","type":"Minibus","available":true},
    {"rego":"RJQ-001","type":"SUV","available":false},
    {"rego":"AGD-793","type":"Minibus","available":false}
];

storeData(TAXI_LIST, taxiList);

/**
 * Creates a route between a pickup & dropoff address
 */
class Route
{
    // Constructor
    constructor(pickUpAddress, dropOffAddress) 
    {
        this._pickUpAddress = {pickUpAddress:pickUpAddress, pickUpCoord:[]};
        this._dropOffAddress = {dropOffAddress:dropOffAddress, dropOffCoord:[]};
    }
    // Accessor
    get pickUpAddress()
    {
        return this._pickUpAddress;
    }
    // Accessor
    get dropOffAddress()
    {
        return this._dropOffAddress;
    }
    // Accessor
    get distance()
    {
        let R = 6371; //earth radius
        let Lat1 = dropOffCoord[1] * Math.Pi/180;
        let Lat2 = pickUpCoord[1] * Math.Pi/180;
        let deltaLat = (dropOffCoord[1] - pickUpCoord[1]) * Math.Pi/180;
        let deltaLong = (dropOffCoord[0] - pickUpCoord[0]) * Math.Pi/180;
        
        let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        this._distance = R * c; //in km
        
        return this._distance;
    }
    /**
     * sets the route data provided
     * @param {String} routeData 
     */
    fromData(routeData)
    {
        this._pickUpAddress = routeData._pickUpAddress;
        this._dropOffAddress = routeData._dropOffAddress;
    }
}

class Booking
{
    // Constructor
    constructor(pickUpTime,taxiType)
    {
        this._pickUpTime = new Date(pickUpTime);
        this._taxiType = taxiType;
        this._routeData = []; 
    }
    // Accessor
    get pickUpTime()
    {
        let pickUpTime = new Date(pickUpTime)
        return pickUpTime;
    }
    // Accessor
    get taxiType()
    {
        return this._taxiType;
    }
    // Accessor
    get totalDistance()
    {
        
        for (i = 0; i < this._routeData - 1; i++)
        {
            let R = 6371; //earth radius
            let Lat1 = dropOffCoord[i +1] * Math.Pi/180;
            let Lat2 = pickUpCoord[i + 1] * Math.Pi/180;
            let deltaLat = (dropOffCoord[i + 1] - pickUpCoord[i + 1]) * Math.Pi/180;
            let deltaLong = (dropOffCoord[i] - pickUpCoord[i]) * Math.Pi/180;
            
            let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            let distance = R * c; //in km
            this._totalDistance += distance;
        }
        return this._totalDistance;
    }
    // Accessor
    get fare()
    {
        let flagRate = 4.20;
        let perDistance = 1.622;
        let vehicleLevy = 1.1;
        let totalFare = flagRate + perDistance*totalDistance + vehicleLevy;

        if (taxiType == "SUV")
        {
            totalFare += 3.5;
        }
        else if (taxiType == "Van")
        {
            totalFare += 6;
        }
        else if (taxiType == "Minibus")
        {
            totalFare += 10;
        }
        if (this._pickUpTime.getHours() >= 17 || this._pickUpTime.getHours() <= 9)
        {
            totalFare = totalFare*1.2;
        }

        return totalFare;
    }
    // Modifier
    set taxiType(newTaxiType)
    {
        this._taxiType = newTaxiType;
    }
    /**
     * Adds a new stop to the current trip
     */
    addStop()
    {
        let route = new Route(pickUpAddress, dropOffAddress);
        this._routeData.push(route);
    }
    /**
     * Removes a stop from the current trip
     * @param {Integer} stopIndex 
     */
    removeStop(stopIndex)
    {
        this._routeData.splice(stopIndex,1);
    }
    /**
     * Stores all booking data to local storage
     * @param {Array} bookingData 
     */
    fromData(bookingData)
    {
        this._pickUpTime = new Date(bookingData._pickUpTime);
        this._taxiType = taxiType;
        this._routeData = []; 

        for (let i = 0; i < bookingData._routeData.length; i++)
        {
            let route = new Route();
            route.fromData(bookingData._routeData[i]);
            this._routeData[i].push(route);
        }
    }
}

/**
 * Keeps track of all bookings made to be viewed later
 */
class totalBooking
{
    // Constructor
    constructor()
    {
        this._allBookings = [];
    }
    // Accessor 
    getPastBookings()
    {
        let pastBookings = [];
        let now = new Date();

        for (i = 0; i < this._allBookings.length; i++)
        {
            if (this._allBookings[i].pickUpTime - now > 0)
            {
                pastBookings = this._allBookings[i];
            }
            else 
            {
                pastBookings[i] = null;
            }
        }
        return pastBookings;
    }
    // Accessor 
    getFutureBookings()
    {
        let futureBookings = [];
        let now = new Date();

        for (i = 0; i < this._allBookings.length; i++)
        {
            if (this._allBookings[i].pickUpTime - now < 0)
            {
                futureBookings[i] = this._allBookings[i];
            }
            else 
            {
                futureBookings[i] = null;
            }
        }

        return futureBookings;
    }
    // Accessor 
    getCommencedBookings()
    {
        let commencedBookings = [];
        let now = new Date();

        for (i = 0; i < this._allBookings.length; i++)
        {
            if (this._allBookings[i].pickUpTime - now == 0)
            {
                commencedBookings[i] = this._allBookings[i];
            }
            else 
            {
                commencedBookings[i] = null;
            }
        }

        return commencedBookings; 
    }
    /**
     * Adds a booking of the given taxi type
     * @param {String} taxiType 
     */
    addBooking(pickUpTime,taxiType)
    {
        let booking = new Booking(pickUpTime,taxiType);
        this._allBookings.push(booking);
    }
    /**
     * Removes a booking at a given index
     * @param {Integer} bookingIndex 
     */
    removeBooking(bookingIndex)
    {
        this._allBookings.splice(bookingIndex,1);
    }
    /**
     * Stores all booking data to local storage
     * @param {} totalBookingData 
     */
    fromData(totalBookingData)
    {
        this._allBookings = [];
       
        for (let i = 0; i < totalBookingData._allBookings.length; i++)
        {
            let booking = new Booking(taxiType);
            booking.fromData(totalBookingData._allBookings[i]);
            this._allBookings[i].push(booking);
        }
    }
    /**
     * To get booking at an index
     * @param {Integer} index 
     * @returns all bookings at a given index
     */
    getBooking(index)
    {
        return this._allBookings[index];
    }
}

/**
 * Retrieves data from localStorage and parses data if necessary 
 * @param {String} key provided to retrieve data stored in localStorage from
 * @returns data stored in localStorage at provided key
 */
function retrieveData(key)
{
    let data = localStorage.getItem(key);
    try
    {
      data = JSON.parse(data);
    }
    catch (e)
    {
      console.log(e);
    }
    finally
    {
      return data;
    }
}


let bookingInstance = new totalBooking();
if (typeof(Storage) !== "undefined")
{
  console.log("Local storage is available");
  let data = retrieveData(USER_DATA);

  if (data !== null) {
      bookingInstance.fromData(data);
  } else {
      bookingInstance.allBookings = []; //initialize an empty array to store new data
  }
}
else
{
  console.log("Local storage not supported or blocked");
}
storeData(USER_DATA, bookingInstance);

/**
 * This function stringifies data and then updates data into localStorage
 * @param {String} key provided key to store data in localStorage
 * @param {String} data data to be stored in local storage 
 */
function storeData(key, data)
{
    if (typeof(data) === 'object')
    {
        data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
}

