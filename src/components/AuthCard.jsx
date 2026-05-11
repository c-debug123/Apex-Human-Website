import { Link } from 'react-router-dom'

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div style={{
      background: '#0A0A0F',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
    }}>
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 36, textDecoration: 'none',
      }}>
        <img src="/logo-white.png" alt="" style={{ height: 28, width: 'auto' }} />
        <span style={{
          fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700,
          fontSize: 15, color: '#F0EFE9', letterSpacing: '-0.01em',
        }}>
          Apex Human
        </span>
      </Link>

      <div className="auth-card" style={{
        background: '#13131A',
        border: '1px solid #2A2A38',
        padding: '40px 36px',
        width: '100%',
        maxWidth: 460,
      }}>
        <h1 style={{
          fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700,
          fontSize: 22, color: '#F0EFE9', letterSpacing: '-0.02em',
          marginBottom: subtitle ? 8 : 28,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: 'Inter,sans-serif', fontSize: 14,
            color: '#8A8A9A', marginBottom: 32, lineHeight: 1.6,
          }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
