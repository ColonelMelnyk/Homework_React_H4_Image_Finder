import React, {Component} from 'react';
import { fetchData } from './api';
import { SearchBar } from './SearchBar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import {Button} from './Button';
import { Modal } from './Modal';
import { Notify } from 'notiflix';
export class App extends Component{
  state ={
    images: [],
    isLoading: false,
    page: 1,
    search: '',
    showModal: false,
    selectedImage: '',
    total: 0,
  }
 
  fetchImages = async (page, search) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await fetchData(search, page);
      if (hits.length === 0) {
        Notify.failure(
          'Нічого не знайдено. Введіть актуальний запит!'
        );
      }
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          total: totalHits,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onHandleSubmit = search => {
    if (search.trim() === '') {
      return Notify.failure('Введіть дані!');
    } else if (this.state.search !== search) {
      this.setState({ images: [], page: 1, search });
    }
  };

  onHandleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  toggleModal = (largeImageURL = '') => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: largeImageURL,
    }));
  };
  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages(page, search);
    }
  }
  render(){
    const { isLoading, images, showModal, selectedImage, total, page } = this.state;
    const totalPage = Math.ceil(total / 12);
    return(
      <div>
      <SearchBar onSubmit ={this.onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images ={images} toggleModal={this.toggleModal}/>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPage > page && (
      <Button onHandleMoreButton={this.onHandleLoadMore}/>  
      )}
      {showModal && (
      <Modal closeModalTrigger ={this.toggleModal} image = {selectedImage}/>
      )}
      </div>
   
    );
  }
}