import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/image-gallery-item/ImageGalleryItem';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import Modal from 'components/modal/Modal';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    totalPage: null,
    loader: false,
    showModal: false,
    modalURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.props;
    const prevRequest = prevProps.request;
    const newRequest = this.props.request;
    const API_KEY = '27883496-3dd209463576c9b19f64e0ddf';

    if (prevRequest !== newRequest || page > prevProps.page) {
      this.setState({ loader: true });
      fetch(
        `https://pixabay.com/api/?q=${newRequest}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          const { hits, totalHits, total } = data;

          if (total === 0) {
            toast.error('The search has not given any results');
            return;
          }
          if (page === 1) {
            this.setState({
              hits: hits,
              totalPage: Math.ceil(totalHits / 12),
            });
          } else {
            this.setState({
              hits: [...prevState.hits, ...data.hits],
            });
          }
        })
        .finally(() => this.setState({ loader: false }));
    }
  }

  getModalURL = URL => {
    this.setState({ modalURL: URL });
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { hits, totalPage, loader, showModal, modalURL } = this.state;
    const { page, loadMore } = this.props;
    return (
      <div style={{textAlign: "center",}}>
        <ul className={s.gallery}>
          <ImageGalleryItem
            hits={hits}
            onToggleModal={this.toggleModal}
            getModalURL={this.getModalURL}
          />
        </ul>
        {loader && <Loader />}
        {totalPage > 1 && totalPage !== page && <Button loadMore={loadMore}  />}
        {showModal && <Modal url={modalURL} onToggleModal={this.toggleModal} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};