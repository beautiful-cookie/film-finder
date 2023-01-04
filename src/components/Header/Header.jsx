import classes from './Header.module.css' 

const Header = (props) => {
    return (
        <header className={classes.headerWrapper}> 
            <span className={classes.logo}>Кино</span> 
            <span></span> 
        </header> 
    )
} 

export default Header; 