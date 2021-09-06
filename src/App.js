import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ActiveLiveness from './Components/ActiveLiveness'
import AgeDetector from './Components/AgeDetector'
import Home from './Components/Home';
import Message from './Components/Message';
import APIKeyManager from './Components/APIKeyManager';

function App() {
    return (
        <Router>

            <header>
                <h1>Active liveliness detector</h1>
            </header>

            <APIKeyManager/>

            <Switch>

                <Route exact path='/'>
                    <Home/>
                </Route>

                <Route path='/active-liveliness'>
                    <ActiveLiveness/>
                </Route>

                <Route path='/age-detector'>
                    <AgeDetector/>
                </Route>

                <Route path='*'>

                    <center>
                        <h3>Sorry...no page found</h3>
                    </center>

                </Route>

            </Switch>

            <Message/>

        </Router>
    )
}

export default App
