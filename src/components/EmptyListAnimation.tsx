import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'


interface EmptyListAnimationProps {
    title:string
}

const EmptyListAnimation:React.FC<EmptyListAnimationProps> = (
    {title}
) => {
  return (
    <View  style={styles.EmptyContainer}  >
     <LottieView  source={require('../lottie/coffeecup.json')}  
     autoPlay
     loop
     style={styles.LOttieStyle}
     />

    <Text  style={styles.LottieText}  >
       {title}
    </Text>
    </View>
  )
}


const styles = StyleSheet.create({
    EmptyContainer:{
          flex:1,
          justifyContent:'center',
    },
    LOttieStyle:{
    height:300
    },
    LottieText:{
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryOrangeHex,
    alignSelf:'center',

    }
})


export default EmptyListAnimation