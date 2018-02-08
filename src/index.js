import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import { createSelector } from "reselect";
import { Provider } from "react-redux";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { getAllProducts } from './actions'
import App from './containers/App';
import reducer from './reducers'
injectTapEventPlugin()
registerServiceWorker();

const Theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#fafafa'
            }
        },
        MuiIconButton: {
            root: {
                color: '#616161'
            }
        },
        MuiBadge: {
            badge: {
                color: '#fafafa',
                backgroundColor: '#42A5F5'
            }
        },
        MuiButton: {
            flatPrimary: {
                color: '#42A5F5'
            }
        }
    },
    palette: {
        background: {
            default: '#eeeeee'
        },
        primary: {
            main: '#42A5F5'
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        title: {
            fontSize: '20px/36px',
            letterSpacing: 0
        }
    }
})

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...middleware)
)

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

/* Memoization Algorithm to be not multiple requesting to the (Mock) API whenever users navigating to another pages or make changes to the view  */
const getProducts = createSelector(() => getAllProducts(), getProducts => getProducts)
store.dispatch(getProducts())

const Root = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={Theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(Root, document.getElementById('root'));
