import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBGIcon from './GradientBGIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';


interface ImageBackgroundInfoProps  {
    EnablebackHandler:boolean,
    imagelink_portrait:ImageProps,
    type:string,
    id:string,
    favourite:boolean,
    name:string,
    special_ingredient:string,
    ingredients:string,
    average_rating:number,
    ratings_count:string,
    roasted:string,
    BackHandler?:any;
    toggleFavorite?:any;
}

const ImageBackgroundInfo :React.FC<ImageBackgroundInfoProps> = ({
    EnablebackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    toggleFavorite,
}
    
) => {
  return (
    <View>
      <ImageBackground  source={imagelink_portrait}  
      style={styles.ItemBackgroundImage}
      >
        {/* TO ADD THE BACK BUTTON  AND THE LIKE BUTTON*/}
      {EnablebackHandler?
      <View   
      style={styles.ImageHeaderBarContainerWithBack}
      id='AS BACK AND LIKE ARE AT SAME LEVEL WE HAVE THEM INSIDE THE SAME VIEW....THE CASE WHEN WE HAVE ENABLED BACK HANDLER'
      >
         <TouchableOpacity   onPress={()=>{
            BackHandler();
         }}   >
             <GradientBGIcon  name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_18}/>
         </TouchableOpacity>

         <TouchableOpacity  onPress={()=>{
            toggleFavorite(favourite,type,id);
         }}  >
         <GradientBGIcon  name='like' color={ favourite? COLORS.primaryRedHex: COLORS.primaryLightGreyHex} size={FONTSIZE.size_18}/>
        </TouchableOpacity>

      </View>:
       <View   
      style={styles.ImageHeaderBarContainerWithoutBack}
      id='THE CASE WHEN THERE IS NO BACK HANDLER ENABLED'
      >

         <TouchableOpacity   onPress={()=>{
            toggleFavorite(favourite,type,id);
         }}  >
         <GradientBGIcon  name='like' color={ favourite? COLORS.primaryRedHex: COLORS.primaryLightGreyHex} size={FONTSIZE.size_18}/>
        </TouchableOpacity>

      </View>

    }  

    {/* ADDING THE INFO PART THAT IS WITHIN THE PICTURE */}

    <View  id='THIS IS THE MAIN VIEW'  style={styles.ImageInfoOuterContainer}>

        <View id='THIS VIEW WILL SHOW NAME AND INFO ABOUT THE IMAGE'   style={styles.ImageInfoInnerContainer}>
          <View style={styles.infoContainerRow}   id='THIS IS THE FIRST ROW...IN ONE WE WILL HAVE THE NAME AND SUBTITLE AND THE COFEE SYMBOL AND ALL'>
            <View id=' THIS IS THE FIRST ROW THAT WILL HAVE THE NAME AND LOCATION FOR BEANS AND SUBTITLE FOR THE COFFEEE '  >
                <Text  style={styles.ItemTitleText}  >{name}</Text>
                <Text  style={styles.ItemSubtitleText}  >{special_ingredient}</Text>
            </View>


<View style={styles.ItemPropertiesContainer}  id='THIS ONE IS FOR THE SYMBOLS'  >
  <View style={styles.ProperFirst}  >
 <CustomIcon name={type=='Bean'? 'bean':'beans' } size={type=='Bean'? FONTSIZE.size_18:FONTSIZE.size_24}   color={COLORS.primaryOrangeHex} />
 <Text style={[styles.PropertyTextFirst,{marginTop:type=="Bean"? SPACING.space_4+SPACING.space_2:0}]}  >{type}</Text>
  </View>
  <View style={styles.ProperFirst}  >
  <CustomIcon name={type=='Bean'? 'location':'drop' } size={FONTSIZE.size_16}   color={COLORS.primaryOrangeHex} />
  <Text style={styles.PropertyTextLast}  >{ingredients}</Text>
  </View>
  </View>
          </View>

        </View>

        <View  style={styles.infoContainerRow} >
          <View style={styles.RatingContainer}  >
          <CustomIcon name='star' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_20} />

         <Text style={styles.RatingText}>
            {average_rating}
         </Text>
         <Text  style={styles.RatingCountText} >
            ({ratings_count})
         </Text>
          </View>
           <View style={styles.RoastedContainer} >
            <Text style={styles.RoastedText} >{roasted}</Text>
           </View>

        </View>

        

    </View>

      </ImageBackground>
    </View>
  )
}



const styles = StyleSheet.create({
    ItemBackgroundImage:{
        width:'100%',
        aspectRatio:20/25,
        justifyContent:'space-between',
    },
    ImageHeaderBarContainerWithBack:{
        flexDirection:'row',
        padding:SPACING.space_30,
        alignItems:'center',
        justifyContent:'space-between'
    },
    ImageHeaderBarContainerWithoutBack:{
        flexDirection:'row',
        padding:SPACING.space_30,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    ImageInfoOuterContainer:{
   paddingVertical:SPACING.space_24,
   paddingHorizontal:SPACING.space_30,
   backgroundColor:COLORS.primaryBlackRGBA,
   borderTopLeftRadius:BORDERRADIUS.radius_20*2,
   borderTopRightRadius:BORDERRADIUS.radius_20*2,
    },
    ImageInfoInnerContainer:{
       justifyContent:'space-between',
       gap:SPACING.space_15,
    },
    infoContainerRow:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
    },
    ItemTitleText:{
      fontFamily:FONTFAMILY.poppins_semibold,
      fontSize:FONTSIZE.size_24,
      color:COLORS.primaryWhiteHex,
    },
    ItemSubtitleText:{
      fontFamily:FONTFAMILY.poppins_medium,
      fontSize:FONTSIZE.size_12,
      color:COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer:{
 flexDirection:'row',
 alignItems:'center',
 gap:SPACING.space_20,
    },
    ProperFirst:{
     height:55,
     width:55,
     borderRadius:BORDERRADIUS.radius_15,
     justifyContent:'center',
      alignItems:'center',
      backgroundColor:COLORS.primaryBlackHex
    },
    PropertyTextFirst:{
      fontFamily:FONTFAMILY.poppins_medium,
      fontSize:FONTSIZE.size_10,
      color:COLORS.primaryWhiteHex,
    },

    RatingContainer:{
    flexDirection:'row',
    gap:SPACING.space_10,
    alignItems:'center',
    },

    RatingText:{
      fontFamily:FONTFAMILY.poppins_semibold,
      fontSize:FONTSIZE.size_18,
      color:COLORS.primaryWhiteHex,
    },

    RatingCountText:{
      fontFamily:FONTFAMILY.poppins_regular,
      fontSize:FONTSIZE.size_12,
      color:COLORS.primaryWhiteHex,
    },
    RoastedContainer:{
      height:55,
      width:55*2+SPACING.space_20,
      backgroundColor:COLORS.primaryBlackHex,
      borderRadius:BORDERRADIUS.radius_15,
      justifyContent:'center',
      alignItems:'center',
      marginTop:SPACING.space_4+SPACING.space_2
    },
    RoastedText:{
      fontFamily:FONTFAMILY.poppins_regular,
      fontSize:FONTSIZE.size_10,
      color:COLORS.primaryWhiteHex,
    },
    PropertyTextLast:{
      fontFamily:FONTFAMILY.poppins_medium,
      fontSize:FONTSIZE.size_10,
      color:COLORS.primaryWhiteHex,
      marginTop:SPACING.space_4+SPACING.space_2
      
    }
})

export default ImageBackgroundInfo