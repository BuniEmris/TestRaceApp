import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './SwapButton.styles';

interface Props {
  onPress: () => void;
}

const SwapButton: React.FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.icon}>⇄</Text>
    </TouchableOpacity>
  );
};

export default SwapButton;
