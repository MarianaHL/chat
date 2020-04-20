import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

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
    };

    //this.ws = new WebSocket('ws://192.168.0.105:8080/webSocket/chat');
    this.ws = new WebSocket('ws://localhost:8080/webSocket/chat');
    this.emit = this.emit.bind(this);

    console.log('Constructor Called');
  }

  emit() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
    this.ws.send('telefono');
  }
  xd = () => {
    this.setState({
      usr: this.props.usr,
    });
  };
  componentDidMount() {
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
    this.xd();
  }
  render() {
    return (
      <View style={{ margin: 10, paddingTop: 30 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {this.props.navigation.getParam("username")}
        </Text>
        <Button
          title="Sign out"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <View> 
          <Button style={{marginTop: 20}}
          onPress={() => this.ws.open()}
          title= 'conectar'
          color = '#24E612'
          />
          <Button style={{padding: 20 }}
          onPress={() => this.ws.close()}
          title = 'Desconectar'
          color = "red"
          />
        </View>
        <View style={{ backgroundColor: '#fff' }}>
          <TextInput
            multiline
            numberOfLines={10}
            onChangeText={txtMensajes => this.setState({ txtMensajes })}
            value={this.state.txtMensajes}
            editable={false} 
          />
        </View>
        <TextInput
          style={{ height: 30, marginTop: 10 }}
          placeholder="Escribe un mensaje"
          onChangeText={text => this.setState({ text })}
          defaultValue={this.state.text}
        />
        <Button
          onPress={() => this.ws.send(this.state.usr + ': ' + this.state.text)}
          title={'enviar'}
          color="#1480FF"
        />
      </View>
    );
  }
}

