import { createContext, useState, useEffect } from 'react'
import {
  signUp,
  signIn,
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from '../services/authService'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleSignUp = async (email, password, displayName) => {
    setError(null)
    try {
      const result = await signUp(email, password, displayName)
      setUser(result.user)
      return result
    } catch (err) {
      const errorMessage = err.message || 'Đăng ký thất bại'
      setError(errorMessage)
      throw err
    }
  }

  const handleSignIn = async (email, password) => {
    setError(null)
    try {
      const result = await signIn(email, password)
      setUser(result.user)
      return result
    } catch (err) {
      const errorMessage = err.message || 'Đăng nhập thất bại'
      setError(errorMessage)
      throw err
    }
  }

  const handleSignInWithGoogle = async () => {
    setError(null)
    try {
      const result = await signInWithGoogle()
      setUser(result.user)
      return result
    } catch (err) {
      const errorMessage = err.message || 'Đăng nhập Google thất bại'
      setError(errorMessage)
      throw err
    }
  }

  const handleSignOut = async () => {
    setError(null)
    try {
      await signOut()
      setUser(null)
    } catch (err) {
      const errorMessage = err.message || 'Đăng xuất thất bại'
      setError(errorMessage)
      throw err
    }
  }

  const value = {
    user,
    loading,
    error,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
