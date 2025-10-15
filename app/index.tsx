import Label from '@/components/label';
import Screen from '@/components/ui/screen';
import { useState } from 'react';
import MapView, { LatLng, MapPressEvent, Marker } from 'react-native-maps';

function HomePage() {
    const [markers, setMarkers] = useState<LatLng>({ latitude: 37.78825, longitude: -122.4324 });

    const handleMapPress = (event: MapPressEvent) => {
        const coord = event.nativeEvent.coordinate;
        setMarkers({ latitude: coord.latitude, longitude: coord.longitude });
    };

    return <Screen>
        <Label label="Map Locations" />
        <MapView
            style={{ flex: 1 }}
            onPress={handleMapPress}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {markers && <Marker coordinate={markers} />}
        </MapView>
    </Screen>;
}

export default HomePage;