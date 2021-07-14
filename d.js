  return (
    
       <View style={styles.container}>
        <View style={mystyles.title_container}>
           <Image source={logo} style={{ width: '100%', height: '100%' }}></Image>
        </View>
        <View style={styles.Characters_container}>
           <TouchableOpacity style={{ width: '40', height: '60%' }}>
          <Text style={{ fontSize: 22, color: '#000' }}>The Feed</Text>
          </TouchableOpacity>  
        </View>

      {
        isFormVisible ?
          (
            <View style={styles.mainView}>
              <TextInput placeholder="Name" style={{width:'40%', height:40, backgroundColor:'#ebebeb',padding:30,borderRadius:5}} value={productName} onChangeText={text => setProductName(text)}  />
              <TextInput placeholder="Price" style={{width:'40%', height:40, backgroundColor:'#ebebeb',padding:30,borderRadius:5}} value={productPrice} onChangeText={text => setProductPrice(text)}  />
              <TouchableOpacity onPress={addNewProduct} style={styles.feedBtn}><Text style={styles.btnText}>ADD PRODUCT</Text></TouchableOpacity>
            </View>
          )
          :
          (
            <View style={styles.mainView}>
              {
                isLoading ?
                  (
                    <ActivityIndicator size='large' color='#99cc00' />
                  ) :
                  (
                    <View style={{width:'100%'}}>
                      {
                       feedData.length > 0 ? 
                          (
                            <FlatList
                              data={feedData}
                              keyExtractor={item => item._id}
                              renderItem={itemData =>
                                <View style={{height:'100%', alignItems:'center',backgroundColor:'#fff'}}>
                                  <Text>{itemData.item.productName}</Text>
                                  <Text>{itemData.item.productPrice}</Text>
                                  <Image style={{width:50,height:50}} source={itemData.item.productImage}></Image>
                                </View>
                              }
                            />
                          ) :
                          (
                            <Text>No Data</Text>
                          )
                      }
                    </View>
                  )
              }
              <View style={styles.menuView}>
        <TouchableOpacity onPress={changeViewState} style={styles.feedBtn}><Text style={styles.btnText}>Feed</Text></TouchableOpacity>
        <TouchableOpacity onPress={changeViewState} style={styles.addButton}><Text style={styles.btnText}>Add New</Text></TouchableOpacity>
      </View>
            </View>
          )
      }

      


      <StatusBar style="auto" />
      </View>
  );
}