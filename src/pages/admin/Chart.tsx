import React from 'react'
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

//pdf
import jsPDF from 'jspdf';
import ReactDOMServer from 'react-dom/server';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import html2canvas from 'html2canvas';

export default function Chart() {
    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
      ];

//pdf 
function generatePDF() {
    const input:any = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save("download.pdf");
      });
  }

  //
  

  return (

    <div className='container' >
      <div id="divToPrint">
      <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data}  barWidth={0.8}  />
    </XYPlot>
      </div>


    <h1>Export PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
   


    </div>


  )
}



