import { useState } from 'react';
import {
   Modal,
   ModalProps,
   View,
   Text,
   TouchableOpacity,
   Alert,
   ActivityIndicator
} from 'react-native';

import { MaterialIcons } from "@expo/vector-icons"
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';


interface Props extends ModalProps {
   discord: string;
   onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

   const [isCopping, setIsCopping] = useState(false)

   async function handleCopyDiscordToClipboard() {

      setIsCopping(true)
      await Clipboard.setStringAsync(discord);
      Alert.alert("Discord Copiado!", "Usuário compiado com Sucesso!")
      setIsCopping(false)
   }

   return (
      <Modal
         animationType='fade'
         statusBarTranslucent
         transparent
         {...rest}
      >
         <View style={styles.container}>
            <View style={styles.content}>

               <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeIcon}>
                  <MaterialIcons
                     name='close'
                     size={20}
                     color={THEME.COLORS.CAPTION_500}
                  />
               </TouchableOpacity>

               <CheckCircle
                  size={64}
                  weight='bold'
                  color={THEME.COLORS.SUCCESS}

               />

               <Heading
                  title="Let's play!"
                  subtitle='Agora é só começar a jogar'
                  style={{ alignItems: 'center', marginTop: 24 }}
               />

               <Text style={styles.label}>
                  Adicio no Discord
               </Text>


               <TouchableOpacity
                  disabled={isCopping}
                  onPress={handleCopyDiscordToClipboard}
                  style={styles.discordButton}>

                  <Text style={styles.discord}>
                     {isCopping ? <ActivityIndicator /> : discord}
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
}