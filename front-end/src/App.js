import React from "react";
import "./index.css";
import {  Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import Signup from "./Components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import "./footer.css";



export class App extends React.Component {
  render() {
    console.log(window.location, this.props)
    const { location: { pathname } } = this.props

    return (
      <div>

        <Home />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
        {pathname !== "/"  && <Footer />}

      </div>

    )
  }
}

export default withRouter(App)


