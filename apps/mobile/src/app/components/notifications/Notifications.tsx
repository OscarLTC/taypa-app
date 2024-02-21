import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Text, View } from 'react-native';
import { firestore } from '../../config/Firebase';
import { useRecoilValue } from 'recoil';
import { userState } from '../../storage/user/user.atom';
import { useEffect, useState } from 'react';
import { userLockedState } from '../../storage/userLocked/userLocked.atom';
import { Notification } from '../../model/notification.model';

export const Notifications = () => {
  const userData = useRecoilValue(userState);
  const userLocked = useRecoilValue(userLockedState);
  const [notifications, setNotifications] = useState<Notification[]>();

  const closeNotification = async (notifications: Notification[]) => {
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
    }, 10000);
  };

  useEffect(() => {
    if (userLocked?.user) {
      console.log(userLocked);
      const adminId = userData?.userId;
      const notificationCollection = collection(firestore, 'notifications');
      const q = query(
        notificationCollection,
        where('adminId', '==', adminId),
        where('isShown', '==', false),
        where('role', '==', userLocked.role)
      );
      const unsubscribe = onSnapshot(q, (notificationSnapshot) => {
        const notificationsData = notificationSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Notification)
        );

        setNotifications(notificationsData);
        closeNotification(notificationsData);
      });
      return () => unsubscribe();
    }
  }, [userLocked?.user]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
      }}
    >
      {notifications?.map((notification) => (
        <View
          style={{
            padding: 20,
            backgroundColor: '#f44336',
            marginBottom: 15,
          }}
          key={notification.id}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {notification.message}
          </Text>
        </View>
      ))}
    </View>
  );
};
