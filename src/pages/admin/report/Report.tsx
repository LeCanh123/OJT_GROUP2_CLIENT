
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import html2PDF from 'jspdf-html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import AdminApi from '../../../apis/Admin';






export default function Report() {
  const [data,setData] = useState([
    {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400000,
    },
    {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
    },
    {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
    },
  
    ])

  // pdf
    const handleButtonClick = async () => {
      console.log("click");
      await printPdf();
    };
    const printPdf = async () => {
      const page = document.getElementById('chart');
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
      //get chart
      async function getChart(){
        let chartResult=await AdminApi.AdminGetChart({type:"day"})
        console.log("chartResult",chartResult);
        if(chartResult.status){
          setData(convertName1ToName(chartResult.data))
        }
      };
    
    useEffect(()=>{
      console.log("!");
      getChart()
    },[])
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
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
      <div>ABC</div>
      </div>
      <button className="btn btn-primary" onClick={handleButtonClick}>Generate PDF</button>
    </div>
  );
}