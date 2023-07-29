import {React, Component} from 'react';
import PropTypes from 'prop-types';
import css from './image-finder-styles.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
export class ImageGallery extends Component{
    render(){
        return(
            <ul className= {css.gallery}>
                {this.props.images.map(image =>{
                    return(
                        <ImageGalleryItem
                        image= {image}
                        key={image.id}
                        toggleModal={this.props.toggleModal}
                        />
                    );
                })}
            </ul>
        )
    }
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