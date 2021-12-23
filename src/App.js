import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { PrivateRoute } from './PrivateRoute'
import Galleries from './components/Galleries'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/signin'>
                    <Signin />
                </Route>
                <PrivateRoute path='/galleries'>
                    <Layout>
                        <Switch>
                            <PrivateRoute path='/galleries/:id'>
                                <Galleries />
                            </PrivateRoute>
                            <PrivateRoute path='/galleries'>
                                <Galleries />
                            </PrivateRoute>
                        </Switch>
                    </Layout>
                </PrivateRoute>
                <Route path="*">
                    <Signin />
                </Route>
            </Switch>
        </BrowserRouter>

    )
}

export default App
