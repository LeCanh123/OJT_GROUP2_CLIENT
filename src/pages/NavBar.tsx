import React, { useState } from 'react'
import "./../Css/Navbar.scss"
import { useNavigate } from 'react-router-dom';
import MapApi from "./../apis/map"


export default function NavBar() {
  const navigate = useNavigate();
  let [notification,setnotification]=useState(false);

async function HandleChangeTimeNotification(){
  await  MapApi.UserChangeTimeNotification("")
}


  return (
<>
<div className='container' style={{zIndex:"100"}}>
<div className='row'>
    <div className='col-6 col-md-10 bg-success' style={{height:"75px"}}>
        <div className='row'>
        <div className='col-md-7 mt-0'>
          <div className="row">
            <div className="col col-md-2" style={{textAlign:"right"}} >
            <img src='http://vndms.dmc.gov.vn/app/images/front/sprite-header-sp.png' 
          style={{width:"70px",height:"70px"}}  
          ></img>
            </div>
            <div className="col col-md-9 mt-2" style={{textAlign:"left",position:"relative",left:"-20px",top:"3px"}}>
              <div>HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM</div>
              <div>VIETNAM DISASTERS MONITORING SYSTERM</div>
            </div>
          </div>


        </div>
        <div className='col-md-1 mt-3 text-center'
        onClick={()=>{
          navigate('/');
        }}
        >
          Home</div>
        <div className='col-md-1 mt-3 text-center'
              onClick={()=>{
                navigate('/admin');
              }}
        >Admin</div>

<div className='col-md-1 mt-3 text-center'
              onClick={()=>{
                navigate('/chart');
              }}
        >Chart</div>

        </div>
    

    </div>
    <div className='col-6 col-md-2 bg-success'>
    <div className='row'>
        <div className='col-6 col-md-3 mt-3' 
              onClick={()=>{
                navigate('/login');
              }}
        >Login</div>
        <div className='col-6 col-md-3 mt-3' style={{height:"50px"}}>
          <i className="fa-regular fa-bell" onClick={()=>{setnotification(!notification);
          HandleChangeTimeNotification()
          }}></i>
          
          <div style={{position:"absolute"}}>
            <div style={{position:"absolute",top:"-35px",left:"10px"}}>100</div>
          </div>
          {notification?
          <div style={{width:"100px",backgroundColor:"red",zIndex:"10",position:"relative"}}>
          <div style={{width:"100px"}}>Cảnh</div>
          <div>thông báo 1</div>
          <div>thông báo 2</div>
          <div>thông báo 3</div>
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
