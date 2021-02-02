import React from 'react';
import {Layout, Tabs} from 'antd';
import { Redirect } from "react-router-dom"
import Logo from '../../../assets/img/png/UnionIcono.png';
import LoginForm from '../../../components/Admin/LoginForm';
import { getAccessTokenApi } from '../../../api/auth'


import "./SignIn.scss";

export default function SingIn(){
    const {Content} =Layout;
    const {TabPane} = Tabs;

    if(getAccessTokenApi()){
      return <Redirect to="/admin"/>
    }
    return(
        <Layout className="sign-in">
        <Content className="sign-in__content">
          <h1 className="sign-in__content-logo">
            <img src={Logo} alt="Union" />
          </h1>
  
          <div className="sign-in__content-tabs">
            <Tabs type="card">
              <TabPane tab={<span>Login</span>} key="1">
               <LoginForm/>
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
}