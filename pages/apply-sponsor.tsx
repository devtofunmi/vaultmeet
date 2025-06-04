'use client'

import React, { useState } from 'react'
import RootLayout from './layout'

const ApplySponsor: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    age: '',
    location: '',
    bio: '',
    sponsorType: '',
    monthlyBudget: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

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

    if (!form.bio.trim()) newErrors.bio = 'Please introduce yourself'

    if (!form.sponsorType.trim()) newErrors.sponsorType = 'Select your sponsor type'

    if (!form.monthlyBudget.trim()) newErrors.monthlyBudget = 'Enter your monthly budget'
    else if (isNaN(Number(form.monthlyBudget)) || Number(form.monthlyBudget) <= 0)
      newErrors.monthlyBudget = 'Budget must be a positive number'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: Submit form data to backend or API here

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-black p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Application Received</h2>
        <p>Thank you for applying as a sponsor. We will review your application and get back to you soon.</p>
      </div>
    )
  }

  return (
    <RootLayout>
      <main>
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600 py-5">
          Apply as a Sugar Sponsor
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
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
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
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
                  errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
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
              {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block font-semibold mb-1">
                Introduce Yourself
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={4}
                value={form.bio}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.bio && <p className="text-red-600 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div>
              <label htmlFor="sponsorType" className="block font-semibold mb-1">
                Sponsor Type
              </label>
              <select
                name="sponsorType"
                id="sponsorType"
                value={form.sponsorType}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.sponsorType
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              >
                <option value="">Select an option</option>
                <option value="Sugar Daddy">Sugar Daddy</option>
                <option value="Sugar Mummy">Sugar Mummy</option>
              </select>
              {errors.sponsorType && (
                <p className="text-red-600 text-sm mt-1">{errors.sponsorType}</p>
              )}
            </div>

            <div>
              <label htmlFor="monthlyBudget" className="block font-semibold mb-1">
                Monthly Budget (USD)
              </label>
              <input
                type="number"
                name="monthlyBudget"
                id="monthlyBudget"
                min={0}
                value={form.monthlyBudget}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.monthlyBudget
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              {errors.monthlyBudget && (
                <p className="text-red-600 text-sm mt-1">{errors.monthlyBudget}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </main>
    </RootLayout>
  )
}

export default ApplySponsor