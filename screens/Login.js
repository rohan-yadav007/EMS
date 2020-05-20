/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Modal, ActivityIndicator, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Gap from '../components/Gap';
import {
    WebsiteWrapper, WebsiteLogo, ErrorText, InputBox, LoginForm, InputGroup, LoginButton, ForgotLink, Input, InputLogo,
    CustomText, Loader, LoginLink
} from '../css/login.css';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import validator from '../components/validation';
import { getLogin, loginStatus } from '../redux/Action/login.action';
import { GET } from '../utils/responseHelper';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            incPassword: '',
            InvalidUser: this.props.errMessage,
            userId: '',
            error: {
                emailError: '',
                passwordError: '',
            },
            loader: false,
            PopupShow: false,
            passwordForgot: false,
            userName: '',
            emailSentMessage: '',
            emailSentStatus: false
        };
    }
    async componentDidMount() {
        await this.props.loginStatus();
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
            this.props.getLogin(postObj);
        }

    }

    handleForgot = () => {
        
        this.setState({ PopupShow: true, passwordForgot: true })
    }
    handleForgotSubmit = async () => {
        const { userName } = this.state;
        const resEmail = await GET(`CorporateRecruitment/UserLogin/GetUserList?t_UserId=${userName}`);
        if (resEmail) {
           
            const email = resEmail && resEmail[0]?.t_Email;
            const emailSentStatus = await GET(`CorporateRecruitment/UserLogin/ForgetPassword?t_EmailID=${email}`);
            if (emailSentStatus) {
                
                await this.setState({ emailSentMessage: 'Email sent. Check your email for credentials', emailSentStatus: true, })
            }
            else {
                await this.setState({ emailSentMessage: 'Invalid Username!', emailSentStatus: true, })
            }
        }
    }
    render() {
        const { error, password, PopupShow, passwordForgot, emailSentStatus, emailSentMessage } = this.state;
        const { loading, errMessage } = this.props;
        return (
            <>
                
                <Modal animationType="fade" transparent={true} visible={emailSentStatus}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: '#0d76d5', }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.setState({ emailSentStatus: false })}>
                                <Icon2 name="close-circle" size={20} color="#fff" />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', alignSelf: 'center', paddingTop: 10 }}>
                                {emailSentMessage}
                            </Text>
                        </View>
                    </View>
                </Modal>
                <ImageBackground style={styles.body} source={require('../static/background.png')}>
                    {loading && <Loader >
                        <ActivityIndicator size="large" color="#3875c3" />
                    </Loader>}
                    <View>
                        <ScrollView>
                            <View>
                                <WebsiteWrapper>
                                    <WebsiteLogo source={require('../static/logo.png')} />
                                </WebsiteWrapper>
                                <Gap />
                                {passwordForgot &&
                                    (<View style={{ position: 'relative' }}>
                                        <Modal animationType="fade" transparent={true} visible={PopupShow}>

                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                                                <View style={{ padding: 20, width: '100%', borderRadius: 10, }}>

                                                    <InputGroup >
                                                        <InputLogo><Icon name="envelope" size={27} color="#000" /></InputLogo>
                                                        <InputBox >
                                                            <Input placeholder="Enter your Username" value={this.state.value} onChangeText={(text) => this.handleChange(text, 'userName')} />
                                                        </InputBox>
                                                    </InputGroup>
                                                    <LoginLink style={{ alignItems: 'flex-end' }}>
                                                        <CustomText color="#fff" onPress={() => this.setState({ passwordForgot: false, PopupShow: false, })}>Login?</CustomText>
                                                    </LoginLink>
                                                    <LoginButton onPress={this.handleForgotSubmit}>
                                                        <CustomText ta="center" color="#fff" >Submit</CustomText>
                                                    </LoginButton>
                                                   
                                                </View>
                                            </View>

                                        </Modal>
                                    </View>)
                                }
                                {!passwordForgot &&
                                    (
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
                                                    <Input placeholder="Your Password" secureTextEntry={true} value={password} onChangeText={(text) => this.handleChange(text, 'password')} />
                                                    {error.passwordError !== '' ? <ErrorText>{error.passwordError}</ErrorText> : null}
                                                </InputBox>
                                            </InputGroup>

                                            <ForgotLink >
                                                <CustomText color="red" >{errMessage}</CustomText>
                                                <CustomText ta="right" color="#fff" onPress={this.handleForgot}>Forgot Password?</CustomText>
                                            </ForgotLink>

                                            <LoginButton onPress={this.handleSubmit}>
                                                <CustomText ta="center" color="#fff" >Login</CustomText>
                                            </LoginButton>
                                        </LoginForm>
                                    )
                                }

                            </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const userId = state.LoginReducer.userId;
    const isLoggedIn = state.LoginReducer.login;
    const loading = state.CommonReducer.loading;
    const errMessage = state.LoginReducer.message;
    return { userId, isLoggedIn, loading, errMessage };
};

export default connect(mapStateToProps, { getLogin, loginStatus })(Login);

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
});
