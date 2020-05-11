import React, { Component } from 'react';
import { Text, View, Button, ImageBackground, StyleSheet, TextInput, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { Tasklist1, Taskboder, Content, Input, CustomText, ContentWrapper } from '../css/MyProfile.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileData } from '../redux/Action/login.action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const HandleTab = ({ state, handleChange }) => {
    const { selected, profileData } = state;
    if (selected === 'tab1') {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient style={{ flex: 2, }}
                    colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
                    <View style={{ flex: 2, borderBottomWidth: 3, borderBottomColor: 'red' }} />
                </LinearGradient>

                <Tasklist1 style={{ flex: 9 }}>
                    <View style={{ height: 150, width: 150, borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: '-25%' }}></View>
                    <View>
                        <Text style={{ alignSelf: 'center', fontSize: 25 }}>{state?.t_First_Name} {profileData?.t_Last_Name}</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>Assistant Manager</Text>
                    </View>

                    <Taskboder>
                        <Content style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Emp Code</Text>
                            <Text style={{ fontSize: 14 }}>{profileData?.a_EmployeeId}</Text>
                        </Content>

                        <Content >
                            <Text style={{ fontWeight: 'bold' }}>Email Id</Text>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 14 }}>{profileData?.t_Email}</Text>
                        </Content>

                        <Content>
                            <Text style={{ fontWeight: 'bold' }}>Username</Text>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 14 }}>{profileData?.t_UserName}</Text>
                        </Content>

                        <Content>
                            <Text style={{ fontWeight: 'bold' }}>Department</Text>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 14 }}>{profileData?.n_DepartmentId}</Text>
                        </Content>
                        <Content>
                            <Text style={{ fontWeight: 'bold' }}>Reporting Manager</Text>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 14 }}>{profileData?.n_ReportingManagerId}</Text>
                        </Content>

                    </Taskboder>

                </Tasklist1>
            </View>
        )
    } else {
        return (
            <View style={{ paddingBottom: 50 }}>
                <ScrollView>
                    <View>
                        <Text style={{ fontSize: 20, marginTop: 20, alignSelf: 'center', fontWeight: 'bold' }}>Basic Details</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <ContentWrapper>
                            <CustomText>First Name</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={profileData?.t_First_Name}
                                editable={false}
                            />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Middle Name</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Middle_Name', text)} value={profileData.t_Middle_Name === "null" ? '' : null} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Last Name</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Last_Name', text)} value={profileData?.t_Last_Name} />
                        </ContentWrapper>


                        <ContentWrapper>
                            <CustomText>Father Name</CustomText>
                            <Input onChangeText={(text) => handleChange('t_FatherName', text)} value={profileData?.t_FatherName} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Mobile No</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Mobile', text)} value={profileData.t_Mobile} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Email Id</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Email', text)} value={profileData.t_Email} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Date Of Birth</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={profileData.d_DOB?.split('T')[0]} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Photograph</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={'No file chosen'} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Designation</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={'Developer'}
                                editable={false}
                            />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Role</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={'Development'}
                                editable={false}
                            />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Address</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Address1', text)} value={profileData.t_Address1} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>City</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={'Delhi'} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>State</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={'Delhi'} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Country</CustomText>
                            <Input onChangeText={(text) => handleChange('t_First_Name', text)} value={'India'} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Date Of Joining</CustomText>
                            <Input onChangeText={(text) => handleChange('d_DOJ', text)} value={profileData?.d_DOJ?.split('T')[0]} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Alternate No</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Phone', text)} value={profileData?.t_Phone} />
                        </ContentWrapper>

                    </View>
                    <View style={{ padding: 5 }}>
                        <Button title='Update' color="green" />
                    </View>

                </ScrollView>
            </View>
        )
    }
};

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            selected: 'tab1',
            profileData: []
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        this._unsubscribe = navigation.addListener('focus', async () => {
            await this._onRefresh()
        });

    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true })
        await this.props.getProfileData();
        if (this.props.profileData) {
            const { profileData } = this.props;
            this.setState({ refreshing: false, profileData: profileData });
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.profileData !== state.profileData) {
            return {
                profileData: props.profileData
            }
        }
        return null;
    }
    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    render() {
        const { refreshing, selected } = this.state;
        const { profileData } = this.props;

        return (
            <>
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../static/background2.png')}>
                    <Header title={"My Profile"} />

                    <SafeAreaView style={{ flex: 1 }}>

                        {profileData ? <HandleTab handleChange={this.handleChange} state={this.state} /> : null}

                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ selected: 'tab1' })}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'tab1' ? 'red' : '#fff',
                                }}>
                                <Text style={{
                                    alignSelf: 'center', padding: 10,
                                    color: selected === 'tab1' ? '#fff' : '#000',
                                }}>Employee Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.setState({ selected: 'tab2' })}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'tab2' ? 'red' : '#fff',
                                }}>
                                <Text
                                    style={{
                                        alignSelf: 'center', padding: 10,
                                        color: selected === 'tab2' ? '#fff' : '#000',
                                    }}>Basic Profile</Text>
                            </TouchableOpacity>
                        </View>

                    </SafeAreaView>

                </ImageBackground>
            </>
        );
    }
}
const mapStateToProps = state => {
    const profileData = state.LoginReducer.profileData;
    return { profileData };
}
export default connect(mapStateToProps, { getProfileData })(MyProfile)


const styles = StyleSheet.create({
    ColKey: { width: '40%' }
})