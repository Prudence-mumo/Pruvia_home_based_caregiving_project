import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Search, Filter, Loader2, Edit3, Check, X, ChevronDown, ChevronUp, Calendar, MapPin, Phone, Mail, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Booking } from '../types';
import Logo from './Logo';

interface AdminDashboardProps {
  onBack: () => void;
}

const STATUS_OPTIONS: Booking['status'][] = ['pending', 'contacted', 'scheduled', 'closed'];
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  scheduled: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-gray-100 text-gray-600 border-gray-200',
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'mock-1',
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    client_name: 'Mary Wanjiku',
    email: 'mary.w@gmail.com',
    phone: '+254 712 345 678',
    location: 'Nairobi',
    services: ['Home-Based Nursing Care', 'Personal Care Assistance'],
    package_selected: 'standard',
    care_complexity: 'Elderly parent recovering from a hip fracture. Needs daily vitals monitoring, wound care, and help with mobility.',
    status: 'scheduled',
    notes: 'Assigned Nurse Mary. Start date confirmed for Monday.',
  },
  {
    id: 'mock-2',
    created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
    client_name: 'John Ochieng',
    email: 'johnochieng@yahoo.com',
    phone: '+254 722 987 654',
    location: 'Kitengela',
    services: ['Specialized Care', 'Hospital Equipment Rental'],
    package_selected: 'comprehensive',
    care_complexity: 'Post-surgical patient. Needs wound management and hospital bed rental for 3 weeks.',
    status: 'contacted',
    notes: 'Called back. Awaiting insurance confirmation.',
  },
  {
    id: 'mock-3',
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    client_name: 'Fatuma Ali',
    email: 'fatuma.ali@gmail.com',
    phone: '+254 733 112 233',
    location: 'Machakos',
    services: ['Allied Health Services'],
    package_selected: 'unsure',
    care_complexity: 'Needs physiotherapy after stroke. Family requesting home visits twice weekly.',
    status: 'pending',
    notes: '',
  },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${STATUS_COLORS[status] || STATUS_COLORS.pending}`}>
      {status}
    </span>
  );
}

interface BookingRowProps {
  booking: Booking;
  onStatusChange: (id: string, status: Booking['status']) => void;
  onNotesChange: (id: string, notes: string) => void;
}

function BookingRow({ booking, onStatusChange, onNotesChange }: BookingRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(booking.notes);
  const [saving, setSaving] = useState(false);

  const saveNotes = async () => {
    setSaving(true);
    await onNotesChange(booking.id, notes);
    setSaving(false);
    setEditingNotes(false);
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 ${expanded ? 'border-teal shadow-sm' : 'border-gray-200'}`}>
      {/* Row header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-blue-deep text-sm">{booking.client_name}</p>
            <StatusBadge status={booking.status} />
          </div>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1"><MapPin size={11} />{booking.location}</span>
            <span className="flex items-center gap-1"><Calendar size={11} />{fmt(booking.created_at)}</span>
            <span className="flex items-center gap-1"><Tag size={11} />{booking.services.slice(0, 2).join(', ')}{booking.services.length > 2 && ` +${booking.services.length - 2}`}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick status change */}
          <div onClick={(e) => e.stopPropagation()}>
            <select
              value={booking.status}
              onChange={(e) => onStatusChange(booking.id, e.target.value as Booking['status'])}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-teal"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Contact Details</p>
            <a href={`tel:${booking.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal mb-1">
              <Phone size={13} className="text-gray-400" /> {booking.phone}
            </a>
            <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal">
              <Mail size={13} className="text-gray-400" /> {booking.email}
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Requested Services</p>
            <div className="flex flex-wrap gap-1.5">
              {booking.services.map((s) => (
                <span key={s} className="bg-teal/10 text-teal text-xs px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
            {booking.package_selected && (
              <p className="text-xs text-gray-500 mt-2">
                Package: <span className="font-medium text-blue-deep capitalize">{booking.package_selected}</span>
              </p>
            )}
          </div>

          {/* Care complexity */}
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Care Needs Description</p>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">{booking.care_complexity || 'Not provided.'}</p>
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Admin Notes</p>
              {!editingNotes && (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="flex items-center gap-1 text-xs text-teal hover:text-blue-deep transition-colors"
                >
                  <Edit3 size={12} /> Edit
                </button>
              )}
            </div>
            {editingNotes ? (
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal resize-none"
                  placeholder="Add internal notes..."
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={saveNotes}
                    disabled={saving}
                    className="flex items-center gap-1 text-xs bg-teal text-white px-3 py-1.5 rounded-lg hover:bg-blue-deep transition-colors disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Save
                  </button>
                  <button
                    onClick={() => { setNotes(booking.notes); setEditingNotes(false); }}
                    className="flex items-center gap-1 text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={12} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 min-h-[48px]">
                {booking.notes || <span className="italic text-gray-400">No notes yet.</span>}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (dbError) throw dbError;
      const combined = [...(data || [])];
      // Merge with mocks only if no real data
      if (combined.length === 0) {
        setBookings(MOCK_BOOKINGS);
      } else {
        setBookings(combined);
      }
    } catch {
      setBookings(MOCK_BOOKINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    if (!id.startsWith('mock')) {
      await supabase.from('bookings').update({ status }).eq('id', id);
    }
  };

  const handleNotesChange = async (id: string, notes: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, notes } : b))
    );
    if (!id.startsWith('mock')) {
      await supabase.from('bookings').update({ notes }).eq('id', id);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.client_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => ({ ...acc, [s]: bookings.filter((b) => b.status === s).length }),
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-deep border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} /> Back to Site
            </button>
            <div className="h-4 w-px bg-white/20" />
            <Logo variant="light" size="sm" />
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <span>Staff Portal</span>
            <button
              onClick={fetchBookings}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', count: bookings.length, color: 'text-blue-deep', bg: 'bg-white' },
            { label: 'Pending', count: counts.pending || 0, color: 'text-yellow-700', bg: 'bg-yellow-50' },
            { label: 'Scheduled', count: counts.scheduled || 0, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Closed', count: counts.closed || 0, color: 'text-gray-600', bg: 'bg-gray-100' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-5 border border-gray-100 shadow-sm`}>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${color}`}>{count}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or location..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-teal"
            >
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bookings list */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="text-teal animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">No bookings found</p>
            <p className="text-sm mt-1">
              {search || filterStatus !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'New booking submissions will appear here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
