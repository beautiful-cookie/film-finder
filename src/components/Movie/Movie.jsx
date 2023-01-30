import React from 'react'; 
import classes from './Movie.module.css'; 

const DEFAULT_PLACEHOLDER_IMAGE  = 
'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpic.pikbest.com%2F01%2F77%2F96%2F38b888piCcZM.jpg-0.jpg!bw340&f=1&nofb=1&ipt=9c53cfddf65e5e134ec969563720728990f55f4f60279361f3dd8cabdd554343&ipo=images' 

const Movie = ({movie}) => { 

  const poster = 
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster 

    return (
      <div className={classes.posterWrapper}>
        <span className={classes.filmTitle}>{movie.Title}</span>
        <div className={classes.imgWrapper}>
          <img 
          src={poster} 
          alt="" /> 
        </div> 
        <span className={classes.date}>({ movie.Year })</span> 
      </div>
    ); 
} 

export default Movie; 