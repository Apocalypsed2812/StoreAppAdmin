import { useMemo } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import styles from './Map.module.scss';

function Map() {
    const containerStyle = {
        width: '400px',
        height: '400px',
    };
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCfJe9cnnIbQSHvuG8IkH1fWQWi936WBCY',
    });
    if (!isLoaded) return <div>Loading...</div>;
    return <GoogleMap zoom={10} center={center} mapContainerClassName={containerStyle}></GoogleMap>;
    // return <div>Map is loaded</div>;
}

export default Map;
