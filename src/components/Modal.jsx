import {React, Component} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './image-finder-styles.module.css';
const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeKeyHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKeyHandler);
  }

 onEscapeKeyHandler = event => {
    if (event.code === 'Escape') {
      this.props.closeModalTrigger();
    }
  };

  overlayKeyHandler = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModalTrigger();
    }
  };

    render(){
        return createPortal(
            <div className={css.overlay} onClick = {this.overlayKeyHandler}>
                <div className={css.modal}>
                    <img className={css.largeImage} src={this.props.image} alt= 'Error!' />
                </div>
            </div>, modalRoot);
    }
}
Modal.propTypes ={
  closeModalTrigger: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
}