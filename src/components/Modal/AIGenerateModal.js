import { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SiProbot } from "react-icons/si";

export const AIGenerateModal = ({ show, setShow, aiIsLoading, AIGenerateHandler }) => {
    const [title, setTitle] = useState("");
    const handleClose = () => setShow(false);
    const textarea = useRef();
    const handleResizeHeight = () => {
        textarea.current.style.height = 0; //height 초기화
        textarea.current.style.height = textarea.current.scrollHeight + "px";
    };
    return (
        <>
            <Modal className="AIGenerateModal" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>AI 자동완성</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                    <div>주제를 입력하면 자동으로 설문을 생성해 줍니다.</div>
                    <textarea
                        className="surveyTitle"
                        type="text"
                        value={title}
                        ref={textarea}
                        placeholder="설문 주제 입력"
                        onChange={(e) => {
                            handleResizeHeight();
                            setTitle(e.target.value);
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        직접 작성
                    </Button>
                    <Button variant={aiIsLoading ? "primary" : "outline-primary"} disabled={aiIsLoading} onClick={aiIsLoading ? null : () => AIGenerateHandler(title)}>
                        {aiIsLoading ? <Spinner className="icon" as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : <SiProbot className="icon-svg" />}
                        AI Generate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
