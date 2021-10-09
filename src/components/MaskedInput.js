import React from 'react';
import {View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

export default function MaskedInput({
  value,
  setValue,
  placeholder,
  inRow,
  type,
  options,
}) {
  return (
    <View style={[styles.container, inRow ? {flexGrow: 1} : null]}>
      <TextInputMask
        type={type}
        options={options}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = {
  container: {
    height: 44,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
};
