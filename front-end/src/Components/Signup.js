import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faKey } from '@fortawesome/free-solid-svg-icons'


// import secureAxios from "./Axios";
import axios from 'axios'


function Signup(props) {
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (evt) => {
        const sendData = {
            username: evt.username,
            email:evt.email,
            password: evt.password
          }
        
        console.log("submit");

        
        axios.post('http://127.0.0.1:8000/users/',sendData)
        .then(res=>{
            console.log("user data",res.data)
            props.history.push("/");
        }

        ).catch(err=>{
            console.log(err)
        })

    };

    
    return (
        <div className="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                {" "}
                <br />
                <div>
                    <label id="icon" for="name"><FontAwesomeIcon icon={faUser}/>UserName : </label>
                    <input
                        className="texting"
                        type="text"
                        name="username"
                        placeholder="Enter Your Username"
                        ref={register({
                            required: { value: true, message: " *Full Name is Required " }
                        })}
                    /><br></br>
                    {errors.username && <span>{errors.username.message}</span>}
                    
                    <br />
                </div>
                <div>
                    <lable  for="name"><FontAwesomeIcon icon={faUser}/> E-Mail:  </lable>
                    <input
                        className="texting"
                        type="email"
                        name="email"
                        placeholder="Enter Email Id"
                        ref={register({
                            required: { value: true, message: " *Email Id is Required " },
                            pattern: {
                                value: /^[\w-\.]+@([\w]+\.)+[\w]+$/,
                                message: " *email is invalid"
                            }
                        })}
                    /><br></br>
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <br />
                <div>
                    <lable id="icon" for="name"><FontAwesomeIcon icon={faKey}/>Password : </lable>
                    <input
                        className="texting"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        ref={register({
                            required: { value: true, message: " *password is required " },
                            minLength: {
                                value: 3,
                                message: " *password should be more than 3 characters "
                            }
                        })}
                    /><br/>
                    {errors.password && <span>{errors.password.message}</span>}
                </div>{" "}
                <br />
                <button className="loginbutton" type="submit" >Sign_up</button>
            </form>
        </div>
    );
}


export default connect()(Signup);


// secureAxios
//       .post(
//         "/createuser/", postData,
//         {headers: {
//           'Content-Type': 'application/json'}
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         // props.signUpDetails({
//         //   password: evt.password,
//         //   username: evt.username,
//         //   email: evt.email
//         // }) 

//         props.history.push("/");
//       }).catch(err=>{
//         console.log(err)
//       })
//   };