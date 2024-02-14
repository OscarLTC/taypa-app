import { ScrollView, Text, View } from 'react-native';
import WorkerListSkeleton from '../workers/WorkerListSkeleton';
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native';
import {
  collection,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { firestore } from '../../config/Firebase';
import { userState } from '../../storage/user/user.atom';
import { Worker } from '../../model/woker.model';
import { RolesWorkerCard } from './RolesWorkerCard';
import { userLockedState } from '../../storage/userLocked/userLocked.atom';

interface RolesWorkerListProps {
  role: string;
  navigation: NavigationProp<ParamListBase>;
}

export const RolesWorkerList = (props: RolesWorkerListProps) => {
  const [workers, setWorkers] = useState<Worker[]>();
  const userData = useRecoilValue(userState);
  const [userLocked, setUserLocked] = useRecoilState(userLockedState);

  const adminId = userData?.userId;
  const workerCollection = collection(firestore, 'workers');
  const q = query(
    workerCollection,
    where('adminId', '==', adminId),
    where('roles', 'array-contains', props.role)
  );

  const updateAvailability = async () => {
    const workerId = userLocked?.user?.id;
    if (workerId) {
      const workerRef = doc(firestore, 'workers', workerId);
      await updateDoc(workerRef, {
        isAvailable: true,
      });
      setUserLocked({
        ...userLocked,
        user: undefined,
      });
    }
  };

  const isRolesWorkerFocused = useIsFocused();

  useEffect(() => {
    if (isRolesWorkerFocused) {
      updateAvailability();
      const unsubscribe = onSnapshot(q, (workerSnapshot) => {
        const workers = workerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkers(workers as Worker[]);
      });
      return () => unsubscribe();
    }
  }, [isRolesWorkerFocused]);
  return workers ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 60,
        marginBottom: 30,
        borderRadius: 20,
        flexDirection: 'column',
      }}
    >
      {workers.length > 0 ? (
        workers.map((worker) => (
          <RolesWorkerCard
            key={worker.id}
            worker={worker}
            role={props.role}
            navigation={props.navigation}
          />
        ))
      ) : (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: 20,
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {'Aún no se han\nregistrado trabajadores 🙈'}
          </Text>
        </View>
      )}
    </ScrollView>
  ) : (
    <WorkerListSkeleton />
  );
};
