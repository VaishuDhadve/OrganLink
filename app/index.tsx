import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';


const { width } = Dimensions.get('window');

const WelcomeScreen = () => {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")} // You'll need to add this image to your assets
          style={styles.logo}
          resizeMode="cover"
        />
        
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={()=>{router.replace("/auth/login")}}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton} onPress={()=>{router.replace("/auth/hospital-login")}}>
          <Text style={styles.createAccountText}>Hospital Login</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Wave */}
      <View style={styles.waveContainer}>
        <Svg
          height="150"
          width={width}
          viewBox={`0 0 ${width} 150`}
          style={styles.waveSvg}
        >
          <Path
            d={`M0 80 
               C${width * 0.2} 30, ${width * 0.3} 100, ${width * 0.4} 60 
               C${width * 0.5} 20, ${width * 0.6} 80, ${width * 0.7} 50 
               C${width * 0.8} 20, ${width * 0.9} 50, ${width} 40 
               L${width} 150 L0 150 Z`}
            fill="#e91e63"
            opacity={0.9}
          />
          <Path
            d={`M0 100 
               C${width * 0.15} 70, ${width * 0.25} 120, ${width * 0.35} 80 
               C${width * 0.45} 40, ${width * 0.55} 90, ${width * 0.65} 60 
               C${width * 0.75} 30, ${width * 0.85} 70, ${width} 60 
               L${width} 150 L0 150 Z`}
            fill="#e91e63"
            opacity={0.7}
          />
          <Path
            d={`M0 110 
               C${width * 0.1} 90, ${width * 0.2} 140, ${width * 0.3} 100 
               C${width * 0.4} 60, ${width * 0.5} 110, ${width * 0.6} 80 
               C${width * 0.7} 50, ${width * 0.8} 90, ${width} 80 
               L${width} 150 L0 150 Z`}
            fill="#e91e63"
            opacity={0.5}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    color: '#550000',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  skipArrow: {
    color: '#550000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  bloodText: {
    color: '#550000',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  bestowText: {
    color: '#550000',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 160,
  },
  loginButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e91e63',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#e91e63',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    backgroundColor: '#e91e63',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  createAccountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 150,
  },
  waveSvg: {
    position: 'absolute',
    bottom: 0,
  },
});

export default WelcomeScreen;