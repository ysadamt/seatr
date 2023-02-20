import React, { useState } from "react";
import Backdrop from "./Backdrop";

interface ModalProps {
  handleClose: () => void;
  text: string;
}

const Modal = ({ handleClose, text }: ModalProps) => {

  return (
    <Backdrop onClick={handleClose}>
      <div className="bg-white rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Modal</h1>
          <button onClick={handleClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-4">{text}</p>
      </div>
    </Backdrop>
  )
}

export default Modal;