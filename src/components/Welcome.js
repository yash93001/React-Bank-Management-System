import Footer from "./Footer";
import { Link } from 'react-router-dom';

//This comoponent loads up the welcome page once a user hits the website
const Welcome = () => {
    return (
        <div data-test="component-welcome" className=" h-100 w-100">
            <div className="container mh-100 mw-100 h-100 w-100">
                <div className="row  mh-100  bg-success welcome-img">
                    <nav className="navbar navbar-light ">
                        <div className="container-fluid">
                            <p className="h4">Cognizant</p>
                            <form className="d-flex">
                                <Link className="btn btn-success" to="/login">Sign In</Link>
                                <Link className="btn btn-success ms-3" to="/register">Sign Up</Link>
                            </form>
                        </div>
                    </nav>
                    <div className=" display-1 text-center">Make Your Dream Come True<br /> With US<br />  <br />  <br />
                        <p className="welcome-img-text h4">We Provide Loans at low Interest that will help you achieve your dreams</p>
                        <Link className="btn btn btn-primary" to="/register">Lets Get Started</Link>
                    </div>
                </div>
            </div>
            <div className="container ">
                <div className="row  justify-content-around">
                    <div className="col-lg-5 col-sm-6">
                        <div className="card">
                            <img src="https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Log in</h5>
                                <p className="card-text">Already a member then lets log in and continue with your journey</p>
                                <Link className="btn btn-primary" to="/login">Sign In</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="card">
                            <img src="https://theuniqueacademy.co.in/assets/images/test.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Register</h5>
                                <p className="card-text">Come join us and explore the wonderful deals that we have to offer</p>
                                <Link className="btn btn-primary" to="/register">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default Welcome