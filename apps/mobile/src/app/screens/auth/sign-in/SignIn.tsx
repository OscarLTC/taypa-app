import React from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { LoginData } from '../../../model/auth.model';
import { auth } from '../../../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../../storage/user/user.atom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface SignInProps {
  navigation: NavigationProp<ParamListBase>;
}

export function SignIn(props: SignInProps) {
  const setUser = useSetRecoilState(userState);

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginData>();

  const signInUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();

        setUser({
          email: userCredential.user.email,
          userId: userCredential.user.uid,
          accessToken: token,
        });
        props.navigation.navigate('home');
        setValue('email', '');
        setValue('password', '');
      })
      .catch((error) => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setError('root', {
            type: 'manual',
            message: 'Correo o contraseña incorrectos\nIntente nuevamente',
          });
        }
      });
  };

  const onSubmitPress: SubmitHandler<LoginData> = (data) => {
    Keyboard.dismiss();
    signInUser(data.email, data.password);
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
          <Image
            source={require('../../../../../assets/logo_blanco.png')}
            style={{ width: 130, height: 100 }}
          ></Image>
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
            }}
            render={({ field: { onChange, onBlur, value } }) => (
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
                  marginTop: 80,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: '#fff',
                  backgroundColor:
                    errors.email || errors.root ? '#CE3E21' : '#621708',
                  width: '100%',
                  borderRadius: 15,
                }}
              />
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
            }}
            render={({ field: { onChange, onBlur, value } }) => (
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
                  marginTop: 30,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: '#fff',
                  backgroundColor:
                    errors.password || errors.root ? '#CE3E21' : '#621708',
                  width: '100%',
                  borderRadius: 15,
                }}
              />
            )}
            name="password"
          />
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
            }}
            onPress={() => {
              props.navigation.navigate('recover-password');
            }}
          >
            <Text
              style={{
                color: '#D9D9D9',
                fontSize: 10,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 40,
              paddingVertical: 10,
              backgroundColor: '#0B0A0A',
              width: 200,
              borderRadius: 10,
              marginBottom:
                errors.email || errors.password || errors.root ? 50 : 0,
            }}
            onPress={handleSubmit(onSubmitPress)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Ingresar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              paddingVertical: 10,
              backgroundColor: 'trasparent',
              borderColor: 'white',
              borderWidth: 1,
              width: 200,
              borderRadius: 10,
              zIndex: 1,
              display:
                errors.email || errors.password || errors.root
                  ? 'none'
                  : 'flex',
            }}
            onPress={() => {
              props.navigation.navigate('sign-up');
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Registrarse
            </Text>
          </TouchableOpacity>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              display:
                errors.email || errors.password || errors.root
                  ? 'flex'
                  : 'none',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: 11,
                textAlign: 'center',
                zIndex: 1,
              }}
            >
              {errors.email?.message ||
                errors.password?.message ||
                errors.root?.message}
            </Text>
          </View>
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
}

export default SignIn;
