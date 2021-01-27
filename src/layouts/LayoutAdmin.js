import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';

import "./LayoutAdmin.scss"

export default function LayoutAdmin(props){
    const {routes} = props;
    const { Header, Content, Footer} = Layout;
    console.log(props);

    return(
        <Layout>
            <h2>Menu Admin</h2>
            <Layout>
                <Header> 
                    Heder.. 
                </Header>
                <Content>
                    ... rutas
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>
                    Bryan Amaguaña
                </Footer>
            </Layout>
        </Layout>
    );
}


function LoadRoutes({routes}){
   return (
       <Switch>
           {routes.map((route, index) => (
        <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
        />
    ))}
       </Switch>
   );
}