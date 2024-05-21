export class DateProvider{
    public static getCurrentDate(): string{
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        let currentDate = `${year}-${month}-${day}`;
        return currentDate;
    }

    public static getCurrentTime(): string{
        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        //let timeZone = date.
        let currentTime = `${hours}:${minutes}:${seconds}`;

        return currentTime;
    }

    public static getTimeStamp(): string{
        let date = this.getCurrentDate();
        let time = this.getCurrentTime();

        let timeStamp = `${date} - ${time}`;
        
        return timeStamp;
    }
}