import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import App from './App'
import Header from './components/Header'
import Home from './components/Home'
import Mun from './components/Mun'

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/mun" component={Mun} />
                    <Route path="*" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root
