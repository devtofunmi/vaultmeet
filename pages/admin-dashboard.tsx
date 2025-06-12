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

type Sponsor = {
  id: string
  name: string
  email: string
  sponsor_type: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminDashboard() {
  const [seekers, setSeekers] = useState<Seeker[]>([])
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  // const [messages, setMessages] = useState<Messages[]>([])
  const [loading, setLoading] = useState(false)
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBio, setSelectedBio] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState<'seekers' | 'sponsors'>('seekers')
  const [seekerStats, setSeekerStats] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [sponsorStats, setSponsorStats] = useState({ pending: 0, approved: 0, rejected: 0 })

  useEffect(() => {
    if (passwordVerified) {
      fetchSeekers()
      fetchSponsors()
    }
  }, [passwordVerified])

  const fetchSeekers = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('seekers').select('*').order('created_at', { ascending: false })
    if (error) toast.error('Failed to fetch seekers')
    else {
      setSeekers(data)
      setSeekerStats({
        pending: data.filter(s => s.status === 'pending').length,
        approved: data.filter(s => s.status === 'approved').length,
        rejected: data.filter(s => s.status === 'rejected').length,
      })
    }
    setLoading(false)
  }

  const fetchSponsors = async () => {
    const { data, error } = await supabase.from('sponsors').select('*').order('created_at', { ascending: false })
    if (error) toast.error('Failed to fetch sponsors')
    else {
      setSponsors(data)
      setSponsorStats({
        pending: data.filter(s => s.status === 'pending').length,
        approved: data.filter(s => s.status === 'approved').length,
        rejected: data.filter(s => s.status === 'rejected').length,
      })
    }
  }
  const fetchMessages = async () => {
    const { data, error } = await supabase.from('sponsors').select('*').order('created_at', { ascending: false })
    if (error) toast.error('Failed to fetch sponsors')
    else {
      setSponsors(data)
      setSponsorStats({
        pending: data.filter(s => s.status === 'pending').length,
        approved: data.filter(s => s.status === 'approved').length,
        rejected: data.filter(s => s.status === 'rejected').length,
      })
    }
  }

const updateStatus = async (
  id: string,
  status: 'approved' | 'rejected',
  type: 'seeker' | 'sponsor'
) => {
  const table = type === 'seeker' ? 'seekers' : 'sponsors';
  const list = type === 'seeker' ? seekers : sponsors;
  const item = list.find(s => s.id === id);

  // console.log('Updating status for:', { id, status, type, table });
  if (!item) {
    // console.warn('Item not found in list:', id);
    return toast.error(`Could not find ${type} with id: ${id}`);
  }

  // Use the correct column name for each type
  const column = type === 'seeker' ? 'status' : 'payment_status';

  const { error } = await supabase.from(table).update({ [column]: status }).eq('id', id);
  if (error) {
    // console.error('Supabase update error:', error);
    return toast.error('Failed to update status');
  }

  toast.success(`Marked as ${status}`);
  type === 'seeker' ? fetchSeekers() : fetchSponsors();

  // Send approval or rejection email
  const endpoint =
    status === 'approved'
      ? '/api/send-approval-email'
      : '/api/send-rejection-email';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: item.email,
        name:
          type === 'seeker'
            ? (item as Seeker).full_name
            : (item as Sponsor).name,
      }),
    });

    const result = await res.json();
    if (!result.success) throw new Error();

    toast.success(`${status === 'approved' ? 'Approval' : 'Rejection'} email sent to ${type}`);
  } catch (err) {
    // console.error('Email error:', err);
    toast.error(`Failed to send ${status} email to ${type}`);
  }
};

  const openBioModal = (bio: string) => {
    setSelectedBio(bio)
    setModalOpen(true)
  }

  const closeBioModal = () => {
    setModalOpen(false)
    setSelectedBio('')
  }

  const filteredSeekers = filterStatus === 'all' ? seekers : seekers.filter(s => s.status === filterStatus)
  const filteredSponsors = filterStatus === 'all' ? sponsors : sponsors.filter(s => s.status === filterStatus)
  const activeList = tab === 'seekers' ? filteredSeekers : filteredSponsors
  const activeStats = tab === 'seekers' ? seekerStats : sponsorStats

  if (!passwordVerified) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#212121] text-white">
        <div className="p-8 bg-[#181818] rounded-xl shadow-lg w-4/5 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome Chief</h2>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-3 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                setPasswordVerified(true)
              } else {
                toast.error('Incorrect password')
              }
            }}
            className="mt-5 w-full py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
          >
            Verify
          </button>
        </div>
        <ToastContainer />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#212121] text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 shadow-md left-0 bg-[#181818] w-64 p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:block`}
      >
        <h2 className="text-3xl font-bold mb-8">Admin</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setTab('seekers')}
            className={`block w-full cursor-pointer  text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
              tab === 'seekers' ? 'bg-blue-600' : ''
            }`}
          >
            Seekers ({seekers.length})
          </button>
          <button
            onClick={() => setTab('sponsors')}
            className={`block w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
              tab === 'sponsors' ? 'bg-purple-600' : ''
            }`}
          >
            Sponsors ({sponsors.length})
          </button>

          <hr className="border-gray-600 my-2" />

          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`block w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
                filterStatus === status ? 'bg-gray-800' : ''
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({status !== 'all' ? activeStats[status as keyof typeof activeStats] : activeList.length})
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Topbar */}
        <header className="lg:hidden fixed top-0 shadow-md w-full flex items-center justify-between bg-[#212121] p-4 z-50">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none cursor-pointer text-white">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <main className="p-6 space-y-6 mt-16 lg:mt-0">
          <h2 className="text-3xl font-semibold">
            {tab === 'seekers' ? 'Seeker List' : 'Sponsor List'}
          </h2>

          {loading && <p className="text-center text-gray-400">Loading...</p>}
          {!loading && activeList.length === 0 && (
            <p className="text-center text-gray-500">No {tab} found.</p>
          )}

          {activeList.map(item => (
            <div
              key={item.id}
              className="bg-[#181818] rounded-lg shadow p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="mb-4 sm:mb-0">
                <p className="text-xl font-semibold">{'full_name' in item ? item.full_name : item.name}</p>
                <p className="text-sm text-gray-400">{item.email}</p>
                <p className="text-sm text-gray-400"><span className='font-bold text-white'>Sponsor Type:</span> {item.sponsor_type}</p>
                {'age' in item && (
                  <p className="text-sm text-gray-400"><span className='font-bold text-white'>Age:</span> {item.age} | <span className='font-bold text-white'>Location:</span> {item.location}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {'bio' in item && (
                  <button
                    onClick={() => openBioModal(item.bio)}
                    className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    View Bio
                  </button>
                )}

                {'payment_proof_url' in item && (
                  <button
                    onClick={() => window.open(item.payment_proof_url, '_blank')}
                    className="px-4 py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 rounded"
                  >
                    View Proof
                  </button>
                )}

                <button
                  onClick={() => updateStatus(item.id, 'approved', tab === 'seekers' ? 'seeker' : 'sponsor')}
                  disabled={item.status === 'approved'}
                  className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(item.id, 'rejected', tab === 'seekers' ? 'seeker' : 'sponsor')}
                  disabled={item.status === 'rejected'}
                  className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {/* Bio Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex justify-center items-center">
              <div className="bg-[#181818] p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Seeker Bio</h3>
                <p className="text-sm text-gray-300 whitespace-pre-line">{selectedBio}</p>
                <button
                  onClick={closeBioModal}
                  className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
        <ToastContainer />
      </div>
    </div>
  )
}