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
  const customIcon1 =(icon:any)=>{
return   L.icon({
  iconUrl: icon,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

  } 

  //get data 
  //danh sách để lọc theo category
  let [ChooseCategoryList,setChooseCategoryList]=useState("null");

  let [data, setData] = useState([]) //dữ liệu render ra
  console.log("data",data);
  
  useEffect(() => {
    async function getAllEarthquake() {
    let getAllMapResult:any = await MapApi.getAllMap();
    console.log("getAllMapResult", getAllMapResult);
    if(getAllMapResult.status){
      setData(getAllMapResult.data)
      alert(getAllMapResult.message)
    }
    else{
      alert(getAllMapResult.message)
    }
    console.log("getAllMapResult.data",getAllMapResult);
    }
   

    async function getEarthquakeByCategoryById() {
      let getCategoryById = await MapApi.getCategoryById({categoryId:ChooseCategoryList});
      if(getCategoryById.status){
        setData(getCategoryById.data)
      }else{
        alert(getCategoryById.message)
      }

      
    }
    if(ChooseCategoryList=="null"){
      getAllEarthquake();
    }else{
      getEarthquakeByCategoryById();
    }


  }, [ChooseCategoryList])
  
  //get category chỉ lấy danh sách category
  let [listCategory,setListCategory]=useState([]);
  useEffect(()=>{
    async function getAllCategory() {
      let getAllCategory = await MapApi.getAllCategory();
      console.log("getAllCategory",getAllCategory);
      if(getAllCategory.status){
        setListCategory(getAllCategory.data)
      }else{
        alert(getAllCategory.message)
      }

    }
    getAllCategory()
  },[]);

  //chọn category để lấy earchquake
  function handleChooseCategoryList(e:any){
    setChooseCategoryList(e);
  }

  //lấy thông báo user
  useEffect(()=>{
    async function UserGetNotification(){
    let UserGetNotificationResult = await MapApi.UserGetNotification({
      token:localStorage.getItem("token")
    })

    };
    UserGetNotification()
  },[])


  return (
    <div className='container' >
      <div>Warning !!!</div>

      <div className="row map">
        <div className="col col-md-9">
          <div style={{ width: "100%", textAlign: "left", position: "relative", left: "-11px" }}>
            <MapContainer
              center={[14.0583, 108.2772]}
              zoom={5}
              style={{ height: '600px', width: '1000px', margin: "auto", zIndex: "1" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {data?.map((center: any, index: any) => (
                <Circle key={index} center={[Number(center.lat), Number(center.lng)]} radius={center.size}>
                  <Marker position={[Number(center.lat), Number(center.lng)]} icon={customIcon1(center?.categorys?.icon)}>
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

            <select className="form-select" aria-label="Default select example" onChange={(e:any)=>{handleChooseCategoryList(e.target.value)}}>
              <option selected value={"null"}>Danh sách loại thiên tai</option>
              {listCategory.map((item:any, index) => (
              <option key={index} value={item.id}>{item.title}</option>
              ))}
            </select>

          </div>

        </div>

      </div>

      <div className='row'>
        <div className="col" style={{ backgroundColor: "#99CCFF" }}>
          <div>Bảng ghi chú</div>
          <div style={{display:"flex",flexWrap:"wrap",}}>
          {listCategory.map((item:any, index) => (
                    <div className='mt-3 ms-5' style={{backgroundColor:"#FFFFCC",width:"30%"}}>
                    <img src={item.icon}   alt="" style={{width:"40px",height:"40px",display:"inline"}} />
                    <div className='ms-3' style={{width: "33.33%", flexGrow: "1", flexShrink: "0",display:"inline"}}>
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