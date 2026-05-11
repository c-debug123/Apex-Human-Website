import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Nav() {
  const { user } = useAuth()

  return (
    <nav style={{
      flexShrink: 0,
      height: 68,
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="nav-inner" style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 32px',
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/logo-white.png" alt="" style={{ height: 36, width: 'auto' }} />
          <span style={{
            fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700,
            fontSize: 17, color: '#F0EFE9', letterSpacing: '-0.01em',
          }}>
            Apex Human
          </span>
        </div>

        <div className="nav-auth" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <Link
              to="/dashboard"
              style={{
                background: '#4A7CFF', color: '#F0EFE9', textDecoration: 'none',
                padding: '9px 20px',
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10, fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}
            >
              Dashboard →
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  fontFamily: 'Inter,sans-serif', fontSize: 14,
                  color: '#8A8A9A', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F0EFE9'}
                onMouseLeave={e => e.currentTarget.style.color = '#8A8A9A'}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                style={{
                  background: '#4A7CFF', color: '#F0EFE9', textDecoration: 'none',
                  padding: '9px 20px',
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}
              >
                Get Started →
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
