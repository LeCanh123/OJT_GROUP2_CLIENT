import React, { useEffect, useState } from 'react'
import "../../../Css/Navbar.scss"
import { useNavigate } from 'react-router-dom';
import MapApi from "../../../apis/map"
import { StoreType } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { mapAction } from '../../../redux/MapSlice';


export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [notification, setnotification] = useState(false);


  //function lấy thông báo
  async function userGetNoication(){
    let userGetNoicationResult= await MapApi.UserGetNotification({token:localStorage.getItem("token")});
    console.log("userGetNoicationResult",userGetNoicationResult);
    if(userGetNoicationResult.status){
      dispatch(mapAction.setnotification({data:userGetNoicationResult.data,total:userGetNoicationResult.data?.length}));
    }else{
      //nếu lỗi
    }
  }


  //thay đổi thời gian nhận thông báo khi click vào thông báo
  async function HandleChangeTimeNotification() {
    await MapApi.UserChangeTimeNotification({token:localStorage.getItem("token")});
    // userGetNoication()
  }



  const MapStore = useSelector((store: StoreType) => {
    return store.MapSlice
});
console.log("MapStore",MapStore);


  //lấy thông báo user về
  useEffect(()=>{


    userGetNoication()

  },[])
  return (
    <>
      <div className='container' style={{ zIndex: "100" }}>
        <div className='row' style={{ backgroundColor: "#083a8c", color: "#fff" }}>
          <div className='col-6 col-md-10' style={{ height: "75px" }}>
            <div className='row'>
              <div className='col-md-7 mt-0'>
                <div className="row">
                  <div className="col col-md-2" style={{ textAlign: "right" }} >
                    <img src='http://vndms.dmc.gov.vn/app/images/front/sprite-header-sp.png'
                      style={{ width: "70px", height: "70px" }}
                    ></img>
                  </div>
                  <div className="col col-md-9 mt-2" style={{ textAlign: "left", position: "relative", left: "-20px", top: "3px" }}>
                    <h5 style={{ fontWeight: "bold" }}>HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM</h5>
                    <p style={{ fontWeight: "100", fontSize: "13px" }}>VIETNAM DISASTERS MONITORING SYSTERM</p>
                  </div>
                </div>


              </div>
              <div className='col-md-1 mt-3 text-center itemhover'
                onClick={() => {
                  navigate('/');
                }}
              >
                Home</div>
              <div className='col-md-1 mt-3 text-center itemhover'
                onClick={() => {
                  navigate('/about');
                }}
              >About</div>

              <div className='col-md-1 mt-3 text-center itemhover'
                onClick={() => {
                  navigate('/help');
                }}
              >Help</div>

            </div>


          </div>
          <div className='col-6 col-md-2'>
            <div className='row'>
              <div className='col-6 col-md-3 mt-3 itemhover'
                onClick={() => {
                  navigate('/login');
                }}
              >Login</div>
              <div className='col-6 col-md-3 mt-3 itemhover' style={{ height: "50px" }}>
                <i className="fa-regular fa-bell" onClick={() => {
                  setnotification(!notification);
                  HandleChangeTimeNotification();
                  if(MapStore.total==0){alert("Không có thông báo")}
                }}></i>

                <div style={{ position: "absolute" }}>
                  <div style={{ position: "absolute", top: "-35px", left: "10px" }}>{MapStore.total}</div>
                </div>
                {notification ?
                  <div style={{ width: "150px", backgroundColor: "#6699FF", zIndex: "10", position: "relative" }}>
                    {MapStore.notification.map((item:any)=>{
                      return <div style={{width:"150px",border:"1px solid red"}}>
                        Có thiên tai mới ở {item.place}
                      </div>
                    })}
                    {/* <div>thông báo 1</div>
                    <div>thông báo 2</div>
                    <div>thông báo 3</div> */}
                  </div>

                  :
                  <></>
                }

              </div>
              {/* <div className='col-6 col-md-3 mt-3' style={{position:"relative",left:"-120px",top:"-5px"}}>100</div> */}

            </div>
          </div>

        </div>
      </div>
    </>

  )
}
