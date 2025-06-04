'use client'

import React, { useState } from 'react'
import RootLayout from './layout'

const ApplySeeker: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    age: '',
    location: '',
    bio: '',
    desiredSponsorType: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentStep, setPaymentStep] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid'
    if (!form.age.trim()) newErrors.age = 'Age is required'
    else if (isNaN(Number(form.age)) || Number(form.age) < 18)
      newErrors.age = 'You must be at least 18'
    if (!form.location.trim()) newErrors.location = 'Location is required'
    if (!form.bio.trim()) newErrors.bio = 'Please tell us about yourself'
    if (!form.desiredSponsorType.trim())
      newErrors.desiredSponsorType = 'Select a sponsor type'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: Send form data to backend here (example below)
    /*
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Failed to submit application')
    } catch (error) {
      console.error(error)
      // Handle error (show message, etc.)
      return
    }
    */

    // After successful backend submission, show payment step
    setPaymentStep(true)
  }

  // Payment success handler (replace with real payment callback)
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
  }

  // After payment success: show thank you message
  if (paymentSuccess) {
    return (
      <div className="max-w-xl mx-auto p-8 text-black text-center">
        <h2 className="text-3xl font-bold mb-4">Application Received</h2>
        <p>
       Thank you for your payment and interest in VaultMeet.
       Our team is currently reviewing your application.
      You’ll receive an email soon with your personalized match and next steps.
        </p>
      </div>
    )
  }

  // Payment step UI after form submission but before payment done
  if (paymentStep) {
    return (
      <div className="max-w-xl mx-auto p-8 text-black text-center">
        <h2 className="text-3xl font-bold mb-4">Complete Your Payment</h2>
        <p className="mb-6">
          Please complete your one-time payment of <strong>$199</strong> to
          proceed.
        </p>
        {/* Replace this with real payment integration (Stripe, Paystack, etc) */}
        <button
          onClick={handlePaymentSuccess}
          className="bg-indigo-600 cursor-pointer text-white py-3 px-6 rounded hover:bg-indigo-700 transition"
        >
          Click to continue
        </button>
      </div>
    )
  }

  // The main form UI
  return (
    <RootLayout>
      <main>
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600 py-5">
          Apply as a Sugar Seeker
        </h1>
        <div className="max-w-xl w-full mx-auto p-6 text-black">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="age" className="block font-semibold mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                min={18}
                value={form.age}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.age
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.age && (
                <p className="text-red-600 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.location
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="block font-semibold mb-1">
                Tell us about yourself
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={4}
                value={form.bio}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.bio
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.bio && (
                <p className="text-red-600 text-sm mt-1">{errors.bio}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="desiredSponsorType"
                className="block font-semibold mb-1"
              >
                Desired Sponsor Type
              </label>
              <select
                name="desiredSponsorType"
                id="desiredSponsorType"
                value={form.desiredSponsorType}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.desiredSponsorType
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              >
                <option value="">Select an option</option>
                <option value="Sugar Daddy">Sugar Daddy</option>
                <option value="Sugar Mummy">Sugar Mummy</option>
                <option value="Either">Either</option>
              </select>
              {errors.desiredSponsorType && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.desiredSponsorType}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </main>
    </RootLayout>
  )
}

export default ApplySeeker