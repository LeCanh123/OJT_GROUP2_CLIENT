import '../../../Css/Dashboard.scss'
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../../../popup.css"
import L from 'leaflet';
import MapApi from "../../../apis/map"
import { useEffect, useState } from 'react';
import "../../../Css/Map.scss"
import { Modal, message } from 'antd';

export default function Dashboard() {
    const customIcon1 = L.icon({
        iconUrl: "https://media.istockphoto.com/id/810737024/vi/vec-to/h%C3%ACnh-%E1%BA%A3nh-ho%E1%BA%A1t-h%C3%ACnh-c%E1%BB%A7a-storm-icon-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-m%C6%B0a-b%C3%A3o.jpg?s=612x612&w=0&k=20&c=FXky1znRY56hF5NXmwlLFT9x6O4VvAEhPN4_l_NidC4=",
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    let [data, setData] = useState([])
    useEffect(() => {
        async function getAllMap() {
            let getAllMapResult = await MapApi.getAllMap();

            setData(getAllMapResult.data.data)
            console.log("getAllMapResult", getAllMapResult);
        }
        getAllMap()

    }, [])
    return (
        <div className='component'>
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
            <div className='dashboard-map'>
                <div className="row">
                    <div className="col col-md-9">
                        <div style={{ width: "100%", position: "relative" }}>
                            <MapContainer

                                center={[14.0583, 108.2772]}
                                zoom={5}
                                className='map-admin'
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                {data?.map((center: any, index: any) => (
                                    <Circle key={index} center={[Number(center.locationx), Number(center.locationy)]} radius={center.size}>
                                        <Marker position={[Number(center.locationx), Number(center.locationy)]} icon={customIcon1}>
                                            <Popup>{center.name}</Popup>
                                        </Marker>
                                    </Circle>
                                ))}

                            </MapContainer>
                        </div>
                    </div>

                </div>

                {/* <div className='dashboard-btn'>
                    <button
                        onClick={() => {
                            Modal.confirm({
                                content: "BẠN CÓ MUỐN GỬI CẢNH BÁO THIÊN TAI ĐẾN TẤT CẢ USER KHÔNG?",
                                onOk: () => {
                                    message.success("Đã gửi cảnh báo đến các user thành công!")
                                }
                            })
                        }}
                        className='btn btn-danger'>GỬI CẢNH BÁO</button>
                </div> */}



            </div>
        </div>
    )
}
