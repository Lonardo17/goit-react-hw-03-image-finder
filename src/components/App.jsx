import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './image-gallery/ImageGallery';

export class App extends Component {
  state = {
    request: '',
    page: 1,
  };

  addRequest = newRequest => {
    if (this.state.request !== newRequest) {
      this.setState({ request: newRequest.toLowerCase(), page: 1 });
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { request, page } = this.state;
    return (
      <div>
        <Searchbar onGetRequest={this.addRequest} />
          <ImageGallery
            request={request}
            page={page}
            loadMore={this.loadMore}
          />
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}