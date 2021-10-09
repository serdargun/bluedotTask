import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function FreeDrivingButton({onPress, isActive}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={[styles.container, isActive ? styles.activeContainer : null]}>
        <View style={styles.circle} />
        <Text style={[styles.label, isActive ? styles.activeLabel : null]}>
          Free Driving
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    width: 150,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000000',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  activeContainer: {
    backgroundColor: '#45496b',
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: 'grey',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  label: {color: '#45496b'},
  activeLabel: {color: '#FFFFFF'},
};
