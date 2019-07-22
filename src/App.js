import React, { Component } from 'react';

import firebase from './firebase';

import Post from './Post';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'toastr/build/toastr.min.css';
// import 'react-dropzone-component/styles/filepicker.css';
// import 'dropzone/dist/min/dropzone.min.css';
// function PrivateRoute({ component: Component, authed, ...rest }) {
//   return (

//     <Route
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props} />
//         : <Redirect to="/" />
//       }
//     />
//   )
// }




class App extends Component {


  // componentDidMount() {
  //   var token;
  //   const userId = firebase.auth().currentUser;
  //   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
  //     console.log(user);
  //     if (user) {
  //       this.props.dispatch({ type: 'AUTHED_TRUE' });
  //     } else {
  //       this.props.dispatch({ type: 'AUTHED_FALSE' });
  //     }
  //   })
  // }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Post} />
          </div>
        </Router>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authed: state.authed
})

export default connect(mapStateToProps)(App);
