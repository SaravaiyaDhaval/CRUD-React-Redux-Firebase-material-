import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import firebase from './firebase';
import { MDBInput, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBCardFooter, MDBBtn, MDBCol, MDBAlert } from "mdbreact";

class EditComponent extends Component {
    constructor() {
        super();
        this.state = {
            post: {
                id: "",
                title: "",
                message: "",
                editing: "",
                errorMessage: "",
                uid: ""
            },
            alerActive: false
        };
    }

    componentWillReceiveProps() {
        let { post } = this.props;
        this.setState({
            post
        });
    }

    componentDidMount() {
        let { post } = this.props;
        this.setState({
            post
        });
    }

    handleFinalEdit = (e) => {
        e.preventDefault()
        let { post } = this.state;
        const title = post && post.title
        const message = post && post.message

        this.setState({
            alerActive: true
        })
        setTimeout(() => this.setState({
            alerActive: false
        }), 5000)
        this.props.dispatch({ type: 'CLEAR_ERROR', id: this.props.post.id })

        if (title.length === 0 || title.length <= 5 || title.trim() === "") {
            this.props.dispatch({
                type: 'POST_EDIT_ERROR', message: 'Title has to be more than 5 characters', id:
                    this.props.post.id
            })
            this.forceUpdate()
            return;
        }
        if (message.length === 0 || message.length <= 10 || message.trim() === "") {
            this.props.dispatch({
                type: 'POST_EDIT_ERROR', message: 'Message has to be more than 10 characters',
                id: this.props.post.id
            })
            this.forceUpdate()
            return;
        }

        this.props.dispatch({
            type: 'ADD_EDIT_POST',
            data: {
                id: this.props.post.id,
                title,
                message,
                editing: this.props.post.editing
            }
        })

        let updates = {}
        updates['users/' + this.props.post.key] = this.props.post;
        updates['users/' + this.props.post.key].title = title;
        updates['users/' + this.props.post.key].message = message;
        firebase.database().ref().update(updates)
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

    render() {
        let { post, alerActive } = this.state;
        return (
            <MDBCol md="4" >
                <form className="form" onSubmit={this.handleFinalEdit}>
                    <MDBContainer className="section-preview d-flex justify-content-center p-l-r-0">
                        <MDBCard className="text-center" style={{ width: "100%", marginTop: "1rem" }}>
                            <MDBCardHeader color="info-color">
                                Edit Post
                        </MDBCardHeader>
                            <MDBCardBody>
                                {this.props.post.errorMessage && alerActive && <MDBAlert color="danger" >
                                    {this.props.post.errorMessage}
                                </MDBAlert>}
                                <MDBInput label="Title " name="title" className="fullWidth" onChange={this.changeHandler} value={post && post.title} type="text" placeholder="Enter title" background required />
                                <MDBInput label="Message " name="message" className="fullWidth" rows="2" onChange={this.changeHandler} value={post && post.message} type="textarea" placeholder="Enter Message" background required />
                            </MDBCardBody>
                            <MDBCardFooter >
                                <Fragment>
                                    <MDBBtn type="submit" color="primary" >Save</MDBBtn>
                                </Fragment>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBContainer>
                </form >
            </MDBCol>
        );
    }
}
export default connect()(EditComponent);