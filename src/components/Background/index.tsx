// rnbc para criar a estrutura 
import { ImageBackground } from 'react-native';

import background from '../../assets/background-galaxy.png'

import { styles } from './styles';


interface Props {
  children: React.ReactNode;
}

export function Background({ children }:Props) {
  return (
    <ImageBackground 
      source={ background }
      defaultSource={ background }
      style={ styles.container }
    >
        { children }
    </ImageBackground>
  );
}
