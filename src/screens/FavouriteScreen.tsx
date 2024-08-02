import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCart from '../components/FavoritesItemCart';




const FavouriteScreen = ({navigation}:any) => {

  const favouriteList=useStore((state:any)=>state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavoriteList=useStore((state:any)=>state.addToFavoriteList);
  const deleteFromFavoriteList=useStore((state:any)=>state.deleteFromFavoriteList);

  const togglefavorite=(favourite:boolean,type:string,id:string)=>{
    favourite? deleteFromFavoriteList(type,id):addToFavoriteList(type,id);
}
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />

            {favouriteList.length == 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {favouriteList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>

                      <FavoritesItemCart  
                      id={data.id}
                      type={data.type}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      imagelink_portrait={data.imagelink_portrait}
                      ingredients={data.ingredients}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={data.favourite}
                      togglefavorite={togglefavorite}
                      />
                    
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

         
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
export default FavouriteScreen