import React, {useState, useMemo} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {setFrom, setTo} from '../../store/slices/currencySlice';
import styles from './CurrencySelectScreen.styles';

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

const currencyNames: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  PLN: 'Polish Zloty',
  JPY: 'Japanese Yen',
  GBP: 'British Pound Sterling',
  CNY: 'Chinese Yuan',
  AUD: 'Australian dollar',
  CAD: 'Canadian dollar',
  CHF: 'Swiss franc',
  HKD: 'Hong Kong dollar',
  SGD: 'Singapore dollar',
  SEK: 'Swedish krona',
  // Add more as needed
};

const CurrencySelectScreen = ({route, navigation}: any) => {
  const {type} = route.params; // 'from' or 'to'
  const dispatch = useDispatch<AppDispatch>();
  const {available, from, to} = useSelector(
    (state: RootState) => state.currency,
  );
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      available.filter(code =>
        code.toLowerCase().includes(search.toLowerCase()),
      ),
    [available, search],
  );

  const selected = type === 'from' ? from : to;

  const handleSelect = (code: string) => {
    if (type === 'from') dispatch(setFrom(code));
    else dispatch(setTo(code));
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.search}
          placeholder="Search currency"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        contentContainerStyle={[styles.listContainer, {paddingBottom: 48}]}
        data={filtered}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          const isSelected = item === selected;
          // Remove marginBottom for last item for clean border
          const isLast = index === filtered.length - 1;
          return (
            <TouchableOpacity
              style={[
                styles.item,
                isSelected && styles.selected,
                isLast && {marginBottom: 0},
              ]}
              onPress={() => handleSelect(item)}>
              <Text style={styles.flag}>{getFlag(item)}</Text>
              <Text style={styles.code}>{item}</Text>
              <Text style={styles.name}>- {currencyNames[item] || item}</Text>
              <View style={styles.radio}>
                {isSelected ? <View style={styles.radioDot} /> : null}
              </View>
            </TouchableOpacity>
          );
        }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default CurrencySelectScreen;
