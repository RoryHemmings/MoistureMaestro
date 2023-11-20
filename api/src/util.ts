import { insertMoistureReading } from "./actions";

export async function generateMoistureTestData() {
    const startDate = new Date(); // starting from now, or set a specific start date
    const interval = 5 * 60 * 1000; // 5 minutes in milliseconds

    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    let timestamps: moistureReading[] = [];

    for (let date = new Date(startDate); date <= endDate; date = new Date(date.getTime() + interval)) {
        const randomNumber = Math.random() * 99 + 1;
        let data_point: moistureReading = { device_id: 1, event_type: 'moisture_read', reading: Math.round(randomNumber * 100) / 100, date: new Date(date) }
        try {
            await insertMoistureReading(data_point.device_id, 'moisture_read', data_point.reading, data_point.date);
        }
        catch (err) {
            console.log(err); 
            return; 
        }
        timestamps.push(data_point);
    }

    return timestamps; 

}