import React, { useState } from 'react';
import { LoadScript, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';

const GetUserLocation = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const [error, setError] = useState('');

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            }, (error) => {
                console.error('Error al obtener la ubicación:', error);
            });
        } else {
            console.error('El navegador no soporta la geolocalización.');
        }
    };

    const getCoordinatesFromPostalCode = () => {
        if (postalCode.trim() !== '') {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: postalCode }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    setLatitude(lat());
                    setLongitude(lng());
                    setError('');
                } else {
                    setError('No se pudo encontrar la ubicación para el código postal proporcionado');
                }
            });
        } else {
            setError('Por favor, ingresa un código postal válido');
        }
    };

    return (
        <div className="geolocation-container" style={{ margin: '20px 0' }}>
            <h2>Obtener Ubicación</h2>
            <div style={{ marginBottom: '15px' }}>
                <button 
                    onClick={getCurrentLocation}
                    style={{ 
                        padding: '10px 15px', 
                        marginRight: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Obtener mi ubicación actual
                </button>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <input 
                    type="text" 
                    pattern="[0-9]{5}"

                    placeholder="Código postal" 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)}
                    style={{
                        padding: '8px',
                        marginRight: '10px',
                        width: '230px'
                    }}
                    required
                />
                <button 
                    onClick={getCoordinatesFromPostalCode}
                    style={{ 
                        padding: '8px 15px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Buscar por código postal
                </button>
            </div>

            {error && (
                <div style={{ color: 'red', margin: '10px 0' }}>
                    {error}
                </div>
            )}

            {(latitude !== null && longitude !== null) && (
                <div style={{ marginTop: '15px' }}>
                    <p><strong>Latitud:</strong> {latitude.toFixed(6)}</p>
                    <p><strong>Longitud:</strong> {longitude.toFixed(6)}</p>
                </div>
            )}
        </div>
    );
};

export default GetUserLocation;