import React, { useContext, useEffect, useState } from "react";
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
import { PostContext } from "../../services/post/post.context";
export const ConfirmSurveyModal = ({ modalShow, handleModalClose, onSubmit }) => {
    const { CreateCategory } = useContext(PostContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [category, setCategory] = useState("");

    const postValidation = () => {
        if (category == "") {
            return;
        }
    };

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);
    return (
        <Modal show={modalShow} onHide={handleModalClose} className="sendFormModal">
            <Modal.Header closeButton>
                <Modal.Title>Publish this Survey?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Category : Create new or Select from list
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="1">여기서는</option>
                        <option value="1">나중에</option>
                        <option value="1">카테고리</option>
                        <option value="1">리스트 받아올것임</option>
                    </select>
                </div>
                <input value={category} onChange={(e) => setCategory(e.target.value)} />
                <div>Select start date</div>
                <DateTimePicker onChange={setStartDate} value={startDate} disableClock={true} minDate={new Date()} locale="ko" />
                <div>Select end date</div>
                <DateTimePicker onChange={setEndDate} value={endDate} disableClock={true} minDate={new Date()} locale="ko" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    No, Keep editing
                </Button>
                <Button variant="primary" onClick={() => onSubmit(startDate.toISOString(), endDate.toISOString(), category)}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const LinkModal = ({ modalShow, handleModalClose, postPk }) => {
    const navigate = useNavigate();
    return (
        <Modal show={modalShow} onHide={handleModalClose} className="sendFormModal">
            <Modal.Header closeButton>
                <Modal.Title>Publsh Complete!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Post Link</Modal.Body>
            <input disabled className="formLinkInput" type="text" value={`http://localhost:3000/post/${postPk}`} />
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => navigate(`/post/${postPk}`)}>
                    Follow Link
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
