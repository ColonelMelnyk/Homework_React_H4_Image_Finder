import {React} from 'react';
import PropTypes from 'prop-types';
import css from './image-finder-styles.module.css';
export const ImageGalleryItem =({image, toggleModal}) =>{
const {webformatURL, tags, largeImageURL} = image;
const onHandleClickModal = () => {
    toggleModal(largeImageURL);
  };
    return(
        <li className={css.gallery_item}>
  <img className={css.gallery_item_img}  src={webformatURL} alt={tags} onClick ={onHandleClickModal} />
        </li>   
    )
}
ImageGalleryItem.propTypes = {
 image: PropTypes.shape({
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
 }).isRequired,
 toggleModal: PropTypes.func.isRequired,
}