import{ useEffect, useState } from 'react';
import { Table} from 'antd';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import adminApi from "../../../apis/Admin"
import { MessageType } from '../../../interface/Message';

export default function Message() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSearchPages, setTotalSearchPages] = useState(0);
  const [data, setData] = useState<MessageType[]>([]);
  const [searchData,setSearchData]=useState<MessageType[] | null>([])
  const [currentData, setCurrentData] = useState([])
  let [change,setChange]=useState(1)
  async function handleDelete(id: number) { 
    try {
        if (window.confirm('Bạn có muốn xóa không?')) {
            await adminApi.delete(id);
            setChange(Math.random()*9999)
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        }   
    } catch (error) {
      console.log('Error', error);
    }
  }
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchData = async (page: number, limit: number) => {
      try {
        const response = await adminApi.getMessage(page, limit);
        setData(response.data);
        setTotalPages(response.totalPage);
        setCurrentData(response.data)
        setCurrentPage(page)
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData(currentPage, itemsPerPage); 
  }, [currentPage, itemsPerPage,change]); 
  console.log(totalPages*itemsPerPage);
  

  let timeOut: string | number | NodeJS.Timeout | undefined;
    function searchKeyWords(searchValue: string) {
        clearTimeout(timeOut);
        timeOut=setTimeout(async()=>{
            await adminApi.search(searchValue)
           .then((res)=>{
            if (res.status===200) {
                const updatedTotalPages = Math.ceil(res.data.data.length/ itemsPerPage )
                setSearchData(res.data.data.length !==0 ? res.data.data : null)
                setTotalSearchPages(updatedTotalPages)
            }
           })
           .catch((err:any)=>{
            console.log("err",err);
           })
        },250)
    }
    const columns: ColumnsType<MessageType[]> = [
        { 
          title: 'Date', 
          dataIndex: 'create_at', 
          key: 'create_at',
          render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        { 
            title: 'Name', 
            dataIndex: 'title', 
            key: 'title',
          },
        { 
          title: 'File', 
          dataIndex: 'file', 
          key: 'file', 
          render: (file) => <img src={file} alt={file} style={{width:"50px"}} />,
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (record) => (
            <a onClick={() => handleDelete(record.id)}>Delete</a>
          ),
        },
      ];

  return (
    <div  className='component'>
         <div className="row" style={{ marginBottom: "20px",marginTop:"70px" }}>
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <input
                            className="form-control border-end-0 border rounded-pill"
                            type="search"
                            placeholder='Tìm kiếm theo tên'
                            id="example-search-input"
                            onChange={(event) => {
                                const searchValue = event.target.value;
                                if (searchValue.trim() !== "") {
                                    searchKeyWords(searchValue);
                                } else {
                                    setSearchData([]);
                                }
                            }}
                        />
                        <span className="input-group-append">
                            <button
                                className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                                type="button"
                            >
                                <i className="fa fa-search" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
 <Table
  columns={columns}
  expandable={{
    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.message}</p>,
    rowExpandable: (record) => record.title !== 'Not Expandable',
  }}
  dataSource={(searchData?.length > 0 || searchData === null) ? searchData : currentData}
  pagination={{
    current: currentPage,
    pageSize: itemsPerPage,
    total: ((searchData?.length > 0 || searchData === null) ? totalSearchPages : totalPages)* itemsPerPage,
    onChange: handlePageChange,
  }}
/>
     
    </div>
  )
}



