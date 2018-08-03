import React, { Component } from 'react';
import './App.css';
import * as Data from './data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Meat doneness calculator</h1>
          <MeatChooser/>
        </header>      
      </div>
    );
  }
}

class DonenessCalculator
{
    static calculateTemperature(doneness, meatType){
      switch (meatType){
        case "beef":
        case "lamb":
        return Data.redMeatRanges[doneness];

        case "chicken":
        return Data.chickenRanges[doneness];

        case "patties":
        return Data.pattyRanges[doneness];
        default:
          return null;
      }
    }
}

class MeatChooser extends Component {
  initialDoneness = "rare"
  initialMeatType = "beef"

  constructor(props) {
    super(props);
    this.changeDoneness = this.changeDoneness.bind(this);
    this.changeMeatType = this.changeMeatType.bind(this);
    this.state = {targetDonenesses: Data.doneness, meatType: this.initialMeatType, targetDoneness: this.initialDoneness};
  }

  componentDidMount(){    
    let targetTemp = DonenessCalculator.calculateTemperature(this.state.targetDoneness, this.state.meatType)
    this.setState({targetTemperatureRange: targetTemp});
  }

  changeDoneness(doneness){
    this.setState({ targetDoneness: doneness});
    let targetTemp = DonenessCalculator.calculateTemperature(doneness, this.state.meatType)
    this.setState({targetTemperatureRange: targetTemp});
  }

  filterDonnessesForMeatType(meatType){
      if (meatType === "chicken" || meatType === "patties"){
        return Data.doneness.filter(d => d.name === "wellDone")
      }
      return Data.doneness;
  }

  changeMeatType(meatType){
    let targetDoneness = (meatType === "chicken" || meatType === "patties") ? "wellDone" : this.state.targetDoneness;
    this.setState({ targetDonenesses: this.filterDonnessesForMeatType(meatType), targetDoneness: targetDoneness});   

    let targetTemp = DonenessCalculator.calculateTemperature(targetDoneness, meatType);
    this.setState({targetTemperatureRange: targetTemp, meatType: meatType});
  } 
  
  render(){return (
      <div>
          <MeatTypeChooser onChange={this.changeMeatType}/>   
          <DonenessChooser onChange={this.changeDoneness} doneesses = {this.state.targetDonenesses}/>       
          <TemperatureTarget target={this.state.targetTemperatureRange}/>
      </div>)
    }
}

class DonenessChooser extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.props.onChange(e.target.value);
    }
    render(){
      return (
        <select onChange={this.handleChange}>{
           this.props.doneesses.map((doneness) => <option key={doneness.name} value={doneness.name}>{doneness.text}</option>)
         }</select>
     );
    }
}  

const TemperatureTarget = (props) =>
{
  return <p>Target temperature is: {props.target} &deg;C</p>
}

class MeatTypeChooser extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render(){
    return (
      <select onChange={this.handleChange}>{
        Data.meatTypes.map((meat) => <option key={meat.name} value={meat.name}>{meat.text}</option>)
      }</select>
   );
  }
}

export default App;
