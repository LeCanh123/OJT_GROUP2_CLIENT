import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { useState } from 'react';
import "./category.scss"
import { Button, Form, FormSelect, Modal } from 'react-bootstrap';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: '#',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value: string, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Trạng thái',
    },
    {
        title: 'Hình ảnh',
    },
    {
        title: "Thao tác",
        render: (text, record) => (
            <div>
                <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(record)} style={{ width: "80px" }}>Sửa</button>

            </div>
        ),

    }
];

const data = [
    {
        key: '1',
        name: 'aohn Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'bim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'cim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export default function Category() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='component'>
            <div className='category-modal'>
                <h4 className='category-modal-title'>DANH SÁCH LOẠI THIÊN TAI</h4>
                <Button variant="outline-primary" style={{ marginLeft: "220px" }} onClick={handleShow}>THÊM MỚI</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton >
                        <Modal.Title className='modal-title'>THÊM MỚI LOẠI THIÊN TAI</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='modal-title'>Tên Danh Mục</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='modal-title'>Trạng thái</Form.Label>
                                <FormSelect>
                                    <option value="" disabled selected hidden>Chọn trạng thái</option>
                                    <option value="0">Kích hoạt</option>
                                    <option value="1">Vô hiệu hóa</option>
                                </FormSelect>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='modal-title'>Hình ảnh</Form.Label>
                                <Form.Control
                                    type="file"
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <input
                            className="form-control border-end-0 border rounded-pill"
                            type="search"
                            placeholder='Tìm kiếm theo tên'
                            id="example-search-input"
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

            <Table columns={columns} dataSource={data} onChange={onChange} style={{ width: "100%!important" }} />
        </div>
    )
}
function handleEdit(record: DataType) {
    throw new Error('Function not implemented.');
}

function handleDelete(record: DataType) {
    throw new Error('Function not implemented.');
}

