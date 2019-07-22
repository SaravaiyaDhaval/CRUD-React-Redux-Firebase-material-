import React, { Component } from 'react';
import firebase from './../firebase';
import { Redirect } from 'react-router-dom';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
} from "mdbreact";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            page: 'signin',
            isAutheticated: "false"
        };
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    componentWillReceiveProps = () => {
        let { page, isAutheticated } = this.props;
        if (page) {
            this.setState({
                page,
                isAutheticated
            })
        }
    }
    componentWillMount() {
        let { page, isAutheticated } = this.props;
   
        if (page) {
            this.setState({
                page,
                isAutheticated
            })
        }
        
    }
    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            <Redirect to="/" />
        }).catch(() => {
            console.log('Error happened')
        })
        localStorage.removeItem('uid');
    }
    render() {
        let { page, isAutheticated } = this.state;
        return (
            <div>
                <MDBNavbar color="indigo" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text">React Redux</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            {isAutheticated === "false" &&
                                <MDBNavItem active={page === "signin" && true}>
                                    <MDBNavLink to="/">Sing In</MDBNavLink>
                                </MDBNavItem>}
                            {isAutheticated === "false" &&
                                <MDBNavItem active={page === "signup" && true} >
                                    <MDBNavLink to="/signup">Sign Up</MDBNavLink>
                                </MDBNavItem>}
                            {isAutheticated === "true" && <MDBNavItem onClick={this.handleLogout} >
                                <MDBNavLink to="/">Logout</MDBNavLink>
                            </MDBNavItem>}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
}

export default Header;
