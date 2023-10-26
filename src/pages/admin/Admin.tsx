import "./../../Css/Admin.scss"
import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
    return (
        <div className='container'>
            <div>
                <div className="sidebar">
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
                                <span className="links_name">Đăng xuất</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <section className="home-section">
                    <nav>
                        <div className="sidebar-button">
                            <i className="bx bx-menu sidebarBtn" />
                            <span className="dashboard"></span>
                            <a href="/" className='admin-btn-home' style={{ textDecoration: 'none', color: "#000", fontSize: '15px' }}>
                                <i className="fa-solid fa-house"></i>
                            </a>
                        </div>
                        <div className="profile-details">
                            <img src="https://cdn5.vectorstock.com/i/1000x1000/43/84/admin-support-black-glyph-icon-virtual-assistant-vector-39924384.jpg" alt="" />
                            <span className="admin_name">Admin ABC</span>
                        </div>
                    </nav>

                    <Outlet />
                </section>
            </div>
        </div>
    )
}
