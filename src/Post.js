import React, { Component } from 'react';
import AllPosts from './AllPosts.js'
import { connect } from 'react-redux';
import firebase from './firebase';
import {  Redirect } from 'react-router-dom';
import withAuthorization from './withAuthorization';
import generateId from './utils';
import { MDBInput, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBBtn, MDBRow, MDBCol,MDBAlert } from "mdbreact";
import Header from './Components/header';
class Post extends Component {
    constructor() {
        super();
        this.state = {
            post: {
                titleInput: "",
                messageInput: ""
            },
            alerActive: false
        };

    }
    componentDidMount() {
        const ref = firebase.database().ref('users/');
        this.props.dispatch({ type: 'LOADING_TRUE' });
        ref.on('value', snapshot => {
            if (snapshot.val() === null) {
                this.props.dispatch({ type: 'LOADING_FALSE' });
                return;
            }
            [...Object.values(snapshot.val())].map((post) => {
                this.props.dispatch({ type: 'ADD_POST', data: post })
                this.props.dispatch({ type: 'LOADING_FALSE' })
            })
        })

    }

    handleSubmit = (e) => {
        let { post, alert } = this.state;
        e.preventDefault();
        const title = post && post.titleInput;
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
        //validations
        this.setState({
            alerActive: true
        })
        setTimeout(() => this.setState({
            alerActive: false
        }),5000)
        const message = post && post.messageInput;
        if (title.length === 0 || title.length <= 5 || title.trim() === "") {
            this.props.dispatch({ type: 'POST_ERROR', alertType: "danger", message: 'Title has to be more than 5 characters' })
            return;
        }
       
        else if (message.length <= 10 || message.trim() === "") {
            
            this.props.dispatch({ type: 'POST_ERROR', alertType: "danger", message: 'Message has to be more than 10 characters' })
            return;
        }
        else{
            this.props.dispatch({ type: 'POST_SUCCESS', alertType: "success", message: 'Post has benn added Successfuly' })
        }

        //generate id
        const id = generateId();
        const newPost = {
            id,
            title,
            message,
            editing: false,
            alertMessage: ''
        }
        const postRef1 = firebase.database().ref('users/')
        const postKey = postRef1.push()
        const postRef = firebase.database().ref('users/' + postKey.key)
        const uid = firebase.auth().currentUser.uid
        postRef.set({
            id: id,
            title: title,
            message: message,
            editing: false,
            uid: uid,
            key: postKey.key,
            alertMessage: ''
        })

        if (this.props.posts.editing) {
            this.props.dispatch({
                type: 'ADD_EDIT_POST',
                data: newPost
            })
        }
        this.props.dispatch({
            type: 'ADDING_POST'

        })
        this.setState({
            post: {
                titleInput: "",
                messageInput: ""
            },
        })
    }
    changeHandler = event => {
        let { post } = this.state;
        this.setState({
            post: {
                ...post,
                [event.target.name]: event.target.value
            }
        });
    };

    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            <Redirect to="/" />
        }).catch(() => {
            console.log('Error happened')
        })
        localStorage.removeItem('uid');
    }

    render() {
        let { post, alert, alerActive } = this.state;
        let { errors } = this.props;
        return (
            <div className="post-grid">
                <Header page="post" isAutheticated="true" />
                <MDBRow className="m-l-r-0">
                    <MDBCol md="3" >
                        <form className="form" onSubmit={this.handleSubmit}>
                            <MDBContainer className="section-preview d-flex justify-content-center p-l-r-0">
                                <MDBCard style={{ width: "100%", marginTop: "1rem" }}>
                                    <MDBCardHeader color="indigo">Add Post</MDBCardHeader>
                                    <MDBCardBody>

                                        {/* <div className="logout-container">
                                            <h2 className="righter"></h2>
                                            <MDBBtn color="indigo" type="submit" onClick={this.handleLogout} >Logout</MDBBtn>
                                            <button className="logout" >Logout</button>
                                        </div> */}
                                        {/* <div className="first-stuff">
                                    <h2 className="post_heading">Post Content</h2>
                                </div> */}

                                        <div>
                                            {errors && errors.message && alerActive && <MDBAlert color={errors.alertType}>
                                                {errors && errors.message}
                                            </MDBAlert>}
                                            <MDBInput label="Title " name="titleInput" className="fullWidth" onChange={this.changeHandler} value={post && post.titleInput} type="text" placeholder="Enter title" background required />
                                            <MDBInput label="Message " name="messageInput" className="fullWidth" rows="2" onChange={this.changeHandler} value={post && post.messageInput} type="textarea" placeholder="Enter Message" background required />

                                            {/* <input required type="text" ref={(input) => this.titleInput = input} placeholder="Enter Title for Post"
                                            /><br /><br />
                                            <textarea required ref={(input) => this.messageInput = input} placeholder="Enter the post" cols="28" rows="5"></textarea><br /> */}
                                            {/* <button>Post</button> */}
                                            <MDBBtn color="indigo" type="submit" className="fullWidth m-0">Post</MDBBtn>

                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBContainer>
                        </form>
                    </MDBCol>
                    <MDBCol md="9">
                        <MDBContainer className="section-preview d-flex justify-content-center p-l-r-0">
                            <MDBCard style={{ width: "100%", marginTop: "1rem" }}>
                                <MDBCardHeader color="indigo">All Posts</MDBCardHeader>
                                <MDBCardBody>
                                    <AllPosts posts={this.props.posts} />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors

})
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(connect(mapStateToProps)(Post));