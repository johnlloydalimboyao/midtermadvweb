import { useState } from 'react'
import './App.css'

const initialForm = { guitarModel: '', bodyType: '', brandName: '', stockQuantity: '', manufacturerName: '', userRole: '' }

function validateField(name, value) {
  const label = { guitarModel: 'Guitar model', bodyType: 'Body type', brandName: 'Brand name', stockQuantity: 'Stock quantity', manufacturerName: 'Manufacturer name', userRole: 'User role' }[name]
  if (!String(value).trim()) return `${label} is required.`
  if (['guitarModel', 'brandName', 'manufacturerName'].includes(name) && value.trim().length < 3) return `${label} must be at least 3 characters.`
  if (name === 'stockQuantity' && (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 100)) return 'Stock quantity must be a whole number from 1 to 100.'
  return ''
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const updateField = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
    setSubmitted(false)
  }
  const submitForm = (event) => {
    event.preventDefault()
    const nextErrors = Object.fromEntries(Object.entries(form).map(([name, value]) => [name, validateField(name, value)]))
    setErrors(nextErrors)
    if (!Object.values(nextErrors).some(Boolean)) setSubmitted(true)
  }
  return <main className="app-shell">
    <header className="hero-banner"><p className="eyebrow">Guitar Store Inventory Manager</p><h1>Register a guitar</h1><p>Build your store registry one instrument at a time.</p></header>
    <section className="form-card" aria-labelledby="registration-title">
      <div className="section-heading"><div><p className="step">Phase 1 · Registration</p><h2 id="registration-title">Guitar details</h2></div><span className="required-note">* Required fields</span></div>
      <form noValidate onSubmit={submitForm}>
        <div className="form-grid">
          <label>Guitar model *<input name="guitarModel" value={form.guitarModel} onChange={updateField} placeholder="e.g. Stratocaster" aria-invalid={Boolean(errors.guitarModel)} />{errors.guitarModel && <small className="error">{errors.guitarModel}</small>}</label>
          <label>Body type *<select name="bodyType" value={form.bodyType} onChange={updateField} aria-invalid={Boolean(errors.bodyType)}><option value="">Select a body type</option><option>Electric</option><option>Acoustic</option><option>Bass</option><option>Classical</option></select>{errors.bodyType && <small className="error">{errors.bodyType}</small>}</label>
          <label>Brand name *<input name="brandName" value={form.brandName} onChange={updateField} placeholder="e.g. Fender" aria-invalid={Boolean(errors.brandName)} />{errors.brandName && <small className="error">{errors.brandName}</small>}</label>
          <label>Stock quantity *<input name="stockQuantity" type="number" min="1" max="100" value={form.stockQuantity} onChange={updateField} placeholder="1–100" aria-invalid={Boolean(errors.stockQuantity)} />{errors.stockQuantity && <small className="error">{errors.stockQuantity}</small>}</label>
          <label className="full-width">Manufacturer name *<input name="manufacturerName" value={form.manufacturerName} onChange={updateField} placeholder="e.g. Fender Musical Instruments Corporation" aria-invalid={Boolean(errors.manufacturerName)} />{errors.manufacturerName && <small className="error">{errors.manufacturerName}</small>}</label>
        </div>
        <fieldset><legend>User role *</legend><div className="role-options">{['Merchant', 'Consumer'].map((role) => <label className="role-option" key={role}><input type="radio" name="userRole" value={role} checked={form.userRole === role} onChange={updateField} /><span>{role}</span></label>)}</div>{errors.userRole && <small className="error">{errors.userRole}</small>}</fieldset>
        <div className="form-footer"><button type="submit">Validate guitar</button>{submitted && <p className="success" role="status">All details are valid and ready to add to the registry.</p>}</div>
      </form>
    </section>
  </main>
}
export default App
