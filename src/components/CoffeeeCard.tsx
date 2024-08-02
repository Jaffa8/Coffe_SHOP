import { Dimensions, Image, ImageBackground, ImageProps, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH=Dimensions.get('window').width*0.32;

interface CoffeeCardProps{
  id:string;
  index:number;
  type:string;
  roasted:string;
  imagelink_square:ImageProps;
  name:string;
  special_ingredient:string;
  average_rating:string;
  prices:any;
  buttonPressHandler:any;

}

const CoffeeeCard:React.FC <CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  prices,
  buttonPressHandler, 
}) => {
  return (
    
   <LinearGradient
   
   id='THIS PROVIDES THE BACKGROUND COLOR FOR THE CARD'
   start={{x:0,y:0}}
    end={{x:1,y:1}}
    style={styles.CardLinearGradientColor}
    colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
   >
    <ScrollView>
    <ImageBackground
      source={(imagelink_square )}
      style={styles.CardImageBackground}
      resizeMode='cover'
     >
      <View 
      style={styles.CardRatingContainer}
      id='IMAGE K ANDAR SIRF USKI RATING AND EK STAR ICON HAI'>
        
      <CustomIcon
      id=' THIS INSIDE VIEW IS ONLY FOR THE STAR ICON PURPOSE' 
      name={'star'} color={COLORS.primaryOrangeHex} size={FONTSIZE.size_16} />

      <Text 
      style={styles.CardRatingText}
      id='ISSS TEXT MEIN RATING HAI'>
        {average_rating}
      </Text>
      </View>
 
     </ImageBackground>

     <Text
     id='NOW AFTER THE IMAGE WE HAVE ITS NAME AND SPECIAL INGREDIANT PRICE WITH A DOLLAR SYMBOL AND A PLUS ICON.... THIS ONE IS ONLY FOR NAME'
     style={styles.cardTitle}
     >
        {name}
     </Text>
      
     <Text
     id='SPECIAL K LIYE'
     style={styles.cardSubTitle}
     >
    {special_ingredient}
     </Text>

     <View
     id='AS PRICE AND PLUS ARE AT SAME LEVEL SO A VIEW AND ITS FLEX IS ROW'
     style={styles.CardFooterRow}
     >
      <Text   style={styles.CardPriceCurrency} >
      ₹
        <Text style={styles.CardPrice}>
          {prices.price}
        </Text>
      </Text>

      <TouchableOpacity
      onPress={()=>{buttonPressHandler({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices: Array.isArray(prices) ? [...prices, { quantity: 1 }] : [{ quantity: 1 }]
      })}}
      id='FOR PLUS ICON BUT WE WILL MAKE THAT PLUS ICON AS A SEPARATE COMPONENT
      ON PRESS WE WILL BE ABLE TO ADDD THIS ITEM TO OUR CART'
      >
     
        <BGIcon
        
        name='add'
        color='COLORS.primaryWhiteHex'
       
        size={FONTSIZE.size_10}
         
        
        />
       
      </TouchableOpacity>
     

     </View>
     </ScrollView>
   
    
   </LinearGradient>
  )
}



const styles = StyleSheet.create({
  CardLinearGradientColor:{
    padding:SPACING.space_15,
    borderRadius:BORDERRADIUS.radius_25,
    marginBottom:SPACING.space_10,
    height:CARD_WIDTH*2.25,
 
  },
  CardImageBackground:{
    width:CARD_WIDTH,
    height:CARD_WIDTH,
    borderRadius:BORDERRADIUS.radius_20,
    marginBottom:SPACING.space_15,
    overflow:'hidden',
    
  },
  CardRatingContainer:{
  flexDirection :'row',
  backgroundColor:COLORS.primaryBlackRGBA,
  alignItems:'center',
  justifyContent:'center',
  gap:SPACING.space_10,
  paddingHorizontal:SPACING.space_15,
  position:'absolute',
  borderBottomLeftRadius:BORDERRADIUS.radius_20,
  borderTopRightRadius:BORDERRADIUS.radius_20,
 top:0,
  right:0,
  },
  CardRatingText:{
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex,
    lineHeight:SPACING.space_20,
    fontSize:FONTSIZE.size_14,
  },
  CardFooterRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:SPACING.space_15,
    marginBottom:SPACING.space_15,
  },
  cardTitle:{
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex,
   
    fontSize:FONTSIZE.size_16,
  },
  cardSubTitle:{
    fontFamily:FONTFAMILY.poppins_light,
    color:COLORS.primaryWhiteHex,
    
   
    fontSize:FONTSIZE.size_12,
  },
  CardPriceCurrency:{
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryOrangeHex,
   
    marginBottom:SPACING.space_2,
   
    fontSize:FONTSIZE.size_18,
  },
  CardPrice:{
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
   
    marginBottom:SPACING.space_2,
  }

})


export default CoffeeeCard