import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameCard, GameCardProps } from '../../components/GameCard'
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading'

import { styles } from './styles';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  function handleOpenGame({ id, bannerUrl, title }: GameCardProps) {
    navigation.navigate('game', { id, bannerUrl, title })
  }

  useEffect(() => {
    fetch('http://192.168.1.25:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
        />




      </SafeAreaView>
    </Background>
  );
}