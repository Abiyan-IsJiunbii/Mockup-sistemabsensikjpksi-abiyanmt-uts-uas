import { Card } from './ui/card';
import { Users, CheckCircle2, XCircle, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

const todayStats = {
  total: 45,
  present: 38,
  absent: 5,
  failed: 2,
  date: '2025-11-03'
};

const weeklyTrend = [
  { week: 'Minggu 1', attendance: 42 },
  { week: 'Minggu 2', attendance: 40 },
  { week: 'Minggu 3', attendance: 44 },
  { week: 'Minggu 4', attendance: 38 },
];

const recentActivity = [
  { name: 'Ahmad Fadli', nim: '12345001', time: '06:45:23', status: 'Hadir' },
  { name: 'Siti Nurhaliza', nim: '12345002', time: '06:43:15', status: 'Hadir' },
  { name: 'Budi Santoso', nim: '12345003', time: '06:47:30', status: 'Hadir' },
  { name: 'Dewi Lestari', nim: '12345004', time: '06:42:10', status: 'Hadir' },
  { name: 'Rizki Pratama', nim: '12345005', time: '-', status: 'Gagal' },
];

export function DashboardStats() {
  const attendanceRate = Math.round((todayStats.present / todayStats.total) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#8B4513] mb-1">Statistik Kehadiran</h2>
          <p className="text-gray-600">Data hari ini - {new Date(todayStats.date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
        <Badge className="bg-[#8B4513]">
          <Calendar className="w-4 h-4 mr-1" />
          Live
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-blue-600">{attendanceRate}%</span>
          </div>
          <p className="text-blue-900">{todayStats.total}</p>
          <p className="text-blue-700">Total Anggota</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-green-900">{todayStats.present}</p>
          <p className="text-green-700">Hadir</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-900">{todayStats.absent}</p>
          <p className="text-gray-700">Tidak Hadir</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-red-900">{todayStats.failed}</p>
          <p className="text-red-700">Absen Gagal</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-[#8B4513] mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900">{activity.name}</p>
                  <p className="text-gray-600">NIM: {activity.nim}</p>
                </div>
                <div className="text-right">
                  <Badge variant={activity.status === 'Hadir' ? 'default' : 'destructive'}
                         className={activity.status === 'Hadir' ? 'bg-green-500' : 'bg-red-500'}>
                    {activity.status}
                  </Badge>
                  <p className="text-gray-600 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Trend */}
        <Card className="p-6">
          <h3 className="text-[#8B4513] mb-4">Tren Kehadiran Mingguan</h3>
          <div className="space-y-4">
            {weeklyTrend.map((week, index) => {
              const percentage = Math.round((week.attendance / todayStats.total) * 100);
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{week.week}</span>
                    <span className="text-[#8B4513]">{week.attendance} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#8B4513] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick Info */}
      <Card className="p-6 bg-gradient-to-br from-[#8B4513]/5 to-[#A0522D]/5 border-[#8B4513]/20">
        <h3 className="text-[#8B4513] mb-3">Informasi KJP Hari Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <p className="text-gray-600 mb-1">Waktu Mulai</p>
            <p className="text-[#8B4513]">06:30 WIB</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Waktu Selesai</p>
            <p className="text-[#8B4513]">07:30 WIB</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Lokasi</p>
            <p className="text-[#8B4513]">Masjid Kampus</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
