'use strict';

import React, {Component} from 'react';
import {Navigator, Text, View, AsyncStorage, ActivityIndicator} from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import Home from './Components/Home/home';
import Authentication from './Components/Authentication/authentication';
import Login from './Components/Authentication/login';
import Signup from './Components/Authentication/signup';
import Account from './Components/Account/accountHome';
import Foods from './Components/Account/foods';
import Products from './Components/Account/products';
import Settings from './Components/Account/settings';
import Scanner from './Components/Scanner/scanner';
import AversionDetails from './Components/ForbiddenDetails/ForbiddenDetails';
import styles from './Components/styles';
import {AccountTabIcon, ScannerTabIcon} from './Components/TabBar/icons';

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class App extends Component {

    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        user: null,
        isLoading: true
      }
    }

    componentWillMount() {
      this.fetchUser().done();
    }


    async fetchUser () {
      try {
        let response = await AsyncStorage.getItem('USER');
        this.setState({user: JSON.parse(response)});
        this.setState({isLoading: false});
      } catch (error) {
        console.log('Error', error);
      }
    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    animating={true}
                    color="#48afdb"
                    size="large"
                    />
                </View>
            )
        } else {

            const isUser = this.state.user ? true : false;
            return (
                    <Router createReducer={reducerCreate}>
                        <Scene key="root">
                            <Scene key="Authentication" hideNavBar={true} component={Authentication} title="Authentication" initial={isUser} />
                            <Scene key="Login" component={Login} title="Login" hideNavBar={false} navigationBarStyle={styles.navBar} titleStyle={styles.navBarText} leftButtonIconStyle={styles.navBarIcon} />
                            <Scene key="Signup" component={Signup} title="Signup" hideNavBar={false} navigationBarStyle={styles.navBar} titleStyle={styles.navBarText} leftButtonIconStyle={styles.navBarIcon} />
                            <Scene key="TabBar" tabs={true} initial={isUser} style={styles.tabBar} >
                                <Scene key="account"  title="My Account" icon={AccountTabIcon} navigationBarStyle={styles.navBar} titleStyle={styles.navBarText} leftButtonIconStyle={styles.navBarIcon} >
                                    <Scene key="account_home" component={Account} user={this.state.user} title="My Account" />
                                    <Scene key="account_foods" component={Foods} user={this.state.user} title="Foods" />
                                    <Scene key="account_products" component={Products} user={this.state.user} title="Products" />
                                    <Scene key="account_settings" component={Settings} user={this.state.user} title="Settings" />
                                </Scene>
                                <Scene key="scanner"  title="Scanner" icon={ScannerTabIcon} hideNavBar={true}>
                                    <Scene key="scanner_home" component={Scanner} user={this.state.user} title="Scanner" />
                                    <Scene key="scanner_details" component={AversionDetails} title="Aversion Details" />
                                </Scene>
                            </Scene>
                        </Scene>
                    </Router>
            )
        }
    }
}


                //<Scene key="register" component={Register} title="Register"/>
                // <Scene key="register2" component={Register} title="Register2" duration={1}/>
                // <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE}/>
                // <Scene key="launch" component={Launch} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
                // <Scene key="login" direction="vertical">
                //     <Scene key="loginModal" component={Login} schema="modal" title="Login"/>
                //     <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
                // </Scene>
                // <Scene key="tabbar" tabs={true} >
                //     <Scene key="tab1"  title="Tab #1" icon={TabIcon} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'white'}}>
                //         <Scene key="tab1_1" component={TabView} title="Tab #1_1" onRight={()=>alert("Right button")} rightTitle="Right" />
                //         <Scene key="tab1_2" component={TabView} title="Tab #1_2" titleStyle={{color:'black'}}/>
                //     </Scene>
                //     <Scene key="tab2" initial={true} title="Tab #2" icon={TabIcon}>
                //         <Scene key="tab2_1" component={TabView} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
                //         <Scene key="tab2_2" component={TabView} title="Tab #2_2"/>
                //     </Scene>
                //     <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar={true} icon={TabIcon}/>
                //     <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={true} icon={TabIcon}/>
                //     <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
                // </Scene>