import  { Component } from "react";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

//This comoponent loads up the dashboard of user after they login
class Dashboard extends Component{

    render(){
        return(
            <div  data-test="component-Dashboard">
                <Helmet>
                <style>{'body { background-image: url("https://images.unsplash.com/photo-1614850523060-8da1d56ae167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb3JmdWwlMjBsaWdodGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80");background-size: cover;background-repeat: no-repeat;height: 100%; font-family: "Numans", sans-serif; }'}</style>
            </Helmet>
                <div className="  h-100 w-100">
                <div className="container mh-100 mw-100 h-100 w-100">
                
                <h1 className="inner mt-5">Welcome {this.props.currentUser.FullName} </h1>
                <div className="d-flex justify-content-center"><Link className="btn btn-primary"  to= {`/${this.props.currentUser.CustomerId}/viewLoans`}>View Apllied Loans</Link>
                </div>
                <br/> <br/>
                <button className = "btn btn-success float-left topcorner" onClick={this.props.onLogOut}>Log out</button> <br/>
                </div>
                </div>
                <div className="container ">
                    <div className="row  justify-content-around">
                        <div className="col-lg-5 col-sm-4">
                            <div className="card">
                                <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ2lufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 " className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Edit your Settings</h5>
                                    <p className="card-text">You can change your account information here.</p>
                                    <Link className = "btn btn-success" to= {`/${this.props.currentUser.CustomerId}/ChangeDetails`}>Change Settings</Link> <br/> <br/>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-4">
                            <div className="card h-100">
                                <img src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXIlMjB3b3JrfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Loan Application</h5>
                                    <p className="card-text">Provising Loan at lowest interest in the market and taking you one step closer to your dream. </p>
                                    <Link className = "btn btn-success" to= {`/${this.props.currentUser.CustomerId}/ApplyLoan`}> Apply for Loan</Link>  
                                </div>
                            </div>
                        </div>
                        
                
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Dashboard