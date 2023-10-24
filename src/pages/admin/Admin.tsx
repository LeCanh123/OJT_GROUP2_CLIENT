import React, { useEffect, useState } from 'react'
import "./../../Css/Admin.scss"
import AdminApi from "./../../apis/Admin"
//loading
import Loading from "./../../components/Loading/Loading"
//lấy vị trí
import geolib from 'geolib';
import axios from 'axios';

//thông báo
import { Button, message } from 'antd';
import { Link, Outlet } from 'react-router-dom';

export default function Admin() {

    let [isLoading, setIsLoading] = useState(false);
    //thông báo antd
    const [messageApi, contextHolder] = message.useMessage();

    //change component
    let [selectComponent, SetSelectComponent] = useState(1);

    let [ForeCastName, setForeCastName] = useState("");
    let [LocationX, setLocationX] = useState("");
    let [LocationY, setLocationY] = useState("");
    let [Size, setSize] = useState("");
    let [Country, setCountry] = useState("");
    //lấy vị trí
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${LocationX}&lon=${LocationY}`;

    async function handleAddForeCast() {
        //lấy toạ độ thành phố
        //10.6786996
        //106.6826963

        setIsLoading(true)
        await axios.get(apiUrl)
            .then(async response => {
                const { city, state, country } = response.data.address;
                console.log(`City: ${city}`);
                console.log(`State: ${state}`);
                console.log(`Country: ${country}`);
                setCountry(`${city},${country}`)


            })
            .catch(error => {
                console.error('Error:', error);
                messageApi.info('Thêm Forcecast thất bại');
            });


        let addForeCastResult = await AdminApi.AddForeCast({
            name: ForeCastName,
            locationx: LocationX,
            locationy: LocationY,
            size: Size,
            country: Country,
            CategoryId: selectedOption
        })

        messageApi.info('Thêm Forcecast thành công');
        setIsLoading(false)

    }

    //manage Category
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
        console.log("event", event.target.value);

    };

    let [ListGetCategory, setListGetCategory] = useState([]);
    let [CategoryName, setCategoryName] = useState("");
    async function handleAddCategory() {

        const fileimage: any = document.getElementById('image00');
        const image = fileimage.files[0];
        console.log("image");

        const formData: any = new FormData();
        formData.append('image', image);
        formData.append('type', CategoryName);

        let addCategoryResult = await AdminApi.addCategory(formData);
        console.log("addCategoryResult", addCategoryResult);

    }
    useEffect(() => {
        async function getListCategory() {
            let getCategoryResult = await AdminApi.getCategory();
            setListGetCategory(getCategoryResult.data.data);
        }
        getListCategory();
    }, [])

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
                                <span className="links_name">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/category">
                                <i className="bx bx-box" />
                                <span className="links_name">Category Forecast</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/forecast">
                                <i className="bx bx-list-ul" />
                                <span className="links_name">Manage Forecast</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user">
                                <i className="bx bx-user" />
                                <span className="links_name">Manage User</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/message">
                                <i className="bx bx-book-alt" />
                                <span className="links_name">Manage Message</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/report">
                                <i className="bx bx-book-alt" />
                                <span className="links_name">Report</span>
                            </Link>
                        </li>

                        <li className="log_out">
                            <Link to="#">
                                <i className="bx bx-log-out" />
                                <span className="links_name">Log out</span>
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

                        {/* <div className="search-box">
                            <input type="text" placeholder="Search..." />
                            <i className="bx bx-search" style={{ color: "#fff", backgroundColor: '#000' }} />
                        </div> */}
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
