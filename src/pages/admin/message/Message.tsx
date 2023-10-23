import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import adminApi from "../../../apis/Admin"

interface DataType {
  date: string;
  id: number;
  create_at: string;
  file: string;
  message: string;
}

const columns: ColumnsType<DataType> = [
  { 
    title: 'Date', 
    dataIndex: 'create_at', 
    key: 'create_at',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
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


export default function Message() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState<DataType[]>([]);
  const [searchData,setSearchData]=useState([])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize || 10);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApi.getMessage(currentPage, itemsPerPage);
        const sortedData = response.data.sort((a: { create_at: string | number | Date; }, b: { create_at: string | number | Date; }) => {
          return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
        });
        setData(sortedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  async function handleDelete(id: number) {
    console.log("davao");
    console.log("data",data); 
    try {
      await adminApi.delete(id);
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.log('Error deleting message:', error);
    }
  }
  let timeOut: string | number | NodeJS.Timeout | undefined;
    function searchKeyWords(searchValue: string) {
        clearTimeout(timeOut);
        timeOut=setTimeout(async()=>{
            await adminApi.search(searchValue)
           .then((res)=>{
            if (res.status===200) {
                setSearchData(res.data.data)
            }
           })
           .catch((err:any)=>{
            console.log("err",err);
            
           })
        },250)
    }
    useEffect(()=>{
        console.log("data",searchData);
        
    },[searchData])

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
            {searchData.length>0?(
                      <Table
       
                      columns={columns}
                      expandable={{
                        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.message}</p>,
                        rowExpandable: (record) => record.file !== 'Not Expandable',
                      }}
                      dataSource={currentData}
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={searchData.length}
                      onChange={handlePageChange}
                    />
            ):(
                <Table
       
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.message}</p>,
                  rowExpandable: (record) => record.file !== 'Not Expandable',
                }}
                dataSource={currentData}
                current={currentPage}
                pageSize={itemsPerPage}
                total={data.length}
                onChange={handlePageChange}
              />
            )}

    </div>
  )
}



