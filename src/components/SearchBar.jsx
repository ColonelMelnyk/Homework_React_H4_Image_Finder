import {React,  useState} from 'react';
import css from './image-finder-styles.module.css';
import PropTypes from 'prop-types';
export const SearchBar = ({onSubmit})=>{
    const [value, setValue] = useState ('');
    
    const onHandleInput = event =>{
        event.preventDefault();
        const {value} = event.target
        setValue (value);
    };
    const onHandleSubmit = event =>{
        event.preventDefault();
        onSubmit(value);
    };
 return(
        <header >
        <form  className ={css.search_form} onSubmit ={onHandleSubmit}>
            <button type="submit" className={css.button} ><span >Search</span></button>
            <input
            className ={css.search_form_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange ={onHandleInput}
            />
        </form>
        </header>
        )
}
SearchBar.propTypes ={
    onSubmit: PropTypes.func.isRequired,
}