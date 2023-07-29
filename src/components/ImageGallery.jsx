import {React} from 'react';
import PropTypes from 'prop-types';
import css from './image-finder-styles.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
export const ImageGallery = ({images, toggleModal}) => {
   
        return(
            <ul className= {css.gallery}>
                {images.map((image, index) =>{
                    return( 
                    //Оскільки вибивало типову для реакта помилку про два однакові ключі елементів, хоча все працювало нормально в плані функціональності коду, 
                    //а збігів в ключах після перевірки масивів зображень я не знайшов, тож вирішив вирішити цю проблему стандартним шляхом - замінив ключі на індекси. 
                    //Проблема зникла. Щоправда тепер у зображень нема унікальних ключів, а лише порядкові індекси.
                        <ImageGalleryItem
                        image= {image}
                        key={index}
                        toggleModal={toggleModal}
                        />
                    );
                })}
            </ul>
        )
}
ImageGallery.propTypes ={
    images: PropTypes.arrayOf(
        PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
           })
    ).isRequired,
       toggleModal: PropTypes.func.isRequired,
}