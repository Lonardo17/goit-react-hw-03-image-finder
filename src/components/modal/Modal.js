import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    const backDrop = document.querySelector('#backDrop');
    window.addEventListener('keydown', this.closeModal);
    backDrop.addEventListener('click', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = event => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      this.props.onToggleModal();
    }
  };
  render() {
    return createPortal(
      <div className={s.overlay} id="backDrop">
        <div className={s.modal}>
          <img src={this.props.url} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};