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

function Field({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={LABEL}>{label}{required && ' *'}</label>
      {children}
      {error && (
        <p style={{
          fontFamily: 'Inter,sans-serif', fontSize: 12,
          color: '#FF6B6B', marginTop: 5,
        }}>{error}</p>
      )}
    </div>
  )
}

const EMPTY = {
  fullName: '', email: '', password: '', confirmPassword: '',
  mobileNumber: '', schoolCompany: '', rolePosition: '',
}

export default function SignUp() {
  const { signUp, user, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))
  const clearErr = key => () => setErrors(e => ({ ...e, [key]: '' }))

  const validate = () => {
    const e = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      e.fullName = 'Enter your full name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.'
    if (!form.password || form.password.length < 8)
      e.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match.'
    if (!form.schoolCompany.trim())
      e.schoolCompany = 'Enter your school or company.'
    if (!form.rolePosition.trim())
      e.rolePosition = 'Enter your role or position.'
    return e
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    setSubmitting(true)
    setServerError('')
    try {
      const data = await signUp(form.email.trim(), form.password, {
        fullName: form.fullName.trim(),
        mobileNumber: form.mobileNumber.trim(),
        schoolCompany: form.schoolCompany.trim(),
        rolePosition: form.rolePosition.trim(),
      })
      if (data.session) {
        navigate('/dashboard')
      } else {
        setDone(true)
      }
    } catch (err) {
      if (err.message?.toLowerCase().includes('already registered')) {
        setServerError('An account with this email already exists.')
      } else {
        setServerError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = key => `auth-input${errors[key] ? ' error' : ''}`

  if (done) {
    return (
      <AuthCard title="Check your inbox">
        <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(74,124,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 10h16M10 2l8 8-8 8" stroke="#4A7CFF" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#A8AEBB', lineHeight: 1.7, marginBottom: 8 }}>
            A confirmation link has been sent to
          </p>
          <p style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: 15, color: '#F0EFE9', marginBottom: 24 }}>
            {form.email}
          </p>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#8A8A9A', lineHeight: 1.6, marginBottom: 28 }}>
            Click the link to verify your account and access the program.
          </p>
          <Link to="/login" style={{
            fontFamily: '"JetBrains Mono",monospace', fontSize: 11,
            color: '#4A7CFF', letterSpacing: '0.12em', textDecoration: 'none',
          }}>
            Back to login →
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Create your account" subtitle="Join the Apex Human program.">
      <form onSubmit={submit} noValidate>

        <Field label="Full Name" required error={errors.fullName}>
          <input
            type="text" value={form.fullName}
            onChange={set('fullName')} onFocus={clearErr('fullName')}
            placeholder="Jane Smith" autoComplete="name"
            className={inputClass('fullName')}
          />
        </Field>

        <Field label="Email Address" required error={errors.email}>
          <input
            type="email" value={form.email}
            onChange={set('email')} onFocus={clearErr('email')}
            placeholder="jane@company.com" autoComplete="email"
            className={inputClass('email')}
          />
        </Field>

        <div className="auth-grid-2">
          <Field label="Password" required error={errors.password}>
            <input
              type="password" value={form.password}
              onChange={set('password')} onFocus={clearErr('password')}
              placeholder="Min. 8 characters" autoComplete="new-password"
              className={inputClass('password')}
            />
          </Field>
          <Field label="Confirm Password" required error={errors.confirmPassword}>
            <input
              type="password" value={form.confirmPassword}
              onChange={set('confirmPassword')} onFocus={clearErr('confirmPassword')}
              placeholder="Repeat password" autoComplete="new-password"
              className={inputClass('confirmPassword')}
            />
          </Field>
        </div>

        <Field label="Mobile Number" error={errors.mobileNumber}>
          <input
            type="tel" value={form.mobileNumber}
            onChange={set('mobileNumber')} onFocus={clearErr('mobileNumber')}
            placeholder="+1 (555) 000-0000" autoComplete="tel"
            className={inputClass('mobileNumber')}
          />
        </Field>

        <Field label="School / Company" required error={errors.schoolCompany}>
          <input
            type="text" value={form.schoolCompany}
            onChange={set('schoolCompany')} onFocus={clearErr('schoolCompany')}
            placeholder="Stanford University / Acme Corp"
            className={inputClass('schoolCompany')}
          />
        </Field>

        <Field label="Role / Position" required error={errors.rolePosition}>
          <input
            type="text" value={form.rolePosition}
            onChange={set('rolePosition')} onFocus={clearErr('rolePosition')}
            placeholder="CEO / Student / Engineer"
            className={inputClass('rolePosition')}
          />
        </Field>

        {serverError && (
          <p role="alert" style={{
            fontFamily: 'Inter,sans-serif', fontSize: 13,
            color: '#FF6B6B', marginBottom: 16, marginTop: -4,
          }}>
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="auth-btn"
          style={{ marginTop: 4 }}
        >
          {submitting ? 'Creating account...' : 'Create Account →'}
        </button>

        <p style={{
          fontFamily: 'Inter,sans-serif', fontSize: 13,
          color: '#8A8A9A', textAlign: 'center', marginTop: 20,
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4A7CFF', textDecoration: 'none' }}>Log in</Link>
        </p>

      </form>
    </AuthCard>
  )
}
