// Packages
import { useCallback, useEffect, useState } from "react";

// Components
import Button from "../buttons/Button";

// Icons
import { XCircleIcon } from "@heroicons/react/24/outline";

// Styles
import './Modal.css';

const Modal = ({
  isOpen, // boolean
  onClose, // () => void
  onSubmit, // () => void
  title, // string
  body, // ReactElement
  footer, // ReactElement
  actionLabel, //string
  disabled, // boolean
  secondaryAction, //() => void
  secondaryLabel, // string
}) => {

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);

  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction ) return;

    secondaryAction();
  }, [disabled, secondaryAction]); 

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className='modal-blur-background'>
        <div className='modal-container'>
          {/* CONTENT */}
          <div className={`modal-card-container ${showModal ? 'modal-show' : 'modal-not-show'}`}>
            <div className='modal-card'>
              {/* HEADER */}
              <div className='modal-header'>
                <button 
                  className='modal-close-btn'
                  onClick={handleClose}
                >
                  <XCircleIcon className='w-6 h-6' />
                </button>
                {/* TITLE */}
                <div className='modal-title'>
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className='modal-body flex-auto'>
                {body}
              </div>
              {/* FOOTER */}
              <div className='modal-footer'>
                <div className='modal-footer-btns'>
                  <Button 
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;