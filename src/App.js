
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';
/* import AdminHome from './pages/Admin'; */

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    {routes.map((route, index) => (
                        <RouterWithSubRoutes key={index} {...route} />
                    ))}
                </Switch>
            </BrowserRouter>
        </AuthProvider>

    );
}

function RouterWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component routes={route.routes} {...props} />}
        />
    )
}

export default App;