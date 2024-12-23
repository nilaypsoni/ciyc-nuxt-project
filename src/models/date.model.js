import moment from "moment-timezone";

const setdatetime=(date,h,m)=>{
    let startDate=new Date(date)
    startDate.setHours(h)
    startDate.setMinutes(m)
    return startDate
}

const monthArray = [
    { value: 'Jan', id: 0 },
    { value: 'Feb', id: 1 },
    { value: 'Mar', id: 2 },
    { value: 'Apr', id: 3 },
    { value: 'May', id: 4 },
    { value: 'Jun', id: 5 },
    { value: 'Jul', id: 6 },
    { value: 'Aug', id: 7 },
    { value: 'Sep', id: 8 },
    { value: 'Oct', id: 9 },
    { value: 'Nov', id: 10 },
    { value: 'Dec', id: 11 }
]


const monthfind = (id) => {
    let value = 0
    let ext = monthArray.find(itm => itm.id === id)
    if (ext) value = ext.value
    return value
}

const getWeekDate = (date = new Date(), week = 1) => {
    let d = new Date(date)
    let month = d.getMonth()
    month = String(month + 1)

    let value = 1
    if (week == 1) value = 1
    else if (week > 1) value = 7 * (week - 1)
    if (value > 30) value = 30

    return new Date(`${d.getFullYear()}-${month}-${value}`)
}

const date = (p) => {
    let d = new Date(p)
    return `${d.getDate()} ${monthfind(d.getMonth())} ${d.getFullYear()}`
}

const date2 = (p) => {
    let d = new Date(p)
    return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
}

const daysArray = [
    { value: 'Monday', id: 1 },
    { value: 'Tuesday', id: 2 },
    { value: 'Wednesday', id: 3 },
    { value: 'Thursday', id: 4 },
    { value: 'Friday', id: 5 },
    { value: 'Saturday', id: 6 },
    { value: 'Sunday', id: 0 },
]

const getDayName = (id) => {
    let value = daysArray.find((itm) => itm.id === id).value
    return value;
}

const day = (p) => {
    if (!p) return ''
    let day = new Date(p).getDay()
    day = getDayName(day)
    return day
}

const time = (p,timezone='') => {
    if (!p) return ''
    let v = p.split('T')

    let filtr={ hour: 'numeric', minute: 'numeric', hour12: true}
    if(timezone) filtr.timeZone=timezone
    if (v.length === 2) {
        return new Date(p).toLocaleString('en-US', filtr)
    } else {
        return new Date(`2020-07-19 ${p}`).toLocaleString('en-US', filtr)
    }
}

const time_with_hour_only = (p,timezone='') => {
    // if (!p) return ''
    // let v = p.split('T')

    // let filtr={ hour: 'numeric', hour12: true}
    // if(timezone) filtr.timeZone=timezone
    // if (v.length === 2) {
    //     return new Date(p).toLocaleString('en-US', filtr).replace(/\u200E/g, '').replace(' AM', 'am').replace(' PM', 'pm')
    // } else {
    //     return new Date(`2020-07-19 ${p}`).toLocaleString('en-US', filtr)
    // }

    if (!p) return '';

    let v = p.split('T');
  
    let filtr = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    if (timezone) filtr.timeZone = timezone;
  
    if (v.length === 2) {
      const formattedTime = new Date(p)
        .toLocaleString('en-US', filtr)
        .replace(/\u200E/g, '')
        .replace(' AM', 'am')
        .replace(' PM', 'pm');
  
      // Check if minutes are '00' and remove them
      return formattedTime.replace(/:00/, '');
    } else {
      return new Date(`2020-07-19 ${p}`).toLocaleString('en-US', filtr);
    }
}

const datetime = (p) => {
    return `${date(p)}, ${time(p)}`
}

const timeString = (p) => {
    let date = new Date(p)
    let hr = String(date.getHours())
    let minutes = String(date.getMinutes())
    if (hr.length === 1) hr = `0${hr}`
    if (minutes.length === 1) minutes = `0${minutes}`
    return `${hr}:${minutes}:00`
}

const datetostring = (p) => {
    if (!p) return ''
    let date = new Date(p)
    let month = String(date.getMonth() + 1)
    let d = String(date.getDate())
    if (month.length === 1) month = `0${month}`
    if (d.length === 1) d = `0${d}`
    return `${date.getFullYear()}-${month}-${d}`
}

const datetoIso = (p) => {
    if (!p) return ''
    let date = datetostring(p)

    let value = `${date}T09:00:00.000Z`
    return value
}

const datetoIsotime = (p) => {
    let date = datetostring(p)
    let time = timeString(p)
    let value = `${date}T${time}.000Z`
    return value
}

const isototime = (p) => {
    if (!p) return ''
    let value = p.split('T')[1].split('.000Z')
    if (value.length === 2) {
    } else {
        value = p.split('T')[1].split('+')
    }
    return value[0]
}

const isotime = (p) => {
    return time(isototime(p))
}

const isotodate = (p) => {
    let d = new Date(`${datetostring(p)} ${isototime(p)}`)
    return d
}

const DaysNo = (s, e) => {
    // JavaScript program to illustrate 
    // calculation of no. of days between two date 

    // To set two dates to two variables
    var date1 = new Date(s);
    var date2 = new Date(e);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days + 1
}
    

const changeDateFormat = (value, timezone) =>{
// Create a moment-timezone object with the provided value and timezone
const date = moment.tz(value, timezone);

// Format the date as "Do MMM YYYY" (e.g., "1st Sep 2023") in the specified timezone
const formattedDate = date.format("Do MMM YYYY");

return formattedDate;
}

  const dateModel={setdatetime,date,date2,time,datetime,time_with_hour_only,changeDateFormat}
  export default dateModel