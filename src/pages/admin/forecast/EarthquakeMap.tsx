import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface Earthquake {
    lat: number;
    lng: number;
    level: number;
}

interface EarthquakeMapProps {
    earthquakes: Earthquake[];
}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({ earthquakes }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current && earthquakes && earthquakes.length > 0) {
            const map = L.map(mapRef.current).setView([0, 0], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © OpenStreetMap contributors'
            }).addTo(map);

            const bounds = L.latLngBounds([
                [earthquakes[0].lat, earthquakes[0].lng]
            ]);

            earthquakes.forEach(earthquake => {
                const { lat, lng, level } = earthquake;
                const color = getColorForMagnitude(level);

                const circle = L.circleMarker([lat, lng], {
                    radius: 8,
                    fillColor: color,
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);

                bounds.extend([lat, lng]);

                circle.bindPopup(`Magnitude: ${level}`);
            });

            map.fitBounds(bounds);
        }
    }, [earthquakes]);

    const getColorForMagnitude = (level: number): string => {
        // Define earthquake levels and corresponding colors
        if (level >= 5) {
            return '#ff0000'; // Red
        } else if (level >= 4) {
            return '#ff6600'; // Orange
        } else if (level >= 3) {
            return '#ffcc00'; // Yellow
        } else {
            return '#ffff00'; // Light yellow
        }
    };

    return <div ref={mapRef} style={{ height: '700px' }}></div>;
};

export default EarthquakeMap;