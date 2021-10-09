import React, {useState} from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from './Button';
import MaskedInput from './MaskedInput';

export default function BottomSheetPayment({
  bottomSheetRef,
  snapPoints,
  handleSheetChanges,
  distance,
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [CVC, setCVC] = useState('');

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.contentContainer}>
        <Text style={styles.resultText}>Pay ${distance} using</Text>
        <Text style={styles.formTitle}>Card information</Text>
        <MaskedInput
          value={cardNumber}
          setValue={setCardNumber}
          placeholder="Card number"
          type={'credit-card'}
        />
        <View style={styles.inputRow}>
          <MaskedInput
            value={expireDate}
            setValue={setExpireDate}
            placeholder="MM / YY"
            inRow
            type={'custom'}
            options={{mask: '99 / 99'}}
          />
          <MaskedInput
            value={CVC}
            setValue={setCVC}
            placeholder="CVC"
            inRow
            type={'custom'}
            options={{mask: '999'}}
          />
        </View>
        <Button label={`Pay $${distance}`} onPress={() => {}} />
      </View>
    </BottomSheet>
  );
}

const styles = {
  contentContainer: {flex: 1},
  inputRow: {flexDirection: 'row', justifyContent: 'space-between'},
  resultText: {fontSize: 20, fontWeight: 'bold', marginHorizontal: 20},
  formTitle: {fontSize: 12, marginHorizontal: 20, marginTop: 15, color: 'grey'},
};
