

//component time
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function Report() {


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



  const handleOptionChange = (event: any) => {
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

    </div>
  );
}
