import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export const signUp = async (email, password, displayName) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(result.user, { displayName })
    }
    return result
  } catch (error) {
    throw translateAuthError(error)
  }
}

export const signIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw translateAuthError(error)
  }
}

export const signInWithGoogle = async () => {
  try {
    // First check if there's a redirect result from a previous login attempt
    const redirectResult = await getRedirectResult(auth)
    if (redirectResult) {
      return redirectResult
    }

    // Try popup first
    try {
      return await signInWithPopup(auth, googleProvider)
    } catch (popupError) {
      // If popup is blocked or domain not authorized, fall back to redirect
      if (
        popupError.code === 'auth/popup-blocked' ||
        popupError.code === 'auth/unauthorized-domain' ||
        popupError.code === 'auth/operation-not-supported-in-this-environment'
      ) {
        console.log('Popup failed, trying redirect method...')
        await signInWithRedirect(auth, googleProvider)
        return null // Will handle on next page load via getRedirectResult
      }
      throw popupError
    }
  } catch (error) {
    throw translateAuthError(error)
  }
}

export const signOut = async () => {
  try {
    return await firebaseSignOut(auth)
  } catch (error) {
    throw translateAuthError(error)
  }
}

export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback)
}

// Helper function to translate Firebase errors to Vietnamese
const translateAuthError = (error) => {
  const errorCode = error.code
  const errorMessages = {
    'auth/email-already-in-use': 'Email này đã được sử dụng',
    'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
    'auth/invalid-email': 'Email không hợp lệ',
    'auth/user-not-found': 'Tài khoản không tồn tại',
    'auth/wrong-password': 'Mật khẩu không chính xác',
    'auth/too-many-requests': 'Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau',
    'auth/account-exists-with-different-credential':
      'Tài khoản đã tồn tại với phương thức đăng nhập khác',
    'auth/cancelled-popup-request': 'Hủy bỏ đăng nhập Google',
    'auth/popup-blocked': 'Cửa sổ đăng nhập bị chặn. Hệ thống sẽ chuyển hướng...',
    'auth/unauthorized-domain':
      'Domain chưa được cấp phép. Vui lòng thêm localhost:5173 vào Firebase Console hoặc thử lại sau khi cập nhật',
    'auth/operation-not-supported-in-this-environment':
      'Phương pháp đăng nhập không được hỗ trợ. Hệ thống sẽ sử dụng chuyển hướng',
  }

  const message = errorMessages[errorCode] || error.message || 'Lỗi xác thực'
  const err = new Error(message)
  err.code = errorCode
  return err
}
