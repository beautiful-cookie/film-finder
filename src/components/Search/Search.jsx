import classes from './Search.module.css'; 
import React, { useState } from "react"; 

const Search = (props) => { 
    const [searchValue, setSearchValue] = useState("") 

    const handleSearchInputValues = (event) => {
        setSearchValue(event.target.value) 
    }; 

    const resetInputField = () => {
        setSearchValue("") 
    }; 

    const callSearchFunction = (event) => { 
        event.preventDefault() 
        props.search(searchValue.trim()) 
        resetInputField() 
    }

    return ( 
        <form className={classes.searchWrapper}> 
            <input type="text" 
                placeholder="Поиск..." 
                value={searchValue} 
                onChange={handleSearchInputValues} 
                className={classes.search} /> 

            <input type="submit" onClick={callSearchFunction} value="Search" className={classes.inputBtn} />
        </form>
    )
} 

export default Search; 