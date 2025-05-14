import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './CurrencyInput.styles';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const CurrencyInput: React.FC<Props> = ({value, onChangeText}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="Input"
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default CurrencyInput;
