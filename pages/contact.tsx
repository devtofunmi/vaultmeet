'use client';

import { useState } from 'react';
import RootLayout from './layout';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Send form data to backend or API
    setSubmitted(true);
  };

  return (
    <RootLayout>
      <main className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full flex flex-col md:flex-row justify-between ">
          <div>
            <div className="flex gap-2 text-gray-600">
              <p>Vaultmeet</p>
              <p>.</p>
              <p className="text-blue-600">Contact us</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold text-blue-600">Contact Us</h1>
            <p className="mt-4 text-gray-700">
              Have a question or feedback?<br /> Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="w-full max-w-md mt-20 md:mt-0 bg-white p-6 rounded-xl shadow-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600">Thank you!</h2>
                <p className="mt-2 text-gray-700">
                  Your message has been received. We'll be in touch shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </RootLayout>
  );
}

