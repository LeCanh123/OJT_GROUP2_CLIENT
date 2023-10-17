import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./popup.css"
import L from 'leaflet';
import MapApi from "./apis/map"
import { useEffect, useState } from 'react';


//facebook
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FacebookAuth from './module/facebook/Facebook'; 
import Facebook from './module/facebook/Facebook'; 
import UserProfile from './module/facebook/UserProfile';
import FacebookLoginButton from './module/facebook/Facebook';


function App() {
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
let [data,setData]=useState([])
  useEffect(()=>{
    async function getAllMap() {
      let getAllMapResult=await MapApi.getAllMap();
      console.log("getAllMapResult",getAllMapResult);
      
      setData(getAllMapResult.data.data)
    console.log("getAllMapResult",getAllMapResult);
    }
    getAllMap()
    
  },[])


  //facebook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', picture: { data: { url: '' } } });

  const handleLogin = (response: any) => {
    setIsLoggedIn(true);
    setUserData(response);
  };


  return (
    <div>
      <div>Canh</div>
      {/* <MapContainer
        center={[21.0285, 105.8542]}
        zoom={13}
        style={{ height: '100vh', width: '1500px' }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {data?.map((center:any, index:any) => (
          <Circle key={index} center={[Number(center.locationx), Number(center.locationy)]} radius={center.size}>
            <Marker position={[Number(center.locationx), Number(center.locationy)]} icon={customIcon1}>
              <Popup>{center.name}</Popup>
            </Marker>
          </Circle>
        ))}

      </MapContainer> */}



      {/* facebook */}
 <div>
      {isLoggedIn ? (
        <UserProfile user={userData} />
      ) : (
        <FacebookLoginButton onLogin={handleLogin} />
      )}
    </div>
    <div>test1</div>
    </div>
  );
}

export default App;