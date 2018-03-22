import React, { Component } from 'react';
import NumberKey from './number_key';
import numbers from './numbers';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayValue: '0',
      operator: '',
      operatorIsSet: false,
      storedValue: '0',
      isDecimal: false,
      justCalculated: false
    };
  }

  inputDigit(digit){
    const { displayValue, operator, operatorIsSet, storedValue, isDecimal, justCalculated } = this.state;

    if(justCalculated){
      this.setState({
        displayValue: String(digit),
        justCalculated: false
      });
    } else if(operatorIsSet){
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : String(displayValue) + String(digit),
        operatorIsSet: false
      });
    } else {
      this.setState ({
        displayValue: displayValue === '0' ? String(digit) : String(displayValue) + String(digit)
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
    const displayValueFloat = parseFloat(displayValue);
    const storedValueFloat= parseFloat(storedValue);

    const operations = {
      '/': (storedValueFloat, displayValueFloat) => storedValueFloat / displayValueFloat,
      '*': (storedValueFloat, displayValueFloat) => storedValueFloat * displayValueFloat,
      '+': (storedValueFloat, displayValueFloat) => storedValueFloat + displayValueFloat,
      '-': (storedValueFloat, displayValueFloat) => storedValueFloat - displayValueFloat
    }
    if(operator){
      const calculatedValue = operations[operator](storedValueFloat, displayValueFloat);

      // if (String(calculatedValue).length > 5){
      //   let calculatedValueString = calculatedValue.slice(0, 4);
      // }

      console.log(calculatedValue);

      const calcValueString = String(calculatedValue);
      console.log(typeof calcValueString);
      const smallCalcValue = calcValueString.slice(0, 10);
      console.log(smallCalcValue);


      this.setState({
        displayValue: smallCalcValue,
        operator: '',
        operatorIsSet: false,
        isDecimal: calculatedValue  % 1 === 0 ? false : true,
        justCalculated: true,
        storedValue:  String(calculatedValue)
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

    return (
      <div className="App">
        <div className="display">
          {this.state.displayValue}
        </div>
        <div className="key-pad">
          <div className="number-keys" style={{border: '0'}}>
            <div className="key-row" style={{height: '75px'}}>
              <button className="calc-key" onClick={() => {this.inputDigit(7)}}>7</button>
              <button className="calc-key" onClick={() => {this.inputDigit(8)}}>8</button>
              <button className="calc-key" onClick={() => {this.inputDigit(9)}}>9</button>
            </div>
            <div className="key-row" style={{height: '75px'}}>
              <button className="calc-key" onClick={() => {this.inputDigit(4)}}>4</button>
              <button className="calc-key" onClick={() => {this.inputDigit(5)}}>5</button>
              <button className="calc-key" onClick={() => {this.inputDigit(6)}}>6</button>
            </div>
            <div className="key-row" style={{height: '75px'}}>
              <button className="calc-key" onClick={() => {this.inputDigit(1)}}>1</button>
              <button className="calc-key" onClick={() => {this.inputDigit(2)}}>2</button>
              <button className="calc-key" onClick={() => {this.inputDigit(3)}}>3</button>
            </div>
            <div className="key-row" style={{height: '75px'}}>
              <button className="calc-key" onClick={() => {this.changeDecimal('.')}}>.</button>
              <button className="calc-key" onClick={() => {this.inputDigit(0)}}>0</button>
              <button className="calc-key" onClick={() => {this.calculate()}} >=</button>
            </div>
          </div>
          <div className="right-key-items" style={{border: 'none'}}>
            <button className="calc-key" style={{background: '#999999'}} onClick={() => {this.clearOperator()}}>CE</button>
            <button className="calc-key" style={{background: '#999999'}} onClick={() => {this.inputOperator('/')}}>/</button>
            <button className="calc-key" style={{background: '#999999'}} onClick={() => {this.inputOperator('*')}}>X</button>
            <button className="calc-key" style={{background: '#999999'}} onClick={() => {this.inputOperator('-')}}>-</button>
            <button className="calc-key" style={{background: '#999999'}} onClick={() => {this.inputOperator('+')}}>+</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
