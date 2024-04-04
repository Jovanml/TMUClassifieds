// Packages
import { useCallback, useEffect, useState } from "react";

// Components
import Button from "../buttons/Button";

// Icons
import { XCircleIcon } from "@heroicons/react/24/outline";

// Styles
import './Modal.css';

const Modal = ({
  isOpen, // boolean (optional) 
  onClose, // () => void
  onSubmit, // () => void
  title, // string (optional)
  body, // ReactElement (optional)
  footer, // ReactElement (optional)
  actionLabel, //string
  actionLink, // string
  disabled, // boolean (optional)
  btnIcon, //Icon component
  secondaryAction, //() => void (optional)
  secondaryActionLabel, // string (optional)
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
              <div className='modal-body'>
                {body}
              </div>
              {/* FOOTER */}
              <div className='modal-footer'>
                {footer}
                <div className='modal-footer-btns'>
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      outline
                    />  
                  )}
                  <Button 
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                    btnLink={actionLink}
                    icon={btnIcon}
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