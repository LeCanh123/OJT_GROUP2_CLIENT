import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import html2PDF from "jspdf-html2canvas";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import AdminApi from "../../../apis/Admin";
import "./Report.scss";

//component time
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function Report() {
  const [data, setData] = useState([
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400000,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ]);

  // pdf
  const handleButtonClick = async () => {
    console.log("click");
    await printPdf();
  };
  const printPdf = async () => {
    const page: any = document.getElementById("chart");
    htmlToImage
      .toPng(page)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        const pdf = new jsPDF();
        pdf.addImage(img, "png", 30, 20, 220, 120);
        pdf.save("download.pdf");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  function convertName1ToName(data: any) {
    return data.map((item: any) => {
      return { ...item, name: item.name1 };
    });
  }
  //get chart
  async function getChart() {
    let chartResult = await AdminApi.AdminGetChart({ type: "day" });
    console.log("chartResult", chartResult);
    if (chartResult.status) {
      setData(convertName1ToName(chartResult.data));
    }
  }

  useEffect(() => {
    console.log("!");
    getChart();
  }, []);

  //biến chọn ngày
  const [startDate, setStartDate]: any = useState(new Date());
  const handleDateChange = (date: any) => {
    console.log("date", date);
  };

  //chọn kiểu tổng kết theo ngày ,tháng
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="component" style={{ paddingTop: "10em" }}>
      <div id="chart">
        <LineChart
          width={1000}
          height={600}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
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
      <div style={{ marginLeft: "90px" }}>
        <div style={{ display: "block" }}>Chọn thời gian bắt đầu</div>
        <div style={{ width: "300px", height: "100px" }}>
          <div style={{ marginBottom: "0"}}>
            <Datetime onChange={handleDateChange} />
          </div>
        </div>
        <div style={{ display: "block", position: "relative", top: "-50px" }}>
          Chọn thời gian kết thúc
        </div>
        <div
          style={{
            width: "300px",
            height: "100px",
            position: "relative",
            top: "-50px",
          }}
        >
          <Datetime />
        </div>

        <select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{
            display: "block",
            width: "300px",
            height: "40px",
            position: "relative",
            top: "-95px",
          }}
        >
          <option value="">-- Chọn một mục --</option>
          <option value="1">Mục 1</option>
          <option value="2">Mục 2</option>
          <option value="3">Mục 3</option>
        </select>
      </div>
      <button
        style={{ marginLeft: "90px", position: "relative", top: "-50px" }}
        className="btn btn-primary"
        onClick={handleButtonClick}
      >
        Generate PDF
      </button>
    </div>
  );
}
