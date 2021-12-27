import  * as auth from "@auth0/auth0-react";
import { useState } from "react";

//This comoponent deals with auth0 authentication and login.
const LoginSocial = ({ users, onLogin })=>{
    //isAuthenticated signifies wether the given email address has loggen in or not.
    //User object includes information of user corresponding to the given email address.
    const { isAuthenticated ,user} = auth.useAuth0();
    const { logout } = auth.useAuth0();
    //This variable shows error if there is no user registered with the given email address.
    const [errorMssg, showErrorMssg] = useState(false);
    //This Function checks if a user is registered with the given email address, if so then it redirects to dashboard otherwise shows error.
    const loginWithGoogle= ()=>{
        var flag = true;
        for(const val in  users){
            if(user.email=== users[val].Email){
                const url = `/Dashboard`;
                onLogin( users[val],url,val);
                flag = false;
            }
        }
        
        if(flag)
        showErrorMssg(true);
    }
    return(
        <div data-test='component-LoginSocial' className="w-50 ms-5 mt-5 logGoogle border border-secondary">
        
           
        {isAuthenticated && !errorMssg ? loginWithGoogle():  <p data-test='component-LoginSocial-wait' >"Wait Checking With our Server......"</p>}
        <br/>

        {errorMssg&&
            <div className="ms-5 mb-2">
                <h4>No registration found with this email</h4><br/>
                <button data-test="component-LoginSocial-bttn" className="btn btn-danger" onClick={() => logout()}>Log Out </button>
                                
            </div>
        }
        </div>
    )
}

export default LoginSocial