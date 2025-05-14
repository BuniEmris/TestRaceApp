import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './CurrencySelector.styles';

interface Props {
  value: string;
  onPress: () => void;
}

// Helper to get flag emoji from currency code
const getFlag = (code: string) => {
  const map: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    PLN: '🇵🇱',
    JPY: '🇯🇵',
    GBP: '🇬🇧',
    CNY: '🇨🇳',
    AUD: '🇦🇺',
    CAD: '🇨🇦',
    CHF: '🇨🇭',
    HKD: '🇭🇰',
    SGD: '🇸🇬',
    SEK: '🇸🇪',
    // Add more as needed
  };
  return map[code] || '🏳️';
};

const CurrencySelector: React.FC<Props> = ({value, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.selector}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.flag}>{getFlag(value)}</Text>
      <Text style={styles.currency}>{value}</Text>
      <Text style={styles.arrow}>▼</Text>
    </TouchableOpacity>
  );
};

export default CurrencySelector;
