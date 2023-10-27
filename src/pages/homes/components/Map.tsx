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

  const customIcon1 = (icon: any) => {
    return L.icon({
      iconUrl: icon,
      iconSize: [20, 20],
      iconAnchor: [10, 20]
    });

  }

  //danh sách để lọc theo category
  let [ChooseCategoryList, setChooseCategoryList] = useState("null");

  let [data, setData] = useState([]) //dữ liệu render ra
  console.log("data", data);

  useEffect(() => {
    async function getAllEarthquake() {
      let getAllMapResult: any = await MapApi.getAllMap();
      if (getAllMapResult.status) {
        setData(getAllMapResult.data)
        // alert(getAllMapResult.message)
      }
      else {
        // alert(getAllMapResult.message)
      }
    }


    async function getEarthquakeByCategoryById() {
      let getCategoryById = await MapApi.getCategoryById({ categoryId: ChooseCategoryList });
      if (getCategoryById.status) {
        setData(getCategoryById.data)
      } else {
        // alert(getCategoryById.message)
      }


    }
    if (ChooseCategoryList == "null") {
      getAllEarthquake();
    } else {
      getEarthquakeByCategoryById();
    }


  }, [ChooseCategoryList])

  //get category chỉ lấy danh sách category
  let [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    async function getAllCategory() {
      let getAllCategory = await MapApi.getAllCategory();

      if (getAllCategory.status) {
        setListCategory(getAllCategory.data)
      } else {
        // alert(getAllCategory.message)
      }
    }
    getAllCategory()
  }, []);

  //chọn category để lấy earchquake
  function handleChooseCategoryList(e: any) {
    setChooseCategoryList(e);
  }

  //lấy thông báo user
  useEffect(() => {
    async function UserGetNotification() {
      let UserGetNotificationResult = await MapApi.UserGetNotification({
        token: localStorage.getItem("token")
      })

    };
    UserGetNotification()
  }, [])

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
    <div className='container' >
      <div className="row map">
        <div className="col col-md-10">
          <div style={{ width: "100%", textAlign: "left", position: "relative", left: "-11px" }}>
            <MapContainer
              center={[16.0583, 106.2772]}
              zoom={5}
              style={{ height: '600px', width: '1200px', margin: "auto", zIndex: "1" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {data?.map((center: any, index: any) => (
                <Circle key={index} center={[Number(center.lat), Number(center.lng)]} radius={center.size} pathOptions={{ fillColor: getColorForMagnitude(Number(center.level)) }}>
                  <Marker position={[Number(center.lat), Number(center.lng)]} icon={customIcon1(center?.categorys?.icon)}>
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
        <div className="col col-md-2" style={{ backgroundColor: "#f5f5f5", overflow: "scroll" }}>
          <div className='ms-3 mt-2'>
            <select className="form-select" aria-label="Default select example" onChange={(e: any) => { handleChooseCategoryList(e.target.value) }}>
              <option selected value={"null"}>Tất cả loại thiên tai</option>
              {listCategory.map((item: any, index) => (
                <option key={index} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="col notice">
          <div className='title'>
            <p>Bảng ghi chú</p>
          </div>
          <div className='notice-item'>
            {listCategory.map((item: any, index) => (
              <div className=' ms-5 item'>
                <img className='item-image' src={item.icon} />
                <div className='ms-3' style={{ width: "33.33%", flexGrow: "1", flexShrink: "0", display: "inline" }}>
                  {item.title}
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}

export default Map;