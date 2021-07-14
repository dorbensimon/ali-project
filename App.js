import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import HomePage from './HomePge';
import mystyles from './styles';

const logo = require('./assets/image/logo.jpg');

const app = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [publisher, setpublisher] = useState('Dor ben simon');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await fetch(
      'http://retailsapi.us-east-2.elasticbeanstalk.com/api/feedapp/getfeed',
      {
        method: 'GET'
      }
    );

    const data = await response.json();
    setFeedData(data.products);
    setIsLoading(false);
  };
  const changeViewState = () => {
    const isVisible = isFormVisible;
    if (isVisible) {
      setIsFormVisible(false);
    } else {
      setIsFormVisible(true);
    }
  };

  const addNewProduct = async () => {
    const publisherUser = {
      name: 'Dor ben simon',
      id: '11115995',
      email: 'dor@funatix.club',
      mobile: '052-6768555'
    };
    setpublisher(publisherUser.name);
    //Check if state variables are not empty
    const response = await fetch(
      'http://retailsapi.us-east-2.elasticbeanstalk.com/api/feedapp/addfeed',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName: productName,
          productPrice: productPrice,
          productImage: productImage,
          publisher: publisherUser
        })
      }
    );
    const data = await response.json();
    setFeedData(data);
    console.log(data);
  };

  return (
    <View style={mystyles.upContainer}>
      <View style={mystyles.flastlistcountiner}>
        {isFormVisible ? (
          <View style={styles.mainView}>
            <TextInput
              placeholder="Name"
              style={{
                width: '20%',
                height: 10,
                backgroundColor: '#ebebeb',
                padding: 30,
                borderRadius: 5,
                marginVertical: 12
              }}
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
            <TextInput
              placeholder="Price"
              style={{
                width: '20%',
                height: 10,
                backgroundColor: '#ebebeb',
                padding: 30,
                borderRadius: 5
              }}
              value={productPrice}
              onChangeText={(text) => setProductPrice(text)}
            />
            <TouchableOpacity onPress={addNewProduct} style={styles.addproduct}>
              <Text style={{}}>ADD PRODUCT</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={mystyles.flastlistcountiner}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#99cc00" />
            ) : (
              <View style={{ width: '100%', height: '98%' }}>
                {feedData.length > 0 ? (
                  <FlatList
                    data={feedData}
                    keyExtractor={(item) => item._id}
                    renderItem={(itemData) => (
                      <HomePage
                        name={itemData.item.productName}
                        price={itemData.item.productPrice}
                        image={itemData.item.productImage}
                      />
                    )}
                  />
                ) : (
                  <Text>No Data</Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      <View style={mystyles.buttons}>
        <TouchableOpacity onPress={changeViewState} style={styles.feedBtn}>
          <Text style={{ alignItems: 'center' }}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeViewState} style={styles.addButton}>
          <Text style={{ alignItems: 'center' }}>Add New</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  feedBtn: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ECE5DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13
  },
  addButton: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ECE5DD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addproduct: {
    width: '20%',
    height: '10%',
    backgroundColor: '#ECE5DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12
  },

  mainView: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    width: '100%',
    height: '5%',
    alignItems: 'center'
  },
  menuView: { height: '10%', flexDirection: 'row' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Characters_container: {
    width: '100%',
    height: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDFBA'
  }
});

export default app;
