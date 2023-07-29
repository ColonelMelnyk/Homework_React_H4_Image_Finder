import {React} from 'react';
import css from './image-finder-styles.module.css';
import PropTypes from 'prop-types';
export const Button =({onHandleMoreButton})=>{
    
    return(
        <div>
            <button className={css.load_more_button} type = "submit" onClick = {onHandleMoreButton}>Load More</button>
        </div>
    )
}
Button.propTypes ={
    onHandleMoreButton: PropTypes.func.isRequired,
}