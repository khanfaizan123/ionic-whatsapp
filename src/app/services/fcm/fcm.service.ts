import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';

import { PushNotifications } from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private afMessaging: AngularFireMessaging) { }

  requestPermission() {
    this.afMessaging.requestToken
      .pipe(take(1))
      .subscribe(
        (token:any) => {
          console.log(token);
          localStorage.setItem('fcm_token',token);
          // Send the token to your server to store it and use it to send notifications
        },
        (error) => {
          console.error(error);
        }
      );
  }

  listenForMessages() {
    this.afMessaging.messages
      .subscribe((message) => {
        console.log(message);
      });
  }

  initPush() {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener('registration', (token: any) => {
      console.log('Push registration success, token: ' + token.value);
      // Save the token to your backend or cloud service
    });

    PushNotifications.addListener('registrationError', err => {
      console.log('Push registration error: ' + JSON.stringify(err));
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push received: ', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    });
  }

  checkPermissions() {
    PushNotifications.checkPermissions().then(result => {
      if (result.receive !== 'granted') {
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            this.initPush();
          } else {
            console.error('Push notifications permission not granted');
          }
        });
      } else {
        this.initPush();
      }
    });
  }
}
