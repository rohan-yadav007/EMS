import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, } from 'react-native';


export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal animationType="fade" transparent={true} visible={PopupShow}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                    <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: '#0d76d5', }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.props.HandleModalClose()}>
                            {!PopupAutoClose ? <Icon name="close-circle" size={20} color="#fff" /> : null}
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', alignSelf: 'center', paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
                            {this.state.message}
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

