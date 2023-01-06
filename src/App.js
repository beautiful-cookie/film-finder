import './App.css'; 
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie'; 


function App() { 
  return (
    <div className='app-wrapper'>
      <Header /> 
      <div className='movieWrapper'>
        <Movie />  
        <Movie />  
        <Movie />  
        <Movie />  
        <Movie />  
        <Movie />  
        <Movie />  
      </div> 
    </div> 
  );
}

export default App;
