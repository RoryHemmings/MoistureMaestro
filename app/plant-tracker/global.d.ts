import type { StackScreenProps } from '@react-navigation/stack';

declare global {
    interface plant {
        device_id: number, 
        plant_name: string, 
        optimal_range_min: number, 
        optimal_range_max: number, 
        connected_valve: number, 
        image: string, 
    }

    type RootStackParamList = {
        Home: undefined;
        Plant: { plant: plant };
    };

    type PlantScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;
}

export { }