import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
  const meta = user?.user_metadata ?? {}

  const handleSignOut = async () => {
    setLoggingOut(true)
    try {
      await signOut()
      navigate('/')
    } finally {
      setLoggingOut(false)
    }
  }

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : '—'

  const profile = [
    { label: 'Email', value: user?.email },
    { label: 'Mobile', value: meta.mobile_number || '—' },
    { label: 'School / Company', value: meta.school_company || '—' },
    { label: 'Role / Position', value: meta.role_position || '—' },
    { label: 'Member Since', value: joinDate },
  ]

  const firstName = meta.full_name?.split(' ')[0] || 'Student'

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav style={{
        flexShrink: 0, height: 64,
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #1A1A24',
        background: 'rgba(10,10,15,0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 32px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo-white.png" alt="" style={{ height: 26, width: 'auto' }} />
            <span style={{
              fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700,
              fontSize: 14, color: '#F0EFE9', letterSpacing: '-0.01em',
            }}>
              Apex Human
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#8A8A9A' }}>
              {meta.full_name || user?.email}
            </span>
            <button
              onClick={handleSignOut}
              disabled={loggingOut}
              style={{
                background: 'transparent',
                border: '1px solid #2A2A38',
                color: '#8A8A9A',
                padding: '8px 16px',
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: loggingOut ? 'default' : 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                if (!loggingOut) {
                  e.currentTarget.style.borderColor = '#4A7CFF'
                  e.currentTarget.style.color = '#F0EFE9'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2A2A38'
                e.currentTarget.style.color = '#8A8A9A'
              }}
            >
              {loggingOut ? '...' : 'Log Out'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main style={{
        flex: 1,
        maxWidth: 1100, margin: '0 auto',
        padding: '52px 32px 64px',
        width: '100%',
      }}>

        {/* Welcome header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: '"JetBrains Mono",monospace', fontSize: 10,
            color: '#4A7CFF', letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            Student Portal
          </p>
          <h1 style={{
            fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px,4vw,44px)', color: '#F0EFE9',
            letterSpacing: '-0.025em', lineHeight: 1.15,
          }}>
            Welcome back,<br />{firstName}.
          </h1>
        </div>

        {/* Cards grid */}
        <div className="dashboard-grid">

          {/* Profile card */}
          <div style={{ background: '#13131A', border: '1px solid #2A2A38', padding: '32px' }}>
            <p style={{
              fontFamily: '"JetBrains Mono",monospace', fontSize: 10,
              color: '#4A7CFF', letterSpacing: '0.14em', textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              Your Profile
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {profile.map(({ label, value }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: '"JetBrains Mono",monospace', fontSize: 10,
                    color: '#8A8A9A', letterSpacing: '0.12em', textTransform: 'uppercase',
                    marginBottom: 4,
                  }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#F0EFE9' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Program status card */}
          <div style={{ background: '#13131A', border: '1px solid #2A2A38', padding: '32px' }}>
            <p style={{
              fontFamily: '"JetBrains Mono",monospace', fontSize: 10,
              color: '#4A7CFF', letterSpacing: '0.14em', textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              Program Status
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(57,217,138,0.08)',
              border: '1px solid rgba(57,217,138,0.2)',
              padding: '6px 14px', marginBottom: 24,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#39D98A', display: 'inline-block',
              }} />
              <span style={{
                fontFamily: '"JetBrains Mono",monospace', fontSize: 10,
                color: '#39D98A', letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                Registered — Cohort 01
              </span>
            </div>

            <p style={{
              fontFamily: 'Inter,sans-serif', fontSize: 14,
              color: '#8A8A9A', lineHeight: 1.75, marginBottom: 24,
            }}>
              You're confirmed for Cohort 01. We'll notify you by email with your onboarding schedule and access details the moment the program opens.
            </p>

            <div style={{ borderTop: '1px solid #2A2A38', paddingTop: 20 }}>
              <p style={{
                fontFamily: '"JetBrains Mono",monospace', fontSize: 10,
                color: '#8A8A9A', letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                What to expect
              </p>
              {[
                'Hands-on AI tooling workshops',
                'Live sessions with founders & operators',
                'Project-based curriculum',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#4A7CFF', marginTop: 1, flexShrink: 0, fontFamily: 'Inter,sans-serif', fontSize: 13 }}>→</span>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#A8AEBB', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
