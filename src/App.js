import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  
  const APP_ID = "04039e24";
  const APP_KEY = "2f72f2e2ced8f2ed790bbad7cf9c7662";

  const[recipes, setRecipes] = useState([]); 
  const[search, setSearch] = useState('');
  const[submit, setSubmit] = useState(' ');

  useEffect(() => {
    getRecipes();
  },[submit]);

  //fetch all the data
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${submit}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(search);
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="text" className="search-bar" value={search} onChange={handleChange} />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} 
                ingredients={recipe.recipe.ingredients}/>     
        ))}
        </div>
      
    </div>
  );
}

export default App;
