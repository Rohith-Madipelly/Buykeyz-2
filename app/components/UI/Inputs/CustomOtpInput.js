import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const CustomOtpInput = ({
  value,
  length = 6,
  secure,
  autoComplete,
  keyboardType,
  onChangeText,
  onBlur,
  onOtpSubmit = (combinedOtp) => { console.log(combinedOtp) },
  errorBoxid,
  errorMessage,
  errorColor = 'red',
  onClear,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [selectedInput, setSelectedInput] = useState(0);
  const [errorInput, setErrorInput] = useState([0, 1, 2, 3]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);


 

  const clearValues = async() => {
    setOtp(new Array(length).fill(""));
    setErrorInput([]); // Clear error highlighting
    setSelectedInput(0);
    inputRefs.current[0].focus();
  };


  useEffect(()=>{
    if(value.length>1)
      {
  clearValues()
      }
  },[errorBoxid])

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    // if (combinedOtp.length === length) 
    onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocus = (index) => {
    setSelectedInput(index);
  };


  const handleKeyPress = (index, { key }) => {
    if (key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };



  return (
    <View style={{}}>

      <View style={{ flexDirection: 'row' }}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            // keyboardType="numeric"
            autoComplete={autoComplete}
            secureTextEntry={secure}
            keyboardType={keyboardType}
            // autoCapitalize={autoCapitalize}
            // onChangeText={onChangeText}
            onBlur={onBlur}
            onChangeText={(value) => {
              handleChange(index, value);
              onChangeText(index, value)
            }}
            onFocus={() => handleFocus(index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent)}
            maxLength={1}
            style={[
              styles.otpInput,
              styles.outlined,
              index === selectedInput && styles.selectedInput,
              errorBoxid.includes(index) && styles.ErrorInput,
            ]}
          />
        ))}
      </View>
      <View style={{ alignItems: 'center',marginVertical:10 }}>
        <Text style={{ color: errorColor }}>{errorMessage}</Text>
      </View>
      {/* <Button title='Clear' onPress={()=>{clearValues()}}></Button> */}
    </View>
  );
};

export default CustomOtpInput;

const styles = StyleSheet.create({
  otpInput: {
    width: 45,
    height: 45,
    margin: 5,
    marginBottom: 0,
    textAlign: 'center',
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: '#DDDDDD',
    fontSize: 18,
  },
  selectedInput: {
    borderColor: 'blue',
    // borderColor: 'red',
  },
  ErrorInput: {
    borderColor: 'red',
  },
});
