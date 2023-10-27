import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import { LatLngExpression, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Component, useEffect, useState } from 'react';
import './Layer.scss'

interface StormType {
    latitude: number;
    longitude: number;
    datetime: string;
}

// class StormMap extends Component {
//     constructor(props: any){
//         super(props);
//         this.state = {
//             stormPath: StormType  =[
//                 { latitude: 13.083022, longitude: 110.036936, datetime: '2023-10-26 10:00' },
//                 { latitude: 12.362104, longitude: 113.270363, datetime: '2023-10-26 11:00' },
//                 { latitude: 10.859965, longitude: 115.764721, datetime: '2023-10-26 12:00' },
//             ]

//         }
//     }
//     render() {
//         const stormPath = [
//             { latitude: 13.083022, longitude: 110.036936, datetime: '2023-10-26 10:00' },
//             { latitude: 12.362104, longitude: 113.270363, datetime: '2023-10-26 11:00' },
//             { latitude: 10.859965, longitude: 115.764721, datetime: '2023-10-26 12:00' },
//             // [13.083022, 110.036936], // Tọa độ điểm 1
//             // [12.362104, 113.270363], // Tọa độ điểm 2
//             // [10.859965, 115.764721]
//         ];

//         const icon = divIcon({
//             className: 'custom-icon',
//             html: '<img class="image-rotate" src="https://firebasestorage.googleapis.com/v0/b/test-a6843.appspot.com/o/image%2Fstorm-fake.png?alt=media&token=6641de57-4ca5-4e72-bb0e-0b275763ca6e&_gl=1*1hqyvr5*_ga*MTQ3Njc5Mzk2OC4xNjg4MDg5NjI5*_ga_CW55HF8NVT*MTY5ODMxMjIyNy45NS4xLjE2OTgzMTIyNjIuMjUuMC4w" alt="Storm Icon" />',
//         });
//         <div ></div>

//         // const markers = stormPath.map((point, index) => (
//         //     <Marker key={index} position={point} icon={icon} />
//         // ));

//         const markers = stormPath.map((point, index) => (
//             <Marker key={index} position={[point.latitude, point.longitude]} icon={icon} >
//                 {/* <Popup>{point.datetime}</Popup> */}
//                 <Tooltip>{point.datetime}</Tooltip>
//             </Marker>
//         ));

//         return (
//             <MapContainer
//                 center={[10.859965, 115.764721]}
//                 zoom={5}
//                 style={{ height: '700px', width: '100%' }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Polyline pathOptions={{ color: 'red' }} positions={stormPath.map(point => [point.latitude, point.longitude])} />
//                 {markers}
//             </MapContainer>
//         );
//     }
// }

const StormMap: React.FC = () => {
    const [stormPath, setStormPath] = useState<StormType[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(updateStormPath, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const updateStormPath = () => {
        if (currentIndex < stormPath.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const icon = divIcon({
        className: 'custom-icon',
        html: '<img class="image-rotate" src="https://firebasestorage.googleapis.com/v0/b/test-a6843.appspot.com/o/image%2Fstorm-fake.png?alt=media&token=6641de57-4ca5-4e72-bb0e-0b275763ca6e&_gl=1*1hqyvr5*_ga*MTQ3Njc5Mzk2OC4xNjg4MDg5NjI5*_ga_CW55HF8NVT*MTY5ODMxMjIyNy45NS4xLjE2OTgzMTIyNjIuMjUuMC4w" alt="Storm Icon" />',
    });

    useEffect(() => {
        // Thay thế bằng hàm lấy dữ liệu đường đi bão từ API hoặc nguồn dữ liệu khác
        const fetchStormPath = async () => {
            // Lấy dữ liệu đường đi bão từ nguồn dữ liệu
            const response = await fetch('data.json');
            const data: StormType[] = await response.json();

            setStormPath(data);
        };

        fetchStormPath();
    }, []);

    const interpolatedPoints: LatLngExpression[] = stormPath
        .slice(0, currentIndex + 1)
        .map(point => [point.latitude, point.longitude]);

    return (
        <MapContainer center={[10.859965, 115.764721]} zoom={5} style={{ height: '700px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />
            <Polyline pathOptions={{ color: 'red' }} positions={interpolatedPoints} />
            {stormPath.map((point, index) => (
                <Marker key={index} position={[point.latitude, point.longitude]} icon={icon} />
            ))}
        </MapContainer>
    );
};
export default StormMap;
