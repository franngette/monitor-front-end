import React from 'react';
import { Redirect, Route} from 'react-router-dom'
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import '../App.css';
import Footer from './Footer';

export default function PrivateRoute ({children, ...rest}){
    const isLoggedIn = (sessionStorage.getItem('token')? true : false)
    return(
        <Route
        {...rest}
        render = {() =>
            isLoggedIn ? (
                <div className="body">
                    <Toolbar/>
                        <div className="wrapper" >
                        <Sidebar/>
                            <div className="container-fluid bg-app">
                                {children}
                            </div>
                        </div>
                        <Footer/>
                </div>

            ) : (
                <Redirect to={
                    {pathname: "/login",}
                } />
            )
            
        }
        />
    )
}
