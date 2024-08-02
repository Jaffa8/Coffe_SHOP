import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { useStore } from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList=[
  {
    name:'Wallet',
    icon:'icon',
    isIcon:true,

  },
  {
    name:'Google Pay',
    icon:require('../assets/app_images/gpay.png'),
    isIcon:false,

  },
  {
    name:'Apple Pay',
    icon:require('../assets/app_images/applepay.png'),
    isIcon:false,

  },
  {
    name:'Amazon Pay',
    icon:require('../assets/app_images/amazonpay.png'),
    isIcon:false,

  }

]

const PaymentScreen = ({navigation,route}:any) => {

 const addToOrderHistoryListFromCart=useStore((state:any)=>state.addToOrderHistoryListFromCart);
 const calculateCartPrice=useStore((state:any)=>state.calculateCartPrice);


  const [paymentMode,setPaymentMode]=useState('Credit Card');

  const [showAnimation,setShowAnimation]=useState(false);


   const buttonPressHandler=()=>{

    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(()=>{
      setShowAnimation(false);
      navigation.navigate('History');
    },2000)

   }




  return (
    <View style={styles.ScreenContainer}  >


{showAnimation?
<PopUpAnimation   style={styles.LottieAnimation} source={(require('../lottie/successful.json'))}  />
:
<></>}
      <StatusBar backgroundColor={COLORS.primaryBlackHex}  />


      <ScrollView   showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>

      <View   style={styles.HeaderContainer} id='THIS IS TO SHOW THE NAME OF THE SCREEN AND THE BUTTON TO GO BACK'   >

     <TouchableOpacity   id='THIS IS THE BUTTON FOR THE USER TO GO BACK'   
     onPress={()=>navigation.pop()}
     >

     <GradientBGIcon   name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}   />

     </TouchableOpacity>

     <Text  style={styles.HeaderText}   id='THIS IS THE TEXT THAT WE ARE USING'  >
        Payment
     </Text>

     <View style={styles.EmptyView}   id='NOTHING SPECIFIC...CAN CHECK IT BY SEEING ITS BG COLOR WHILE DEBUGGING' />
   




      </View>


      <View  style={styles.PaymentOptionsContainer}  >


        <TouchableOpacity   onPress={()=>{
          setPaymentMode('Credit Card')
        }} >

          <View  style={[styles.CreditCardContainer,{borderColor:paymentMode=='Credit Card'?COLORS.primaryOrangeHex:COLORS.primaryGreyHex}]}  >
                <Text style={styles.CreditCardTitle}  > Credit Card    </Text>
                <View style={styles.CreditCardBG}  >

                  <LinearGradient  start={{x:0,y:0}}
                   end={{x:1,y:1}}
                   style={styles.LinearGradientStyles}
                   colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
                  >

                    <View style={styles.CreditCardRow}  >

                      <CustomIcon   name='chip'  size={FONTSIZE.size_20*2} color={COLORS.primaryOrangeHex} />

                      <CustomIcon   name='visa'  size={FONTSIZE.size_30*2} color={COLORS.primaryWhiteHex} />

                    </View>

                    <View style={styles.CreditCardNumberContainer}  >
                      <Text  style={styles.CreditCardNumber} >
                             3897   
                      </Text>
                      <Text  style={styles.CreditCardNumber} >
                             4647  
                      </Text>
                      <Text  style={styles.CreditCardNumber} >
                             2488  
                      </Text>
                      <Text  style={styles.CreditCardNumber} >
                            5647   
                      </Text>

                    </View>

                    <View  style={styles.CreditCardRow} >
                      <View style={styles.creditcardNameContainer}  >
                        <Text style={styles.CreditCardNameSubtitle}  >Card Holder Name</Text>
                        <Text style={styles.CreditCardNameTitle}  >Sachit Parmar</Text>
                      </View>

                      <View style={styles.creditCardDetailContainer}  >
                        <Text style={styles.CreditCardNameSubtitle}  >Expiry Date</Text>
                        <Text style={styles.CreditCardNameTitle}  >12/2028</Text>
                      </View>

                    </View>

                  </LinearGradient>

                </View>
          </View>

        </TouchableOpacity>




        {PaymentList.map((data:any)=>(

          <TouchableOpacity   key={data.name}   onPress={()=>{
            setPaymentMode(data.name)
          }}  >
            <PaymentMethod    paymentMode={paymentMode} name={data.name}  icon={data.icon}  isIcon={data.isIcon} />
          </TouchableOpacity>

        ))}

      </View>
      
       


      </ScrollView>

      <PaymentFooter  buttonTitle={`Pay with ${paymentMode}`} price={{price:route.params.amount,currency:'₹'}}  buttonPressHandler={buttonPressHandler} />
    
     
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
  HeaderContainer:{
   paddingHorizontal:SPACING.space_20,
   paddingVertical:SPACING.space_15,
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between' 
  },
  HeaderText:{

    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_20,
    color:COLORS.primaryWhiteHex

  },
  EmptyView:{
    width:SPACING.space_36,
    height:SPACING.space_36, 
   
  },
  PaymentOptionsContainer:{
    padding:SPACING.space_15,
    gap:SPACING.space_15,
    
  },
  CreditCardContainer:{
    padding:SPACING.space_10,
    gap:SPACING.space_10,
    borderRadius:BORDERRADIUS.radius_15*2,
    borderWidth:3
  },
  CreditCardTitle:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
    marginLeft:SPACING.space_10
  },
  CreditCardBG:{
   backgroundColor:COLORS.primaryGreyHex,
   borderRadius:BORDERRADIUS.radius_15*2,
  },
  LinearGradientStyles:{
    borderRadius:BORDERRADIUS.radius_25,
    gap:SPACING.space_36,
    paddingHorizontal:SPACING.space_8,
    paddingVertical:SPACING.space_10
  },
  CreditCardRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  CreditCardNumberContainer:{
    flexDirection:'row',
    gap:SPACING.space_10,
    alignItems:'center',
   
  },
  CreditCardNumber:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_18,
    color:COLORS.primaryWhiteHex,
    marginLeft:SPACING.space_10,
    letterSpacing:SPACING.space_2

  },
  CreditCardNameSubtitle:{
   fontSize:FONTSIZE.size_12,
   fontFamily:FONTFAMILY.poppins_regular,
    color:COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle:{
    fontSize:FONTSIZE.size_18,
   fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex
  },
  creditcardNameContainer:{
   alignItems:'flex-start',
  },
  creditCardDetailContainer:{
    alignItems:'flex-end',
  },
  LottieAnimation:{
    flex:1
  }

})

export default PaymentScreen