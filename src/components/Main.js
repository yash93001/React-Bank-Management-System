import React from "react";
import Login from "./Login.tsx";
import Form from "./Form";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import { Route, Redirect, HashRouter as Router, } from 'react-router-dom';
import ApplyLoan from './ApplyLoan';
import ViewLoan from './ViewLoan';
import { withAuth0 } from '@auth0/auth0-react';
import LoginSocial from './LoginSocial';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Actions/actions'
import { withRouter } from 'react-router'

//This comoponent intiailizes the state and handles routing
export class UnconnectedMain extends React.Component {
    constructor() {
        super();
        //currentUser consist details of logged in user
        //authenticated signifies whether a user has loggein or not.
        //index- index of array at which current user is stored in db.
        this.state = {
            currentUser: null,
            authenticated: false,
            index: null,
        }
    }

    //All the registered user details gets loaded up and if a user is logged in then current user is initialized.
    componentDidMount() {
        this.props.startLoadingUsers()
        if (this.state.index != null) {
            this.setState({
                currentUser: this.props.users[this.state.index]
            })
        }
    }

    //After succcessful login, authenicated state variable is set true and current user and index is initialized.
    authenticateUser(user, url, history, val) {
        this.setState({
            currentUser: user,
            authenticated: true,
            index: val,
        }, () => {
            history.push(url);
        }
        )
    }

    //Change currentUser Details after any update operation.
    updateCurrentUser(index, url, history) {
        this.props.startLoadingUsers().then(() => {
            this.setState({
                currentUser: this.props.users[index]
            }, () => {
                history.push(url);
            })
        })
    }

    //After Logout all currentUser, authenticated and index are intialized to their default values.
    LogOut(history) {
        const { logout, isAuthenticated } = this.props.auth0;
        this.setState({
            currentUser: null,
            authenticated: false,
            index: null,
        }, () => {
            if (isAuthenticated) {
                logout();
            }
            else
                history.push('/');
        })
    }

    render() {
        return (
            <div data-test="component-Main" className="welcome">
                <Router>
                    <Route exact path="/" render={() => (
                        <Welcome />
                    )} />
                    <Route exact path="/login" render={({ history }) => (
                        <Login  {...this.props} onHistory={history} onLogin={(user, url, index) => {
                            this.authenticateUser(user, url, history, index);

                        }} />
                    )} />
                    <Route exact path="/login/google" render={({ history }) => (
                        <LoginSocial {...this.props} onLogin={(user, url, index) => {
                            this.authenticateUser(user, url, history, index);

                        }} />

                    )} />

                    <Route exact path="/register" render={({ history }) => (
                        <Form {...this.props} onHistory={history} />
                    )} />

                    <Route exact path="/Dashboard" render={(props) => (
                        this.state.authenticated ?
                            <Dashboard  {...this.state} onLogOut={() => {
                                this.LogOut(props.history);
                            }} /> :
                            <Redirect to='/login' />

                    )} />
                    <Route exact path="/:id/ApplyLoan" render={(props) => (
                        this.state.authenticated ?
                            <ApplyLoan {...props} startAddingLoan={this.props.startAddingLoan} onLogOut={() => {
                                this.LogOut(props.history);
                            }} {...this.state} onApplyLoan={(index, url) => {
                                this.props.startLoadingUsers().then(() => {
                                    this.updateCurrentUser(index, url, props.history);
                                })
                            }} /> :
                            <Redirect to='/login' />

                    )} />
                    <Route exact path="/:id/ChangeDetails" render={(props) => (
                        this.state.authenticated ?
                            <Form {...props} update={true} onLogOut={() => {
                                this.LogOut(props.history);
                            }} startAddingLoan={this.props.startAddingLoan} {...this.state} onUpdateDetails={(index, url) => {
                                this.props.startLoadingUsers().then(() => {
                                    this.updateCurrentUser(index, url, props.history);
                                })
                            }} /> :
                            <Redirect to='/login' />
                    )} />
                    
                    <Route exact path="/:id/viewLoans" render={(props) => (
                        this.state.authenticated ?
                            <ViewLoan {...props}{...this.state} /> :
                            <Redirect to='/login' />

                    )} />

                </Router>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)

}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(withAuth0(UnconnectedMain))))