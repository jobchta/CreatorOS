'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { AuthProvider, useAuth } from '@/components/AuthProvider';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("DashboardLayout effect. Loading:", loading, "User:", user);
    if (!loading && !user) {
      console.log("Redirecting to /login");
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      <div className="aurora" />
      <div className="grain" />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10 w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
