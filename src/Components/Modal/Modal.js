import React from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Modal.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#101a27",
  },
};
Modal.setAppElement("#root");
const ModalContainer = ({ children, isOpenModal, closeModal }) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button className="modalCloseButton" onClick={closeModal}>
        <AiOutlineCloseCircle />
      </button>
      {/* <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form> */}
      <div className="modalBody">{children}</div>
    </Modal>
  );
};
export default ModalContainer;
