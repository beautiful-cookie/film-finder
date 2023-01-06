import classes from './Header.module.css'; 

const Header = (props) => {
    return (
        <header className={classes.headerWrapper}> 
            <span className={classes.logo}>Кино</span> 
            <div className={classes.headerElementsLogo}> 
              <span className={classes.logoElement}>Главная</span>
              <span className={classes.logoElement}>Поле 1</span>
              <span className={classes.logoElement}>Поле 2</span>
            </div> 
        </header> 
    )
} 

export default Header; 