import {React, useState, useEffect} from 'react';
import { fetchData } from './api';
import { SearchBar } from './SearchBar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import {Button} from './Button';
import { Modal } from './Modal';
import { Notify } from 'notiflix';
export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [total, setTotal] = useState(0);


  useEffect(() => {
    if (search){
      fetchImages(page, search);
    }
  }, [page, search]);

  const fetchImages = async (page, search) => {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await fetchData(search, page);
      if (hits.length === 0) {
        Notify.failure('Нічого не знайдено. Введіть актуальний запит!');
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmit = querySearch => {
    if (querySearch.trim() === '') {
      Notify.failure('Введіть дані!');
    } else if(querySearch !== search) {
      setImages([]);
      setPage(1);
      setSearch(querySearch);
    }
  };

  const onHandleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage(largeImageURL);
  };

  const totalPage = Math.ceil(total / 12);
    return(
      <div>
      <SearchBar onSubmit ={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images ={images} toggleModal={toggleModal}/>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPage > page && (
      <Button onHandleMoreButton={onHandleLoadMore}/>  
      )}
      {showModal && (
      <Modal closeModalTrigger ={toggleModal} image = {selectedImage}/>
      )}
      </div>
   
    );
  }
