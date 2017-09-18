import React, { Component } from 'react';
import axios from 'axios'
import FontAwesome from 'react-fontawesome';
import './App.css';

class App extends Component {
  performClick(){
    axios.get(`http://${window.REMOTE_ADDR}/click`)
  }
  render() {
    return (
      <div className="App">
         <div onClick={()=> this.performClick()} className="send">
            <FontAwesome name='paper-plane' size="150px" />
         </div>
      </div>
    );
  }
}

export default App;
