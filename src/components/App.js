import React, { Component } from 'react';
import NumberKey from './number_key';
import numbers from './numbers';
import './App.css';

// should be able to use one component to render
// all 10 numbers
class App extends Component {
  // construct(props){
  //   super(props);
  //   this.state = [];
  // }


  render() {
    const nums = numbers.map((t) => (
      <div>{t}</div>
    ));
    return (
      <div className="App">
        App Component
        {nums}
      </div>
    );
  }
}

export default App;
