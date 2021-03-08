import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      height: 100,
      marginBottom: 4
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    container: { flex: 1, backgroundColor: '#f4b244' },
    head: { height: 30, backgroundColor: '#808B97', },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#f4b244' },
    btn: { width: 60, height: 40 },
    btnText: { textAlign: 'center', color: '#fff' },
    imageTable: { height: '100%', width: '100%' },
    title: { fontSize: 10, fontWeight: 'bold', color: 'black' },
    tableStyle: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4b244' },
    border: { borderWidth: 1, borderColor: '#808B97' }
  });