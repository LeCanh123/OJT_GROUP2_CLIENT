import "./about.scss"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function About() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="about">
        <div className="about-1">
        <h3>HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM</h3>
        <p>Trang web cảnh báo thiên tai của Việt Nam là một nguồn thông tin quan trọng được tổ chức và cung 
            cấp bởi các cơ quan chức năng liên quan tại Việt Nam. Trang web này có mục tiêu chính là cung cấp 
            thông tin về các tình huống thiên tai như bão, lũ, động đất, sạt lở đất và các hiện tượng tự nhiên nguy hiểm khác.
             Mục đích của nó là đảm bảo sự an toàn và
             giảm thiểu thiệt hại do thiên tai bằng cách cung cấp cảnh báo sớm và thông tin cần thiết.</p>
             <p>Trang web cảnh báo thiên tai của Việt Nam thường được cập nhật thông tin từ các nguồn tin đáng tin cậy như Trung tâm Dự báo Khí tượng Thủy văn Quốc gia, Trung tâm Quản lý và Phối hợp ứng phó Thiên tai, cùng với các cơ quan chức năng và tổ chức khác có liên quan đến quản lý thiên tai tại Việt Nam.
                 Thông tin được cung cấp trên trang web bao gồm cảnh báo, dự báo, tình hình hiện tại, hướng dẫn ứng phó và các biện pháp cần thiết để bảo vệ mạng sống và tài sản của người dân.</p>
             <p>Trang web cảnh báo thiên tai của Việt Nam thường có giao diện thân thiện, dễ sử dụng và cung cấp 
                thông tin một cách rõ ràng và đáng tin cậy. Người dùng có thể truy cập trang web để xem thông tin 
                mới nhất về các cảnh báo thiên tai, theo dõi tình hình hiện tại và nhận được hướng dẫn về cách ứng phó và bảo vệ bản thân.</p>
                <p>Trang web cảnh báo thiên tai của Việt Nam đóng vai trò quan trọng trong việc nâng cao nhận thức và sẵn sàng ứng phó của cộng đồng 
                    trước các tình huống thiên tai. Nó giúp người dân, doanh nghiệp và cộng đồng có thể chuẩn bị 
                    và đối phó hiệu quả với các tình huống thiên tai, từ đó giảm thiểu thiệt hại và bảo vệ mạng sống và tài sản của mọi người.</p>
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
                            <Button className="btn btn-primary mailbox_1" style={{height:"60px",marginTop:"45px",marginLeft:"20px",backgroundColor:"hsl(289, 55%, 57%)"}}onClick={handleShow}>Hòm thư đóng góp</Button>
                            

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
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Nội dung góp ý</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng 
          </Button>
          <Button variant="primary" onClick={handleClose}>
          Gửi
          </Button>
        </Modal.Footer>
      </Modal>
                            
                        </div>
                    </div>
    </div>
  )
}