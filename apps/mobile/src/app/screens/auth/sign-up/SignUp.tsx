import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { RegisterData } from '../../../model/auth.model';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../../config/Firebase';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../../storage/user/user.atom';
import { doc, setDoc } from 'firebase/firestore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const SignUp = (props: RegisterScreenProps) => {
  const setUser = useSetRecoilState(userState);

  const signUpUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();

      const userDocRef = doc(firestore, 'admin', userCredential.user.uid);
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      });

      setUser({
        accessToken: token,
        email: userCredential.user.email,
        userId: userCredential.user.uid,
        isLocked: false,
      });

      props.navigation.navigate('home');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'manual',
          message: 'El correo ya está en uso',
        });
      }
      if (error.code === 'auth/invalid-email') {
        setError('email', {
          type: 'manual',
          message: 'El correo es inválido',
        });
      }
    }
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const onSubmitPress: SubmitHandler<RegisterData> = (data) => {
    Keyboard.dismiss();
    signUpUser(data.email, data.password);
  };

  return (
    <View style={{ backgroundColor: '#941B0C', height: '100%' }}>
      <View style={{ marginTop: 32, padding: 30 }}>
        <View style={{ position: 'absolute', top: 100, right: -125 }}>
          <Image
            source={require('../../../../../assets/araña_fondo.png')}
            style={{ width: 250, height: 250 }}
          ></Image>
        </View>
        <View
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF' }}>
            Registrarse
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 50,
              flexDirection: 'column',
            }}
          >
            <Controller
              control={control}
              rules={{
                required: {
                  message: 'Correo requerido',
                  value: true,
                },
                pattern: {
                  message: 'Correo inválido',
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                },
                maxLength: {
                  message: 'Correo muy largo',
                  value: 50,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Ingresar correo"
                    placeholderTextColor={'#F5F5F5'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onFocus={() => {
                      clearErrors('email');
                      clearErrors('root');
                    }}
                    value={value}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      color: '#fff',
                      backgroundColor:
                        errors.email || errors.root ? '#CE3E21' : '#621708',
                      borderRadius: 15,
                      marginBottom: errors.email ? 3 : 25,
                    }}
                  />
                  {errors.email && (
                    <Text
                      style={{ color: 'white', fontSize: 10, marginBottom: 7 }}
                    >
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: {
                  message: 'Contraseña requerida',
                  value: true,
                },
                minLength: {
                  message: 'Contraseña muy corta',
                  value: 8,
                },
                maxLength: {
                  message: 'Contraseña muy larga',
                  value: 20,
                },
                pattern: {
                  message: 'Contraseña inválida',
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Ingresar contraseña"
                    placeholderTextColor={'#F5F5F5'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onFocus={() => {
                      clearErrors('root');
                      clearErrors('password');
                    }}
                    value={value}
                    secureTextEntry={true}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      color: '#fff',
                      backgroundColor:
                        errors.password || errors.root ? '#CE3E21' : '#621708',
                      width: '100%',
                      borderRadius: 15,
                      marginBottom: errors.password ? 3 : 25,
                    }}
                  />
                  {errors.password && (
                    <Text
                      style={{ color: 'white', fontSize: 10, marginBottom: 7 }}
                    >
                      {errors.password.message}
                    </Text>
                  )}
                </>
              )}
              name="password"
            />
            <Controller
              control={control}
              rules={{
                required: {
                  message: 'Confirmar contraseña requerida',
                  value: true,
                },
                validate: (value) => {
                  if (value === watch('password')) {
                    return true;
                  } else {
                    return 'Las contraseñas no coinciden';
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={'#F5F5F5'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onFocus={() => {
                      clearErrors('root');
                      clearErrors('passwordConfirmation');
                    }}
                    value={value}
                    secureTextEntry={true}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      color: '#fff',
                      backgroundColor:
                        errors.passwordConfirmation || errors.root
                          ? '#CE3E21'
                          : '#621708',
                      width: '100%',
                      borderRadius: 15,
                      marginBottom: errors.passwordConfirmation ? 3 : 25,
                    }}
                  />
                  {errors.passwordConfirmation && (
                    <Text
                      style={{ color: 'white', fontSize: 10, marginBottom: 7 }}
                    >
                      {errors.passwordConfirmation.message}
                    </Text>
                  )}
                </>
              )}
              name="passwordConfirmation"
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 40,
              paddingVertical: 10,
              backgroundColor: '#0B0A0A',
              width: 200,
              borderRadius: 10,
            }}
            onPress={handleSubmit(onSubmitPress)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Registrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
            }}
            onPress={() => {
              props.navigation.navigate('sign-in');
            }}
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                color: '#D9D9D9',
                fontSize: 10,
              }}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <Image
            source={require('../../../../../assets/mono_fondo.png')}
            style={{ width: 160, height: 110 }}
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
