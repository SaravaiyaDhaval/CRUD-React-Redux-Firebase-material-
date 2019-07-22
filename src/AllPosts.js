import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EditComponent from './EditComponent';
import firebase from './firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {  MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBCardFooter, MDBBtn, MDBRow, MDBCol, MDBIcon } from "mdbreact";

class AllPosts extends Component {
    handleDelete = (post) => {
        this.props.dispatch({ type: 'DELETE', id: post.id })
        const ref = firebase.database().ref('users/' + post.key).
            ref.remove();
    }

    render() {
        console.log(this.props.posts)
        return (
            <div >
                {/* <h2 className="all_post_heading">All Posts</h2> */}
                {this.props.loading ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : null}
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <MDBRow>
                        {this.props.posts.map((post) => (

                            post.editing ? <EditComponent key={post.id} post={post} /> :
                                (
                                    <MDBCol md="4" key={post.id}>
                                        <MDBContainer className="section-preview d-flex justify-content-center p-l-r-0">
                                            <MDBCard className="text-center" style={{ width: "100%", marginTop: "1rem" }}>
                                                <MDBCardHeader color="info-color">{post.title}</MDBCardHeader>
                                                <MDBCardBody>
                                                    <div>
                                                        <p >{post.message}</p>
                                                    </div>
                                                </MDBCardBody>
                                                <MDBCardFooter >
                                                    <Fragment>
                                                        {firebase.auth().currentUser && firebase.auth().currentUser.uid === post.uid ?
                                                            <div>
                                                                <MDBBtn rounded type="submit" color="primary" type="submit" onClick={() => this.props.dispatch({ type: 'EDIT', id: post.id })}>Edit</MDBBtn>
                                                                <MDBBtn rounded type="submit" color="danger" onClick={() => this.handleDelete(post)}>Delete</MDBBtn>
                                                            </div>
                                                            :
                                                            <div >
                                                                <MDBBtn rounded outline color="info" >
                                                                    <MDBIcon size="1x" icon="user-lock" />
                                                                </MDBBtn>
                                                            </div>
                                                        }

                                                    </Fragment>
                                                </MDBCardFooter>

                                            </MDBCard>
                                        </MDBContainer>
                                    </MDBCol>
                                )
                        ))}
                    </MDBRow>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loading: state.loading
})
export default connect(mapStateToProps)(AllPosts);