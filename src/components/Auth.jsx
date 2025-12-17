import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [displayName, setDisplayName] = useState('')

  const { signIn, signUp, signInWithGoogle, error: authError } = useContext(AuthContext)

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password, displayName)
      } else {
        await signIn(email, password)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)

    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🗺️ Vietnam POI Map</h1>
          <p>{isSignUp ? 'Tạo tài khoản mới' : 'Đăng nhập vào tài khoản'}</p>
        </div>

        {(error || authError) && (
          <div className="auth-error">
            <span>❌ {error || authError}</span>
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label>👤 Tên của bạn</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nhập tên của bạn"
                required={isSignUp}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label>📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>🔒 Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={loading}
          >
            {loading
              ? '⏳ Đang xử lý...'
              : isSignUp
                ? '✅ Đăng ký'
                : '🔓 Đăng nhập'}
          </button>
        </form>

        <div className="auth-divider">
          <span>hoặc</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="auth-button google"
          disabled={loading}
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMy43NUM0LjMxMjUgMy43NSAxLjUgNi41NjI1IDEuNSAxMS4yNUMxLjUgMTUuOTM3NSA0LjMxMjUgMTguNzUgOSAxOC43NUM5LjkzNzUgMTguNzUgMTAuODEyNSAxOC41NjI1IDExLjYyNSAxOC4yMjVWMTMuNzJIOS4wN1YxMi4yMjVIMTEuNjI1VjEwLjA2MjVDMTEuNjI1IDcuNzUgMTMuMDMxMiA2LjUgMTUuNTEyNSA2LjVDMTYuNTkzOCA2LjUgMTcuNzUgNi42NTYyNSAxNy43NSA2LjY1NjI1VjkuMDMxMjVIMTYuMDU2MkMxNC40MTI1IDkuMDMxMjUgMTMuOTc1IDkuOTMxMjUgMTMuOTc1IDEwLjk2ODdWMTIuMjI1SDE3LjZMMTcuMTQzOCAxMy43MkgxMy45NzVWMTguMjI1QzE1LjgxMjUgMTguNSAxNy43NzUgMTcuNDY4OCAxNy43NzUgMTIuNzI1QzE3Ljc3NSA3LjQwNjI1IDE0LjMxMjUgMy43NSA5IDMuNzVaIiBmaWxsPSIjRkY3NzAwIi8+Cjwvc3ZnPg=="
            alt="Google"
            className="google-icon"
          />
          {loading ? '⏳ Đang kết nối...' : '🌐 Đăng nhập với Google'}
        </button>

        <div className="auth-footer">
          <p>
            {isSignUp ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
                setEmail('')
                setPassword('')
                setDisplayName('')
              }}
              className="auth-link"
            >
              {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
