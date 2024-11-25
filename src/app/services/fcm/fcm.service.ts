import { inject, Injectable } from '@angular/core';
// import { getMessaging, getToken, onMessage, Messaging } from '@angular/fire/messaging';
// import { take } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { PushNotifications } from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root'
})
export class FcmService {
  // messaging: Messaging;

  // constructor() {
  //   this.messaging = getMessaging();
  //   this.requestPermission();
  //   this.listenForMessages();
  // }

  // async requestPermission() {
  //   try {
  //     const token = await getToken(this.messaging, {
  //       vapidKey: environment.firebase.messagingSenderId // Provide VAPID key if needed
  //     });
  //     console.log('FCM Token:', token);
  //     // Save the token to your server or local storage
  //   } catch (error) {
  //     console.error('Error getting permission or token:', error);
  //   }
  // }

  // listenForMessages() {
  //   onMessage(this.messaging, (payload) => {
  //     console.log('Message received:', payload);
  //     // Handle the incoming message here
  //   });
  // }

  // initPush() {
  //   PushNotifications.requestPermissions().then(permission => {
  //     if (permission.receive === 'granted') {
  //       PushNotifications.register();
  //     } else {
  //       // No permission for push granted
  //     }
  //   });

  //   PushNotifications.addListener('registration', (token: any) => {
  //     console.log('Push registration success, token: ' + token.value);
  //     // Save the token to your backend or cloud service
  //   });

  //   PushNotifications.addListener('registrationError', err => {
  //     console.log('Push registration error: ' + JSON.stringify(err));
  //   });

  //   PushNotifications.addListener('pushNotificationReceived', notification => {
  //     console.log('Push received: ', notification);
  //   });

  //   PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
  //     console.log('Push action performed: ' + JSON.stringify(notification));
  //   });
  // }

  // checkPermissions() {
  //   PushNotifications.checkPermissions().then(result => {
  //     if (result.receive !== 'granted') {
  //       PushNotifications.requestPermissions().then(result => {
  //         if (result.receive === 'granted') {
  //           this.initPush();
  //         } else {
  //           console.error('Push notifications permission not granted');
  //         }
  //       });
  //     } else {
  //       this.initPush();
  //     }
  //   });
  // }
}
