import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: 'AIzaSyBV1lEpjXppRbXv8VWpamY17tNYeDYUuc0',
  authDomain: 'books-3e5e7.firebaseapp.com',
  databaseURL: 'https://books-3e5e7-default-rtdb.firebaseio.com',
  projectId: 'books-3e5e7',
  storageBucket: 'books-3e5e7.appspot.com',
  messagingSenderId: '1094309274173',
  appId: '1:1094309274173:web:3f8aa22f2b8577b4dd8054',
  measurementId: 'G-WN0WRKTFS7'
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
