import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


export default class PackageItem extends Component {

    constructor(props) {
        super(props);
    }




    render() {

        var arr = {
            "img_effortless_english": require("../../assets/Image/img_effortless_english.jpg"),
            "img_basic_voca_a": require("../../assets/Image/img_basic_voca_a.jpg"),
            "img_basic_voca_b": require("../../assets/Image/img_basic_voca_b.jpg"),
            "img_basic_voca_c": require("../../assets/Image/img_basic_voca_c.jpg"),
            "img_1000_basic": require("../../assets/Image/img_1000_basic.jpg"),
            "img_3000_common": require("../../assets/Image/img_3000_common.jpg"),
            "img_6000_word": require("../../assets/Image/img_6000_word.jpg"),
            "img_lop_10": require("../../assets/Image/img_lop_10.jpg"),
            "img_lop_11": require("../../assets/Image/img_lop_11.jpg"),
            "img_lop_12": require("../../assets/Image/img_lop_12.jpg"),
            "img_dai_hoc": require("../../assets/Image/img_dai_hoc.jpg"),
            "img_phong_van": require("../../assets/Image/img_phong_van.jpg"),
            "img_ke_toan": require("../../assets/Image/img_ke_toan.jpg"),
            "img_luat": require("../../assets/Image/img_luat.jpg"),
            "img_marketing": require("../../assets/Image/img_marketing.jpg"),
            "img_ngan_hang": require("../../assets/Image/img_ngan_hang.jpg"),
            "img_the_thao": require("../../assets/Image/img_the_thao.jpg"),
            "img_tai_chinh": require("../../assets/Image/img_tai_chinh.jpg"),
            "img_thoi_tiet": require("../../assets/Image/img_thoi_tiet.jpg"),
            "img_du_lich": require("../../assets/Image/img_du_lich.jpg"),
            "img_phong_van": require("../../assets/Image/img_phong_van.jpg"),
            "img_xay_dung": require("../../assets/Image/img_xay_dung.jpg"),
            "img_ielts": require("../../assets/Image/img_ielts.jpg"),
            "img_sat": require("../../assets/Image/img_sat.jpg"),
            "img_toefl": require("../../assets/Image/img_toefl.jpg"),
            "img_toeic": require("../../assets/Image/img_toeic.jpg"),

        }

        return (
            <View>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('SelectLesson', {content: this.props.item})}} >
                    <View style={{height: 70, backgroundColor: 'white', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                        <View style={{paddingLeft: 10}}>
                            <Image style={styles.image} source={arr[`${this.props.item.image}`]}/>
                          
        
                        </View>
                        <View style={{  flex: 1, paddingRight: 10}}>
                            <Text style={styles.text}>{this.props.item.name}</Text>
                            <Text style={{paddingLeft: 20, fontSize: 12}}>Total lesson: {this.props.item.num_lessons}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.separate}></View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    separate: {
        padding: 1,
        color: "#000000",
        borderTopColor: '#CFCFCF',
    },
    text: {
        paddingLeft: 20,
        paddingBottom: 5,
        color: '#0080e8',
        fontSize: 18,
        fontWeight: 'bold',
        // flexWrap: 'wrap',
        // backgroundColor: 'black',


    },
    image: {
        
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 2
    }
})

