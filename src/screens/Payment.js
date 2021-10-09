import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import BottomSheetPayment from '../components/BottomSheetPayment';
import Button from '../components/Button';
import {getData} from '../utils';

export default function Payment() {
  const [distance, setDistance] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    getData('totalDistance').then(data => setDistance(data));
  }, [isFocused]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '60%'], []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const onCheckoutPress = () => {
    bottomSheetRef.current.expand();
  };

  return (
    <View style={styles.container}>
      <View style={styles.kmContainer}>
        <Text style={styles.kmText}>
          🎉 {parseFloat(distance).toFixed(2)} km
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>
          Total({parseFloat(distance).toFixed(2)} x 2)
        </Text>
        <Text style={styles.rowText}>
          ${(parseFloat(distance) * 2).toFixed(2)}
        </Text>
      </View>
      <Button label="Checkout" onPress={onCheckoutPress} />
      <BottomSheetPayment
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        distance={(parseFloat(distance) * 2).toFixed(2)}
      />
    </View>
  );
}

const styles = {
  container: {flex: 1, justifyContent: 'space-around'},
  kmContainer: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: '#45496b',
    alignSelf: 'center',
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kmText: {color: '#FFFFFF', fontWeight: 'bold', fontSize: 18},
  row: {
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  rowText: {fontWeight: 'bold'},
};
