import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ConfirmSurveyModal = ({
    modalShow,
    handleModalClose,
    onSubmit,
}) => {
    return (
        <Modal
            show={modalShow}
            onHide={handleModalClose}
            className="sendFormModal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Post this Survey?</Modal.Title>
            </Modal.Header>
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

export const LinkModal = ({ modalShow, handleModalClose, surveyId }) => {
    const navigate = useNavigate();
    return (
        <Modal
            show={modalShow}
            onHide={handleModalClose}
            className="sendFormModal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Form Created!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Form Link</Modal.Body>
            <input
                disabled
                className="formLinkInput"
                type="text"
                value={
                    // `http://localhost:3000/survey/1`
                    `http://localhost:3000/survey/${surveyId}`
                }
            />
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => navigate(`/survey/${surveyId}`)}
                >
                    Follow Link
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
