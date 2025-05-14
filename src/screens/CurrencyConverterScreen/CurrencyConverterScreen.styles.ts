import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selectorsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorCol: {
    flex: 1,
  },
  swapCol: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    marginLeft: 2,
  },
  inputLabel: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    marginLeft: 2,
    marginTop: 8,
  },
  loader: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    marginTop: 12,
    textAlign: 'center',
  },
  resultBlock: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  resultLabel: {
    color: '#222',
    fontSize: 16,
    marginBottom: 2,
  },
  result: {
    color: '#111',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default styles;
