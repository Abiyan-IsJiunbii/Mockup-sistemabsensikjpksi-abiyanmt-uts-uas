import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (adminData: any) => void;
  onSwitchToStudent: () => void;
}

export function AdminLogin({ onLogin, onSwitchToStudent }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin({
        username,
        name: 'Admin KSI',
        role: 'Admin'
      });
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-[#8B4513] to-[#A0522D]">
      <div className="w-full max-w-md px-2">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3 shadow-lg">
            <Shield className="w-8 h-8 text-[#8B4513]" />
          </div>
          <h2 className="text-white mb-1">Admin Dashboard</h2>
          <p className="text-white/90">KSI Smart Attendance</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              Login Admin
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={onSwitchToStudent}
              className="text-[#8B4513] hover:underline"
            >
              Login sebagai Mahasiswa
            </button>
          </div>
        </div>

        <p className="text-center text-white/80 mt-4">
          Sistem Manajemen Kehadiran KJP
        </p>
      </div>
    </div>
  );
}
