type event = 'moisture_read' | 'close_valve' | 'open_valve'; 

interface moistureReading {
    device_id: number; 
    event_type: event; 
    reading: number; 
    date: Date; 
}