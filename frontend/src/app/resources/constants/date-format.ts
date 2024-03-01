export function getFirstDayYear(date: any) {
  let year: any = date.getFullYear();
  return year + "-01" + "-01"
};

export function getFirstDayMonth(date: any) {
  let month: any = date.getMonth() + 1;
  let year: any = date.getFullYear();

  month = month < 10 ? '0' + month : month;

  return year + "-" + month + "-01"
};

export function getEndDayMonth() {
  let month: any = new Date().getMonth() + 1;
  let year: any = new Date().getFullYear();

  return getDate(new Date(year, month, 0))
};

export function getDate(date: any) {
  let month: any = new Date(date).getMonth() + 1;
  let day: any = new Date(date).getDate();
  let year: any = new Date(date).getFullYear();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '-' + month + '-' + day
}

export function getDateGB(date: any) {
  let month: any = new Date(date).getMonth() + 1;
  let day: any = new Date(date).getDate();
  let year: any = new Date(date).getFullYear();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return day + '-' + month + '-' + year
}

export function getDateNew(date: any) {
  let month: any = new Date(date).getMonth() + 1;
  let day: any = new Date(date).getDate();
  let year: any = new Date(date).getFullYear();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '/' + month + '/' + day
}

export function getDateToMilisec(date: any) {
  return new Date(date).getTime();
}

export function todayFullDate() {
  let month: any = new Date().getMonth() + 1;
  let day: any = new Date().getDate();
  let year: any = new Date().getFullYear();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '-' + month + '-' + day
}

export function getCurrentDate() {
  let day: any = new Date().getDate();
  day = day < 10 ? '0' + day : day;
  return day
}

export function getCurrentMonth() {
  let month: any = new Date().getMonth() + 1;
  return month
}

export function getCurrentYear() {
  let year: any = new Date().getFullYear();
  return year
}

export function getLastDateMonth() {
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  return getDate(new Date(year, month, 0));
}

export function time_ago(time:any) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

// export function getModernDate(value) {
//     let format = value.split('-')

//     let day = format[2]
//     let month = months.find(el => { return el.month === format[1] })
//     let year = format[0]

//     return day + ' ' + month.name + ', ' + year
// }