import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../types/store';
import {fetchDriverRaces} from '../store/racesSlice';
import {Race} from '../types/api';

const DriverRacesScreen = ({route}: any) => {
  const {driverId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const {races, loading, error, total, offset, limit} = useSelector(
    (state: RootState) => state.races,
  );

  useEffect(() => {
    loadRaces();
  }, [driverId]);

  const loadRaces = () => {
    dispatch(fetchDriverRaces({driverId, offset, limit}));
  };

  const loadMore = () => {
    if (offset + limit < total) {
      dispatch(fetchDriverRaces({driverId, offset: offset + limit, limit}));
    }
  };

  const renderItem = ({item}: {item: Race}) => (
    <View style={styles.raceItem}>
      <Text style={styles.raceName}>{item.raceName}</Text>
      <Text style={styles.raceInfo}>Season: {item.season}</Text>
      <Text style={styles.raceInfo}>Round: {item.round}</Text>
      <Text style={styles.raceInfo}>Circuit: {item.Circuit.circuitName}</Text>
      <Text style={styles.raceInfo}>Date: {item.date}</Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadRaces}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={races}
        renderItem={renderItem}
        keyExtractor={item => `${item.season}-${item.round}`}
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
  raceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  raceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  raceInfo: {
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

export default DriverRacesScreen;
