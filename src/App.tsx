import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Calculator from './components/Calculator';
import BookingForm from './components/BookingForm';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Payments from './components/Payments';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

type View = 'main' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('main');

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('main')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAdminClick={() => setView('admin')} />

      <main>
        <Hero />
        <Benefits />
        <Services />
        <Calculator />
        <BookingForm />
        <Team />
        <Testimonials />
        <Payments />
        <Contact />
      </main>

      <Footer onAdminClick={() => setView('admin')} />
    </div>
  );
}
