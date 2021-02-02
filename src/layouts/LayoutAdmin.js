import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import useAuth from '../hooks/useAuth';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider'
import AdminLogin from '../pages/Admin/SignIn/SingIn';

import "./LayoutAdmin.scss"

export default function LayoutAdmin(props){
    const {routes} = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer} = Layout;
    const { user, isLoading} = useAuth();
    
console.log(user);
console.log(isLoading);

    if(!user && !isLoading){
        return (
            <>
            <Route path="/admin/login" component={AdminLogin} />
            <Redirect to="/admin/login"/>
            </>
            
        );
    }

    if(user && !isLoading){
        return(
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed}/>
                <Layout className="Layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                    <Header className="Layout-admin__header"> 
                    <MenuTop
                  menuCollapsed={menuCollapsed}
                  setMenuCollapsed={setMenuCollapsed}
                     />
                    </Header>
                    <Content className="Layout-admin__content">
                        <LoadRoutes routes={routes}/>
                    </Content>
                    <Footer className="Layout-admin__footer">
                        Bryan Amaguaña
                    </Footer>
                </Layout>
            </Layout>
        );
    }
    return null;
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