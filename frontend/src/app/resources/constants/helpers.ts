export function getInitial(value: any) {
    var names = value.split(" "), initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
  
  export function getYearList() {
    var yearList = []
    var currentYear = new Date().getFullYear()
  
    for (let i = 2021; i < currentYear + 1; i++) {
      yearList.push(i.toString())
    }
    return yearList.reverse();
  }