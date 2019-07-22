import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from './firebase';
import Header from './Components/header';
import { MDBInput, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBBtn, MDBAlert } from "mdbreact";

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            userAuth: {
                userEmail: "",
                userPassword: ""
            },
            alerActive:false
        };
    }

    componentWillMount() {
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push('/home');
            }
        })
    }

    handleSubmit = (e) => {
        let { userAuth } = this.state;
        this.setState({
            alerActive: true
        })
        setTimeout(() => this.setState({
            alerActive: false
        }),5000)

        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        e.preventDefault();
        e.target.className += " was-validated";
        const email = userAuth && userAuth.userEmail
        const password = userAuth && userAuth.userPassword
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
            this.props.history.push('/home');
        }).catch((error) => {
            this.props.dispatch({ type: 'ERROR_RECEIVED', message: error.message })
        })
    }

    changeHandler = event => {
        let { userAuth } = this.state;
        this.setState({
            userAuth: {
                ...userAuth,
                [event.target.name]: event.target.value
            }
        });
    };

    render() {
        let { userAuth, alerActive } = this.state;
        return (
            <div>
                <Header page="signin" isAutheticated="false"></Header>
                <MDBContainer className="section-preview d-flex justify-content-center">
                    <MDBCard style={{ width: "50%", marginTop: "1rem" }}>
                        <MDBCardHeader color="indigo">Sign In</MDBCardHeader>
                        <MDBCardBody>
                            {this.props.errors.message && alerActive && <MDBAlert color="danger">
                                {this.props.errors.message}
                            </MDBAlert>}
                            <form className="needs-validation" onSubmit={this.handleSubmit} noValidate >
                                <MDBInput label="E-mail " name="userEmail" onChange={this.changeHandler} value={userAuth && userAuth.userEmail} type="text" placeholder="Enter email" background icon="envelope" required />
                                <MDBInput label="Password" name="userPassword" onChange={this.changeHandler} value={userAuth && userAuth.userPassword} type="password" placeholder="Enter password" background icon="lock" required />
                                <MDBBtn color="indigo" type="submit" className="fullWidth">Sign In</MDBBtn>
                            </form>
                            <p className="sub-text center">Don't have an account ? <Link to="/signup">Sign Up</Link></p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default withRouter(connect(mapStateToProps)(LogIn));