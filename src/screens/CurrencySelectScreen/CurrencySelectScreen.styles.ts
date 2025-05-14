import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  listContainer: {
    backgroundColor: '#E7E7E7',
    marginHorizontal: 20,
    borderRadius: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#888',
  },
  search: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#222',
    paddingVertical: 10,
    borderWidth: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#E7E7E7',
    borderRadius: 8,
    // marginHorizontal: 8,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: '#DEDEDE',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  code: {
    fontSize: 17,
    color: '#111',
    fontWeight: '500',
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#111',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#111',
  },
});

export default styles;
