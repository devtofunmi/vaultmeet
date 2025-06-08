'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, X } from 'lucide-react'



type Seeker = {
  id: string
  full_name: string
  email: string
  age: number
  location: string
  bio: string
  sponsor_type: string
  payment_proof_url: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminDashboard() {
  const [seekers, setSeekers] = useState<Seeker[]>([])
  const [loading, setLoading] = useState(false)
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBio, setSelectedBio] = useState('')
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (passwordVerified) fetchSeekers()
  }, [passwordVerified])

  const fetchSeekers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('seekers')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to fetch seekers')
      console.error(error)
    } else {
      setSeekers(data)
      setStats({
        pending: data.filter(s => s.status === 'pending').length,
        approved: data.filter(s => s.status === 'approved').length,
        rejected: data.filter(s => s.status === 'rejected').length,
      })
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase.from('seekers').update({ status }).eq('id', id)
    if (error) toast.error(`Failed to update`)
    else {
      toast.success(`Marked as ${status}`)
      fetchSeekers()
    }
  }

  const deleteSeeker = async (id: string) => {
    const { error } = await supabase.from('seekers').delete().eq('id', id)
    if (error) toast.error('Failed to delete')
    else {
      toast.success('Deleted successfully')
      fetchSeekers()
    }
  }

  const openBioModal = (bio: string) => {
    setSelectedBio(bio)
    setModalOpen(true)
  }

  const closeBioModal = () => {
    setModalOpen(false)
    setSelectedBio('')
  }

  const filteredSeekers =
    filterStatus === 'all' ? seekers : seekers.filter(s => s.status === filterStatus)

  if (!passwordVerified) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome Chief</h2>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            <button
             onClick={() => {
               if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                 setPasswordVerified(true)
               } else {
                 toast.error('Incorrect password')
               }
             }}
             className="mt-5 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
           >
             Verify
           </button>

        </div>
        <ToastContainer />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 shadow-md left-0 bg-gray-800 w-64 p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:block`}
      >
        <h2 className="text-3xl font-bold mb-8">Admin</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setFilterStatus('all')}
            className={`block w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
              filterStatus === 'all' ? 'bg-blue-600' : ''
            }`}
          >
            All ({seekers.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`block w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-yellow-600 transition ${
              filterStatus === 'pending' ? 'bg-yellow-700' : ''
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`block w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-green-600 transition ${
              filterStatus === 'approved' ? 'bg-green-700' : ''
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`block cursor-pointer w-full text-left px-3 py-2 rounded hover:bg-red-600 transition ${
              filterStatus === 'rejected' ? 'bg-red-700' : ''
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Topbar */}
        <header className="lg:hidden flex items-center justify-between bg-gray-900 p-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none text-white"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <main className="p-6 space-y-6">
          <h2 className="text-3xl font-semibold">Seeker List</h2>

          {loading && (
            <p className="text-center text-gray-400">Loading seekers...</p>
          )}

          {!loading && filteredSeekers.length === 0 && (
            <p className="text-center text-gray-500">No seekers found.</p>
          )}

          <div className="space-y-6">
            {filteredSeekers.map(seeker => (
              <div
                key={seeker.id}
                className="bg-gray-800 rounded-lg shadow p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="mb-4 sm:mb-0">
                  <p className="text-xl font-semibold">{seeker.full_name}</p>
                  <p className="text-sm text-gray-400">{seeker.email}</p>
                  <p className="text-sm text-gray-400">
                    Age: {seeker.age} | Location: {seeker.location}
                  </p>
                  <p className="text-sm text-gray-400">
                    Sponsor: {seeker.sponsor_type}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    onClick={() => openBioModal(seeker.bio)}
                    className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded transition"
                    title="View Bio"
                  >
                    View Bio
                  </button>

                  <button
                    onClick={() =>
                      window.open(seeker.payment_proof_url, '_blank')
                    }
                    disabled={!seeker.payment_proof_url}
                    className={`px-4 py-2 cursor-pointer rounded transition ${
                      seeker.payment_proof_url
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    title={
                      seeker.payment_proof_url
                        ? 'View Payment Proof'
                        : 'No payment proof available'
                    }
                  >
                    View Proof
                  </button>

                  <button
                    onClick={() => updateStatus(seeker.id, 'approved')}
                    disabled={seeker.status === 'approved'}
                    className={`px-4 py-2 cursor-pointer rounded text-white transition ${
                      seeker.status === 'approved'
                        ? 'bg-green-900 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    title="Approve"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(seeker.id, 'rejected')}
                    disabled={seeker.status === 'rejected'}
                    className={`px-4 cursor-pointer py-2 rounded text-white transition ${
                      seeker.status === 'rejected'
                        ? 'bg-red-900 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    title="Reject"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => deleteSeeker(seeker.id)}
                    className="px-4 py-2 cursor-pointer bg-gray-700 hover:bg-gray-600 rounded text-white transition"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Bio Modal */}
        {modalOpen && (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Seeker Bio</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedBio}</p>
                <button
                onClick={closeBioModal}
                className="mt-4 px-4 cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
                >
                Close
                </button>
            </div>
            </div>
        )}
    
        {/* Toast Notifications */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}