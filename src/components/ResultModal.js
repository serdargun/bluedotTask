import React from 'react';
import {View, Modal, Text} from 'react-native';
import Button from './Button';

export default function OptionsModal({visible, closeModal, distance}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>
            Congratulations🎉 You've completed {distance} kms
          </Text>
          <Button label="OK" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'center',
  },
  box: {
    height: 200,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  text: {textAlign: 'center', fontSize: 18},
};
