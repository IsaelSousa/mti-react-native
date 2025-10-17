import Label from '@/components/label';
import Screen from '@/components/ui/screen';
import Entypo from '@expo/vector-icons/Entypo';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';

export default function HomePage() {
    const modalizeRef = useRef<Modalize>(null);
    const colorScheme = useColorScheme();
    const router = useRouter();

    const [markers, setMarkers] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const handleMapPress = (event: MapPressEvent) => {
        const coord = event.nativeEvent.coordinate;
        setMarkers({ latitude: coord.latitude, longitude: coord.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setMarkers({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    const navigateToAddLocation = (region: Region) => {
        router.push({ pathname: '/add_location', params: { region: JSON.stringify(region) } });
    }

    useEffect(() => {
        (async () => await getLocation())();
    }, []);

    return <Screen>
        <Label label="Map Locations" />
        <MapView
            style={{ flex: 1 }}
            onPress={handleMapPress}
            region={markers}
            showsUserLocation={true}
            followsUserLocation={true}
        >
            <Marker coordinate={markers} />
        </MapView>
        <TouchableOpacity onPress={() => navigateToAddLocation(markers)} style={[styles.fab, { backgroundColor: colorScheme === 'dark' ? '#1d1d1d' : '#ffffff' }]}>
            <Text style={styles.fabText}><Entypo name="plus" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} /></Text>
        </TouchableOpacity>
    </Screen>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
        right: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, width: 300, borderRadius: 5
    }
});