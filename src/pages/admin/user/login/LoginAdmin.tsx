import "./login.scss"
import { Modal, message } from "antd"
import adminApi from "../../../../apis/Admin"
import axios from "axios"
import AdminloginApi from "../../../../apis/Adminlogin"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"



export default function LoginAdmin() {
  const navigate = useNavigate();
  async function  handleLogin(e: React.FormEvent) {
      e.preventDefault()
      let data = {
        userName: (e.target as any).userName.value,
        password: (e.target as any).password.value
      }
      console.log("data",data);
      
      try {
      let loginResult=await AdminloginApi.adminLogin({...data})
        if(loginResult.status){
          message.success(loginResult.message);
          localStorage.setItem("token",loginResult.token)
          navigate("/admin");
        }else{
          message.error(loginResult.message);
        }

      } catch (err) {
        message.error("Đăng nhâp thất bại 1");

      }
  
  }

  
  
  async function adminRegister() {
    let adminRegister1=await AdminloginApi.adminRegister();
  }
  useEffect(()=>{
    adminRegister()
  },[])
  return (
    <div className="admin_users">
    <div className="component"> 
    <div className="container">
  <div className="row">
    <div className="col-lg-3 col-md-2" />
    <div className="col-lg-6 col-md-8 login-box">
      <div className="col-lg-12 login-key">
        <i className="fa fa-key" aria-hidden="true" />
      </div>
      <div className="col-lg-12 login-title">ADMIN PANEL</div>
      <div className="col-lg-12 login-form">
        <div className="col-lg-12 login-form">
          <form onSubmit={(e) => {
            handleLogin(e)
          }}>
          <div>Đăng nhập với tên "admin" và mật khẩu "123456"</div>
            <div className="form-group1">
              <label className="form-control-label form-login-admin">Tên Admin</label>
              <input type="text"   name='userName'className="form-control input_login_admin1" />
            </div>
            <div className="form-group">
              <label className="form-control-label form-login-admin">Mật khẩu</label>
              <input    name='password'
                type="password"className="form-control input_login_admin1" />
            </div>
            <div className="col-lg-12 loginbttm">
              <div className="col-lg-6 login-btm login-text">
                {/* Error Message */}
              </div>
              <div className="col-lg-6 login-btm login-button">
                <button type="submit" className="btn btn-outline-primary">
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-3 col-md-2" />
    </div>
  </div>
</div>

    </div>
    </div>
  )
}
