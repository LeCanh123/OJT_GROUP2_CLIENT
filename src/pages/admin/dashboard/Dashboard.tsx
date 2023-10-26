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
    const [sendMailUsers, setSendMailUsers] = useState()

    const [center, setCenter] = useState({ lat: 14.0583, lng: 108.2772 });
    const ZOOM_LEVEL = 5;

    const customIcon = (icon: any) => {
        return L.icon({
            iconUrl: icon,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

    }

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

        async function sendMail() {
            await apiAdmin.sendMail()
                .then(res => {
                    console.log('mail', res)
                    setSendMailUsers(res.data.data)
                })
        }
        sendMail()

    }, [])

    // useEffect(() => {
    //     console.log("sendMailUsers", sendMailUsers);

    // }, [sendMailUsers])
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
                                        <Marker position={[Number(center.lat), Number(center.lng)]} icon={customIcon(center?.categorys?.icon)}>
                                            <Popup>
                                                <p style={{ textAlign: 'left' }}>Tên: {center.name}</p>
                                                <p style={{ textAlign: 'left' }}>Mức độ: {center.level}</p>
                                                <p style={{ textAlign: 'left' }}>Địa điểm: {center.place}</p>
                                                <p style={{ textAlign: 'left' }}>Thời gian: {center.time_start.toString()}</p>
                                            </Popup>
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
