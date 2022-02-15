import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../index.css';




class Formulaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            prenom: "",
            dateNaiss: Date,
            email: "",
            maladie: "",
            nomAgent: "",
            prenomAgent: "",
            emailAgent: ""

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(response => response.json())
            .then(json => this.setState({ knownAddresses: json }));
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify(this.state);
        console.log(data);
    }

    handleInputChange(event) {
        name =  event.target.name
        this.setState({
            [name]: event.target.value
        });
    }
    render() {
        return (
            <div>
                <Header />
                <br />
                <Form className='formulaire' onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3 group ">
                        <Form.Label className="label ">ETAT - CIVIL</Form.Label>
                        <Form.Control className="input" name='nom' value={this.state.nom}
                            type="text" onChange={this.handleInputChange} placeholder=" Nom" />
                        <Form.Control className="input" name='prenom' value={this.state.prenom}
                            type="text" onChange={this.handleInputChange} placeholder=" Prenom : " />
                        <Form.Control className="input" name="dateNaiss" value={this.state.dateNaiss}
                            onChange={this.handleInputChange}
                            type='date' placeholder=" Date de naissance " />
                        <Form.Control className="input" name='email' value={this.state.email}
                            type='email' onChange={this.handleInputChange} placeholder=" Email : ckationan@gmail.com" />
                    </Form.Group>

                    <Form.Group className="mb-3 group">
                        <Form.Label className="label">ETAT DE SANTE | RESULTAT DU TEST</Form.Label>
                        <Form.Select className="input" name='maladie' value={this.state.maladie}
                            onChange={this.handleInputChange}>
                            <option  >choisir la maladie</option>
                            <option>COVID-19</option>
                            <option>RUHME</option>
                        </Form.Select>
                        <Form.Control className="input" name='dateCons' value={this.state.dateCons}
                            type='date' onChange={this.handleInputChange} placeholder="Date de consultation" />

                    </Form.Group>
                    <Form.Group className="mb-3 group">
                        <Form.Label className="label">INFORMATIONS AGENT DE SANTE</Form.Label>
                        <Form.Control className="input" name="nomAgent" value={this.state.nomAgent}
                            type='text' onChange={this.handleInputChange} placeholder=" Nom" />
                        <Form.Control className="input" name="prenomAgent" value={this.state.prenomAgent}
                            type='text' onChange={this.handleInputChange}   placeholder=" Prenom : " />
                        <Form.Control className="input" name="emailAgent" value={this.state.emailAgent} 
                        id="emailAgent" onChange={this.handleInputChange} placeholder=" Email : agent@gmail.com" />
                    </Form.Group>

                    <Button className='bouton' variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
                <div>
                    {JSON.stringify(this.state)}
                </div>
            </div>

        )
    }
}
export default Formulaire;