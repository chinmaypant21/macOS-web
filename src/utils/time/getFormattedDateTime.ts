export const getFormattedDateTime =  (date_value: Date) : {date: string, time: string} => {
    const options : any = {
        weekday: 'short', // Short day name (e.g., Mon)
        month: 'short', // Short month name (e.g., Feb)
        day: 'numeric', // Numeric day (e.g., 12)
        // hour: 'numeric', // Numeric hour (e.g., 1)
        // minute: '2-digit', // 2-digit minute (e.g., 11)
        // second: '2-digit', 
        // hour12: true, // Use 12-hour format
    };

    // console.log('Optimization check: getFormattedDateTime')

    const date = date_value.toLocaleDateString('en-US', options).replace(',','');
    const time = date_value.toLocaleTimeString('en-US');

    return {date, time}
}