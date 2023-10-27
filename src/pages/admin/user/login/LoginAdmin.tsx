import "./login.scss"
import { Modal } from "antd"
import adminApi from "../../../../apis/Admin"
import axios from "axios"

export default function LoginAdmin() {
   async function  handleLogin(e: React.FormEvent) {
        e.preventDefault()
        let data = {
          userName: (e.target as any).userName.value,
          password: (e.target as any).password.value
        }
        console.log("data",data);
        
        try {
          //const res = await adminApi.AdminLogin(data);
          const res= await axios.post("http://localhost:3000/api/v1/admin",{...data})
          console.log("data");
          console.log("res",res);
          
          if (res.data.status !== true) {
            Modal.confirm({
              content: "Đăng nhập thất bại",
              okText: "Hãy thử lại"
            });
          } else {
            Modal.confirm({
              title:"Đăng nhập thành công",
              okText: "Ok",
              onOk: () => {
                localStorage.setItem("userName", res.data.loginDto.userName);
                window.location.href = "/admin/dashboard";
              }
            });
          }
        } catch (err) {
          console.log("err", err);
          Modal.success({
            content: "Sập server",
            okText: "Hãy thử lại"
          });
        }
    
        }
  return (
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
            <div className="form-group">
              <label className="form-control-label form-login-admin">Tên Admin</label>
              <input type="text"   name='userName'className="form-control input_login_admin" />
            </div>
            <div className="form-group">
              <label className="form-control-label form-login-admin">Mật khẩu</label>
              <input    name='password'
                type="password"className="form-control input_login_admin" />
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
  )
}
