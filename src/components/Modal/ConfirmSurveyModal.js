import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./modal.css";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { PostContext } from "../../services/post/post.context";
export const ConfirmSurveyModal = ({ modalShow, handleModalClose, onSubmit }) => {
    const { CreateCategory, GetAllCategory } = useContext(PostContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isTypeNew, setIsTypeNew] = useState(true);

    const getData = () => {
        GetAllCategory().then((res) => setCategoryList(res));
    };
    useEffect(() => {
        getData();
    }, []);

    const postValidation = () => {
        if (category == "") {
            alert("카테고리를 설정해 주세요");
            return;
        } else if (startDate.getTime() === endDate.getTime()) {
            alert("기한을 설정해 주세요");
            return;
        } else {
            onSubmit(startDate.toISOString(), endDate.toISOString(), category);
        }
    };

    const onStartDateChange = (e) => {
        if (e.getTime() > endDate.getTime()) {
            setStartDate(e);
            setEndDate(e);
        } else {
            setStartDate(e);
        }
    };
    const onEndDateChange = (e) => {
        if (startDate.getTime() > e.getTime()) {
            alert("종료일이 시작일보다 늦을 수 없습니다!");
        } else {
            setEndDate(e);
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Category :
                    <div>
                        <button className="textButton" onClick={() => setIsTypeNew(true)}>
                            Create new
                        </button>
                        <button className="textButton" onClick={() => setIsTypeNew(false)}>
                            Select from list
                        </button>
                    </div>
                </div>
                {isTypeNew ? (
                    <input style={{ width: "100%", marginTop: "4px", marginBottom: "4px" }} value={category} onChange={(e) => setCategory(e.target.value)} />
                ) : (
                    <select
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        {categoryList.map((it) => (
                            <option value={it.categoryType} key={it.categoryPk}>
                                {it.categoryType}
                            </option>
                        ))}
                    </select>
                )}

                <div>Select start date</div>
                <DateTimePicker onChange={onStartDateChange} value={startDate} disableClock={true} minDate={new Date()} locale="ko" />
                <div>Select end date</div>
                <DateTimePicker onChange={onEndDateChange} value={endDate} disableClock={true} minDate={new Date()} locale="ko" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    No, Keep editing
                </Button>
                <Button variant="primary" onClick={postValidation}>
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
