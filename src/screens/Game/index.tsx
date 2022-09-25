import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './style';

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/@navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {

   const [dous, setDuos] = useState<DuoCardProps[]>([])
   const [discordDuoSelected, setDiscordDuoSelected] = useState('')

   const navigation = useNavigation();
   const route = useRoute();
   const game = route.params as GameParams;

   function handleGoBack() {
      return (
         navigation.goBack()
      )
   }

   async function getDiscorUser(adsId: string) {
      fetch(`http://192.168.1.25:3333/games/${adsId}/discord`)
         .then(response => response.json())
         .then(data => { setDiscordDuoSelected(data.discord) })
   }

   useEffect(() => {
      fetch(`http://192.168.1.25:3333/games/${game.id}/ads`)
         .then(response => response.json())
         .then(data => {
            setDuos(data);

         })
   }, [])


   return (
      <Background>
         <SafeAreaView style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity
                  onPress={handleGoBack}
               >
                  <Entypo
                     name='chevron-thin-left'
                     color={THEME.COLORS.CAPTION_300}
                     size={20}
                  />
               </TouchableOpacity>

               <Image
                  source={logoImg}
                  style={styles.logo}
               />
               <View style={styles.right} />
            </View>

            <Image
               source={{ uri: game.bannerUrl }}
               style={styles.cover}
               resizeMode="cover"
            />

            <Heading
               title={game.title}
               subtitle='Conecte-se e começe a jogar!'
            />
            <FlatList
               data={dous}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <DuoCard
                     onConnect={() => getDiscorUser(item.id)}
                     data={item}
                  />
               )}
               horizontal
               style={styles.containerList}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={[dous.length > 0 ? styles.contentList : styles.emptyListContent]}
               ListEmptyComponent={() => (
                  <Text style={styles.emptyListText}>
                     Não há anúcios publicados ainda...
                  </Text>
               )}
            />

            <DuoMatch
               visible={discordDuoSelected.length > 0 ? true : false}
               discord={discordDuoSelected}
               onClose={() => setDiscordDuoSelected('')}
            />
         </SafeAreaView>
      </Background>
   );
}