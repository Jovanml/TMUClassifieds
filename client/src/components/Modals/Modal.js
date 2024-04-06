// Packages
import { useCallback, useEffect, useState } from "react";

// Components
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";

// Icons
import { XCircleIcon } from "@heroicons/react/24/outline";

// Styles
import './Modal.css';

// reusable modal component
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

  // store show modal state
  const [showModal, setShowModal] = useState(isOpen);

  // set show modal based on isOpen state change
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // on close function handler
  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    // set a timeout to accomodate the css animation
    setTimeout(() => {
      onClose();
    }, 300);

  }, [disabled, onClose])

  // on submit function handler
  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  // on submit for secondary button function handler
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction ) return;

    secondaryAction();
  }, [disabled, secondaryAction]); 

  // don't return a modal if it is not open
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
                      className='modal-secondary-btn'
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      outline
                    />  
                  )}
                  {actionLink ? (
                    <Link
                      className='btn-with-link'
                      to={actionLink}
                    >
                      <Button 
                        label={actionLabel}
                        onClick={handleSubmit}
                        disabled={disabled}
                        icon={btnIcon}
                      />
                    </Link>
                  ) : (
                    <Button 
                      label={actionLabel}
                      onClick={handleSubmit}
                      disabled={disabled}
                      icon={btnIcon}
                    />
                  )}
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