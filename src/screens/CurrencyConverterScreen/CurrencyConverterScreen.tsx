import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {
  fetchRates,
  setAmount,
  swapCurrencies,
} from '../../store/slices/currencySlice';
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import SwapButton from '../../components/SwapButton/SwapButton';
import styles from './CurrencyConverterScreen.styles';

const CurrencyConverterScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {from, to, amount, rates, loading, error} = useSelector(
    (state: RootState) => state.currency,
  );

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  const handleAmountChange = (value: string) => {
    dispatch(setAmount(value));
  };

  const handleSwap = () => {
    dispatch(swapCurrencies());
  };

  let result = '';
  let singleResult = '';
  if (rates[from] && rates[to] && amount) {
    const base = parseFloat(amount) / rates[from];
    const converted = base * rates[to];
    result = `${parseFloat(amount)} ${from} = ${converted.toLocaleString(
      undefined,
      {maximumFractionDigits: 2},
    )} ${to}`;
    const single = (1 / rates[from]) * rates[to];
    singleResult = `1${from === 'USD' ? '$' : from} =`;
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <View style={styles.selectorsRow}>
            <View>
              <Text style={styles.label}>From:</Text>
              <CurrencySelector
                value={from}
                onPress={() =>
                  navigation.navigate('CurrencySelect', {type: 'from'})
                }
              />
            </View>
            <View style={styles.swapCol}>
              <SwapButton onPress={handleSwap} />
            </View>
            <View>
              <Text style={styles.label}>To:</Text>
              <CurrencySelector
                value={to}
                onPress={() =>
                  navigation.navigate('CurrencySelect', {type: 'to'})
                }
              />
            </View>
          </View>
          <Text style={styles.inputLabel}>Amount:</Text>
          <CurrencyInput value={amount} onChangeText={handleAmountChange} />
          {loading && <ActivityIndicator style={styles.loader} color="#222" />}
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.resultBlock}>
            {singleResult ? (
              <Text style={styles.resultLabel}>{singleResult}</Text>
            ) : null}
            {result ? (
              <Text style={styles.result}>{result.split('=')[1]}</Text>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CurrencyConverterScreen;
