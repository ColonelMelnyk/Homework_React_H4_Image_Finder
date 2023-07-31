import {React, useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './image-finder-styles.module.css';
const modalRoot = document.querySelector('#modal-root');
export const Modal = ({closeModalTrigger, image}) => {
  useEffect(()=>{
    const onEscapeKeyHandler = event =>{
      if (event.code === `Escape`){
      closeModalTrigger();
      }
    };
    window.addEventListener("keydown", onEscapeKeyHandler);
    return() => window.removeEventListener("keydown", onEscapeKeyHandler);
  },[closeModalTrigger])
   const overlayKeyHandler = event => {
    if (event.target === event.currentTarget) {
    closeModalTrigger();
    }
  };
        return createPortal(
            <div className={css.overlay} onClick = {overlayKeyHandler}>
                <div className={css.modal}>
                    <img className={css.largeImage} src={image} alt= 'Error!' />
                </div>
            </div>, modalRoot);
    
}
Modal.propTypes ={
  closeModalTrigger: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
}