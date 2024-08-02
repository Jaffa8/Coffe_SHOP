import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconprops{
    name:string;
    color:string;
    size:number;
   
}

const BGIcon:React. FC<BGIconprops> = ({
    name,
    color,
    size,
  

}) => {
  return (
    <View style={[styles.iconBG]}
   
    >
      <CustomIcon
      name={name}
      color={color}
      size={size}
      />
    </View>
  );
};



const styles = StyleSheet.create({
    iconBG:{
        marginBottom:SPACING.space_15,
        height:SPACING.space_30,
        width:SPACING.space_30,
        borderRadius:BORDERRADIUS.radius_8,
        justifyContent:'center',
        alignItems:'center',
        
        marginRight:SPACING.space_15,
        backgroundColor:COLORS.primaryOrangeHex,
    }
})

export default BGIcon;