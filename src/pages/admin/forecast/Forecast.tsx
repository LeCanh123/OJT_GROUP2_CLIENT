import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import "../category/category.scss"
import { Button, Form, Modal } from 'react-bootstrap';
import { ForecastType } from '../../../interface/Forecast';
import adminApi from '../../../apis/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import { CategoryType } from '../../../interface/Category';
import { forecastAction } from '../../../redux/ForecastSlice';
import moment from 'moment';
import PreviewMap from './PreviewMap';

export default function Forecast() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const [searchData, setSearchData] = useState<CategoryType[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalSearchPages, setTotalSearchPages] = useState(0);
    const [currentData, setCurrentData] = useState([]);

    /* Map */
    const [latPreview, setLatPreview] = useState(0);
    const [lngPreview, setLngPreview] = useState(0);
    const [levelPreview, setLevelPreview] = useState(0);
    const [sizePreview, setSizePreview] = useState(0);


    const dispatch = useDispatch();
    const forecastStore = useSelector((store: StoreType) => store.forecastStore)

    function formatData() {
        return currentData?.map((data: any) => {
            return {
                ...data,
            }
        })
    }

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
                        setChange(Math.random() * 9999)
                        message.success(res.data.message)
                        handleClose()
                    } else {
                        handleClose()
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
    const [editForecast, setEditForecast]: any = useState();
    const fetchData = async (page: number, limit: number) => {
        try {
            const response = await adminApi.paginationForecast(page, limit);
            setTotalPages(response.data.totalPage);
            setCurrentData(response.data.data)
            setCurrentPage(page)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const handleClose = () => {
        setShow(false);
        setEditForecast(null)
    };
    async function handleUpdateForecast(e: React.FormEvent, forecast: ForecastType) {
        e.preventDefault();

        let updateData = {
            categorysId: editForecast?.categorys.id!,
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
                        handleClose();
                        setEditForecast(null)
                        fetchData(currentPage, itemsPerPage);

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
            onFilter: (value: string, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },

        {
            title: 'Vĩ độ (Lat)',
            dataIndex: "lat",
            width: '10%'
        },
        {
            title: "Kinh độ (Lng)",
            dataIndex: "lng",
            width: '10%'
        },
        {
            title: "Mức độ",
            dataIndex: "level",
            width: '7%'
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
            render: (time_start) => moment(time_start).format('HH:mm:ss DD-MM-YYYY'),
        },
        // {
        //     title: "Trạng thái",
        //     dataIndex: 'block',
        //     render: (block) => (block == "0" ? "Kích hoạt" : "Vô hiệu hóa"),
        // },
        {
            title: "Thao tác",
            render: (text, record) => (
                <div>
                    <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(record)} >Sửa</button>

                </div>
            ),
            width: '5%'

        }
    ];

    let timeOut: string | number | NodeJS.Timeout | undefined;
    function searchKeyWords(serchValue: string) {
        clearTimeout(timeOut);
        timeOut = setTimeout(async () => {
            await adminApi.searchForecast(serchValue)
                .then((res) => {
                    if (res.status === 200) {
                        const updatedTotalPages = Math.ceil(res.data.data.length / itemsPerPage)
                        setSearchData(res.data.data.length !== 0 ? res.data.data : null)
                        setTotalSearchPages(updatedTotalPages)
                    }
                })
        })
    }

    let [change, setChange] = useState(1)
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {

        fetchData(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage, change]);

    console.log("vaof admin");

    return (
        <div className='component'>

            <div className='category-modal' >
                <div className='row'>
                    <div className="col-7">
                    <h4 className='category-modal-title' style={{position:"relative",left:"10px"}}>DANH SÁCH THIÊN TAI ĐỘNG ĐẤT</h4>

                    </div>
                    <div className="col-5">
                    <Button variant="outline-primary" style={{ marginLeft: "400px" }} onClick={handleShow}>THÊM MỚI</Button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                editForecast ? "CHỈNH SỬA THIÊN TAI" : "THÊM MỚI THIÊN TAI"
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => {

                        if (!editForecast) {
                            handleAddForecast(e)
                        } else {
                            handleUpdateForecast(e, editForecast)
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
                                    onChange={(e) => {
                                        if (editForecast) {
                                            setEditForecast({ ...editForecast!, name: e.target.value })
                                        }
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Vĩ độ (Lat)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='lat'
                                    value={editForecast?.lat}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            const formattedLat = parseFloat(e.target.value); // Convert string to number
                                            setEditForecast({ ...editForecast, lat: formattedLat });
                                            setLatPreview(Number(e.target.value))

                                        } else {
                                            setLatPreview(Number(e.target.value))
                                        }
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Kinh độ (Lng)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='lng'
                                    value={editForecast?.lng}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            const formattedLat = parseFloat(e.target.value); // Convert string to number
                                            setEditForecast({ ...editForecast!, lng: formattedLat })
                                            setLngPreview(Number(e.target.value))

                                        } else {
                                            setLngPreview(Number(e.target.value))
                                        }
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Mức độ</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='level'
                                    min={1}
                                    max={9}
                                    value={editForecast?.level}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            setEditForecast({ ...editForecast!, level: Number(e.target.value) })
                                            setLevelPreview(Number(e.target.value))

                                        } else {
                                            setLevelPreview(Number(e.target.value))
                                        }
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Địa điểm</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='place'
                                    value={editForecast?.place}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            setEditForecast({ ...editForecast!, place: e.target.value })
                                        }
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phạm vi ảnh hưởng (m)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='size'
                                    min={1}
                                    value={editForecast?.size}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            setEditForecast({ ...editForecast!, size: Number(e.target.value) })
                                            setSizePreview(Number(e.target.value))

                                        } else {
                                            setSizePreview(Number(e.target.value))
                                        }
                                    }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='modal-title'>Trạng thái</Form.Label>
                                <Form.Select name='block'
                                    value={editForecast ? (editForecast.block ? '1' : '0') : '0'}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            setEditForecast({ ...editForecast!, block: e.target.value === '1' });
                                        }
                                    }}
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
                                    value={(editForecast?.time_start!).toString().substring(0, 16)}
                                    onChange={(e) => {
                                        if (editForecast) {
                                            setEditForecast({ ...editForecast!, time_start: e.target.value })
                                        }
                                    }}
                                />
                            </Form.Group>

                            <PreviewMap latPreview={latPreview} lngPreview={lngPreview} levelPreview={levelPreview} sizePreview={sizePreview} editForecast={editForecast} />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            {
                                editForecast ? (
                                    <Button type='submit' variant="primary">
                                        Lưu thay đổi
                                    </Button>
                                )
                                    :
                                    (
                                        <Button type='submit' variant="primary">
                                            Lưu
                                        </Button>
                                    )
                            }

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
                            onChange={(e) => {
                                const serchValue = e.target.value
                                if (serchValue.trim() !== "") {
                                    searchKeyWords(serchValue)
                                } else {
                                    setSearchData([])
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

            <Table columns={columns}
                dataSource={(searchData?.length > 0 || searchData === null) ? searchData : formatData()}
                pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: ((searchData?.length > 0 || searchData === null) ? totalSearchPages : totalPages) * itemsPerPage,
                    onChange: handlePageChange,
                }}
            />
        </div>
    )
}


