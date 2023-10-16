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

    //manage forecast //thêm dự báo


    useEffect(() => {



    }, [])

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

        let addCategoryResult = await AdminApi.AddCategory(formData);
        console.log("addCategoryResult", addCategoryResult);

    }
    useEffect(() => {
        async function getListCategory() {
            let getCategoryResult = await AdminApi.GetCategory("");
            console.log("getCategoryResult", getCategoryResult);
            setListGetCategory(getCategoryResult.data.data);
        }
        getListCategory();
    }, [])

    async function handleDeleteCategory() {
        let deleteCategoryResult = await AdminApi.DeleteCategory(selectedOption);
        async function getListCategory() {
            let getCategoryResult = await AdminApi.GetCategory("");
            console.log("getCategoryResult", getCategoryResult);
            setListGetCategory(getCategoryResult.data.data);
        }
        getListCategory();
    }



    return (
        <div className='container'>
            {/* <div className='row'>
                <div className='col-md-2 mt-3' style={{ backgroundColor: "#6699FF" }}>
                    <div className='mt-3' style={{ backgroundColor: "#99CCFF" }} onClick={() => { SetSelectComponent(1) }}>Category Manage</div>
                    <div className='mt-3' style={{ backgroundColor: "#99CCFF" }} onClick={() => { SetSelectComponent(2) }}>Add Forecast</div>
                </div>



                <div className='col-md-10 bg-info mt-3'>

           
                    {selectComponent == 1 ?
                        <>
                            <div>Add Category</div>
                            <input placeholder='Nhập Category' onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}></input>
                            <div>Image</div>
                            <input
                                type="file"
                                id="image00"
                                style={{ width: "200px", height: "30px" }}
                            ></input>
                            <button className='ms-2' style={{ width: "200px" }} onClick={() => {
                                handleAddCategory()
                            }}>Add Category</button>


                            <div className='mt-4'>Delete Category</div>

                            <select value={selectedOption} onChange={(e) => handleSelectChange(e)} style={{ width: "200px", height: "30px" }}>
                                <option key={""} value={""}>Chọn Danh Mục</option>
                                {ListGetCategory.map((option: any) => (
                                    <option key={option.id} value={option.id}>{option.type}</option>
                                ))}
                            </select>


                            <button className='ms-2' style={{ width: "200px" }} onClick={() => {
                                handleDeleteCategory();
                            }}>Delete Category</button>

                        </>
                        :

                        <>
                     
                            <div>Add ForeCast</div>

                            <div>Name</div>
                            <input placeholder='Nhập ForeCast' onChange={(e) => {
                                setForeCastName(e.target.value);
                            }}></input>
                            <div>Location X</div>
                            <input placeholder='Nhập Toạ độ x' onChange={(e) => {
                                setLocationX(e.target.value);
                            }}></input>
                            <div>Location Y</div>
                            <input placeholder='Nhập Toạ độ y' onChange={(e) => {
                                setLocationY(e.target.value);
                            }}></input>
                            <div>Size</div>
                            <input placeholder='Nhập phạm vi (mét)' onChange={(e) => {
                                setSize(e.target.value);
                            }}></input>
                            <div>Category</div>
                            <select value={selectedOption} onChange={(e) => handleSelectChange(e)} style={{ width: "200px", height: "30px" }}>
                                <option key={""} value={""}>Chọn Danh Mục</option>
                                {ListGetCategory.map((option: any) => (
                                    <option key={option.id} value={option.id}>{option.type}</option>
                                ))}
                            </select>

                            <button className='ms-2' style={{ width: "200px" }} onClick={() => {
                                handleAddForeCast();
                            }}>Add ForeCast</button>

                            <div className='mt-4'>Delete ForeCast</div>
                            <select style={{ width: "200px", height: "30px" }}>
                                <option value="1">Chọn Mục</option>
                            </select>
                            <button className='ms-2' style={{ width: "200px" }}>Delete ForeCast</button>

                        </>

                    }


                </div>
            </div> */}

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
                            <Link to="/admin/report">
                                <i className="bx bx-book-alt" />
                                <span className="links_name">Report</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="#">
                                <i className="bx bx-message" />
                                <span className="links_name">Messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="bx bx-pie-chart-alt-2" />
                                <span className="links_name">Analytics</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="bx bx-coin-stack" />
                                <span className="links_name">Stock</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="bx bx-heart" />
                                <span className="links_name">Favrorites</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="bx bx-cog" />
                                <span className="links_name">Setting</span>
                            </Link>
                        </li> */}
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

                        <div className="search-box">
                            <input type="text" placeholder="Search..." />
                            <i className="bx bx-search" style={{ color: "#fff", backgroundColor: '#000' }} />
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
