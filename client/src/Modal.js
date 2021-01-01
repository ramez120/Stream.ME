import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {  Modal } from "react-bootstrap";
import history from "./history";
// reusable modal component
const ReusableModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push("/");
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    handleShow();
  }, []);


  // portal for showing Modal
  return ReactDOM.createPortal(
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="d-flex align-items-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          {props.actions}
        </Modal.Footer>
      </Modal>
    </React.Fragment>,
    document.querySelector("#modal")
  );
};

export default ReusableModal;
