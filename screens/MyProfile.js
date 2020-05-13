import React, { Component } from 'react';
import { Text, View, Modal, Button, ImageBackground, Image, StyleSheet, TextInput, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { Tasklist1, Taskboder, Content, Input, CustomText, ContentWrapper } from '../css/MyProfile.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileData, getRole, getCountry, getStates, getCity, getDepartment, getDesignation, SaveUpdateProfile } from '../redux/Action/MyProfile.action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-community/picker';
import { GetIP } from '../utils/deviceInfo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const HandleTab = ({ state, handleChange, handleSave }) => {
    const { selected, profileData, countryList, stateList,departmentData, roleList, cityList, designation, } = state;
    let DepartmentName = '';
    console.log(profileData)
    if(departmentData?.length !== 0){
        
        const GetDepartment = departmentData.filter(e=>e.a_DepartmentId === profileData?.n_DepartmentId)
      
        DepartmentName = GetDepartment[0]?.t_DepartmentName;
    }
    if (selected === 'tab1') {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient style={{ flex: 2, }}
                    colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
                    <View style={{ flex: 2, borderBottomWidth: 3, borderBottomColor: 'red' }} />
                </LinearGradient>

                <Tasklist1 style={{ flex: 9 }}>
                    <View style={{ height: 150, width: 150, borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: '-25%' }}>
                        <Image source={require('../static/images/user.png')} />
                    </View>
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
                            <Text style={{ alignSelf: 'flex-end', fontSize: 14 }}>{DepartmentName}</Text>
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
            <View style={{ paddingBottom: 40 }}>
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
                            <Input onChangeText={(text) => handleChange('d_DOB', text)} value={profileData.d_DOB?.split('T')[0]} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Photograph</CustomText>
                            <Input onChangeText={(text) => handleChange('t_EmpImage', text)} value={profileData.t_EmpImage} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Designation</CustomText>
                            <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                                <Picker
                                    enabled={false}
                                    selectedValue={profileData?.n_DesignationId}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange('n_DesignationId', itemValue)
                                    }>

                                    <Picker.Item label="Select" value={null} />
                                    {designation?.map((post, index) => {

                                        return (
                                            <Picker.Item key={index} label={post.Designation} value={post.a_DesignationId} />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Role</CustomText>
                            <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                                <Picker
                                    enabled={false}
                                    selectedValue={profileData?.n_RoleId}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange('n_RoleId', itemValue)
                                    }>
                                    <Picker.Item label="Select" value={null} />
                                    {roleList?.map((role, index) => {
                                        return (
                                            <Picker.Item key={index} label={role.t_DisplayText} value={role.n_EnumVal} />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Address</CustomText>
                            <Input onChangeText={(text) => handleChange('t_Address1', text)} value={profileData.t_Address1} />
                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>City</CustomText>
                            <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                                <Picker

                                    selectedValue={profileData?.n_CityId}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange('n_CityId', itemValue)
                                    }>
                                    {/* const { selected, profileData,countryList, stateList, cityList,designation, } = state; */}
                                    <Picker.Item label="Select" value={null} />
                                    {cityList?.map((city, index) => {
                                        return (
                                            <Picker.Item key={index} label={city.t_CityName} value={city.a_CityId} />
                                        )
                                    })}
                                </Picker>
                            </View>

                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>State</CustomText>
                            <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                                <Picker

                                    selectedValue={profileData?.n_StateId}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange('n_StateId', itemValue)
                                    }>
                                    <Picker.Item label="Select" value={null} />
                                    {stateList?.map((city, index) => {
                                        return (
                                            <Picker.Item key={index} label={city.t_StateName} value={city.a_StateId} />
                                        )
                                    })}
                                </Picker>
                            </View>

                        </ContentWrapper>

                        <ContentWrapper>
                            <CustomText>Country</CustomText>
                            <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                                <Picker

                                    selectedValue={profileData?.n_CountryId}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange('n_CountryId', itemValue)
                                    }>
                                    <Picker.Item label="Select" value={null} />
                                    {countryList?.map((city, index) => {
                                        return (
                                            <Picker.Item key={index} label={city.t_CountryName} value={city.a_CountryId} />
                                        )
                                    })}
                                </Picker>
                            </View>

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
                        <Button onPress={handleSave} title='Update' color="green" />
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
            profileData: [],
            countryList: [],
            stateList: [],
            cityList: [],
            designation: [],
            roleList: [],
            departmentData:[],
            message: '',
            PopupShow: false,
            PopupAutoClose: false
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
        await this.setState({ profileData: this.props.profileData });
        await this.props.getDepartment();
        await this.props.getCountry();
        await this.props.getStates();
        await this.props.getCity();
        await this.props.getDesignation();
        await this.props.getRole();
        
        const { profileData, countryData, stateData, cityData, roleList,departmentData } = this.props;

        await this.setState({ refreshing: false,departmentData: departmentData ,roleList: roleList, country: countryData, state: stateData, city: cityData });

    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.profileData !== state.profileData) {
    //         return {
    //             profileData: props.profileData,
    //         }
    //     }
    //     if (props.countryData !== state.countryList) {
    //         return {
    //             countryList: props.countryData,
    //         }
    //     }
    //     if (props.stateData !== state.stateList) {
    //         return {
    //             stateList: props.stateData,
    //         }
    //     }
    //     if (props.cityData !== state.cityList) {
    //         return {
    //             cityList: props.cityData,
    //         }
    //     }
    //     return null;
    // }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.profileData !== prevProps.profileData) {
            this.setState({ profileList: this.props.profileData });
        }
        if (this.props.countryData !== prevProps.countryData) {
            this.setState({ countryList: this.props.countryData });
        }
        if (this.props.stateData !== prevProps.stateData) {
            this.setState({ stateList: this.props.stateData });
        }
        if (this.props.cityData !== prevProps.cityData) {
            this.setState({ cityList: this.props.cityData });
        }
        if (this.props.designationData !== prevProps.designationData) {
            this.setState({ designation: this.props.designationData });
        }
        if (this.props.roleList !== prevProps.roleList) {
            this.setState({ roleList: this.props.roleList })
        }
        if (this.props.departmentData !== prevProps.departmentData) {
            this.setState({ departmentList: this.props.departmentData })
        }
    }
    handleChange = (name, value) => {
        
        const { profileData } = this.state;
        this.setState(prevState => { return { ...prevState, profileData: { ...profileData, [name]: value } } });
    }

    handleSave = async () => {
        const { profileData } = this.state;
        const t_ModifiedIP = await GetIP;
        const postObj = {
            a_EmployeeId: profileData?.a_EmployeeId,
            t_First_Name: profileData?.t_First_Name,
            t_Middle_Name: profileData?.t_Middle_Name,
            t_Last_Name: profileData?.t_Last_Name,
            t_FatherName: profileData?.t_FatherName,
            t_Phone: profileData?.t_Phone,
            t_Mobile: profileData?.t_Mobile,
            d_DOB: profileData?.d_DOB,
            t_Email: profileData?.t_Email,
            t_EmpImage: profileData?.t_EmpImage,
            n_DesignationId: profileData?.n_DesignationId,
            d_DOJ: profileData?.d_DOJ,
            t_Address1: profileData?.t_Address1,
            t_Address2: profileData?.t_Address2,
            t_Address3: profileData?.t_Address3,
            n_CityId: profileData?.n_CityId,
            n_StateId: profileData?.n_StateId,
            n_CountryId: profileData?.n_CountryId,
            n_RoleId: profileData?.n_RoleId,
            n_CreatedBy: profileData?.n_CreatedBy,
            t_CreatedIP: profileData?.t_CreatedIP,
            n_ModifiedBy: profileData?.n_ModifiedBy,
            t_ModifiedIP: t_ModifiedIP,
            t_Mode: "UPDATE"
        };
        // console.log("postObj", postObj)
        await this.props.SaveUpdateProfile(postObj);
        this.setState({ message: this.props.message, PopupShow: true, PopupAutoClose: true })
        setTimeout(() => this.setState({ message: '', PopupShow: false, PopupAutoClose: false }), 2000)
    }
    render() {
        const { refreshing, selected, PopupShow, PopupAutoClose, } = this.state;

        return (
            <>
                <Modal animationType="fade" transparent={true} visible={PopupShow}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: '#0d76d5', }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.HandleModalClose()}>
                                {!PopupAutoClose ? <Icon name="close-circle" size={20} color="#fff" /> : null}
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', alignSelf: 'center', paddingTop: 10 }}>
                                {this.state.message}
                            </Text>
                        </View>
                    </View>
                </Modal>
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../static/background2.png')}>
                    <Header title={"My Profile"} />

                    <SafeAreaView style={{ flex: 1 }}>

                        <HandleTab handleSave={this.handleSave} handleChange={this.handleChange} state={this.state} />

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
    const profileData = state.MyProfileReducer.profileData;
    const countryData = state.MyProfileReducer.countryData;
    const stateData = state.MyProfileReducer.stateData;
    const cityData = state.MyProfileReducer.cityData;
    const departmentData = state.MyProfileReducer.departmentData;
    const designationData = state.MyProfileReducer.designationData;
    const message = state.MyProfileReducer.message;
    const roleList = state.MyProfileReducer.roleList;
   
    return { profileData, roleList, countryData, stateData, cityData, departmentData, designationData, message };
}
export default connect(mapStateToProps, { getProfileData, getCountry, getRole, SaveUpdateProfile, getStates, getCity, getDepartment, getDesignation })(MyProfile)


const styles = StyleSheet.create({
    ColKey: { width: '40%' }
})