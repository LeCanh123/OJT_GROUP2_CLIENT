import React, { useEffect, useState } from 'react'
import "./../../Css/Admin.scss"
import AdminApi from "./../../apis/Admin"


//lấy vị trí
import geolib from 'geolib';
import axios from 'axios';



export default function Admin() {
    
    //change component
    let [selectComponent,SetSelectComponent]=useState(1);



    //manage forecast //thêm dự báo


useEffect(()=>{



},[])

    let [ForeCastName,setForeCastName]=useState("");
    let [LocationX,setLocationX]=useState("");
    let [LocationY,setLocationY]=useState("");
    let [Size,setSize]=useState("");
    let [Country,setCountry]=useState("");
    //lấy vị trí
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${LocationX}&lon=${LocationY}`;

    async function handleAddForeCast(){
        //lấy toạ độ thành phố
        //10.6786996
        //106.6826963
        await   axios.get(apiUrl)
        .then(async response => {
        const { city, state, country } = response.data.address;
        console.log(`City: ${city}`);
        console.log(`State: ${state}`);
        console.log(`Country: ${country}`);
        setCountry(`${city},${country}`)

        })
        .catch(error => {
        console.error('Error:', error);
        });


        let addForeCastResult=await AdminApi.AddForeCast({
            name:ForeCastName,
            locationx:LocationX,
            locationy:LocationY,
            size:Size,
            country:Country ,
            CategoryId:selectedOption
        })


        

    }






    //manage Category
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event:any) => {
        setSelectedOption(event.target.value);
        console.log("event",event.target.value);
        
      };

    let [ListGetCategory,setListGetCategory]=useState([]);
    let [CategoryName,setCategoryName]=useState("");
    async function handleAddCategory(){
        
        const fileimage:any = document.getElementById('image00');
        const image = fileimage.files[0];
        console.log("image");
        
        const formData:any = new FormData();
        formData.append('image', image);
        formData.append('type', CategoryName);

        let addCategoryResult=await AdminApi.AddCategory(formData);
        console.log("addCategoryResult",addCategoryResult);
        
    }
    useEffect(()=>{
        async function getListCategory(){
            let getCategoryResult=await AdminApi.GetCategory("");
            console.log("getCategoryResult",getCategoryResult);
            setListGetCategory(getCategoryResult.data.data);
        }
        getListCategory();
    },[])

    async function handleDeleteCategory(){
        let deleteCategoryResult=await AdminApi.DeleteCategory(selectedOption);
        async function getListCategory(){
            let getCategoryResult=await AdminApi.GetCategory("");
            console.log("getCategoryResult",getCategoryResult);
            setListGetCategory(getCategoryResult.data.data);
        }
        getListCategory();
    }



  return (
    <div className='container'>
        <div className='row'>
        <div className='col-md-2 mt-3' style={{backgroundColor:"#6699FF"}}>
            <div className='mt-3' style={{backgroundColor:"#99CCFF"}} onClick={()=>{SetSelectComponent(1)}}>Category Manage</div>
            <div className='mt-3' style={{backgroundColor:"#99CCFF"}} onClick={()=>{SetSelectComponent(2)}}>Add Forecast</div>
        </div>



        <div className='col-md-10 bg-info mt-3'>
            
        {/*Category  */}
        {selectComponent==1?
        <>
                <div>Add Category</div>
                <input placeholder='Nhập Category' onChange={(e)=>{
                    setCategoryName(e.target.value);
                }}></input>
                <div>Image</div>
                <input    
                type="file"
                id="image00"
                style={{width:"200px",height:"30px"}}
                ></input>
                <button className='ms-2' style={{width:"200px"}} onClick={()=>{
                    handleAddCategory()
                }}>Add Category</button>
        

                <div className='mt-4'>Delete Category</div>

                <select value={selectedOption} onChange={(e)=>handleSelectChange(e)} style={{width:"200px",height:"30px"}}>
                <option key={""} value={""}>Chọn Danh Mục</option>
                    {ListGetCategory.map((option:any) => (
                    <option key={option.id} value={option.id}>{option.type}</option>
                    ))}
                </select>


                <button className='ms-2' style={{width:"200px"}} onClick={()=>{
                    handleDeleteCategory();
                }}>Delete Category</button>

        </>
        :

        <>
            {/*ForeCast  */}
            <div>Add ForeCast</div>

            <div>Name</div>
            <input placeholder='Nhập ForeCast' onChange={(e)=>{
                    setForeCastName(e.target.value);
                }}></input>
            <div>Location X</div>
            <input placeholder='Nhập Toạ độ x' onChange={(e)=>{
                    setLocationX(e.target.value);
                }}></input>
            <div>Location Y</div>
            <input placeholder='Nhập Toạ độ y' onChange={(e)=>{
                    setLocationY(e.target.value);
                }}></input>
            <div>Size</div>
            <input placeholder='Nhập phạm vi (mét)' onChange={(e)=>{
                    setSize(e.target.value);
                }}></input>
            <div>Category</div>
            <select value={selectedOption} onChange={(e)=>handleSelectChange(e)} style={{width:"200px",height:"30px"}}>
                <option key={""} value={""}>Chọn Danh Mục</option>
                    {ListGetCategory.map((option:any) => (
                    <option key={option.id} value={option.id}>{option.type}</option>
                    ))}
            </select>

            <button className='ms-2' style={{width:"200px"}} onClick={()=>{
            handleAddForeCast();
            }}>Add ForeCast</button>

            <div className='mt-4'>Delete ForeCast</div>
            <select style={{width:"200px",height:"30px"}}>
            <option value="1">Chọn Mục</option>
            </select>
            <button className='ms-2' style={{width:"200px"}}>Delete ForeCast</button>

        </>
    
        }


        </div>
        </div>

    </div>
  )
}
