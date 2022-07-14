import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  openModal = event => {
    this.props.getModalURL(event.currentTarget.dataset.url);
    this.props.onToggleModal();
  };

  render() {
    return this.props.hits.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li key={id} className={s.item}>
          <img
            className={s.img}
            src={webformatURL}
            alt=""
            data-url={largeImageURL}
            onClick={this.openModal}
          />
        </li>
      );
    });
  }
}

ImageGalleryItem.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onToggleModal: PropTypes.func.isRequired,
  getModalURL: PropTypes.func.isRequired,
};