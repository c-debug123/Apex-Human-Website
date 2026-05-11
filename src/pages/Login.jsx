import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
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

export default function Login() {
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const submit = async e => {
    e.preventDefault()
    if (!email.trim()) return setError('Enter your email address.')
    if (!password) return setError('Enter your password.')
    setSubmitting(true)
    setError('')
    try {
      await signIn(email.trim(), password)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.message?.toLowerCase() ?? ''
      if (msg.includes('invalid') || msg.includes('credentials')) {
        setError('Invalid email or password.')
      } else if (msg.includes('confirm') || msg.includes('verified')) {
        setError('Please verify your email address before logging in.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Log in to your Apex Human account.">
      <form onSubmit={submit} noValidate>

        <div style={{ marginBottom: 18 }}>
          <label style={LABEL}>Email Address *</label>
          <input
            type="email" value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            placeholder="jane@company.com" autoComplete="email"
            className="auth-input"
          />
        </div>

        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
            <label style={LABEL}>Password *</label>
            <Link to="/forgot-password" style={{
              fontFamily: 'Inter,sans-serif', fontSize: 12,
              color: '#4A7CFF', textDecoration: 'none',
            }}>
              Forgot password?
            </Link>
          </div>
          <input
            type="password" value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            placeholder="Your password" autoComplete="current-password"
            className="auth-input"
          />
        </div>

        {error && (
          <p role="alert" style={{
            fontFamily: 'Inter,sans-serif', fontSize: 13,
            color: '#FF6B6B', marginTop: 10, marginBottom: 4,
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="auth-btn"
          style={{ marginTop: 18 }}
        >
          {submitting ? 'Signing in...' : 'Log In →'}
        </button>

        <p style={{
          fontFamily: 'Inter,sans-serif', fontSize: 13,
          color: '#8A8A9A', textAlign: 'center', marginTop: 20,
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#4A7CFF', textDecoration: 'none' }}>Sign up</Link>
        </p>

      </form>
    </AuthCard>
  )
}
