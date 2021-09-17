/*
Declaratively using Redirect
  1. You're given three components, App, Results and Form. Inside the 
  App component, creates two Routes. One that will render the Form component
  when the user is at '/' and the other which will render the Results component
  when the user is at '/results.

  2. Refactor the Form component so that when the user submits the form, 
    you redirect them (declaratively using <Redirect />) to the /results page.
*/

import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const submit = () => {
  // fake AF
  return new Promise((res) => {
    setTimeout(() => res(), 500);
  });
};

function Results() {
  return <h1>Mmmm. Thanks for submitting your favorite food.</h1>;
}

class Form extends React.Component {
  state = {
    name: "",
    food: "",
    submit: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    submit(this.state.name, this.state.food).then(() => {
      this.setState({ submit: true });
    });
  };
  render() {
    const { submit } = this.state;
    if (submit) return <Redirect to="/results"></Redirect>;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Your name
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
          />
        </label>
        <label>
          Favorite Food
          <input
            type="text"
            value={this.state.food}
            onChange={this.handleChange}
            name="food"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Form}></Route>
        <Route path="/results" component={Results}></Route>
      </Router>
    );
  }
}
