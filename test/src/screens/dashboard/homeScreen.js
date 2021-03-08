/*
File name: homeScreen
Des: home screen
*/

import React, { useEffect, useState } from 'react';
import {  Text, View, ImageBackground, Image, ScrollView, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Button from '../../shared/common_components/button'
import useForceUpdate from 'use-force-update';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import {styles} from '../../shared/CSS/globalCSS'
export default function homeScreen({ navigation }) {
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
  }

  //Remove image to table
  const removeCompare = (item) => {
    item.added = false;
    handleClick()
    const removeImage = item
    setTableData(tableData => (tableData.filter(item => item !== removeImage)))
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


