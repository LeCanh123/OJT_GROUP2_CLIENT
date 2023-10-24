# map
npm install react-leaflet leaflet


# faceboook
https://www.passportjs.org/packages/passport-facebook/
npm install passport-facebook



# bỏ phụ thuộc gói
--force


# chart
npm i @types/react-vis --force


# export chart to pdf
npm install @react-pdf/renderer
npm install @react-pdf/renderer @react-pdf/pdfkit

npm install jspdf
npm install html2canvas
npm install --save html-to-image


# cài đặt coop loại bỏ chặn google
npm install -g gapi-script
import { gapi } from 'gapi-script';

useEffect(() => {
function start() {
gapi.client.init({
clientId : idCliente,
scope : ''
})
};
gapi.load('client:auth2',start);
});

//
