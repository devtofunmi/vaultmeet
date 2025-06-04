'use client'

import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Link from 'next/link'

interface AnimatedSectionProps {
  children: React.ReactNode
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-16"
    >
      {children}
    </motion.section>
  )
}

const testimonials = [
  {
    quote: 'Professional, discreet, and effective. VaultMeet is the best platform I’ve used for sponsorships.',
    author: 'John D., Sugar Daddy',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John%20D.',
  },
  {
    quote: 'The customer service and verification process made me feel safe and confident throughout.',
    author: 'Sophia L., Sugar Mummy',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia%20L.',
  },
  {
    quote: 'Matched me with the perfect sponsor quickly and easily. Life-changing experience!',
    author: 'Michael T., Sugar Baby',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael%20T.',
  },
  {
    quote: 'VaultMeet’s team is attentive and the platform is intuitive. A true game-changer.',
    author: 'Jessica W., Sugar Daddy',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jessica%20W.',
  },
];


const faqs = [
  {
    question: 'Is VaultMeet anonymous?',
    answer: 'Yes, your profile is confidential and never publicly visible.',
  },
  {
    question: 'How are sponsors verified?',
    answer: 'We use a secure identity verification process for all users.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription anytime without penalties.',
  },
]

const pricingPlans = [
  {
    title: 'Basic',
    price: '$99',
    features: ['One-time match', 'Verified profiles', 'Email support'],
  },
  {
    title: 'Premium',
    price: '$299',
    features: ['Unlimited matches', 'Priority support', 'Profile spotlight'],
  },
  {
    title: 'Elite',
    price: '$499',
    features: ['Personal matchmaker', 'Exclusive events', 'VIP support'],
  },
]



const VaultMeetLanding: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="font-sans text-gray-900 bg-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-indigo-600 z-20 sticky top-0 text-white p-4 flex justify-between items-center mx-auto">
        <a href="/" className="text-2xl font-bold">
          VaultMeet
        </a>
        <button
          className="md:hidden cursor-pointer focus:outline-none"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {navOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
        <ul
          className={`md:flex md:space-x-8 absolute md:static bg-indigo-600 w-full md:w-auto left-0 transition-transform duration-300 ease-in-out ${
            navOpen ? 'top-16' : 'top-[-200px]'
          } md:top-auto`}
        >
          {['Home', 'How It Works', 'Testimonials'].map((item) => (
            <li key={item} className="border-b md:border-none border-indigo-500">
              <a href={`#${item.toLowerCase().replace(/\s/g, '')}`} className="block px-4 py-2 hover:bg-indigo-700" onClick={() => setNavOpen(false)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <AnimatedSection>
        <section id="home" className="py-32 px-6 bg-indigo-50 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">Connect with sponsors who truly care.</h1>
          <p className="text-xl max-w-xl mx-auto mb-12 text-gray-700">
            VaultMeet is a confidential and secure platform to help you find genuine sponsorships easily and safely.
          </p>
          <div className="flex flex-col justify-center md:flex-row gap-4">
            <Link href="/apply-seeker" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-lg">
              I'm Looking for a Sponsor
            </Link>
            <Link href="/apply-sponsor" className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white text-lg">
              I'm Looking to Sponsor
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works */}
<AnimatedSection>
  <section id="howitworks" className="py-20 px-6 max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-12">How It Works</h2>
    <div className="grid md:grid-cols-3 gap-12">
      {[
        {
          title: 'Submit an Application',
          desc: 'Choose to apply as a Seeker or Sponsor by filling out a simple, private form.',
        },
        {
          title: 'Make a Payment',
          desc: 'Select a plan and complete a secure one-time payment to proceed with matching.',
        },
        {
          title: 'Get Contacted via Gmail',
          desc: 'Our team manually reviews your profile and sets up a match. You’ll get notified via email.',
        },
      ].map(({ title, desc }, i) => (
        <div key={i} className="bg-indigo-50 p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="text-gray-700">{desc}</p>
        </div>
      ))}
    </div>
  </section>
</AnimatedSection>


      {/* Testimonials */}
      <AnimatedSection>
        <section id="testimonials" className="py-20 bg-pink-50 px-6  text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map(({ quote, author, avatar }, i) => (
              <SwiperSlide key={i}>
                <div className="p-6 bg-white rounded-lg shadow-md h-full flex flex-col justify-between items-center text-center">
                  <img src={avatar} alt={author} className="w-16 h-16 rounded-full mb-4 object-cover" />
                  <h1 className='font-bold'>Anonymous</h1>
                  <p className="text-gray-800 italic mb-4">"{quote}"</p>
                  <p className="text-indigo-600 font-semibold">— {author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </AnimatedSection>

      {/* Seeker & Sponsor Benefits */}
      <AnimatedSection>
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Seeker & Sponsor Benefits</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-purple-700">For Seekers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access to verified sponsors</li>
                <li>Confidential and secure messaging</li>
                <li>Profile spotlight for more matches</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-pink-700">For Sponsors</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Curated matches with real seekers</li>
                <li>Priority matching options</li>
                <li>Direct access to VIP seeker profiles</li>
              </ul>
            </div>
          </div>
        </section>
      </AnimatedSection>

            {/* FAQ */}
      <AnimatedSection>
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4 font-medium text-left text-lg focus:outline-none"
                >
                  {faq.question}
                  <span>{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Pricing */}
      {/* <AnimatedSection>
        <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map(({ title, price, features }, i) => (
              <div key={i} className="p-8 border rounded-lg hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-indigo-600 font-bold text-3xl mb-6">{price}</p>
                <ul className="mb-6 text-gray-700 text-left space-y-2">
                  {features.map((f, idx) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition font-semibold">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection> */}

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} VaultMeet. All rights reserved.</p>
          <nav className="space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-indigo-600 transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-indigo-600 transition">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-indigo-600 transition">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}

export default VaultMeetLanding