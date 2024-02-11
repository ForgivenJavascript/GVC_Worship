export const formateDate = (date) => {
    let newDate;
    if(date.seconds) {
        newDate = new Date(date.seconds*1000);
    } else {
        newDate = new Date(date);
    }
    return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`;
}