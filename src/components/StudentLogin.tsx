import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Users } from 'lucide-react';

interface StudentLoginProps {
  onLogin: (userData: any) => void;
  onSwitchToAdmin: () => void;
}

export function StudentLogin({ onLogin, onSwitchToAdmin }: StudentLoginProps) {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate with backend
    if (nim && password) {
      onLogin({
        nim,
        name: 'Muhammad Rizki',
        lastAttendance: 'Hadir',
        lastDate: '2025-11-01'
      });
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-[#8B4513] to-[#A0522D]">
      <div className="w-full max-w-md px-2">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3 shadow-lg">
            <Users className="w-8 h-8 text-[#8B4513]" />
          </div>
          <h2 className="text-white mb-1">KSI Smart Attendance</h2>
          <p className="text-white/90">Absensi Digital KJP</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="nim">NIM</Label>
              <Input
                id="nim"
                type="text"
                placeholder="Masukkan NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#8B4513] hover:bg-[#A0522D]">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={onSwitchToAdmin}
              className="text-[#8B4513] hover:underline"
            >
              Login sebagai Admin/Pengurus
            </button>
          </div>
        </div>

        <p className="text-center text-white/80 mt-4">
          UKM Keluarga Studi Islam (KSI)
        </p>
      </div>
    </div>
  );
}
