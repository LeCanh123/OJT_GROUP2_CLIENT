import { useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { ForecastType } from "../../../interface/Forecast";


export default function MapModal({ latPreview, lngPreview, levelPreview, sizePreview, editForecast }: {
    latPreview: number;
    lngPreview: number;
    levelPreview: number;
    sizePreview: number;
    editForecast: ForecastType;
}) {

    const [center, setCenter] = useState({ lat: 14.0583, lng: 108.2772 });

    const position: any = [latPreview, lngPreview]

    const getColorForMagnitude = (level: number): string => {
        // Define earthquake levels and corresponding colors
        if (level >= 9) {
            return '#ea1010'; // Red
        } else if (level >= 7) {
            return '#ff4400'; // Orange
        } else if (level >= 5) {
            return '#ff8800'; // Orange
        } else if (level >= 3) {
            return '#ffcc00'; // Yellow
        } else {
            return '#ffff00'; // Light yellow
        }
    };

    return (
        <div>
            <MapContainer center={center} zoom={6} style={{ height: "100vh" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    editForecast ? (
                        <Circle center={[Number(editForecast.lat), Number(editForecast.lng)]} radius={editForecast.size} pathOptions={{ fillColor: getColorForMagnitude(editForecast.level) }} >
                            <Marker position={[Number(editForecast.lat), Number(editForecast.lng)]}>
                            </Marker>
                        </Circle>
                    )
                        :
                        (
                            <Circle center={position} radius={Number(sizePreview)} pathOptions={{ fillColor: getColorForMagnitude(Number(levelPreview)) }} >
                                <Marker position={position} />
                            </Circle>
                        )
                }

            </MapContainer>
        </div>
    )
}
