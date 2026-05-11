import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthCard from '../components/AuthCard'

const LABEL = {
  display: 'block',
  fontFamily: '"JetBrains Mono",monospace',
  fontSize: 10,
  color: '#8A8A9A',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: 7,
}

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError('Enter a valid email address.')
    }
    setSubmitting(true)
    setError('')
    try {
      await forgotPassword(email.trim())
      setDone(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <AuthCard title="Check your inbox">
        <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ margin: '0 auto 18px', display: 'block' }}>
            <path d="M3 11L9 17L19 5" stroke="#39D98A" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#A8AEBB', lineHeight: 1.7, marginBottom: 6 }}>
            If an account exists for
          </p>
          <p style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: 15, color: '#F0EFE9', marginBottom: 20 }}>
            {email}
          </p>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#8A8A9A', lineHeight: 1.6, marginBottom: 28 }}>
            you'll receive a password reset link shortly. Check your spam folder if it doesn't arrive.
          </p>
          <Link to="/login" style={{
            fontFamily: '"JetBrains Mono",monospace', fontSize: 11,
            color: '#4A7CFF', letterSpacing: '0.12em', textDecoration: 'none',
          }}>
            ← Back to login
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset password"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <form onSubmit={submit} noValidate>

        <div style={{ marginBottom: 20 }}>
          <label style={LABEL}>Email Address *</label>
          <input
            type="email" value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            placeholder="jane@company.com" autoComplete="email"
            className="auth-input"
          />
        </div>

        {error && (
          <p role="alert" style={{
            fontFamily: 'Inter,sans-serif', fontSize: 13,
            color: '#FF6B6B', marginBottom: 14, marginTop: -8,
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="auth-btn"
        >
          {submitting ? 'Sending...' : 'Send Reset Link →'}
        </button>

        <p style={{
          fontFamily: 'Inter,sans-serif', fontSize: 13,
          color: '#8A8A9A', textAlign: 'center', marginTop: 20,
        }}>
          <Link to="/login" style={{ color: '#4A7CFF', textDecoration: 'none' }}>
            ← Back to login
          </Link>
        </p>

      </form>
    </AuthCard>
  )
}
