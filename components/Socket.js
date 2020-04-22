import React, { Component } from 'react';
import { View, Text, Button, TextInput, Alert, Image, AsyncStorage } from 'react-native';
import ImagePickerExample from '../screens/Imagenes'
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

function UselessTextInput(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

export default class Socket extends Component {
  constructor(props) {
    super(props);
    //this.state = { TextInputDisableStatus: true }  
    this.state = {
      message: '0',
      open: false,
      text: '',
      txtMensajes: '',
      image: null,
      usr: '',
      date: '',
    };

    this.ws = new WebSocket('ws://192.168.0.106:8080/webSocket/chat');
    //this.ws = new WebSocket('ws://localhost:8080/webSocket/chat');
    this.emit = this.emit.bind(this);

    console.log('Constructor Called');
  }

  alertarConexion() {
    Toast.show('Bienvenido ' + this.state.usr);
    this.ws.send(this.state.usr + ': en línea');
    AsyncStorage.getItem('IDMENSAJES1', (err, result) => {
      this.setState({ txtMensajes: this.state.txtMensajes + '\n' + result });
    });
  }

  alertarDesconexion() {
    this.ws.send(this.state.usr  + ': últ. vez hoy a las '+ this.state.date + ' p.m.');
    AsyncStorage.setItem('IDMENSAJES1', this.state.txtMensajes);
  }

  emit() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
    this.ws.send('telefono');
  }
  
  componentDidMount() {
    var hours = new Date().getHours();
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      date:
        hours + ':' + min + ':' + sec,
    });

    this.ws.onopen = () => {
      console.log('Start Connection');
    };
    this.ws.onmessage = e => {
      const data = e.data;
      console.log('d', data);
      this.setState({ message: data });
      this.setState({ txtMensajes: this.state.txtMensajes + '\n' + data });
    };
    this.ws.onerror = e => {
      console.log('onerror', e.message);
    };
    this.ws.onclose = e => {
      console.log('onclose', e.code, e.reason);
    };
    this.setState({
      usr: this.props.navigation.getParam("username"),
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={{ margin: 10, paddingTop: 30 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Welcome, {this.props.navigation.getParam("username")}
            </Text>
            <Button
              title="Sign out"
              onPress={() => this.props.navigation.navigate("Login")}
            />
          </View>
          <View > 
            <Button
            onPress={() => this.alertarConexion()} 
            title="Conectar"
            color = '#24E612'
            />
            <Button style={{padding: 20 }}
            onPress={() => this.alertarDesconexion()}
            title = 'Desconectar'
            color = "red"
            />
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <TextInput
              multiline={true}
              numberOfLines={10}
              onChangeText={txtMensajes => this.state.usr({ txtMensajes })}
              value={this.state.txtMensajes}
              editable={false} 
              placeholder="Usuario: "
            />
          </View>
          <TextInput
            style={{ height: 40, marginTop: 10, backgroundColor: "#eeeeee", borderRadius: 15 }}
            placeholder="Escribe un mensaje"
            onChangeText={text => this.setState({ text })}
            defaultValue={this.state.text}
          />
          <Button
            onPress={() => this.ws.send(this.state.usr + ': ' + this.state.text)}
            title={'enviar'}
            color="#1480FF"
          />

          <ImagePickerExample
            testProp={this.state.usr}
          />
        </View>
      </ScrollView>
    );
  }
}
