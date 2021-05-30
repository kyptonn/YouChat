import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDiPPj2Y96rx9THuRa-n8p_zfx9puBNYUI",
  authDomain: "roldandev-337af.firebaseapp.com",
  projectId: "roldandev-337af",
  storageBucket: "roldandev-337af.appspot.com",
  messagingSenderId: "455051370326",
  appId: "1:455051370326:web:92ab47844ec4b743f800f7"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.firestore();



export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
        verificado: null,
        avatar: null,
        usuario: user.uid,
        terminosConfirmados:"no",
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }

  const snapshot2 = await userRef.collection('conversaciones').doc('EL2MD7fiuEOVutmSzGnJXqcgoYo1').set({
    avatarRemitente: "http://cemokalab.com/wp-content/uploads/2015/07/avatar-369-456321.png",
    nombreRemitente:"Marta",
    mensajes: [{
      content: "Hola! ¿Has recibido el mensaje confidencial por Email?", 
      createdAt: Date.now(),
      uid:"EL2MD7fiuEOVutmSzGnJXqcgoYo1"
    }],
    createdAt: Date.now(),
    uid: auth.currentUser.uid,
    uidRemitente: "EL2MD7fiuEOVutmSzGnJXqcgoYo1"
  })

};

export default firebase;



