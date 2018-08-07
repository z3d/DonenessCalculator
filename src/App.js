import React, { Component } from 'react';
import './App.css';
import * as Data from './data';
import { connect } from "react-redux";
import { changeDoneness, changeMeatType } from "./actions/index";
import { SelectButton } from 'primereact/selectbutton';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const mapStateToProps = state => {
  return { targetTemperatureRange: state.targetTemperatureRange, doneesses: state.donenesses, meatType: state.meatType };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMeatType: meatType => dispatch(changeMeatType(meatType)),
    changeDoneness: doneness => dispatch(changeDoneness(doneness))
  };
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Meat doneness calculator</h1>
          <Chooser />
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
        <MeatTypeChooser onChange={this.props.changeMeatType} meatType = {this.props.meatType} />
        <DonenessChooser doneesses={this.props.doneesses} onChange={this.props.changeDoneness} />
        <TemperatureTarget target={this.props.targetTemperatureRange} />
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
  return <SelectButton optionLabel="text" value={props.meatType} options={Data.meatTypes} onChange={(e) =>  props.onChange(e.value.name)}></SelectButton>
}

const Chooser = connect(mapStateToProps, mapDispatchToProps)(MeatChooser);

export default App;