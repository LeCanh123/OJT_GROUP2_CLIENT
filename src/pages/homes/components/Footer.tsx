import "../../../Css/Footer.scss"

export default function Footer() {
  return (
    <div className='container mt-5' style={{ backgroundColor: "#083a8c" }}>
      <div className='container'>
        <footer className="text-center text-white mt-5" style={{ backgroundColor: "#083a8c" }}>

          <div className="container p-4">
            <div>
              <img src="http://vndms.dmc.gov.vn/app/images/front/sprite-header-sp.png" alt="" />
            </div>
            <div>
              <h5>HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM</h5>
              <p>Hệ thống cảnh báo thiên tai Việt Nam là một cơ quan quốc gia chuyên nghiên cứu, theo dõi, và cảnh báo về các sự kiện thiên tai như bão, lũ lụt, động đất, và sạt lở ở Việt Nam. Cung cấp thông tin và cảnh báo kịp thời để giảm thiểu thiệt hại do thiên tai gây ra.</p>
            </div>
            <div className="link-items">
              <a className="link-item" href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a>
              <a className="link-item" href="/about" style={{ padding: "5em", color: '#fff', textDecoration: 'underline' }}>About</a>
              <a className="link-item" href="/help" style={{ color: '#fff', textDecoration: 'underline' }}>Help</a>
            </div>
          </div>

          <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            © 2020 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">HTGSVN.com</a>
          </div>

        </footer>
      </div>
    </div>

  )
}
