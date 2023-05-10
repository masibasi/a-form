import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const DeleteSurveyModal = ({ modalShow, modalClose, onDelete }) => {
    return (
        <Modal show={modalShow} className="sendFormModal" onHide={modalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete this Survey?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                    No
                </Button>
                <Button variant="primary" onClick={onDelete}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
