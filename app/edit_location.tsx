import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Region } from 'react-native-maps';

export interface AddLocationParams {
    latitude: number;
    longitude: number;
    name: string;
    color: string;
}

export default function AddLocationPage() {
    const { region } = useLocalSearchParams();
    const colorScheme = useColorScheme();

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
        <TextInput
        style={[style.input, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}
        placeholder="Location Name" value={regionState?.name}
        placeholderTextColor={colorScheme === 'dark' ? '#888888' : '#aaaaaa'}
        onChangeText={(text) => setRegionState((prev) => prev ? { ...prev, name: text } : null)}
        />

        <TextInput
        style={[style.input, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}
        placeholder="Color" value={regionState?.color}
        placeholderTextColor={colorScheme === 'dark' ? '#888888' : '#aaaaaa'}
        onChangeText={(text) => setRegionState((prev) => prev ? { ...prev, color: text } : null)}
        />

        <TextInput
        style={[style.input, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}
        placeholder="Latitude" value={regionState?.latitude.toString()} editable={false}
        placeholderTextColor={colorScheme === 'dark' ? '#888888' : '#aaaaaa'}
        />

        <TextInput
        style={[style.input, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}
        placeholder="Longitude" value={regionState?.longitude.toString()} editable={false}
        placeholderTextColor={colorScheme === 'dark' ? '#888888' : '#aaaaaa'}
        />

        <TouchableOpacity style={style.saveButton}>
            <Text style={{ color: '#ffffff', fontSize: 20 }}>Save Location</Text>
        </TouchableOpacity>
    </View>;
}

const style = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
    subTitle: { fontSize: 16, color: 'gray', marginTop: 10 },
    separator: { marginVertical: 5, height: 1, width: '80%' },
    input: { height: 50, borderColor: 'gray', borderWidth: 1, width: '80%', paddingHorizontal: 10, marginTop: 20, borderRadius: 5},
    saveButton: { marginTop: 30, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#007AFF' },
    removeBUtton: { marginTop: 15, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#FF3B30' },
});