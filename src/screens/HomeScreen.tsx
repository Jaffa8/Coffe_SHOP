import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
import { useStore } from '../store/store'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeeCard from '../components/CoffeeeCard';


const getCategoriesFromData = (data: any) => {
  if (!data) {
    return [];
  } 
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList=(category:string,data:any)=>{
if(category=="All"){
  return data;
}
else{
  let coffeeList = data ? data.filter((item:any)=> item.name==category) : [];
  return coffeeList;
}

}
const HomeScreen = ({ navigation }: { navigation: any }) => {


const CoffeeList=useStore((state:any)=>state.coffeeList);
const BeansList=useStore((state:any)=>state.beansList);
const [categories,setCategories]=useState(getCategoriesFromData(CoffeeList));
const [searchText,setSearchText]=useState('');
const [categoryIndex,setCategoryIndex]=useState({
  index:0,
  category:categories[0],
});

const [sortedCoffee,setSortedCoffee]=useState(getCoffeeList(categoryIndex.category,CoffeeList));


const Listref:any=useRef<FlatList>();    


const tabBarHeight=useBottomTabBarHeight();

const searchCoffee=(search:string)=>{
  if(search!=''){
     Listref?.current?.scrollToOffset({offset:0,animated:true});
     setCategoryIndex({
      index:0,
      category:categories[0],
     });
     setSortedCoffee([...CoffeeList.filter((item:any)=>item.name.toLowerCase().includes(search.toLowerCase()))]);
  }
}

const resetSearchCoffee=()=>{
  Listref?.current?.scrollToOffset({offset:0,animated:true});
  setCategoryIndex({
    index:0,
    category:categories[0],
   });
   setSortedCoffee([...CoffeeList]);
   setSearchText('');
}


const addToCart=useStore((state:any)=>state.addToCart);
const calculateCartPrice=useStore((state:any)=>state.calculateCartPrice);


const CoffeeCardAddToCart=({
  id,
  index,
  name,
  roasted,
  imagelink_square,
  special_ingredient,
  type,
  prices,
 }:any)=>{
  addToCart({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  });
  calculateCartPrice();
  ToastAndroid.showWithGravity(`${name} is added to Cart`, ToastAndroid.SHORT,ToastAndroid.CENTER);
 }
 




  return (

    

    <View style={styles.ScreenContainer}>

     <StatusBar
     backgroundColor={COLORS.primaryBlackHex}
     />
     <ScrollView
     
     showsVerticalScrollIndicator={false}
     contentContainerStyle={styles.ScrollViewFlex}
     >

      {/* UPPER TWO SYMBOLS */}

      <HeaderBar />
      <Text style={styles.ScreenTitle}>Find the best{'\n'} coffee for you</Text>



       {/* SEARCH INPUT */}

      <View style={styles.InputContainerComponent}
      id='UPPER SEARCH FOR COFFEE......SEARCH AND TAKING INPUT'>
        <TouchableOpacity   onPress={()=>{
         searchCoffee(searchText);
        }} >

          <CustomIcon name='search' size={FONTSIZE.size_18} color={searchText.length>0?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}
            style={styles.InputIcon}/>
        </TouchableOpacity>

        <TextInput
        placeholder='Find your Coffee...'
        value={searchText}
        onChangeText={(text)=>{setSearchText(text)
          searchCoffee(searchText);
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
       style={styles.TextInputContainer}
        />

        {searchText.length>0?<TouchableOpacity  onPress={()=>{
          resetSearchCoffee();
        }} >
          <CustomIcon
          id='THIS IS THE CLOSE ICON THAT WILL CLEAR THE SEARCH TEXT'
          name='close'
          size={FONTSIZE.size_16}
          color={COLORS.primaryLightGreyHex}
          style={styles.InputIcon}
          />
        </TouchableOpacity>:<></>}
        
        
      </View>


      {/* CATEGORY SCROLLER */}

     <ScrollView
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={styles.CategoryScrollViewStyle}
     id='GIVING THE NORMAL FUNCTIONALITY TO THE CATEGORY SCROLLER'>
     

      {categories.map((data,index)=>{
        return (
          <View key={index.toString()}
          style={styles.CategoryScrollViewContainer}
          id='THIS IS THE MAIN VIEW THAT WILL DISPLAY THE WHOLE THING'
          >
            <TouchableOpacity
            style={styles.CategoryScrollViewItem}
            id='ISKE STYLE KA KAAM SIRF YE HAI K THAT POINTER IS IN THE MIDDLE OF THE TEXT'
            onPress={()=>{
              Listref?.current?.scrollToOffset({offset:0,animated:true});
              setCategoryIndex({  
                index:index,
                category:categories[index],
              });
              setSortedCoffee([...getCoffeeList(categories[index],CoffeeList)]);
            }}
            >
              <Text style={[styles.CategoryText,categoryIndex.index==index?{color:COLORS.primaryOrangeHex}:{}]}
              
              id='NOW THIS IS THE TEXT THAT WILL SHOW ALL THE CATEGORIES...WE CALL IT DATA'
              >
                {data}
              </Text>
              {categoryIndex.index==index?(<View style={styles.ActiveCategory}
              id='JO BHI CATEGORY SELECTED HOGI USKE NEECHE YE POINTER TYPE DIKHEGA'
              ></View>):(<></>)}
            </TouchableOpacity>
          </View>
        );
      })}


     </ScrollView>


      {/* FLAT LIST FOR COFFEE */}

      <FlatList
      ref={Listref}
      id='NOW WE WILL MAKE A FLAT LIST THAT WILL SHOW THE COFFEE'
      style={{marginVertical:SPACING.space_10}}
        horizontal
        ListEmptyComponent={<Text style={{color:COLORS.primaryWhiteHex}}>No Coffee Found</Text>}
        showsHorizontalScrollIndicator={false}
        data={sortedCoffee}
        contentContainerStyle={styles.FlatListContainer}

        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>{
          return (
           <TouchableOpacity
           
           
           onPress ={()=>{
            navigation.push('Details',{index:item.index,id:item.id,type:item.type,name:item.name});
           }}
           id='THIS IS THE MAIN CONTAINER THAT WILL SHOW THE COFFEE...INSIDE IT WE WILL HAVE A CONTAINER FOR IMAGE AND TEXT
           ON PRESS WE WILL REACH AT THE DETAILS OF THE WHOLE COFFEEE'
           >

            <CoffeeeCard
             id={item.id}
             index={item.index}
             type={item.type}
             roasted={item.roasted}
             imagelink_square={item.imagelink_square}
             name={item.name}
             special_ingredient={item.special_ingredient}
             average_rating={item.average_rating}
             prices={item.prices[2]}
             buttonPressHandler={CoffeeCardAddToCart} />
           </TouchableOpacity>
          );
        }}
     
     />

     {/* ADDING THE HEADING */}


   <Text   style={styles.CofeeBeansTitle}>
    Coffee beans
   </Text>

       {/* FLAT LIST FOR BEANS */}

       <FlatList
      id='NOW WE WILL MAKE A FLAT LIST THAT WILL SHOW THE BEANS'
      style={{marginVertical:SPACING.space_10}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={BeansList}
        contentContainerStyle={[styles.FlatListContainer,{marginBottom:tabBarHeight}]}

        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>{
          return (
           <TouchableOpacity
           
           
           onPress ={()=>{
            navigation.push('Details',{index:item.index,id:item.id,type:item.type,name:item.name});
           }}
           id='THIS IS THE MAIN CONTAINER THAT WILL SHOW THE COFFEE...INSIDE IT WE WILL HAVE A CONTAINER FOR IMAGE AND TEXT
           ON PRESS WE WILL REACH AT THE DETAILS OF THE WHOLE COFFEEE'
           >

            <CoffeeeCard
             id={item.id}
             index={item.index}
             type={item.type}
             roasted={item.raosted}
             imagelink_square={item.imagelink_square}
             name={item.name}
             special_ingredient={item.special_ingredient}
             average_rating={item.average_rating}
             prices={item.prices[2]}
             buttonPressHandler={CoffeeCardAddToCart} />
           </TouchableOpacity>
          );
        }}
     
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
  
  },
  ScreenTitle:{
    fontSize:FONTSIZE.size_28,
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingLeft:SPACING.space_30,
    marginTop:SPACING.space_2*0.2
  },
  TextInputContainer:{
    flex:1,
    height:SPACING.space_20*2.2,
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_2*0.1,
  },
  InputIcon:{
    marginHorizontal:SPACING.space_20,

  },
  InputContainerComponent:{
    margin:SPACING.space_30,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryDarkGreyHex,
    flexDirection:'row',
    alignItems:'center',
    marginTop:SPACING.space_2

  },
  CategoryScrollViewStyle:{
  paddingHorizontal:SPACING.space_20,
  marginBottom:0.1,
  marginTop:SPACING.space_2*0.01
  },

  ActiveCategory:{
  height:SPACING.space_10,
  width:SPACING.space_10,
  borderRadius:BORDERRADIUS.radius_10,
  backgroundColor:COLORS.primaryOrangeHex,
  },
  CategoryTextActive:{

  },
  CategoryText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryLightGreyHex,
    marginBottom:SPACING.space_4,
  },
  CategoryScrollViewContainer:{
    paddingHorizontal:SPACING.space_15,
   

  },
  CategoryScrollViewItem:{
  alignItems:'center',
  marginBottom:0.5
  },
  FlatListContainer:{
   gap:SPACING.space_20,
   paddingVertical:SPACING.space_10,
   paddingHorizontal:SPACING.space_30,
   marginTop:0.1,
   marginVertical:SPACING.space_8
  },
  CofeeBeansTitle:{
    fontFamily:FONTFAMILY.poppins_bold,
    fontSize:FONTSIZE.size_18,
    marginLeft:SPACING.space_30,
    marginTop:SPACING.space_2*0.1,
    color:COLORS.secondaryLightGreyHex,
    marginVertical:SPACING.space_15,
    fontWeight:'bold'
  }

  
})


export default HomeScreen


