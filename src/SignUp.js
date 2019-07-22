import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from './firebase';
import { connect } from 'react-redux';
import Header from './Components/header';
import { MDBInput, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBBtn, MDBAlert } from "mdbreact";

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            userAuth: {
                userEmail: "",
                userPassword: ""
            },
            alerActive: false
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
        e.preventDefault();
        this.setState({
            alerActive: true
        })
        setTimeout(() => this.setState({
            alerActive: false
        }),5000)

        const email = userAuth && userAuth.userEmail
        const password = userAuth && userAuth.userPassword
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('Signed In')
                this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
                this.props.history.push('/home');
            })
            .catch((error) => {
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
                <Header page="signup" isAutheticated="false"></Header>
                <MDBContainer className="section-preview d-flex justify-content-center">
                    <MDBCard style={{ width: "50%", marginTop: "1rem" }}>
                        <MDBCardHeader color="indigo">Sign Up</MDBCardHeader>
                        <MDBCardBody>
                        {this.props.errors && this.props.errors.message && alerActive && <MDBAlert color="danger">
                                {this.props.errors.message}
                            </MDBAlert>}
                            <form  className="needs-validation" onSubmit={this.handleSubmit} noValidate >
                                <MDBInput label="E-mail " name="userEmail" onChange={this.changeHandler} value={userAuth && userAuth.userEmail} type="text" placeholder="Enter email" background icon="envelope" required >
                                    {/* <div className="valid-tooltip">Looks good!</div>
                            <div className="invalid-tooltip">Please provide a valid Email</div> */}
                                </MDBInput>
                                <MDBInput label="Password" name="userPassword" onChange={this.changeHandler} value={userAuth && userAuth.userPassword} type="password" placeholder="Enter password" background icon="lock" required >
                                    {/* <div className="valid-tooltip">Looks good!</div>
                            <div className="invalid-tooltip">Please provide a valid Password</div> */}
                                </MDBInput>
                                <MDBBtn color="indigo" type="submit" className="fullWidth">Sign Up</MDBBtn>
                            </form>
                            <p className="sub-text center">Already have an account ? <Link to="/">Sign In</Link></p>
                            {/* {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null} */}
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
export default withRouter(connect(mapStateToProps)(SignUp));