import TokenService from "@/services/token.service";
import {cookieAuth, cookieRefresh} from "@/utils/constants/cookies";
import Cookies from "js-cookie";

export const viewError = (err) => {
    let error=err
    if(err[0]=='email must be an email'){
        error='Enter a valid email'
    }
    return error
}

export const isUserLoggedIn = () => {
    return !!(TokenService.getUser()?._id && (!!Cookies.get(cookieAuth) && !!Cookies.get(cookieRefresh)))
}

export const userTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const twentyFourHourToTwelveHourFormat = (isoDate,timezone=userTimeZone()) => {
    // Check correct time format and split into components
    let time = new Date(new Date(isoDate).toLocaleString('en-US', { timeZone: timezone })).toLocaleTimeString()

    time = time?.toString()?.match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    console.log(time,"Time is here");
    if (time.length > 1) { // If time format correct
        time = time?.slice (1,4);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time?.join (''); // return adjusted time or original string
}



export const userCurrentTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const isoDateToNormalDate = (isoDate,timezone = userCurrentTimezone()) => {
    if(!isNaN(Date.parse(isoDate))){
        const date = new Date(isoDate).toLocaleString('en-US', { timeZone: timezone })

        return new Date(date).toDateString()
    }else return null
}

export const convertUTCDateToCurrentTimezoneDate = (utcDate = new Date(),timezone) => {
    const convertedDate = new Date(utcDate).toLocaleString('en-US', { timeZone: timezone })

    if(!timezone && utcDate) return new Date(convertedDate)
    if(!timezone && !utcDate) return new Date()

    return new Date(convertedDate).toString()
}

export const appendingZeroToTime = (time) => {
    if(time < 10){
        return `0${time}`
    }else if(time >= 10){
        return `${time}`
    }
}

export const createSeoFriendlyUrl = (str) => {
    if(!str) return;
    
    const sanitizedStr = str
      .toLowerCase() 
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .replace(/-{2,}/g, '-'); // Replace multiple consecutive hyphens with a single hyphen
  
    return sanitizedStr;
}

export const undoSeoFriendlyUrl = (sanitizedStr) => {
    if (!sanitizedStr) return;

    // Replace hyphens with spaces
    const originalStr = sanitizedStr.replace(/-/g, ' ');

    // Capitalize the first letter of each word
    const words = originalStr.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a sentence
    const originalSentence = capitalizedWords.join(' ');

    return originalSentence;
};

export const createSeoFriendlyUrlNonLower = (str) => {
    const sanitizedStr = str
        .replace(/ /g, '-') // Replace spaces with hyphens
        .replace(/[^a-zA-Z0-9-]+/g, '') // Remove non-alphanumeric characters (except hyphens)
        .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens

    return sanitizedStr;
}

export const eventTimeStatus = (startTime,endTime,event) => {
    const userCurrentTime = new Date().getTime()
    const eventStartTime = new Date(startTime).getTime()
    const eventEndTime = new Date(endTime).getTime()

    //user's time is above event start time and less than event end time
    if(event?.isDraft){
        return 'Draft'
    }else if(userCurrentTime > eventStartTime && userCurrentTime < eventEndTime){
        return "Started"
        //user time is less than event's start time
    }else if(userCurrentTime < eventStartTime){
        return "Not started yet"
        //user time crossed event's end time
    }else if (userCurrentTime > eventEndTime ){
        return "Ended"
    }else{
        return '-'
    }
}

export const dateToTimeRange = (eventStartDate,eventTimezone = userCurrentTimezone(),isOnline=true) => {
   
    if(isOnline = true){
        eventTimezone = userCurrentTimezone();
       
    }else{
        eventTimezone = eventTimezone
    }
    const eventTimezoneDate = new Date(eventStartDate).toLocaleString('en-US', { timeZone: eventTimezone })
    const currentTimezoneDate = eventTimezoneDate.toLocaleString('en-US', { timeZone: eventTimezone })
    const userCurrentDate = new Date().toLocaleString('en-US', { timeZone: eventTimezone })

    //If the user's date is greater than the event date, then event is in the past and is already started.
    if(new Date(userCurrentDate).getTime() > new Date(currentTimezoneDate).getTime()){
        return {days : 0,hours : 0,minutes : 0,seconds : 0}
    }

    // get total seconds between the times
    let delta = Math.abs(new Date(currentTimezoneDate) - new Date()) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    let seconds = delta % 60;  // in theory the modulus is not required

    return {days,hours,minutes,seconds}
}
