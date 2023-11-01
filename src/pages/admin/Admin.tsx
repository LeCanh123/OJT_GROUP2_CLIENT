import { Modal } from "antd";
import "./../../Css/Admin.scss"
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminloginApi from "../../apis/Adminlogin";

export default function Admin() {
const navigate = useNavigate();

let [isAdmin,setIsAdmin]=useState(true)

    function handleAdminLogin(){
        Modal.confirm({
            title:"Bạn có muốn đăng xuất không",
            okText: 'Có',
            onOk: () => {
              localStorage.removeItem('token');
            //   window.location.href = '/';
              navigate("/")
            },
        })
    }


    //check admin
    async function checkAdmin(){
        let result= await AdminloginApi.adminCheckLogintoken({token:localStorage.getItem("token")});
        console.log("result",result);
        
        if(!result.status){
            localStorage.removeItem('token');
            navigate("/login_admin")
            return 
        }
        navigate("/admin/dashboard")


    }

    useEffect(()=>{
        checkAdmin()
    },[])

    return (
        <div className='container'>
 <div className="sidebar"></div>
                 <div className="row">
                    <div className="col-12 col-md-2 col-sm-12">
                    {/* <div className="sidebar"> */}
                    <div className="sidebar1">
                     <div className="logo-details">
                         <i className="bx bxl-c-plus-plus" />
                         <span className="logo_name">HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM</span>
                     </div>
                     <ul className="nav-links">
                         <li>
                             <Link to="/admin/dashboard" className="">
                                 <i className="bx bx-grid-alt" />
                                 <span className="links_name">Bản đồ</span>
                             </Link>
                         </li>
                         <li>
                             <Link to="/admin/category">
                                 <i className="bx bx-box" />
                                 <span className="links_name">Danh mục thiên tai</span>
                             </Link>
                         </li>
                         <li>
                             <Link to="/admin/forecast">
                                 <i className="bx bx-list-ul" />
                                 <span className="links_name">Quản lý thiên tai</span>
                             </Link>
                         </li>
                         <li>
                             <Link to="/admin/user">
                                 <i className="bx bx-user" />
                                 <span className="links_name">Quản lý người dùng</span>
                             </Link>
                         </li>
                         <li>
                             <Link to="/admin/message">
                                 <i className="bx bx-book-alt" />
                                 <span className="links_name">Quản lý thư góp ý</span>
                             </Link>
                         </li>
 
                         <li>
                             <Link to="/admin/report">
                                 <i className="bx bx-book-alt" />
                                 <span className="links_name">Biểu đồ</span>
                             </Link>
                         </li>
 
                         <li className="log_out">
                             <Link to="#">
                                 <i className="bx bx-log-out" />
                                 <span className="links_name" onClick={handleAdminLogin}>Đăng xuất</span>
                             </Link>
                         </li>
                     </ul>
                 </div>
                    </div>
   
 
 <div  className=" col-12 col-md-10 col-sm-12 " >
 <div className="home-section ">
                     <nav style={{zIndex:100}}>
                         <div className="sidebar-button">
                             {/* <i className="bx bx-menu sidebarBtn" /> */}
                             <span className="dashboard"></span>
                             <a href="/" className='admin-btn-home' style={{ textDecoration: 'none', color: "#000", fontSize: '15px' }}>
                                 <i className="fa-solid fa-house" onClick={()=>{navigate("/")}}></i>
                             </a>
                         </div>
                         <div className="profile-details">
                             <img src="https://cdn5.vectorstock.com/i/1000x1000/43/84/admin-support-black-glyph-icon-virtual-assistant-vector-39924384.jpg" alt="" />
                             <span className="admin_name">Admin {localStorage.getItem("userName")}</span>
                         </div>
                     </nav>
 <div style={{zIndex:0}}>
 <Outlet />

 </div>
                 </div>
 </div>
             
                </div>
            
           
        </div>
    )
}
