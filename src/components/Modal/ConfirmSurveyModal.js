import React, { useEffect, useState } from "react";
import { Button, Collapse, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "./modal.css";
import ReactDatePicker from "react-datepicker";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
export const ConfirmSurveyModal = ({ modalShow, handleModalClose, onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);
    return (
        <Modal show={modalShow} onHide={handleModalClose} className="sendFormModal">
            <Modal.Header closeButton>
                <Modal.Title>Publish this Survey?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Select Category</div>
                <div>Select start date</div>
                <DateTimePicker onChange={setStartDate} value={startDate} disableClock={true} />
                <div>Select end date</div>
                <DateTimePicker onChange={setEndDate} value={endDate} disableClock={true} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    No, Keep editing
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const LinkModal = ({ modalShow, handleModalClose, postId }) => {
    const navigate = useNavigate();
    return (
        <Modal show={modalShow} onHide={handleModalClose} className="sendFormModal">
            <Modal.Header closeButton>
                <Modal.Title>Publsh Complete!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Post Link</Modal.Body>
            <input disabled className="formLinkInput" type="text" value={`http://localhost:3000/details/${postId}`} />
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => navigate(`/details/${postId}`)}>
                    Follow Link
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
