import type { StackScreenProps } from '@react-navigation/stack';

declare global {

    type RootStackParamList = {
        Home: undefined;
        Plant: { deviceID: string };
    };

    type PlantScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;
}

export { }