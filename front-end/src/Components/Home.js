import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { connect } from "react-redux";



function Home(props) {

   
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" className="Navbar">
        <Navbar.Brand href="#">BLOGGER APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {!props.bearer_token ? (
              <NavItem className="my-auto mx-3">
                <Link to="/">LOGIN</Link>
              </NavItem>
            ) : (
              <>
                <NavItem className="my-auto mx-3">
                  <Link to="/blog">Blogs</Link>
                </NavItem>

                {props.bearer_token && <button className="btn btn-lg btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBlog" > Create Blog</button>}
                
              </>

            )}
          </Nav>
          <Nav>
            <li className="nav-itrm">
            <NavItem className="my-auto mx-3">
              {props.bearer_token && `HELLO
              ${props.show_blogger}`}
            </NavItem>
            </li>

            {props.bearer_token ? (
              <NavItem className="my-auto mx-3">
                <Link to="/logout">LOGOUT</Link>
              </NavItem>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header">
        <h1>Blogger APP</h1>
        <h6>React-django</h6>
        
      </div>
    </div>
  );
}

const mapStateToProps = (state,props) => {
  return {
    state,
    show_blogger:state.username,
    bearer_token: state.blogger_token != null ? true : false
  }
}




export default connect(mapStateToProps, null)(Home);
