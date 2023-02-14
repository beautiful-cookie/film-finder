import classes from './Header.module.css'; 

const Header = (props) => {
    return (
        <header className={classes.headerWrapper}> 
            <span className={classes.logo}>Кино</span> 
            <div className={classes.headerElementsLogo}> 
              <span className={classes.logoElement} onClick={ () => {props.returnToMainpage('man')} }>Главная</span>
            </div> 
        </header> 
    )
} 

export default Header; 