import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CLIENT_ID} from "@env"

const AuthContext = createContext({});

GoogleSignin.configure({
  webClientId:CLIENT_ID,
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    await GoogleSignin.signIn()
      .then(async logInResult => {
        const {idToken} = logInResult;
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
      })
      .catch(err => console.log('err : ' + err))
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    auth().signOut();
  };
  
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  return (
    <AuthContext.Provider value={{user, signInWithGoogle, loading, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
