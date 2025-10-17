import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Region } from 'react-native-maps';

export interface AddLocationParams {
    latitude: number;
    longitude: number;
    name: string;
    color: string;
}

export default function AddLocationPage() {
    const { region } = useLocalSearchParams();

    const [regionState, setRegionState] = useState<AddLocationParams | null>(null);

    useEffect(() => {
        if (region) {
            const data = JSON.parse(region as string) as Region;
            setRegionState({
                latitude: data.latitude,
                longitude: data.longitude,
                name: '',
                color: '',
            });
        }
    }, [region]);

    return <View style={style.container}>
        <TextInput style={style.input} placeholder="Location Name" value={regionState?.name} onChangeText={(text) => setRegionState((prev) => prev ? { ...prev, name: text } : null)} />
        <TextInput style={style.input} placeholder="Color" value={regionState?.color} onChangeText={(text) => setRegionState((prev) => prev ? { ...prev, color: text } : null)} />
        <TextInput style={style.input} placeholder="Latitude" value={regionState?.latitude.toString()} editable={false} />
        <TextInput style={style.input} placeholder="Longitude" value={regionState?.longitude.toString()} editable={false} />
    </View>;
}

const style = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
    subTitle: { fontSize: 16, color: 'gray', marginTop: 10 },
    separator: { marginVertical: 5, height: 1, width: '80%' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', paddingHorizontal: 10, marginTop: 20, borderRadius: 5 },
});