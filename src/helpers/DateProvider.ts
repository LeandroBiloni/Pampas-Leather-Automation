/**
 * Class to get Date info
 */
export class DateProvider{
    /**
     * Get the current date in local time
     * @returns The current date in YYYY-MM-DD format
     */
    public static getCurrentDate(): string{
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        let currentDate = `${year}-${month}-${day}`;
        return currentDate;
    }

    /**
     * Get the current local time 
     * @returns The current time in HH:MM:SS format
    */
   public static getCurrentTime(): string{
        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        //let timeZone = date.
        let currentTime = `${hours}:${minutes}:${seconds}`;

        return currentTime;
    }

    /**
     * Get the current timestamp in local time
     * @returns The current timestamp in YYYY-MM-DD - HH:MM:SS format
     */
    public static getTimeStamp(): string{
        let date = this.getCurrentDate();
        let time = this.getCurrentTime();

        let timeStamp = `${date} - ${time}`;
        
        return timeStamp;
    }
}