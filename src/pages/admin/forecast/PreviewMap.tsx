import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MapModal from './MapModal';
import { ForecastType } from '../../../interface/Forecast';

export default function PreviewMap({ latPreview, lngPreview, levelPreview, sizePreview, editForecast }: {
    latPreview: number;
    lngPreview: number;
    levelPreview: number;
    sizePreview: number;
    editForecast: ForecastType;
}) {

    const [lgShow, setLgShow] = useState(false);

    return (
        <div>
            <Button variant="outline-dark" onClick={() => setLgShow(true)}>Xem trước bản đồ</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Xem trước bản đồ
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <MapModal latPreview={latPreview} lngPreview={lngPreview} levelPreview={levelPreview} sizePreview={sizePreview} editForecast={editForecast} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setLgShow(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => setLgShow(false)}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
