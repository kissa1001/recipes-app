import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

const App = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);

  const childProps = {
    authenticated,
    setAuthenticated
  };

  const handleLogout = async () => {
    await Auth.signOut();
    setAuthenticated(false);
    props.history.push("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        await Auth.currentSession();
        setAuthenticated(true);
      } catch (e) {
        if (e !== "No current user") {
          alert(e);
        }
      }
      setAuthenticating(false);
    })();
  }, []);

  return (
    !authenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="cursive">
                Yummly
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {authenticated ? (
                <NavItem onClick={handleLogout}>Logout</NavItem>
              ) : (
                <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    )
  );
};

export default withRouter(App);
