import React, { useEffect, useState } from 'react';
import { Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserType } from '../../../interface/User';
import adminApi from "../../../apis/Admin"




export default function User() {
  const [searchData,setSearchData]=useState<UserType[]>([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [itemsPerPage,setItemsPerPage]=useState(5);
  const[totalPage,setTotalPages]=useState(0);
  const [totalSearchPages,setTotalSearchPages]=useState(0);
  const[currentData,setCurrentData]=useState([])


  function Demo(){
  return currentData?.map((item:any,index)=>{
if(item.facebookid){return {...item,facebookid:"Facebook"}}
return {...item,facebookid:"Google"}
    
  })

  }
  const columns: ColumnsType<UserType> = [
    { title: 'Tên người dùng', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    // { title: 'Kiểu đăng nhập', dataIndex: 'googleid ?(googleid):(facebookid)', key: 'googleid ?(googleid):(facebookid)' },
    {    title: 'Kiểu đăng nhập',
    dataIndex: "googleid" ? `${"facebookid"}` : `${"facebook"}`,
    key: "googleid" ? "googleid" : "facebookid"}]
          
 
  // async function getUser() {
  //   const users = await adminApi.getAllUser();
  //   console.log("users", users);
  // }

  // useEffect(() => {
  //   getUser();
  // }, []);
  const [checkStrictly, setCheckStrictly] = useState(false);
  


  useEffect(()=>{
    const userData= async (page:number,limit:number)=>{
      console.log("davao");
      try {
        let res= await adminApi.paginationUsers(page,limit)
        console.log("res",res);
        setCurrentData(res.data.data)
        setTotalPages(res.data.totalPage)
        setCurrentPage(page)
      } catch (error) {
        console.log("err",error);
        
      }
    }
    userData(currentPage,itemsPerPage)
  },[currentPage,itemsPerPage])

  let timeOut: string | number | NodeJS.Timeout | undefined;
    function searchKeyWords(serchValue: string) {
        clearTimeout(timeOut);
        timeOut = setTimeout(async () => {
            await adminApi.searchUsers(serchValue)
                .then((res) => {
                    if (res.status === 200) {
                        const updatedTotalPages = Math.ceil(res.data.data.length / itemsPerPage)
                        setSearchData(res.data.data.length !== 0 ? res.data.data : null)
                        setTotalSearchPages(updatedTotalPages)
                    }
                })
        })
    }
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
 

  return (
    <div className="component">
      <h4
        style={{
          marginLeft: "33%",
          paddingTop: "40px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        DANH SÁCH NGƯỜI DÙNG
      </h4>
      <div className="row" style={{ marginBottom: "40px", marginTop: "40px" }}>
        <div className="col-md-5 mx-auto">
          <div className="input-group">
            <input
              className="form-control border-end-0 border rounded-pill"
              type="search"
              placeholder="Tìm kiếm theo tên"
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
        dataSource={(searchData?.length > 0 || searchData === null) ? searchData : Demo()}



        
        pagination={{
            current: currentPage,
            pageSize: itemsPerPage,
            total: ((searchData?.length > 0 || searchData === null) ? totalSearchPages : totalPage) * itemsPerPage,
            onChange: handlePageChange,
        }}

        style={{ width: "100% !important" }}
    />
    </div>
  );
}
