import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import { Form, Button } from 'react-bootstrap';
import '../index.css';
import Token from "../../../src/Tokens";
import { transform } from "babel-core";

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:{},
            nom: "",
            prenom: "",
            email: "",
            date_naiss: "",
            etatDeSante: ""

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    prod = () => {
        return new Date();
    }
    exp = () => {
        const inter = this.prod.getDate();
        return new Date().setDate(inter + this.state.token.duration);
    }
    createToken = () => {
        const token = new Token({name:"ToH", text:this.state});
        this.state.token = token;
        
    }
    conductTransaction=()=>{
        const token = this.createToken;
        fetch(`${document.location.origin}/api/transact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({text:this.createToken})
        }).then(response => response.json())
          .then(json => {
            alert(json.message || json.type);
            this.confirmTransaction;
        });
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }
    confirmTransaction = ()=>{
        fetch(`${document.location.origin}/api/mine-transactions`)
        .then(response => {
          if (response.status === 200) {
            alert('success');
            history.push('/transaction');
          } else {
            alert('The mine-transactions block request did not complete.');
          }
        });
    }
    render() {
        return (
            <div>
                <Header />
                <br />
                <Link to="/"></Link>
                <div className='container'>

                    <Form.Control className="form-control input" name='nom' value={this.state.nom}
                        type='text' onChange={this.handleInputChange} placeholder=" " />
                    <Form.Control className="form-control" name='prenom' value={this.state.prenom}
                        type='text' onChange={this.handleInputChange} placeholder="Prenom" />
                    <Form.Control className="form-control" name='email' value={this.state.email}
                        type='text' onChange={this.handleInputChange} placeholder="Email" />
                    <Form.Control className="form-control" name='date_naiss' value={this.state.date_naiss}
                        type='date' onChange={this.handleInputChange} placeholder=" Date de Naiss" />
                    <Form.Select className="input form-control" name='etatDeSante' value={this.state.etatDeSante}
                        onChange={this.handleInputChange}>
                        <option  >choisir le staut</option>
                        <option>POSITIF</option>
                        <option>NEAGTIF</option>
                    </Form.Select>
                </div>
                <br />
                <div className='container'>
                    <Button onClick={this.conductTransaction} className='bouton' variant="primary" type="submit" >
                        Submit
                    </Button>
                </div>
                <div className='container'>
                    <Button onClick={this.createToken} className='bouton' variant="primary" type="submit" >
                        Retour
                    </Button>
                </div>
                {JSON.stringify(this.state.nom)}
            </div>
        )
    }
    // creation d'un nouveau keyRing (adresse public, son satut)
    //creation d'un nouvelle transaction (adresse du textinateur, token)
    //renvoyer les informations (adresse) a l'utilisateur;
    /**
     *  token: {
                duration: 14,
                name:"ToH",
                prod: this.prod,
                exp: this.exp,
                text:{
                    nom:"",
                    prenom:"",
                    email:"",
                    date_naiss:"",
                    etatDeSante:""
                }
            }
     */
}
export default Transaction