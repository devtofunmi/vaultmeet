'use client'

import React, { useState } from 'react'
import RootLayout from './layout'
import { supabase } from '@/lib/supabaseClient'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ApplySponsor: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    age: '',
    location: '',
    bio: '',
    desiredSeekerType: '',
    paymentProof: null as File | null,
    monthlyBudget: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentStep, setPaymentStep] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (name === 'paymentProof' && files) {
      setForm({ ...form, paymentProof: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
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
    if (!form.desiredSeekerType.trim())
      newErrors.desiredSeekerType = 'Select a seeker type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setPaymentStep(true)
  }

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'users_avater')

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drirsnp0c/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Upload failed')
      }

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      toast.error('Upload to Cloudinary failed.')
      throw error
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.paymentProof) {
      toast.error('Please upload a payment proof.')
      return
    }

    setLoading(true)

    try {
      const imageUrl = await uploadToCloudinary(form.paymentProof)

      const { error } = await supabase.from('sponsors').insert([
        {
          full_name: form.fullName,
          email: form.email,
          age: form.age,
          location: form.location,
          bio: form.bio,
          seeker_type: form.desiredSeekerType,
          payment_proof_url: imageUrl,
          payment_status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error('Supabase error:', error)
        toast.error('Something went wrong while saving your application.')
      } else {
        setPaymentSuccess(true)
        toast.success('Application submitted successfully!')
        setForm({
          fullName: '',
          email: '',
          age: '',
          location: '',
          bio: '',
          desiredSeekerType: '',
          paymentProof: null,
          monthlyBudget: '',
        })
        setPaymentStep(false)
      }
    } catch (err) {
      console.error('Upload or submit error:', err)
      toast.error('Unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (paymentSuccess) {
    return (
      <RootLayout>
        <div className="max-w-xl h-screen mx-auto p-8 text-black text-center">
          <h2 className="text-3xl font-bold mb-4">Application Submitted</h2>
          <p>
            Thank you! Your sponsor application and payment proof have been received. We
            will review and get back to you soon.
          </p>
        </div>
      </RootLayout>
    )
  }

   if (paymentStep) {
     return (
       <RootLayout>
         <main>
           <ToastContainer />
           <div className="max-w-xl mx-auto w-11/12 p-8 h-screen flex flex-col justify-center text-black">
             {/* Text Logo */}
             <h1 className="text-center text-3xl font-bold mb-6 text-black">VaultMeet</h1>
   
             {/* Heading & Instructions */}
             <div className="bg-white rounded-lg shadow-md p-6">
               <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
                 Complete Your Application
               </h2>
               <p className="mb-6 text-center text-gray-700">
                 Please make a one-time payment of{' '}
                 <span className="font-semibold text-black">$250</span> to continue.
               </p>
   
               {/* Payment Methods */}
               <div className="mb-6 bg-gray-100 p-4 rounded">
                 <p className="font-semibold mb-2">Accepted Payment Methods:</p>
                 <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                   <li><strong>Gift Cards:</strong> Amazon or Visa (US only)</li>
                   <li><strong>PayPal:</strong> vaultmeet@example.com</li>
                   <li><strong>Opay:</strong> 1234567890 - VaultMeet Ltd</li>
                 </ul>
               </div>
   
               {/* Upload Payment Proof */}
               <form onSubmit={handlePaymentSubmit}>
                 <label className="block mb-2 font-semibold">
                   Upload Payment Proof
                 </label>
                 <input
                   type="file"
                   name="paymentProof"
                   accept="image/*"
                   onChange={handleChange}
                   className="mb-2 w-full border rounded px-3 py-2"
                 />
                 {errors.paymentProof && (
                   <p className="text-red-500 text-sm mb-2">
                     {errors.paymentProof}
                   </p>
                 )}
   
                 <button
                   type="submit"
                   disabled={loading}
                   className="mt-4 w-full cursor-pointer px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                 >
                   {loading ? 'Submitting...' : 'Submit Proof'}
                 </button>
               </form>
   
               {/* Support Info */}
               <p className="text-xs text-gray-600 mt-6 text-center">
                 Need help? Contact us at{' '}
                 <a href="mailto:support@vaultmeet.com" className="underline">
                   vaultmeet@gmail.com
                 </a>
               </p>
             </div>
           </div>
         </main>
       </RootLayout>
     )
       }

  return (
    <RootLayout>
      <main>
        <ToastContainer />
        <h1 className="text-4xl font-bold mb-6 text-center py-5">
          Apply as a Sugar Sponsor
        </h1>
        <div className="max-w-xl w-full mx-auto p-6 text-black">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Full Name */}
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
                className={`w-full border rounded px-3 py-2 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
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
                className={`w-full border rounded px-3 py-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Age */}
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
                className={`w-full border rounded px-3 py-2 ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.age && (
                <p className="text-red-600 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Location */}
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
                className={`w-full border rounded px-3 py-2 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Bio */}
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
                className={`w-full border rounded px-3 py-2 ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.bio && (
                <p className="text-red-600 text-sm mt-1">{errors.bio}</p>
              )}
            </div>

            {/* Desired Seeker Type */}
            <div>
              <label htmlFor="desiredSeekerType" className="block font-semibold mb-1">
                Desired Seeker Type
              </label>
              <select
                name="desiredSeekerType"
                id="desiredSeekerType"
                value={form.desiredSeekerType}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  errors.desiredSeekerType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select...</option>
                <option value="college student">College Student</option>
                <option value="single mom">Single Mom</option>
                <option value="any">Any</option>
              </select>
              {errors.desiredSeekerType && (
                <p className="text-red-600 text-sm mt-1">{errors.desiredSeekerType}</p>
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
              className="w-full cursor-pointer px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </main>
    </RootLayout>
  )
}

export default ApplySponsor