import React, { useEffect, useState } from "react";
import { Space, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import AdminApi from "../../../apis/Adminlogin";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
}

export default function User() {
  async function getUser() {
    const users = await AdminApi.getAllUser();
    console.log("users", users);
  }

  useEffect(() => {
    getUser();
  }, []);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns: ColumnsType<DataType> = [
    { title: "Tên người dùng", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "age", key: "age" },
    { title: "Kiểu đăng nhập", dataIndex: "address", key: "address" },

    {
      title: "Chặn người dùng",
      dataIndex: "",
      key: "x",
      render: () => (
        <Space align="center" style={{ marginBottom: 16 }}>
          <Switch checked={checkStrictly} onChange={setCheckStrictly} />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
  ];

  return (
    <div className="component">
      <h4
        style={{
          marginLeft: "39%",
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
              // onChange={(event) => {
              //     const searchValue = event.target.value;
              //     if (searchValue.trim() !== "") {
              //         searchKeyWords(searchValue);
              //     } else {
              //         setSearchData([]);
              //     }
              // }}
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
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
}
