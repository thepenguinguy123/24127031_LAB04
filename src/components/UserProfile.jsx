import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './UserProfile.css'

export default function UserProfile() {
  const { user, signOut } = useContext(AuthContext)

  if (!user) return null

  const handleLogout = async () => {
    if (window.confirm('Bạn chắc chắn muốn đăng xuất?')) {
      await signOut()
    }
  }

  return (
    <div className="user-profile">
      <div className="profile-info">
        <div className="profile-avatar">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || 'User'} />
          ) : (
            <div className="avatar-placeholder">
              {(user.displayName || user.email)?.[0]?.toUpperCase() || '👤'}
            </div>
          )}
        </div>
        <div className="profile-details">
          <p className="profile-name">{user.displayName || 'Người dùng'}</p>
          <p className="profile-email">{user.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout} title="Đăng xuất">
          🚪
        </button>
      </div>
    </div>
  )
}
