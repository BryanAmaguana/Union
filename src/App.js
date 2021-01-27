
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import AdminHome from './pages/Admin';

function App() {
    return(
        <BrowserRouter>
        <Switch>
            {routes.map((route, index) =>(
                <RouterWithSubRoutes key ={index} {...route} />
            ))}
        </Switch>
        </BrowserRouter>
    );
}

function RouterWithSubRoutes(route){
    console.log(route);
    return (
        <Route 
        path={route.path} 
        exact={route.exact} 
        render={ props => <route.component routes={route.routes} {...props}/>}
        />
    )
}

export default App;