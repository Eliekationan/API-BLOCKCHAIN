import React, { Component } from 'react';
import Blocks from './Blocks';
import logo from './assets/logo.png';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './admin/login';
import Footer from './Footer';
import Formulaire from './Formulaire';


class App extends Component {
  state = {
    keyRingInfo: {
      Address: "mon adresse",
      ToH: {}
    }
  };

  componentDidMount() {
    fetch('http://localhost:3000/api/keyRing-info').then(response => response.json())
      .then(json => this.setState({ keyRingInfo: json }));
  }
  render() {
    const { address, ToH } = this.state.keyRingInfo;
    return (
      <div>
        <Login />
        <img className='logo' src={logo}></img>
        <div>
          welcome to the Blockchain
        </div>
        <div>Adresse:{address}</div>
        <div>Token:{ToH.duration}</div>
        <hr/>
        <div><Link to="/enregistrement">Enrolement</Link></div>
        <div><Link to="/update_transaction">Mise à jour</Link></div>
        <div><Link to="/transaction">Declarer un cas</Link></div>
        <div><Link to="/login">Login</Link></div>
        
        
        
        

        <Footer />
      </div>

    )
  }
}
export default App;