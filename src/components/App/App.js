import React, { Component } from 'react';
import AnimalList from '../AnimalList/AnimalList'
import AddAnimalForm from "../AddAnimalForm/AddAnimalForm"
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className='App'>
        <header>
          <h1>Zoo Animals</h1>
          <h3>List of Species and Class</h3>
        </header>
        <AddAnimalForm />
        <br />
        <br />
        <AnimalList />
      </div>
    );
  }
}

export default App;
