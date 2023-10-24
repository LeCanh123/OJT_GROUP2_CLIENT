import { Table, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { FormEvent, useEffect, useState } from 'react';
import "../category/category.scss"
import { Button, Form, Modal } from 'react-bootstrap';
import { ForecastType } from '../../../interface/Forecast';
import adminApi from '../../../apis/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import { CategoryType } from '../../../interface/Category';
import { forecastAction } from '../../../redux/ForecastSlice';

const onChange: TableProps<ForecastType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export default function Forecast() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const forecastStore = useSelector((store: StoreType) => store.forecastStore)

    // Get Category - Forecast
    const [categories, setCategories] = useState<CategoryType[] | null>([])
    useEffect(() => {
        try {
            adminApi.getCategory()
                .then(res => {
                    if (res.status == 200) {
                        setCategories(res.data.data)
                    } else {
                        message.error(res.data.message)
                    }
                })

            adminApi.getForecast()
                .then(res => {
                    if (res.status == 200) {
                        dispatch(forecastAction.setDataForecast(res.data.data))
                    }
                })
                .catch(err => {
                    console.log("err Api", err);

                })

        } catch (err) {

        }
    }, [])

    // Add Forecast
    async function handleAddForecast(e: React.FormEvent) {
        e.preventDefault();

        let data = {
            categorysId: (e.target as any).category.value,
            name: (e.target as any).name.value,
            lat: (e.target as any).lat.value,
            lng: (e.target as any).lng.value,
            level: (e.target as any).level.value,
            place: (e.target as any).place.value,
            size: (e.target as any).size.value,
            block: (e.target as any).block.value,
            time_start: (e.target as any).time_start.value,
        }

        try {
            await adminApi.addForecast(data)
                .then(res => {
                    console.log("res", res.data);
                    if (res.status == 200) {
                        dispatch(forecastAction.addForecast(res.data.data))
                        message.success("Thêm thiên tai mới thành công!")
                        handleClose()
                    } else {
                        message.error(res.data.message)
                    }
                })
                .catch(err => {
                    console.log("err Api", err);
                })

        } catch (err) {
            console.error(`Failed to add forecast: ${err}`);
        }

    }

    // Update Forecast
    const [editForecast, setEditForecast] = useState<ForecastType | null>(null);
    // const [editForecastId, setEditForecastId] = useState<string | null>(null);

    async function handleUpdateForecast(e: React.FormEvent, forecast: ForecastType) {
        e.preventDefault();

        let updateData = {
            categorysId: editForecast?.categorysId.id!,
            name: editForecast?.name!,
            lat: editForecast?.lat!,
            lng: editForecast?.lng!,
            level: editForecast?.level!,
            place: editForecast?.place!,
            size: editForecast?.size!,
            block: editForecast?.block!,
            time_start: editForecast?.time_start!,
        }

        try {
            await adminApi.updateForecast(forecast.id!, updateData)
                .then(res => {
                    console.log("res", res.data);
                    if (res.status === 200) {
                        dispatch(forecastAction.updateForecast(res.data.data))
                        message.success("Cập nhật thông tin thiên tai thành công!")
                        handleClose()
                    } else {
                        message.error(res.data.message)
                    }
                })
                .catch(err => {
                    console.log("err Api", err);
                })

        } catch (err) {
            console.error(`Failed to update forecast: ${err}`);
        }
    }

    function handleEdit(record: ForecastType) {
        setEditForecast({ ...record });
        handleShow();
    }

    const columns: ColumnsType<ForecastType> = [
        {
            title: '#',
            dataIndex: 'rowIndex',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            filters: forecastStore.data
                ? forecastStore.data.map((forecast) => ({
                    text: forecast.name,
                    value: forecast.name,
                }))
                : [],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value: string, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },

        {
            title: 'Vĩ độ (Lat)',
            dataIndex: "lat",

        },
        {
            title: "Kinh độ (Lng)",
            dataIndex: "lng",

        },
        {
            title: "Mức độ",
            dataIndex: "level",

        },
        {
            title: "Địa điểm",
            dataIndex: 'place',
            filters: forecastStore.data
                ? forecastStore.data.map((forecast) => ({
                    text: forecast.place,
                    value: forecast.place,
                }))
                : [],
            onFilter: (value: string, record) => record.place.indexOf(value) === 0,
        },
        {
            title: "Phạm vi ảnh hưởng (m2)",
            dataIndex: 'size',
        },
        {
            title: "Thời gian bắt đầu",
            dataIndex: 'time_start',
        },
        {
            title: "Trạng thái",
            dataIndex: 'block',
            render: (block) => (block == "0" ? "Kích hoạt" : "Vô hiệu hóa"),
        },
        {
            title: "Actions",
            render: (text, record) => (
                <div>
                    <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(record)} style={{ width: "80px", marginRight: "10px" }}>Sửa</button>

                </div>
            ),

        }
    ];

    return (
        <div className='component'>
            <div className='category-modal'>
                <h4 className='category-modal-title'>DANH SÁCH THIÊN TAI ĐỘNG ĐẤT</h4>
                <Button variant="outline-primary" style={{ marginLeft: "300px" }} onClick={handleShow}>THÊM MỚI</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                editForecast ? "CHỈNH SỬA THIÊN TAI" : "THÊM MỚI THIÊN TAI"
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => {
                        if (editForecast) {
                            handleUpdateForecast(e, editForecast)
                        } else {
                            handleAddForecast(e)
                        }
                    }}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label className='modal-title'>Danh mục</Form.Label>
                                <Form.Select name='category'>
                                    {
                                        categories?.map((category) => (
                                            <option key={Date.now() * Math.random()} value={(category as CategoryType).id}>{category.title}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    name='name'
                                    value={editForecast?.name}
                                    onChange={(e) => setEditForecast({ ...editForecast!, name: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Vĩ độ (Lat)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='lat'
                                    value={editForecast?.lat}
                                    onChange={(e) => setEditForecast({ ...editForecast!, lat: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Kinh độ (Lng)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='lng'
                                    value={editForecast?.lng}
                                    onChange={(e) => setEditForecast({ ...editForecast!, lng: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Mức độ</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='level'
                                    value={editForecast?.level}
                                    onChange={(e) => setEditForecast({ ...editForecast!, level: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Địa điểm</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='place'
                                    value={editForecast?.place}
                                    onChange={(e) => setEditForecast({ ...editForecast!, place: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phạm vi ảnh hưởng (m)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='size'
                                    value={editForecast?.size}
                                    onChange={(e) => setEditForecast({ ...editForecast!, size: Number(e.target.value) })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='modal-title'>Trạng thái</Form.Label>
                                <Form.Select name='block'
                                    value={editForecast ? (editForecast.block ? '1' : '0') : '0'}
                                    onChange={(e) => { setEditForecast({ ...editForecast!, block: e.target.value === '1' }); }}
                                >
                                    <option value="0">Kích hoạt</option>
                                    <option value="1">Vô hiệu hóa</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Thời gian bắt đầu</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name='time_start'
                                    value={editForecast?.time_start || ""}
                                    onChange={(e) => setEditForecast({ ...editForecast!, time_start: e.target.value })}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button type='submit' variant="primary">
                                Lưu
                            </Button>
                        </Modal.Footer>
                    </Form>

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

            <Table columns={columns} dataSource={forecastStore.data} onChange={onChange} />
        </div>
    )
}


