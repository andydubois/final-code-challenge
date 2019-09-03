import React, { Component } from "react";
import { connect } from "react-redux";

// DO NOT MODIFY THIS FILE FOR BASE MODE!

class AddAnimalForm extends Component {
  state = {
    species: "",
    class: 0,
  };

  handleChange = (property, event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
    console.log(this.state);
  };

handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch({
        type: "ADD_ANIMAL",
        payload: this.state
    });
    console.log(this.state)
}


  // Renders the list of animals
  render() {
    return (
      <div>
        <h3>Add a new animal to the zoo here!</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='Add animal here'
            onChange={event => this.handleChange("species", event)}
          />
          <br />
          <input
            type='radio'
            name='class'
            value='5'
            onChange={event => this.handleChange("class", event)}
          />{" "}
          Amphibian
          <input
            type='radio'
            name='class'
            value= '2'
            onChange={event => this.handleChange("class", event)}
          />{" "}
          Bird
          <input
            type='radio'
            name='class'
            value='1'
            onChange={event => this.handleChange("class", event)}
          />{" "}
          Mammal
          <input
            type='radio'
            name='class'
            value='3'
            onChange={event => this.handleChange("class", event)}
          />{" "}
          Fish
          <input
            type='radio'
            name='class'
            value='4'
            onChange={event => this.handleChange("class", event)}
          />{" "}
          Reptile
          <button type='submit'>Click to Submit</button>
        </form>
      </div>
    );
  }
}

// Makes our reducers available in our component
const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(AddAnimalForm);
