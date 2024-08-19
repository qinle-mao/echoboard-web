// convert time
export const date_1 = (e) => {
    let date = new Date(e)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(day < 10) {day = '0' + day}
    if(month < 10) {month = '0' + month}
    let newDate = year + '.' + month + '.' + day
    return newDate
}