import * as Notification from 'expo-notifications';


export async function getPushNotificationtoken() {
   const { granted } = await Notification.getPermissionsAsync();


   if (!granted) {
      await Notification.requestPermissionsAsync();
   }


   if (granted) {
      const pushToken = await Notification.getExpoPushTokenAsync();
      console.log("NOTIFICANTION TOKEN  => ", pushToken.data);

      return pushToken.data;

   }

}