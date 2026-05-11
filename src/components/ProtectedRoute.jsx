import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        background: '#0A0A0F', height: '100dvh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono",monospace', fontSize: 11,
          color: '#4A7CFF', letterSpacing: '0.16em', textTransform: 'uppercase',
        }}>
          Loading...
        </span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}
