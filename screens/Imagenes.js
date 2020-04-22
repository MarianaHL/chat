import React, { Component } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ImgToBase64 from 'react-native-image-base64';

export default class Imagenes extends Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket('ws://192.168.0.106:8080/webSocket/chat');
  }

  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();

    this.ws.onopen = () => {
      console.log('Start Connection IMG');
    };
    this.ws.onmessage = e => {
      console.log('resiviendo mensaje', e);
    };
    this.ws.onerror = e => {
      console.log('onerror', e.message);
    };
    this.ws.onclose = e => {
      console.log('onclose', e.code, e.reason);
    };

    //console.log('prop value', this.props.testProp + ": " + this.state.image)
  }

  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
      //console.log('prop value', this.props.testProp + ":_" + result.base64)
      this.ws.send(this.props.testProp + ":_" + result.base64)
      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
