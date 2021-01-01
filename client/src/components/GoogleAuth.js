import React, { useEffect } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {connect} from 'react-redux';
import Button from "react-bootstrap/Button";
import {signIn, signOut} from '../actions';
import "./GoogleAuth.css";
import googleLogo from "../images/google.png";
const override = css`
  border-color: white;
`;

// Google Auth var
let auth ;
const GoogleAuth = (props) => {

  useEffect(() => {

    // load gapi at first render
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "524691230680-k27d7rjmum7od6kesb0ocohdrsiep822.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
           auth = window.gapi.auth2.getAuthInstance();
           onChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onChange);

        });
    });
  }, []);

  // code for adjusting button text
  const textAdjust = () => {
    switch (props.isSignedIn) {
      // At launch case
      case null:
        return null;
      case true:
        return <div>Sign Out </div>;
      default:
        return <div>Google Sign In </div>;
    }
  };
  const onChange = (isSignedIn) => {
    if(isSignedIn){
        props.signIn(auth.currentUser.get().getId());
    }
    else{
       props.signOut();
    }
  };

  // take action for sign in or sign out
  const onSignInOrOut = () => {
    if (props.isSignedIn) {
        auth.signOut();
    } else {
      auth.signIn();
    }
  };
  return (
    <div>
      <Button variant="danger" className="google-login" onClick={onSignInOrOut}>
        <div>{textAdjust()} </div>
        <div className={props.isSignedIn === null ? "d-flex" : "hide"}>
          <div>Loading</div>
        </div>
        <img
          src={googleLogo}
          alt="Google Login"
          className={props.isSignedIn === null ? "hide" : "d-flex"}
        />
        <div className="sweet-loading mt-1">
          <ClipLoader
            css={override}
            size={20}
            color={"cadetblue"}
            loading={props.isSignedIn === null}
          />
        </div>
      </Button>
    </div>
  );
};
const mapStateToProps = state =>{
    return {
        isSignedIn : state.auth.isSignedIn 
    }
}

export default connect(mapStateToProps, {
    signIn,
    signOut
}) (GoogleAuth);
