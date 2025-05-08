import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../types/store';
import {fetchDrivers} from '../store/driversSlice';
import {Driver} from '../types/api';

const DriversScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {drivers, loading, error, total, offset, limit} = useSelector(
    (state: RootState) => state.drivers,
  );

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    dispatch(fetchDrivers({offset, limit}));
  };

  const loadMore = () => {
    if (offset + limit < total) {
      dispatch(fetchDrivers({offset: offset + limit, limit}));
    }
  };

  const renderItem = ({item}: {item: Driver}) => (
    <TouchableOpacity
      style={styles.driverItem}
      onPress={() =>
        navigation.navigate('DriverRaces', {driverId: item.driverId})
      }>
      <Text style={styles.driverName}>
        {item.givenName} {item.familyName}
      </Text>
      <Text style={styles.driverInfo}>Nationality: {item.nationality}</Text>
      {item.permanentNumber && (
        <Text style={styles.driverInfo}>Number: {item.permanentNumber}</Text>
      )}
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDrivers}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drivers}
        renderItem={renderItem}
        keyExtractor={item => item.driverId}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loader}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  driverItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  driverInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loader: {
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DriversScreen;
