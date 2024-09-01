// convert time
export const convertDate = (e) => {
    let date = new Date(e)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(day < 10) {day = '0' + day}
    if(month < 10) {month = '0' + month}
    let newDate = year + '/' + month + '/' + day
    return newDate
}

export const getObjectUrl = (file) => {
    var url = null
    if(window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if(window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if(window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}