/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Gap from '../components/Gap';
import {
    WebsiteWrapper, WebsiteLogo, ErrorText, InputBox, LoginForm, InputGroup, LoginButton, ForgotLink, Input,
    InputLogo, CustomText, Loader,
}
    from '../css/login.css';
import validator from '../components/validation';
const emailIcon = require('../static/email.png');
const passwordIcon = require('../static/password.png');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            incPassword: '',
            error: {
                emailError: '',
                passwordError: '',
            },
            loader: false,
        };
    }

    handleChange = async (text, name) => {
        const { error } = this.state;
        const isValidated = await validator(name, text);

        await this.setState(prevState => { return ({ ...prevState, [name]: text, error: { ...error, [`${name}Error`]: isValidated } }); });
        if (name === 'password') {
            let incPassword = text;
            const arr = incPassword.split('');
            // eslint-disable-next-line no-return-assign
            const newarr = await arr.map(e => e = '*').join('');

            console.log(newarr);
            this.setState({ incPassword: newarr });
        }
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
            console.log(postObj);
            this.setState({ loader: true });
        } else {

        }
    }
    handleForgot = () => {
        // eslint-disable-next-line no-alert
        alert('will redirect to password reset');
    }
    render() {
        const { error, loader, password, incPassword } = this.state;
        return (
            <>
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
                            <InputLogo source={emailIcon} />
                            <InputBox >
                                <Input placeholder="Your Email" value={this.state.value} onChangeText={(text) => this.handleChange(text, 'email')} />
                                {error.emailError !== '' ? <ErrorText>{error.emailError}</ErrorText> : null}
                            </InputBox>
                        </InputGroup>

                        <InputGroup >
                            <InputLogo source={passwordIcon} />
                            <InputBox >
                                <Input placeholder="Your Password" value={incPassword} onChangeText={(text) => this.handleChange(text, 'password')} />
                                {error.passwordError !== '' ? <ErrorText>{error.passwordError}</ErrorText> : null}
                            </InputBox>
                        </InputGroup>

                        <ForgotLink >
                            <CustomText ta="right" color="#fff" onPress={this.handleForgot}>Forgot Password?</CustomText>
                        </ForgotLink>

                        <LoginButton onPress={this.handleSubmit}>
                            <CustomText ta="center" color="#fff" >Login</CustomText>
                        </LoginButton>
                    </LoginForm>
                </View>
            </>
        );
    }
}

export default Login;
