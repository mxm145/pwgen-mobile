import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  Clipboard,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
const sha1 = require('sha1')
import Storage from 'react-native-storage'

var storage = new Storage({
  size: 10,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
})
storage.sync = {
  conKey(params){
    let {id, resolve, reject} = params
    resolve && resolve('abc')
  }
}

global.storage = storage

class Rproject extends React.Component {
  constructor(){
    super()
    storage.load({
      key: 'conKey',
      id: '1001'
    }).then(res => {
      this.setState({key: res})
    }).catch( err => {
      console.log(err)
    })

    this.state = {
      key: '',
      flag: '',
      p8: '',
      p16: '',
      p24: ''
    }
  }
  genPassword = (len) => {
    let pkey = sha1(this.state.key + 'zznova\'s')
    let pwd = sha1(pkey + this.state.flag)
    pwd = pwd.replace(/a/g,'@')
    pwd = pwd.replace(/1/g,'!')
    pwd = pwd.replace(/d/g,'~')
    pwd = pwd.replace(/0/g,'^')
    return 'Z' + pwd.substring(0, len - 2) + 'z'
  }
  render() {
    return (
      <View style={styles.container}>
          <Card containerStyle={{marginTop: 40}} title="密码生成器">
            <View>
              <FormLabel labelStyle={{fontSize: 18}}>密钥</FormLabel>
              <FormInput
                ref="forminput"
                value={this.state.key}
                secureTextEntry={true}
                textInputRef="password"
                onChangeText={(val) => {
                  this.setState({key: val}, () => {
                    storage.save({
                      key: 'conKey',
                      id: '1001',
                      data: this.state.key,
                      expores: null
                    })
                    this.setState({
                      p8: this.genPassword(6),
                      p16: this.genPassword(12),
                      p24: this.genPassword(24)
                    })
                  })
                }} />
              <FormLabel labelStyle={{fontSize: 18}}>标识</FormLabel>
              <FormInput
                ref="forminput"
                value={this.state.flag}
                placeholder="请输入标识"
                onChangeText={(val) => {
                  this.setState({flag: val}, () => {
                    this.setState({
                      p8: this.genPassword(6),
                      p16: this.genPassword(12),
                      p24: this.genPassword(24)
                    })
                  })
                }} />
              <View style={styles.line}>
                <FormLabel labelStyle={{fontSize: 18}}>6位密码</FormLabel>
                <Button
                  title='复制'
                  raised
                  backgroundColor='#397af8'
                  borderRadius={5}
                  containerViewStyle={{borderRadius: 5}}
                  onPress={() => {
                    Clipboard.setString(this.state.p8)
                    Alert.alert('复制成功')
                  }} />
              </View>
              <FormInput value={this.state.p8} placeholder="8位密码" readonly="readonly" />
              <View style={styles.line}>
                <FormLabel labelStyle={{fontSize: 18}}>12位密码</FormLabel>
                <Button
                  title='复制'
                  raised
                  backgroundColor='#397af8'
                  borderRadius={5}
                  containerViewStyle={{borderRadius: 5}}
                  onPress={() => {
                    Clipboard.setString(this.state.p16)
                    Alert.alert('复制成功')
                  }} />
              </View>
              <FormInput value={this.state.p16} placeholder="16位密码" readonly="readonly" />
              <View style={styles.line}>
                <FormLabel labelStyle={{fontSize: 18}}>24位密码</FormLabel>
                <Button
                  title='复制'
                  raised
                  backgroundColor='#397af8'
                  borderRadius={5}
                  containerViewStyle={{borderRadius: 5}}
                  onPress={() => {
                    Clipboard.setString(this.state.p24)
                    Alert.alert('复制成功')
                  }} />
              </View>
              <FormInput value={this.state.p24} placeholder="24位密码" readonly="readonly" />
            </View>
          </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#ddd'
  },
  line: {
    flexDirection: 'row',
    marginTop: 10
  }
})

AppRegistry.registerComponent('Rproject', () => Rproject)
