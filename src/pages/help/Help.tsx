import "../about/about.scss"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import adminApi from "../../apis/Admin"

export default function Help() {
  const [show, setShow] = useState(false);
  const [message ,setMessage]=useState('');
  const [file,setFile]=useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function handleAddHelp(){
    const formData= new FormData();
    formData.append("file",file)
    formData.append('message',message)
    try {
      let result=await adminApi.addMessage(formData);
      if (result.status!==200) {
        alert("Thử lại sau");
      }else{
       alert("Gửi thành công!");
      } 
    } catch (error) {
      console.log("err", error);
    }
  }

  return (
    <div className="about">
      <div className="about-1">
      <h4>Nếu gặp vấn đề gì hãy liên hệ trực tiếp thông qua những cách thức mà chúng tôi cung cấp </h4>
      <p>Địa chỉ : Trung tâm Cứu trợ Thiên tai - Bộ Tài nguyên và Môi trường Việt Nam có văn phòng tại địa chỉ số 10 Trần Phú, Ba Đình, Hà Nội, Việt Nam.</p>
      <p>Số hotline:(+84) 24 3823 5591 </p>
      <p>Số điện thoại khẩn cấp: (+84) 24 3822 8112</p>
      <p>Email:<a href='/vdma@monre.gov.vn'>vdma@monre.gov.vn</a></p>
      </div>
      <div className="contribute">
                        <div className="contribute-flex">
                        <h4>Đóng góp thông tin cho Trung tâm cảnh báo </h4>
                       
                            <p>Đóng góp thông tin cho Trung tâm Kiến thức về tình trạng khẩn cấp, thiên tai và khả năng ứng phó là một cách quan trọng 
                                để chia sẻ kiến thức và nâng cao nhận thức về các vấn đề này. 
                                Nếu bạn có tài liệu, dữ liệu hoặc hình ảnh liên quan, bạn có thể sử dụng nút bên phải để truy cập trang gửi bài.
                            </p>
                            </div>
                            <div>
                            <Button className="btn btn-primary mailbox_1" style={{height:"60px",marginTop:"45px",marginLeft:"20px",backgroundColor:"hsl(289, 55%, 57%)"}} onClick={handleShow}>Hòm thư đóng góp</Button>
                            

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hòm thư đóng góp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                placeholder="name@example.com"
                autoFocus
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
    
            >
              <Form.Label>Nội dung góp ý</Form.Label>
              <Form.Control as="textarea" rows={3} 
              onChange={(e)=>setMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng 
          </Button>
          <Button variant="primary" onClick={handleAddHelp}>
           Gửi 
          </Button>
        </Modal.Footer>
      </Modal>
                        </div>
                    </div>
    </div>

  )
}
