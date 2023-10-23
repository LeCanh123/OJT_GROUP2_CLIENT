import { Popconfirm, Table, Typography, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import "./category.scss"
import { CategoryType } from '../../../interface/Category';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import { categoryAction } from '../../../redux/CategorySlice';
import adminApi from '../../../apis/Admin';
import { Button, Form, FormSelect, Modal } from 'react-bootstrap';


export default function Category() {
    const dispatch = useDispatch();
    const categoryStore = useSelector((store: StoreType) => {
        return store.categoryStore
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Categoty
    const [title, setTitle] = useState("")
    const [block, setBlock] = useState("0")
    const formData: any = new FormData();

    async function handleAddCategory() {
        const fileImage: any = document.getElementById("imageCategory");
        const image = fileImage.files[0];

        formData.append("image", image);
        formData.append("block", block ? "0" : "1");
        formData.append("title", title);

        try {
            adminApi.addCategory(formData)
                .then(res => {
                    console.log("res", res.data.data);
                    dispatch(categoryAction.addCategory(res.data.data))
                })
                .catch(err => {
                    console.log("Err Api", err);
                })

        } catch (err) {
            console.log("err", err);

            console.log("Lỗi hệ thống", err);
        }
    }

    async function handleUpdateCategory(category: CategoryType) {
        const updateFormData: any = new FormData();
        updateFormData.append("title", editCategory?.title)
        updateFormData.append("block", editCategory?.block);
        console.log("block", editCategory?.block);

        try {
            await adminApi.updateCategory(category.id, updateFormData)
                .then(res => {
                    dispatch(categoryAction.updateCategory(res.data.data));
                })
                .catch(err => {
                    console.log("Err Api", err);
                });
        } catch (err) {
            console.log("Lỗi hệ thống", err);
        }
    }

    // Get All Categories
    useEffect(() => {
        async function getCategory() {
            await adminApi.getCategory()
                .then(res => {
                    dispatch(categoryAction.setDataCategory(res.data.data))
                })
                .catch(err => {
                    console.log("Err Api", err);
                })
        }
        getCategory();
    }, [])

    // Table Render
    const [editCategory, setEditCategory] = useState<CategoryType | null>(null);

    const columns: ColumnsType<CategoryType> = [
        {
            title: '#',
            dataIndex: 'rowIndex',
            render: (text, record, index) => index + 1,
            defaultSortOrder: 'ascend',
            // sorter: (a, b) => a.rowIndex - b.rowIndex,
            width: "10%"
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'title',
            filters: categoryStore.data
                ? categoryStore.data.map((category) => ({
                    text: category.title,
                    value: category.title,
                }))
                : [],
            onFilter: (value: string, record) => record.title.indexOf(value) === 0,
            sorter: (a, b) => a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' }),
            width: "30%"

        },
        {
            title: 'Trạng thái',
            dataIndex: "block",
            render: (block) => (block == "0" ? "Kích hoạt" : "Vô hiệu hóa"),
            width: "20%"

        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <button type="button" className="btn btn-outline-success" onClick={() => handleEdit(record)} style={{ width: "80px" }}>Sửa</button>

                </div>
            ),
            width: "20%"
        },
    ];

    const onChange: TableProps<CategoryType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    function handleEdit(record: CategoryType) {
        setEditCategory({ ...record });
        handleShow();
    }

    // useEffect(() => {
    //     console.log("categoryStore", categoryStore);
    // }, [categoryStore])

    return (
        <div className='component'>
            <div className='category-modal'>
                <h4 className='category-modal-title'>DANH SÁCH LOẠI THIÊN TAI</h4>
                <Button variant="outline-primary" style={{ marginLeft: "220px" }} onClick={handleShow}>THÊM MỚI</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton >
                        <Modal.Title className='modal-title'>
                            {
                                editCategory ? 'CHỈNH SỬA LOẠI THIÊN TAI' : 'THÊM MỚI LOẠI THIÊN TAI'
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='modal-title'>Tên Danh Mục</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={editCategory ? editCategory.title : title}
                                    onChange={(e) => {
                                        if (editCategory) {
                                            setEditCategory({ ...editCategory, title: e.target.value });
                                        } else {
                                            setTitle(e.target.value);
                                        }


                                    }}
                                />
                            </Form.Group>
                            <Form.Label className='modal-title'>Trạng thái</Form.Label>
                            <Form.Select
                                value={editCategory ? (editCategory.block ? '1' : '0') : '0'}
                                onChange={(e) => {
                                    if (editCategory) {
                                        setEditCategory({ ...editCategory, block: e.target.value === '1' });
                                    } else {
                                        setBlock(e.target.value === '0');
                                    }
                                }}
                            >
                                <option value="0">Kích hoạt</option>
                                <option value="1">Vô hiệu hóa</option>
                            </Form.Select>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='modal-title'>Hình ảnh</Form.Label>
                                <Form.Control
                                    type="file"
                                    id='imageCategory'
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary"
                            onClick={() => {
                                if (editCategory) {
                                    handleUpdateCategory(editCategory);
                                } else {
                                    handleAddCategory();
                                }
                                message.success(editCategory ? "Cập nhật danh mục loại thiên tai thành công!" : "Thêm mới danh mục loại thiên tai thành công!");
                                handleClose();
                            }}>
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

            <Table columns={columns} dataSource={categoryStore.data} onChange={onChange} style={{ width: "100%!important" }} />
        </div>
    )
}


