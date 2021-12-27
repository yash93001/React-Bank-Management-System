import { useState } from "react";
import { Helmet } from 'react-helmet';
import { FcGoogle } from "react-icons/fc";
import {Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//Props data type
type Props = {
    users: any,
    history: any,
    onLogin: any
}

//This comoponent deals with user login
const Login = ({ users, history, onLogin }: Props) => {
    //This variable is initialized when entered Customer ID is not found
    const [customerIDError, showCustomerIdError] = useState<null | String>(null);
    //This varibale is initialized when entered password doesn't match with the password associated with the Customer ID
    const [passwordError, showPassworddError] = useState<null | String>(null);
    const { loginWithRedirect } = useAuth0();

    //This function handles the event that takes places after "login" submit button is clicked
    const loginSubmitHandler = (event: any) => {
        event.preventDefault();
        const customerID: string = event.target.CustomerID.value;
        const password: string = event.target.password.value;
        var flag: boolean = true;
        var flag2: boolean = true;
        var currentUser: any;
        var index: any;
        //Initially both customer and password error are initialized as null 
        showCustomerIdError(null);
        showPassworddError(null);
        //First it is checked whether the Customer ID entered by user exsists or not and if it does exsists then password of that Customer ID is 
        //matched with the password given by user
        for (const user in users) {
            if (users[user].CustomerId === customerID) {
                if (users[user].Password === password) {
                    currentUser = users[user];
                    flag = false;
                    index = user;
                }
                else {
                    showCustomerIdError(null);
                    flag2 = false;
                    //Password mismatch so passwordError state variable is initialized
                    showPassworddError("This Password is not correct");
                }
                break
            }
        }
        if (flag) {
            if (flag2) {
                //Customer ID doesn't exsist so customerIDError state variable is initialized
                showCustomerIdError("This Customer Id does not exsist");
            }
        }
        else {
            const url: string = `/Dashboard`;
            onLogin(currentUser, url, index);
        }
    }

    return (
        <div data-test="component-login" className="container">
            <Helmet>
                <style>{'body { background-image: url("https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");background-size: cover;background-repeat: no-repeat;height: 100%; font-family: "Numans", sans-serif; }'}</style>
            </Helmet>
            <Link className="btn btn-primary inner mt-3" to='/'> BacK</Link>
            <div className="d-flex justify-content-center w-100 ">
                <div className="login_card">
                    <div className="card-header">
                        <div id="card_title" >Sign In</div>
                    </div>
                    <div className="card-body">
                        <form data-test="component-login-form" onSubmit={loginSubmitHandler}>
                            <div className="">
                            <label htmlFor="CustomerID" className="loginlabel" >Customer Id</label>
                            <input data-test="component-login-CustomerID" type="text" name="CustomerID"  className="form-control float-left" placeholder="Enter Customer ID" /><br />
                            <p data-test="component-login-CustomerID-error" className="loginerror">{customerIDError}</p>
                            </div>
                            <div className="form-group">
                            <label htmlFor="password" className="loginlabel">Password</label>
                            <input data-test="component-login-password" type="password" name="password" className="form-control" placeholder="Enter Password" />
                            <p data-test="component-login-password-error" className="loginerror">{passwordError}</p><br />
                            </div>
                            

                            <div className="form-group">
                                <button  type="submit" className="btn float-right btn-primary">Sign In</button>
                                </div>
                                <br/>
                                
                                 
                        </form>
                        <button data-test="component-login-submit" onClick={() => loginWithRedirect({prompt: 'login' })} className="btn bg-light" ><FcGoogle/> Sign in with google</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Login