import React, { Component } from 'react';
import Header from '../Header';
import Field from '../field';
import { Button , Form} from 'react-bootstrap';
import history from '../../history';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: "",
            password: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    handleInputChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }
    componentDidMount() {
        fetch(`${document.location.origin}/api/admin/user`).then(response => response.json()).
        then(json => this.setState({ users: json}));
    }
    knowUser = () => {
        this.verifyCredential();
    }
    verifyCredential() {
        for (let user of this.state.users){
            if(user.email === this.state.email){
                history.push('/dasboard');
            }
        }
    }

    render() {
        return (
            <div>
                <br/>
                <div className='container'>
                    <Form.Control className="form-control" name='email' value={this.state.email}
                            type='email' onChange={this.handleInputChange} placeholder=" Email : ckationan@gmail.com" />
                    <br/>
                    <Form.Control className="input" name='password' value={this.state.password}
                            type='text' onChange={this.handleInputChange} placeholder="........." />
                </div>
                <br />
                <div className='container'>
                    <Button onClick={this.knowUser} className='bouton' variant="primary" type="submit" >
                        Submit
                    </Button>
                </div>
                
            </div>
        )
    }
}
export default Login;