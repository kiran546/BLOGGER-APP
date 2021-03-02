import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
// import secureAxios from './Axios';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faKey } from '@fortawesome/free-solid-svg-icons';



// import Signup from "./Components/Signup"

function Login(props) {
  const { register, errors, handleSubmit } = useForm();


  const myProp = props.bearer_token
  useEffect(() => {
    if (props.bearer_token) {
        props.history.push('/blog')
        
    }
  }, [myProp])


    const onSubmit = (e) => {
        
        console.log(e, "details")
        const sendData = {
            username : e.username,
            password : e.password
        }
        
        axios.post('http://127.0.0.1:8000/api-token-auth/', sendData)
        .then((response) => {
            localStorage.setItem("username", e.username)
            console.log(response.data, "authentication");
            props.loginData(response.data);
            props.history.push('/blog');
        }).catch(err => {
            console.log(err,"401 unauthorised")
            alert("401 unauthorized ")
        })
    }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <br />
            <div>
            <label  for="name"><FontAwesomeIcon icon={faUser}/> Username : </label>
            <input
                className="texting"
                type="text"
                name="username"
                placeholder="Enter User Name"
                ref={register({
                required: { value: true, message: " *Username is Required " }
                })}
            />{" "}
            {errors.username && <span>{errors.username.message}</span>}
            <br />
            <br />
            </div>
            <div>
            <lable  for="name"><FontAwesomeIcon icon={faKey}/> Password : </lable>
            <input
                className="texting"
                type="password"
                name="password"
                placeholder="Enter your password"
                ref={register({
                required: { value: true, message: " *password is required " },
                minLength: {
                    value: 3,
                    message: " *password should abv 3 chars "
                }
                })}
            /><br/>{" "}
            {errors.password && <span>{errors.password.message}</span>}
            <br>
            </br>
            </div>
            <br />
            <br />
            <span className="newsignup">
            New user please signup?
            <Link className="colorme" to="/signup">
                {" "}
                Register{" "}
            </Link>
            </span>
            <br/>
            <br/>
            <button className="loginbutton" type="submit">Login</button>

           

        </form>

      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
    bearer_token: state.blogger_token != null ? true : false
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    loginData: (val) => dispatch({ type: "LOG_IN", payload: val })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);





// secureAxios
// .post(
//   "/login/", postData,
//   {headers: {
//     'Content-Type': 'application/json'}
//   }
// ).then((response) => {
//   console.log(response.data);
//   props.loginDetails({
//     password: evt.password,
//     username: evt.username
//   }) 

//   props.history.push("/blogPage");
// }).catch(err=>{
//   console.log(err)
// })
// };

