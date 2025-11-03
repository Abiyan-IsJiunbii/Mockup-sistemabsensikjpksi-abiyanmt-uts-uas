import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QrCodeScanner } from './QrCodeScanner';
import { AttendanceHistory } from './AttendanceHistory';
import { LogOut, QrCode, History, Home, User } from 'lucide-react';

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'history'>('home');

  return (
    <div className="h-full bg-[#F5F6FA] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white pt-2 px-4 pb-4 rounded-b-3xl shadow-lg flex-shrink-0">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-white/90">Selamat Datang,</p>
            <h3 className="text-white">{user.name}</h3>
            <p className="text-white/80">NIM: {user.nim}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Status Card */}
        <Card className="bg-white/95 backdrop-blur p-3 border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Status Kehadiran Terakhir</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  user.lastAttendance === 'Hadir' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span className="text-[#8B4513]">{user.lastAttendance}</span>
              </div>
              <p className="text-gray-500 mt-1">{new Date(user.lastDate).toLocaleDateString('id-ID')}</p>
            </div>
            <div className="w-12 h-12 bg-[#8B4513]/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#8B4513]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="space-y-3">
            <h4 className="text-[#8B4513]">Menu Utama</h4>
            
            <Card className="p-4 border-2 border-[#8B4513]/20 hover:border-[#8B4513]/40 transition-colors cursor-pointer active:scale-95"
                  onClick={() => setActiveTab('scan')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#8B4513] rounded-xl flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#8B4513]">Absen Sekarang</p>
                  <p className="text-gray-600">Scan QR Code untuk absen KJP</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2 border-[#8B4513]/20 hover:border-[#8B4513]/40 transition-colors cursor-pointer active:scale-95"
                  onClick={() => setActiveTab('history')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A0522D] rounded-xl flex items-center justify-center flex-shrink-0">
                  <History className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#8B4513]">Riwayat Kehadiran</p>
                  <p className="text-gray-600">Lihat rekap kehadiran Anda</p>
                </div>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-4 bg-gradient-to-br from-[#8B4513]/5 to-[#A0522D]/5 border-[#8B4513]/20">
              <p className="text-[#8B4513] mb-2">Informasi KJP</p>
              <div className="space-y-1 text-gray-700">
                <p>📅 Setiap Jumat Pagi</p>
                <p>⏰ 06:30 - 07:30 WIB</p>
                <p>📍 Masjid Kampus</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'scan' && (
          <QrCodeScanner user={user} onBack={() => setActiveTab('home')} />
        )}

        {activeTab === 'history' && (
          <AttendanceHistory user={user} onBack={() => setActiveTab('home')} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex-shrink-0">
        <div className="flex justify-around items-center p-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-[#8B4513] bg-[#8B4513]/10' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'scan' ? 'text-[#8B4513] bg-[#8B4513]/10' : 'text-gray-600'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-xs">Scan</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'history' ? 'text-[#8B4513] bg-[#8B4513]/10' : 'text-gray-600'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-xs">Riwayat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
