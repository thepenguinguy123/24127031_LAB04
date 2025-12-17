import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDtdljJvGkjJ4Pn-3qYXB6Mx9nkVTyMvps',
  authDomain: 'backend-c7948.firebaseapp.com',
  projectId: 'backend-c7948',
  storageBucket: 'backend-c7948.firebasestorage.app',
  messagingSenderId: '34090677746',
  appId: '1:34090677746:web:fa1cc5553c5a12000aa76b',
  measurementId: 'G-ZJ9L7TTRJ5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app
