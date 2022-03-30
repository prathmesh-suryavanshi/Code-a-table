/*
File name: homeScreen
Des: home screen
*/

import React, { useEffect, useState } from 'react';
import {  Text, View, ImageBackground, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Button from '../../shared/common_components/button'
import useForceUpdate from 'use-force-update';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import {styles} from '../../shared/CSS/globalCSS'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'User_Database.db' },()=>{console.log("Success")}, ()=>{console.log("Error")});

export default function homeScreen({ navigation }) {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='User_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS User_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS User_Table(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(30), url VARCHAR(255), thumbnailUrl VARCHAR(255))',
              []
            );
          }
        }
      );
    })

  }, []);
  
  //State
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState(['Album Id', 'Id', 'Image URL', 'Image', ''])
 
  //Force Update to re-render
  const forceUpdate = useForceUpdate();

  //Get data
  useEffect(() => {
    getData()
  }, []);

  //Handle force update
  const handleClick = React.useCallback(() => {
    forceUpdate();
  }, [forceUpdate]);

  //API fetch
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => setData(json.slice(0, 99)))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }

  //Add image to table
  const compareImage = (item) => {
    item.added = true;
    handleClick()
    setTableData(tableData => (tableData.concat(item)))
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO User_Table (id, title, url, thumbnailUrl) VALUES (?,?,?,?)',
        [item.id, item.title, item.url, item.thumbnailUrl],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              'Data Added successfully',
             
            );
          } else {
            alert('oops something went wrong');
          }
        }
      );
    });
  }

  //Remove image to table
  const removeCompare = (item) => {
    item.added = false;
    handleClick()
    const removeImage = item
    setTableData(tableData => (tableData.filter(item => item !== removeImage)))
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM User_Table where id='+ item.id,
        [],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              'Data deleted successfully',
            );
          } else {
            alert('No data present');
          }
        }
      );
    });
  }

  //Show image in table
  const element = (data, index) => (
    <View style={styles.btn}>
      <Image
        source={{ uri: data }}
        style={styles.imageTable}
      />
    </View>
  );

  //Change Array of Object to Array of Array
  var array = tableData.map(Object.values);

  //Render
  if (isLoading === false) {
    return (
      <View style={styles.container}>
        <FlatGrid
          itemDimension={130}
          data={data}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <View>
              <View style={[styles.itemContainer]}>
                <ImageBackground
                  source={{ uri: item.thumbnailUrl }}
                  style={styles.imageTable}
                >
                  <Text style={styles.title}>{item.title}</Text>
                </ImageBackground>
              </View>
              {item.added == true ? <Button label={'Remove'} onPress={() => removeCompare(item)} /> :
                <Button label={'Compare'} onPress={() => compareImage(item)} />}
            </View>
          )}
        />
        { array.length > 0 ? <ScrollView style={styles.container}>
          <View>
            <Table style={styles.tableStyle} borderStyle={styles.border}>
              <Row data={tableHead} style={styles.head} textStyle={styles.text} />
              {
                array.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text} />
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        </ScrollView> : null}
      </View>
    )
  } else {
    return (
      <ActivityIndicator />
    )
  }
}


