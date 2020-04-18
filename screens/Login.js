/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Gap from '../components/Gap';
import {
    WebsiteWrapper, WebsiteLogo, ErrorText, InputBox, LoginForm, InputGroup, LoginButton, ForgotLink, Input, InputLogo,
    CustomText, Loader,
} from '../css/login.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import validator from '../components/validation';
import { GET } from '../utils/responseHelper';
import { storeData, getData } from '../utils/AsyncStorage';

const emailIcon = require('../static/email.png');
const passwordIcon = require('../static/password.png');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            incPassword: '',
            InvalidUser: '',

            error: {
                emailError: '',
                passwordError: '',
            },
            loader: false,
        };
    }


    handleChange = async (text, name) => {
        const { error } = this.state;
        this.setState({ InvalidUser: '' });
        const isValidated = await validator(name, text);

        await this.setState(prevState => { return ({ ...prevState, [name]: text, error: { ...error, [`${name}Error`]: isValidated } }); });
    }
    checkValidate = () => {
        const { email, error, password } = this.state;
        const errorObj = error;
        if (email === '' || password === '') {
            if (email === '') {
                Object.assign(errorObj, { emailError: 'Required' });
            }
            if (password === '') {
                Object.assign(errorObj, { passwordError: 'Required' });
            }
            this.setState({ error: errorObj });
            return false;
        } else {
            return true;
        }


    }

    handleSubmit = async () => {
        const { email, password } = this.state;
        const formValid = await this.checkValidate();

        if (formValid) {
            const postObj = { t_email: email, t_password: password };
            this.setState({ loader: true });
            const url = `CorporateRecruitment/UserLogin/loginByUserType?t_Email=${postObj.t_email}&t_Password=${postObj.t_password}`;
            try {
                const data = await GET(url);
                if (data) {
                    this.setState({ loader: false });
                    await storeData('LoggedIn', 'true');
                    this.props.navigation.navigate('Dashboard', { name: 'Dashboard', user: data });
                } else {
                    this.setState({ loader: false, InvalidUser: 'Wrong Credentials!' });

                }


            } catch (error) {
                console.log(error);
            }
        } else {

        }
    }
    handleForgot = () => {
        // eslint-disable-next-line no-alert
        alert('will redirect to password reset');
    }

    render() {
        const { error, loader, password } = this.state;


            return (
                <>

                    <ImageBackground style={styles.body} source={require('../static/background.png')}>

                        <View>
                            <ScrollView>
                                {loader && <Loader top="70%" left="47%">
                                    <ActivityIndicator size="large" color="#3875c3" />
                                </Loader>}
                                <View>

                                    <WebsiteWrapper>
                                        <WebsiteLogo source={require('../static/logo.png')} />
                                    </WebsiteWrapper>

                                    <Gap />

                                    <LoginForm>
                                        <InputGroup >
                                        <InputLogo><Icon name="envelope" size={27} color="#000" /></InputLogo>
                                        
                                            <InputBox >
                                                <Input placeholder="Your Email" value={this.state.value} onChangeText={(text) => this.handleChange(text, 'email')} />
                                                {error.emailError !== '' ? <ErrorText>{error.emailError}</ErrorText> : null}
                                            </InputBox>
                                        </InputGroup>

                                        <InputGroup >
                                        <InputLogo><Icon name="lock" size={40} color="#000" /></InputLogo>
                                            <InputBox >
                                                <Input placeholder="Your Password" value={password} onChangeText={(text) => this.handleChange(text, 'password')} />
                                                {error.passwordError !== '' ? <ErrorText>{error.passwordError}</ErrorText> : null}
                                            </InputBox>
                                        </InputGroup>

                                        <ForgotLink >
                                            <CustomText color="red" >{this.state.InvalidUser}</CustomText>
                                            <CustomText ta="right" color="#fff" onPress={this.handleForgot}>Forgot Password?</CustomText>
                                        </ForgotLink>

                                        <LoginButton onPress={this.handleSubmit}>
                                            <CustomText ta="center" color="#fff" >Login</CustomText>
                                        </LoginButton>
                                    </LoginForm>
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </>
            );
        }



}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#8ec0f7',
    },
});

export default Login;
