import * as db from "./db";

export async function insertMoistureReading(device_id: number, event_type: number, reading: number, date: Date) {
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
    const interval = 5 * 60 * 1000; // 5 minutes in milliseconds

    const endDate = new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000);

    let timestamps: moistureReading[] = [];

    for (let date = new Date(startDate); date <= endDate; date = new Date(date.getTime() + interval)) {
        const randomNumber = Math.random() * 99 + 1;
        let data_point: moistureReading = { device_id: Math.floor(Math.random() * 5) + 2, event_type: 0, reading: Math.round(randomNumber * 100) / 100, date: new Date(date) }
        try {
            await insertMoistureReading(data_point.device_id, 0, data_point.reading, data_point.date);
        }
        catch (err) {
            console.log(err); 
            return; 
        }
        timestamps.push(data_point);
    }

    return timestamps; 

}


export async function generatePlantTestData() {
    let plants = [
        {
            plant_name: 'ZZ Plant', 
            optimal_range_min: 70, 
            optimal_range_max: 60, 
            connected_valve: 1, 
            image: 'https://costafarms.com/cdn/shop/files/DSC03638-Edit--cream_900x.jpg?v=1694800191'
        }, 
        {
            plant_name: 'Pilea', 
            optimal_range_min: 77, 
            optimal_range_max: 64, 
            connected_valve: 1, 
            image: 'https://www.easytogrowbulbs.com/cdn/shop/products/PileaChineseMoneyPlant_ParentinTerracottaRomeyPot_sqWeb_ETGB_2280c9da-e3fb-4305-9363-f2a47677b175_1024x.jpg?v=1627661719'
        }, 
        {
            plant_name: 'Alocasia Silver Dragon', 
            optimal_range_min: 67, 
            optimal_range_max: 60, 
            connected_valve: 1, 
            image: 'https://costafarms.com/cdn/shop/articles/Silver_20Dragon_20Alocasia_20-_20Costa_20Farms_20Trending_20Tropical_1000x1000.jpg?v=1680798954'
        }, 
        {
            plant_name: 'Monstera', 
            optimal_range_min: 70, 
            optimal_range_max: 60, 
            connected_valve: 1, 
            image: 'https://begreen.imgix.net/63871a909af0d340974905.jpg?w=1200&h=1200&auto=format'
        }, 
        {
            plant_name: 'Asparagus fern', 
            optimal_range_min: 65, 
            optimal_range_max: 52, 
            connected_valve: 1, 
            image: 'https://www.plantflix.com/cdn/shop/files/asparagus-plumosus-nana-lace-fern-plantflix-7-33761063239912.jpg?v=1694665644&width=1500'
        }, 
        {
            plant_name: 'Common Cactus', 
            optimal_range_min: 40, 
            optimal_range_max: 20, 
            connected_valve: 1, 
            image: 'https://animals.sandiegozoo.org/sites/default/files/2016-10/plants_hero_cactusB.jpg'
        }, 
    ]
    for(let i = 0; i < 4; i++) {
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