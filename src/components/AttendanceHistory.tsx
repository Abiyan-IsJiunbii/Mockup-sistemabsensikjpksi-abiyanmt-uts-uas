import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface AttendanceHistoryProps {
  user: any;
  onBack: () => void;
}

// Mock data
const attendanceRecords = [
  {
    id: 1,
    date: '2025-11-01',
    time: '06:45:23',
    status: 'Hadir',
    location: 'Masjid Kampus',
  },
  {
    id: 2,
    date: '2025-10-25',
    time: '06:38:15',
    status: 'Hadir',
    location: 'Masjid Kampus',
  },
  {
    id: 3,
    date: '2025-10-18',
    time: '-',
    status: 'Tidak Hadir',
    location: '-',
  },
  {
    id: 4,
    date: '2025-10-11',
    time: '06:42:10',
    status: 'Hadir',
    location: 'Masjid Kampus',
  },
  {
    id: 5,
    date: '2025-10-04',
    time: '07:05:30',
    status: 'Hadir',
    location: 'Masjid Kampus',
  },
  {
    id: 6,
    date: '2025-09-27',
    time: '-',
    status: 'Gagal - Lokasi',
    location: 'Di luar area',
  },
  {
    id: 7,
    date: '2025-09-20',
    time: '06:35:45',
    status: 'Hadir',
    location: 'Masjid Kampus',
  },
  {
    id: 8,
    date: '2025-09-13',
    time: '06:50:20',
    status: 'Hadir',
    location: 'Masjid Kampus',
  },
];

export function AttendanceHistory({ user, onBack }: AttendanceHistoryProps) {
  const presentCount = attendanceRecords.filter(r => r.status === 'Hadir').length;
  const absentCount = attendanceRecords.filter(r => r.status !== 'Hadir').length;
  const attendanceRate = Math.round((presentCount / attendanceRecords.length) * 100);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-[#8B4513]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h4 className="text-[#8B4513]">Riwayat Kehadiran</h4>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Card className="p-3 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-green-700">Hadir</p>
          <p className="text-green-900">{presentCount}</p>
        </Card>
        <Card className="p-3 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <p className="text-red-700">Tidak Hadir</p>
          <p className="text-red-900">{absentCount}</p>
        </Card>
        <Card className="p-3 text-center bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 border-[#8B4513]/20">
          <p className="text-[#8B4513]">Persentase</p>
          <p className="text-[#8B4513]">{attendanceRate}%</p>
        </Card>
      </div>

      {/* Attendance List */}
      <div className="space-y-2">
        {attendanceRecords.map((record) => (
          <Card key={record.id} className="p-3 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2 flex-1 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  record.status === 'Hadir' 
                    ? 'bg-green-100' 
                    : record.status === 'Tidak Hadir'
                    ? 'bg-gray-100'
                    : 'bg-red-100'
                }`}>
                  {record.status === 'Hadir' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">
                    {new Date(record.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  {record.time !== '-' && (
                    <p className="text-gray-600">{record.time} WIB</p>
                  )}
                  <p className="text-gray-600">{record.location}</p>
                </div>
              </div>
              <Badge 
                variant={record.status === 'Hadir' ? 'default' : 'secondary'}
                className={`flex-shrink-0 ${record.status === 'Hadir' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : record.status === 'Tidak Hadir'
                  ? 'bg-gray-400'
                  : 'bg-red-500'
                }`}
              >
                {record.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="mt-4 p-4 bg-gradient-to-br from-[#8B4513]/5 to-[#A0522D]/5 border-[#8B4513]/20">
        <p className="text-[#8B4513] mb-2">Ringkasan</p>
        <div className="space-y-1 text-gray-700">
          <p>Total Pertemuan: {attendanceRecords.length} kali</p>
          <p>Total Kehadiran: {presentCount} kali</p>
          <p>Tingkat Kehadiran: {attendanceRate}%</p>
        </div>
      </Card>
    </div>
  );
}
