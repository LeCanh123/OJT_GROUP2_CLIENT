import '../../../Css/Dashboard.scss'
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../../../popup.css"
import L from 'leaflet';
import MapApi from "../../../apis/map"
import { useEffect, useState } from 'react';
import "../../../Css/Map.scss"
import { Modal, message } from 'antd';
import apiAdmin from '../../../apis/Admin';
import { ForecastType } from '../../../interface/Forecast';

export default function Dashboard() {
    const [data, setData] = useState<ForecastType[]>([])

    const [center, setCenter] = useState({ lat: 14.0583, lng: 108.2772 });
    const ZOOM_LEVEL = 5;

    const customIcon1 = data.length > 0 && L.icon({
        iconUrl: "https://firebasestorage.googleapis.com/v0/b/test-a6843.appspot.com/o/image%2F1203e714405a6ee0dde7cb12b31cea19?alt=media&token=235bd534-5b34-44b1-a390-fe294b63749d&_gl=1*1bfdimf*_ga*MTQ3Njc5Mzk2OC4xNjg4MDg5NjI5*_ga_CW55HF8NVT*MTY5ODAzNjk4MC45MS4xLjE2OTgwMzcwNjYuNTAuMC4w",
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    useEffect(() => {
        async function getForecastMap() {
            await apiAdmin.getForecast()
                .then(res => {
                    console.log("res", res.data);

                    if (res.status === 200) {
                        setData(res.data.data)
                    }
                })
        }
        getForecastMap()

    }, [])
    return (
        <div className='component'>
            <div className='dashboard-map'>
                <div className="row">
                    <div className="col col-md-9">
                        <div style={{ width: "100%", position: "relative" }}>
                            <MapContainer

                                center={center}
                                zoom={ZOOM_LEVEL}
                                className='map-admin'
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                {data?.map((center, index: any) => (
                                    <Circle key={index} center={[Number(center.lat), Number(center.lng)]} radius={center.size}>
                                        <Marker position={[Number(center.lat), Number(center.lng)]} icon={customIcon1}>
                                            <Popup>{center.name}</Popup>
                                        </Marker>
                                    </Circle>
                                ))}

                            </MapContainer>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card warning-btn">
                <div className="card-body ">
                    <div className='card-warning'>
                        <h5 className="card-title">WARNING</h5>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <p className="card-text">
                        Gửi cảnh báo thiên tai đến tất cả người dùng.
                    </p>
                    <button
                        onClick={() => {
                            Modal.confirm({
                                content: "BẠN CÓ MUỐN GỬI CẢNH BÁO THIÊN TAI ĐẾN TẤT CẢ USER KHÔNG?",
                                onOk: () => {
                                    message.success("Đã gửi cảnh báo đến các user thành công!")
                                }
                            })
                        }}
                        type="button" className="btn btn-danger btn-send">
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    )
}
