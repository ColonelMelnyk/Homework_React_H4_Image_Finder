import {React, Component} from 'react';
import css from './image-finder-styles.module.css';
import PropTypes from 'prop-types';
export class SearchBar extends Component{
    state = {
        searchValue: ''
    }
    onHandleInput = event => {
        event.preventDefault();
        this.setState({searchValue: event.currentTarget.value });
    };
    onHandleSubmit = event =>{
        event.preventDefault();
       this.props.onSubmit(this.state.searchValue);
      
    };
    render(){
 return(
        <header >
        <form  className ={css.search_form} onSubmit ={this.onHandleSubmit}>
            <button type="submit" className={css.button} ><span >Search</span></button>
            <input
            className ={css.search_form_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange ={this.onHandleInput}
            />
        </form>
        </header>
        )
    }
}
SearchBar.propTypes ={
    onSubmit: PropTypes.func.isRequired,
}