import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../../../popup.css"
import L from 'leaflet';
import MapApi from "../../../apis/map"
import { useEffect, useState } from 'react';
import "../../../Css/Map.scss"





function Map() {
  let listcenter = [
    { x: 21.0285, y: 105.8542 },
    { x: 22.0285, y: 102.8542 }
  ];
  const radius = 100000; // Bán kính vòng tròn (đơn vị là mét)
  const note = "Loại thiên tai 1";
  const note1 = "Loại thiên tai 2";
  const customIcon = L.icon({
    iconUrl: "https://png.pngtree.com/png-vector/20191010/ourlarge/pngtree-hurricane-icon-flat-style-png-image_1808837.jpg",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });
  const customIcon1 = L.icon({
    iconUrl: "https://media.istockphoto.com/id/810737024/vi/vec-to/h%C3%ACnh-%E1%BA%A3nh-ho%E1%BA%A1t-h%C3%ACnh-c%E1%BB%A7a-storm-icon-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-m%C6%B0a-b%C3%A3o.jpg?s=612x612&w=0&k=20&c=FXky1znRY56hF5NXmwlLFT9x6O4VvAEhPN4_l_NidC4=",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });
  let [data, setData] = useState([])
  useEffect(() => {
    async function getAllMap() {
      let getAllMapResult = await MapApi.getAllMap();
      console.log("getAllMapResult", getAllMapResult);

      setData(getAllMapResult.data.data)
      console.log("getAllMapResult", getAllMapResult);
    }
    getAllMap()

  }, [])


  return (
    <div className='container' >
      <div>Warning !!!</div>

      <div className="row map">
        <div className="col col-md-9">
          <div style={{ width: "100%", textAlign: "left", position: "relative", left: "-11px" }}>
            <MapContainer

              center={[21.0285, 105.8542]}
              zoom={13}
              style={{ height: '600px', width: '1000px', margin: "auto", zIndex: "1" }}
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
        <div className="col col-md-3 " style={{ backgroundColor: "#f5f5f5", overflow: "scroll" }}>
          <div className='ms-3 mt-2'>
            {/* <div>Danh Sách Category lựa chọn</div>
            <div className='mt-1' style={{ backgroundColor: "#FFFFCC" }}>Động Đất</div>
            <div className='mt-1' style={{ backgroundColor: "#FFFFCC" }}>Sóng Thần</div> */}

            <select className="form-select" aria-label="Default select example">
              <option selected>Danh sách loại thiên tai</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>

          </div>

        </div>

      </div>

      <div className='row'>
        <div className="col" style={{ backgroundColor: "#99CCFF" }}>
          Bảng ghi chú
          <div className="row">
            <div className="col col-md-4" style={{ backgroundColor: "#FFFF66" }}>
              <div className="row">
                <div className="col col-md-1">
                  <img style={{ width: "30px", height: "30px" }} src="https://banner2.cleanpng.com/20180427/dxq/kisspng-2018-papua-new-guinea-earthquake-computer-icons-pa-earthquake-logo-5ae2ee4497b9e9.5998974415248215726215.jpg" alt="" />
                </div>
                <div className="col col-md-11 mt-1">Động Đất</div>
              </div>

            </div>
            <div className="col col-md-4" style={{ backgroundColor: "#FFFF66" }}>
              <div className="row">
                <div className="col col-md-1">
                  <img style={{ width: "30px", height: "30px" }} src="https://banner2.cleanpng.com/20180427/dxq/kisspng-2018-papua-new-guinea-earthquake-computer-icons-pa-earthquake-logo-5ae2ee4497b9e9.5998974415248215726215.jpg" alt="" />
                </div>
                <div className="col col-md-11 mt-1">Động Đất 1</div>
              </div>

            </div>
            <div className="col col-md-4" style={{ backgroundColor: "#FFFF66" }}>
              <div className="row">
                <div className="col col-md-1">
                  <img style={{ width: "30px", height: "30px" }} src="https://banner2.cleanpng.com/20180427/dxq/kisspng-2018-papua-new-guinea-earthquake-computer-icons-pa-earthquake-logo-5ae2ee4497b9e9.5998974415248215726215.jpg" alt="" />
                </div>
                <div className="col col-md-11 mt-1">Động Đất 2</div>
              </div>

            </div>
          </div>


          <div className="row mt-2">
            <div className="col col-md-4" style={{ backgroundColor: "#FFFF66" }}>
              <div className="row">
                <div className="col col-md-1">
                  <img style={{ width: "30px", height: "30px" }} src="https://banner2.cleanpng.com/20180427/dxq/kisspng-2018-papua-new-guinea-earthquake-computer-icons-pa-earthquake-logo-5ae2ee4497b9e9.5998974415248215726215.jpg" alt="" />
                </div>
                <div className="col col-md-11 mt-1">Động Đất</div>
              </div>

            </div>
            <div className="col col-md-4" style={{ backgroundColor: "#FFFF66" }}>
              <div className="row">
                <div className="col col-md-1">
                  <img style={{ width: "30px", height: "30px" }} src="https://banner2.cleanpng.com/20180427/dxq/kisspng-2018-papua-new-guinea-earthquake-computer-icons-pa-earthquake-logo-5ae2ee4497b9e9.5998974415248215726215.jpg" alt="" />
                </div>
                <div className="col col-md-11 mt-1">Động Đất 1</div>
              </div>

            </div>
            <div className="col col-md-4" style={{ backgroundColor: "#FFFF66" }}>
              <div className="row">
                <div className="col col-md-1">
                  <img style={{ width: "30px", height: "30px" }} src="https://banner2.cleanpng.com/20180427/dxq/kisspng-2018-papua-new-guinea-earthquake-computer-icons-pa-earthquake-logo-5ae2ee4497b9e9.5998974415248215726215.jpg" alt="" />
                </div>
                <div className="col col-md-11 mt-1">Động Đất 2</div>
              </div>

            </div>
          </div>
        </div>
      </div>





    </div>
  );
}

export default Map;