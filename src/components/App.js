import React, { Component } from 'react';
import NumberKey from './number_key';
import numbers from './numbers';
import './App.css';

// should be able to use one component to render
// all 10 numbers
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayValue: 0,
      operator: '',
      operatorIsSet: false,
      storedValue: '',
      isDecimal: false
    };
  }

  inputDigit(digit){
    const { displayValue, operator, operatorIsSet, storedValue, isDecimal } = this.state;

    if (operatorIsSet){
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
        operatorIsSet: false
      });
    } else {
      this.setState ({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      });
    }
  }

  inputOperator(operator){
    const {displayValue} = this.state;

    this.setState({
      displayValue: '0',
      operator: operator,
      operatorIsSet: true,
      storedValue: displayValue,
      isDecimal: false
    });
  }

  calculate(){
    const {displayValue, operator, storedValue } = this.state;
    const nextValue = parseFloat(displayValue);

    const operations = {
      '/': (storedValue, displayValue) => storedValue / nextValue,
      '*': (storedValue, displayValue) => storedValue * nextValue,
      '+': (storedValue, displayValue) => storedValue + nextValue,
      '-': (storedValue, displayValue) => storedValue - nextValue
    }
    if(operator){
      const calculatedValue = operations[operator](storedValue, nextValue);

      this.setState({
        displayValue: calculatedValue,
        operator: '',
        operatorIsSet: false,
        isDecimal: calculatedValue  % 1 === 0 ? false : true
      });
    }
  }

  clearOperator(){
    this.setState({
      displayValue: '0'
    })
  }

  changeDecimal(dot){
    const { displayValue, isDecimal } = this.state;

      if(!isDecimal){
        this.setState({
          displayValue: displayValue + '.',
          isDecimal: true
        });
      }
  }

  render() {
    const nums = numbers.map((t) => (
      <button>{t}</button>
    ));

    const calcStyle = {background: '#999999'};

    return (
      <div className="App">
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <div className="display">
          {this.state.displayValue}
        </div>
        <div className="key-row">
          <button className="calc-key" onClick={() => {this.inputDigit(7)}}>7</button>
          <button className="calc-key" onClick={() => {this.inputDigit(8)}}>8</button>
          <button className="calc-key" onClick={() => {this.inputDigit(9)}}>9</button>
          <button className="calc-key" onClick={() => {this.clearOperator()}} style={calcStyle}>CE</button>
        </div>
        <div className="key-row">
          <button className="calc-key" onClick={() => {this.inputDigit(4)}}>4</button>
          <button className="calc-key" onClick={() => {this.inputDigit(5)}}>5</button>
          <button className="calc-key" onClick={() => {this.inputDigit(6)}}>6</button>
          <button className="calc-key" onClick={() => {this.inputOperator('/')}} style={calcStyle}>/</button>
        </div>
        <div className="key-row">
          <button className="calc-key" onClick={() => {this.inputDigit(1)}}>1</button>
          <button className="calc-key" onClick={() => {this.inputDigit(2)}}>2</button>
          <button className="calc-key" onClick={() => {this.inputDigit(3)}}>3</button>
          <button className="calc-key" onClick={() => {this.inputOperator('*')}} style={calcStyle}>X</button>
        </div>
        <div className="key-row">
          <button className="calc-key" onClick={() => {this.changeDecimal('.')}}>.</button>
          <button className="calc-key" onClick={() => {this.inputDigit(0)}}>0</button>
          <button className="calc-key" onClick={() => {this.calculate()}} >=</button>
          <button className="calc-key" onClick={() => {this.inputOperator('-')}}style={calcStyle}>-</button>
          <button className="calc-key" onClick={() => {this.inputOperator('+')}}style={calcStyle}>+</button>
        </div>
      </div>
    );
  }

  onInputChange(clickValue){
    this.setState({ clickValue });
  }

  onOneClick(clickValue){
    this.setState({ clickValue });
  }
}

export default App;
