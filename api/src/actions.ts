import * as db from "./db";

export async function insertMoistureReading(device_id: number, event_type: number, reading: number, date: Date) {
    reading = Math.min(800, Math.max(300, reading))
    reading = 100 - ((reading - 300) / 500 * 100);
    try {
        await db.query(
            "INSERT INTO history (device_id, event_type, reading, timestamp) VALUES ($1, $2, $3, $4);",
            [device_id, event_type, reading, date]
        );
    }
    catch (err) {
        throw err;
    }
}

export async function generateMoistureTestData() {
    const startDate = new Date(); // starting from now, or set a specific start date
    const interval = 60 * 60 * 1000; // 5 minutes in milliseconds

    const endDate = new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000);

    let timestamps: moistureReading[] = [];

    for (let i = 2; i < 7; i++) {
        for (let date = new Date(startDate); date <= endDate; date = new Date(date.getTime() + interval)) {
            const randomNumber = Math.random() * 100 + 300;
            let data_point: moistureReading = { device_id: i, event_type: 0, reading: Math.round(randomNumber * 100) / 100, date: new Date(date) }
            try {
                await insertMoistureReading(data_point.device_id, 0, data_point.reading, data_point.date);
            }
            catch (err) {
                console.log(err);
                return;
            }
            timestamps.push(data_point);
        }
    }

    return timestamps;

}


export async function generatePlantTestData() {
    let plants = [
        {
            plant_name: 'Ruscus',
            optimal_range_min: 70,
            optimal_range_max: 60,
            connected_valve: 1,
            image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRc7-2oiLn1GJXQyurunG8N5hx4d8st9r5L7N-Ak4e6Fp5RHKZY'
        },
        {
            plant_name: 'Pilea',
            optimal_range_min: 77,
            optimal_range_max: 64,
            connected_valve: 1,
            image: 'https://www.easytogrowbulbs.com/cdn/shop/products/PileaChineseMoneyPlant_ParentinTerracottaRomeyPot_sqWeb_ETGB_2280c9da-e3fb-4305-9363-f2a47677b175_1024x.jpg?v=1627661719'
        },
        {
            plant_name: 'Monstera',
            optimal_range_min: 70,
            optimal_range_max: 60,
            connected_valve: 1,
            image: 'https://begreen.imgix.net/63871a909af0d340974905.jpg?w=1200&h=1200&auto=format'
        }
    ]
    for (let i = 0; i < 3; i++) {
        try {
            await db.query(
                "INSERT INTO plants (device_id, plant_name, optimal_range_min, optimal_range_max, connected_valve, image) VALUES ($1, $2, $3, $4, $5, $6);",
                [i + 2, plants[i].plant_name, plants[i].optimal_range_min, plants[i].optimal_range_max, plants[i].connected_valve, plants[i].image]
            );
        }
        catch (err) {
            throw err;
        }
    }
}