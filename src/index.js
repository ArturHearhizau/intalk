import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createHashHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import configureStore from './store';

const history = createHistory();
const store = configureStore();

const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
let render = () => {
    // Dynamically import our main App component, and render it
    const App = require('./containers/App').default;

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter>
        </Provider>,
        rootEl
    );
};

if (module.hot) {
    // Support hot reloading of components.
    // Whenever the App component file or one of its dependencies
    // is changed, re-import the updated component and re-render it
    module.hot.accept('./containers/App', () => {
        setTimeout(render);
    });
}
render();
