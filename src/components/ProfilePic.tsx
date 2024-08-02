import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.imageContainer}>
     <Image style={styles.imagestyle} source={require('../assets/app_images/avatar.png')}/>
    </View>
  )
}



const styles = StyleSheet.create({
    imageContainer:{
        height:SPACING.space_36,
        width:SPACING.space_36,
        borderRadius:SPACING.space_12,
        borderWidth:2,
        borderColor:COLORS.secondaryDarkGreyHex,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
    },
    imagestyle:{
        height:SPACING.space_36,
        width:SPACING.space_36,
    }
})

export default ProfilePic