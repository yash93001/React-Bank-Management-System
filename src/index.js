import ReactDOM from 'react-dom';
import './styles/stylesheet.css'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './Reducers/reducer';
import {Provider} from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from 'history';

import './styles/form.css';

const onRedirectCallback = appState => {
    createBrowserHistory.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.href = `https://react-bank-system.herokuapp.com/#/login/google`
    );
  };

const store = createStore(rootReducer,applyMiddleware(thunk))



ReactDOM.render(
    <Provider store={store}> <BrowserRouter>
    <Auth0Provider
    domain="dev-n0f8gf8w.us.auth0.com"
    clientId="PIGvbq4tfYZNfGhSvsJMuhVTY6dazhd8"
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience="https://dev-n0f8gf8w.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    >
     <Main />
     </Auth0Provider>
     </BrowserRouter></Provider>, document.getElementById('root')
);


