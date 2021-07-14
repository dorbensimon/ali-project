import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const HomePage = (props) => {


    return(
        <View style={styles.row_container}>
            <View style={styles.content_container}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.title}>{props.price}</Text>
                <Text style={styles.title}>{props.publisher}</Text>
                <View style={{width:'50%'}}>
                <Image style={{width:'70%',height:150}} source={{uri:props.image}}></Image>
                </View>
            </View>
            
        </View>
        

        
    );
}

const styles = StyleSheet.create({
    image:{ width:'100%', height:90 },
    row_container:{ 
        borderRadius:4,
        width:'100%', 
        marginTop:12, 
        backgroundColor:'#ffffff', 
        flexDirection:'row',
        shadowOffset: { width:0, height:2 },
        shadowColor: '#000000',
        shadowOpacity: 0.20,
        shadowRadius: 4
    },
    image_container:{ width:'30%'},
    price_container:{ width:'20%', backgroundColor:'#00cc99', alignItems:'center', justifyContent:'center'},
    content_container: { width: '50%', paddingVertical:16, paddingHorizontal:10 },
    title: {fontSize:16},
    content:{fontSize:11},
});

export default HomePage;