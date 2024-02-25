import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Pressable, Text, View } from 'react-native';
import { firestore } from '../../config/Firebase';
import { useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { useEffect, useState } from 'react';
import { userLockedState } from '../../storage/userLocked/userLocked.atom';
import { Notification } from '../../model/notification.model';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
export const Notifications = () => {
  const userData = useRecoilValue(userState);
  const userLocked = useRecoilValue(userLockedState);
  const [notifications, setNotifications] = useState<Notification[]>();

  const forceHideNotification = async (notificationId: string) => {
    const notificationRef = doc(firestore, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      isShown: true,
    });
  };

  const hideNotification = async (notifications: Notification[]) => {
    notifications.forEach(async (notification) => {
      const notificationRef = doc(firestore, 'notifications', notification.id);
      await updateDoc(notificationRef, {
        wasSoundPlayed: true,
      });
    });
    setTimeout(async () => {
      notifications.forEach(async (notification) => {
        const notificationRef = doc(
          firestore,
          'notifications',
          notification.id
        );
        await updateDoc(notificationRef, {
          isShown: true,
        });
      });
    }, 5000);
  };

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('../../../../assets/ding.mp3')
    );

    console.log('Playing Sound');
    await sound.playAsync();
  };

  useEffect(() => {
    if (userLocked?.user) {
      const adminId = userData?.userId;
      const notificationCollection = collection(firestore, 'notifications');
      const q = query(
        notificationCollection,
        where('adminId', '==', adminId),
        where('isShown', '==', false),
        where('role', '==', userLocked.role)
      );
      const unsubscribe = onSnapshot(q, async (notificationSnapshot) => {
        const notificationsData = notificationSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Notification)
        );
        await notificationsData.forEach(async (notification) => {
          !notification.wasSoundPlayed && (await playSound());
        });
        setNotifications(notificationsData);
        hideNotification(notificationsData);
      });
      return () => unsubscribe();
    }
  }, [userLocked?.user]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingHorizontal: 20,
      }}
    >
      {notifications?.map((notification) => (
        <Pressable
          style={{
            padding: 15,
            marginTop: 15,
            borderRadius: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 2,
          }}
          onPress={() => forceHideNotification(notification.id)}
          key={notification.id}
        >
          <Text
            style={{
              fontSize: 12,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {notification.message}
          </Text>
          <FontAwesome name="check-circle" size={24} color="#AFE39C" />
        </Pressable>
      ))}
    </View>
  );
};
