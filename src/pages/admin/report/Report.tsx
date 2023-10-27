
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import html2PDF from 'jspdf-html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import AdminApi from '../../../apis/Admin';
import "./Report.scss"
import MapApi from "../../../apis/map"
import { Table, message } from 'antd';

//component time
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";




export default function Report() {
  const [data,setData] = useState([
    // {
    // name: 'Page A',
    // uv: 4000,
    // pv: 2400,
    // amt: 2400000,
    // },
    // {
    // name: 'Page B',
    // uv: 3000,
    // pv: 1398,
    // amt: 2210,
    // },
    // {
    // name: 'Page C',
    // uv: 2000,
    // pv: 9800,
    // amt: 2290,
    // },
  
    ])

  // pdf
    const handleButtonClick = async () => {
      console.log("click");
      await printPdf();
    };
    const printPdf = async () => {
      const page:any = document.getElementById('chart');
      htmlToImage.toPng(page)
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          const pdf = new jsPDF();
          pdf.addImage(img, 'png', 30, 20, 220 ,120);
          pdf.save("download.pdf");
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
  
  

  
      }

      function convertName1ToName(data:any) {
        return data.map((item:any) => {
          return { ...item, name: item.name1 };
        });
      }

    
    // useEffect(()=>{
    //   console.log("!");
    //   getChart()
    // },[])

  //biến chọn ngày
  const [startDate, setStartDate]:any = useState("null");
  const [endDate, setEndDate]:any = useState("null");
  const handleDateStartChange = (date:any) => {
    console.log("Thời gian bắt đầu",date);
    setStartDate(new Date(date._d))
  };
  const handleDateEndChange = (date:any) => {
    setEndDate(new Date(date._d))
    
  };

  //chọn kiểu tổng kết theo ngày ,tháng
  const [selectedOption, setSelectedOption] = useState('null');

  const handleOptionChange = (event:any) => {
    setSelectedOption(event.target.value);
  };

  //lấy list category
  let [ChooseCategoryList, setChooseCategoryList] = useState("null");
  let [ChooseCategoryName,setChooseCategoryName]= useState("null");
  let [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    async function getAllCategory() {
      let getAllCategory = await MapApi.getAllCategory();
      console.log("getAllCategory", getAllCategory);
      if (getAllCategory.status) {
        setListCategory(getAllCategory.data)
      } else {
        // alert(getAllCategory.message)
      }

    }
    getAllCategory()
  }, []);

  function handleChooseCategoryList(e: any) {
    setChooseCategoryList(e.target.value);
    console.log("e.target",e.target);
    const selectedOption:any = Array.from(e.target.options).find((option:any) => option.value == e.target.value);
    const selectedTitle = selectedOption?.text;
    console.log("selectedTitle",selectedTitle);
    setChooseCategoryName(selectedTitle);
    
  }


  //get chart
  async function getChart(){
    console.log("vào getChart");

    let dataChart={
      timestart:startDate,
      timeend:endDate,
      typechart:selectedOption,
      categoryid:ChooseCategoryList
    };
    if(startDate=="null"){
      message.error("Chưa nhập thời gian bắt đầu");
      return
    }
    if(endDate=="null"){
      message.error("Chưa nhập thời gian kết thúc");
      return
    }
    if(selectedOption=="null"){
      message.error("Chưa chọn loại chart");
      return
    }
    console.log(dataChart);
    
    
    let chartResult=await AdminApi.AdminGetChart({...dataChart})
    console.log("chartResult",chartResult);
    if(chartResult.status){
      setData(convertName1ToName(chartResult.data))
      if(chartResult.data.length==0){
        message.error("Dữ liệu trống");
      }
    }
  };

  return (
    <div className='component' style={{ paddingTop: "10em" }}>
      <div id='chart'>
      <LineChart 
      width={1000}
      height={600}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        // dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    <div style={{position:'relative',top:"-595px",left:"80px"}}>Số Lượng thiên tai</div>
    <div  style={{position:'relative',top:"-95px",left:"1010px"}}>Thời gian</div>
      <div style={{position:"relative",left:"400px",top:"-50px",fontSize:"20px",fontWeight:"bold"}}>
        {`Biểu đồ thiên tai - ${(ChooseCategoryName=="null"||ChooseCategoryName=="Chọn loại thiên tai")?"Tất Cả":ChooseCategoryName}`}</div>
      </div>
      <div style={{marginLeft:"90px"}}>
        <div style={{display:"block"}}>Chọn thời gian bắt đầu</div>
        <div style={{width:"300px",height:"100px"}}>
          <div style={{marginBottom:"0"}}>
          <Datetime onChange={handleDateStartChange} />
          </div>
        </div>
        <div style={{display:"block",position:"relative",top:"-50px"}}>Chọn thời gian kết thúc</div>
        <div style={{width:"300px",height:"100px",position:"relative",top:"-50px"}}>
        <Datetime onChange={handleDateEndChange}/>
        </div>

        <select value={selectedOption} onChange={handleOptionChange} style={{display:"block",width:"300px",height:"40px",
        position:"relative",top:"-90px"}}>
        <option value="">-- Chọn loại biểu đồ --</option>
        <option value="day">Theo ngày</option>
        <option value="month">Theo tháng</option>
      </select>

      <select className="form-select" aria-label="Default select example" 
      onChange={(e: any) => { handleChooseCategoryList(e) }}
      style={{display:"block",width:"300px",height:"40px",
      position:"relative",top:"-60px"}}
      >
              <option selected value={"null"}>Chọn loại thiên tai</option>
              <option key={"index"} value="null">Tất cả thiên tai</option>
              {listCategory.map((item: any, index) => (
                <option key={index} value={item.id}>{item.title}</option>
              ))}
      </select>
      <button onClick={()=>{getChart()}} style={{position:"relative",top:"-30px",width:"140px"}}>Xác Nhận</button>
      </div>
      <button style={{marginLeft:"90px",position:"relative",top:"-10px"}} className="btn btn-primary" onClick={handleButtonClick}>Generate PDF</button>

    </div>
  );
}