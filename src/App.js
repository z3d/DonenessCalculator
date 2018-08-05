import React, { Component } from 'react';
import './App.css';
import * as Data from './data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Meat doneness calculator</h1>
          <MeatChooser />
        </header>
      </div>
    );
  }
}

class MeatChooser extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MeatTypeChooser onChange={this.changeMeatType} />
        <DonenessChooser onChange={this.changeDoneness} doneesses={Data.doneness} />
        <TemperatureTarget target={"x to y"} />
      </div>)
  }
}

const DonenessChooser = (props) => {
  const handleChange = e => {
    props.onChange(e.target.value);
  }

  return (
    <select onChange={handleChange}>{
      props.doneesses.map((doneness) => <option key={doneness.name} value={doneness.name}>{doneness.text}</option>)
    }</select>)

}

const TemperatureTarget = (props) => {
  return <p>Target temperature is: {props.target} &deg;C</p>
}

const MeatTypeChooser = (props) => {
  const handleChange = (e) => props.onChange(e.target.value);

  return (<select onChange={handleChange}>{
    Data.meatTypes.map((meat) => <option key={meat.name} value={meat.name}>{meat.text}</option>)
  }</select>);

}

export default App;