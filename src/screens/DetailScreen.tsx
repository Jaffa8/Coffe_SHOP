import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import PaymentFooter from '../components/PaymentFooter'
import CartScreen from './CartScreen'

const DetailScreen = ({navigation,route}:any) => {

  console.log(route.params.type)

  const ItemOfIndex = useStore((state: any) => 
    (route.params.type === "Coffee" ? state.coffeeList : state.beansList)[route.params.index]
  );

  const addToFavouriteList=useStore((state:any)=>state.addToFavoriteList);
  const deleteFromFavouriteList=useStore((state:any)=>state.deleteFromFavoriteList);
  
   
   const BackHandler=()=>{
    navigation.pop();
   }

   const [price,setPrice]=useState(ItemOfIndex.prices[0]);

   const [fullDescription,setFullDescription]=useState(false);


   const togglefavorite=(favourite:boolean,type:string,id:string)=>{
       favourite? deleteFromFavouriteList(type,id):addToFavouriteList(type,id);
   }


   const addToCart=useStore((state:any)=>state.addToCart);
   const calculateCartPrice=useStore((state:any)=>state.calculateCartPrice);

   const addToCartHandler=({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
   }:any)=>{
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices:[{...price,quantity:1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
   }
   

  return (
    <View  style={styles.ScreenContainer} >
     <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
     <ScrollView   showsVerticalScrollIndicator={false}
     contentContainerStyle={styles.ScrollViewFlex}  >

      {/* ADDING BACKGROUND IMAGE */}

      <ImageBackgroundInfo 
      EnablebackHandler={true}
      imagelink_portrait={ItemOfIndex.imagelink_portrait}
      type={ItemOfIndex.type}
      id={ItemOfIndex.id}
      favourite={ItemOfIndex. favourite}
      name={ItemOfIndex.name}
      special_ingredient={ItemOfIndex.special_ingredient}
      ingredients={ItemOfIndex.ingredients}
      average_rating={ItemOfIndex.average_rating}
      ratings_count={ItemOfIndex.ratings_count}
      roasted={ItemOfIndex.roasted}
      BackHandler={BackHandler}   // the function that defines what should happen on pressing back
      toggleFavorite={togglefavorite}       // the function that defines what should happen on pressing like
      /> 

       {/* ADDING THE DESCRIPTION */}

           <View   id='FROM FIGMA I CAME TO KNOW THAT THIS VIEW WILL HAVE TWO TEXT COMPONENTS ONLY' style={styles.FooterInfoArea}  >
                 <Text  style={styles.InfoTitle}  > Description </Text>
           

            {fullDescription?<TouchableWithoutFeedback  onPress={()=>{setFullDescription(prev=>!prev)}}  >
              <Text   style={styles.DescriptionText}  > {ItemOfIndex.description}  </Text>
            </TouchableWithoutFeedback>:<TouchableWithoutFeedback  onPress={()=>{setFullDescription(prev=>!prev)}}  >
            <Text    style={styles.DescriptionText}    numberOfLines={3} > {ItemOfIndex.description}  </Text>
            </TouchableWithoutFeedback>}

            <Text style={styles.InfoTitle}  > Size </Text>

               {/* ADDING THE SIZE */}

            <View style={styles.SizeOuterContainer}  >
            {ItemOfIndex.prices.map((data:any)=>(
      <TouchableOpacity key={data.size}  style={[styles.SizeBox,{borderColor:data.size==price.size?COLORS.primaryOrangeHex  : COLORS.primaryDarkGreyHex }]} 
      
      onPress={()=>{
        setPrice(data);
      }}
      >
         <Text style={[styles.sizeText,
          {fontSize:ItemOfIndex.type=="Bean"?FONTSIZE.size_14:FONTSIZE.size_16,
           color:data.size==price.size?COLORS.primaryOrangeHex  : COLORS.primaryLightGreyHex
          },
          
          ]}  > {data.size} </Text>
      </TouchableOpacity>
    ))}
            </View>

            </View>


            
        <PaymentFooter
          price={price}
          buttonPressHandler={() => {
            addToCartHandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            })
          }}
          buttonTitle={"Add to Cart"}
        />
            

      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex
  },
  ScrollViewFlex:{
    flexGrow:1,
    justifyContent:'space-between'
  
  },
  InfoTitle:{
     fontFamily:FONTFAMILY.poppins_semibold,
     fontSize:FONTSIZE.size_16,
     color:COLORS.primaryWhiteHex,
     marginBottom:SPACING.space_10

  },
  FooterInfoArea:{
    padding:SPACING.space_20,
  },
  DescriptionText:{
    letterSpacing:0.5,
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_30

  },
  SizeOuterContainer:{
    flex  :1,
    flexDirection:'row',
    justifyContent:'space-between',
    gap:SPACING.space_20,
  },
  sizeText:{
      fontFamily:FONTFAMILY.poppins_regular,
  },
  SizeBox:{
   flex:1,
   backgroundColor:COLORS.primaryDarkGreyHex,
   alignItems:'center', 
   justifyContent:'center',
   height:SPACING.space_24*2,
   borderRadius:BORDERRADIUS.radius_10,
   borderWidth:2,
  }

})

export default DetailScreen