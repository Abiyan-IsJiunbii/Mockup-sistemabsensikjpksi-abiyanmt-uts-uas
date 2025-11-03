import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Download, Search, Filter, FileSpreadsheet, FileText, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Mock data
const attendanceData = [
  { id: 1, nim: '12345001', name: 'Ahmad Fadli', status: 'Hadir', time: '06:45:23', location: 'Valid', date: '2025-11-03' },
  { id: 2, nim: '12345002', name: 'Siti Nurhaliza', status: 'Hadir', time: '06:43:15', location: 'Valid', date: '2025-11-03' },
  { id: 3, nim: '12345003', name: 'Budi Santoso', status: 'Hadir', time: '06:47:30', location: 'Valid', date: '2025-11-03' },
  { id: 4, nim: '12345004', name: 'Dewi Lestari', status: 'Hadir', time: '06:42:10', location: 'Valid', date: '2025-11-03' },
  { id: 5, nim: '12345005', name: 'Rizki Pratama', status: 'Gagal', time: '-', location: 'Di luar area', date: '2025-11-03' },
  { id: 6, nim: '12345006', name: 'Fatimah Zahra', status: 'Hadir', time: '06:50:45', location: 'Valid', date: '2025-11-03' },
  { id: 7, nim: '12345007', name: 'Hendra Wijaya', status: 'Hadir', time: '06:38:20', location: 'Valid', date: '2025-11-03' },
  { id: 8, nim: '12345008', name: 'Intan Permata', status: 'Tidak Hadir', time: '-', location: '-', date: '2025-11-03' },
  { id: 9, nim: '12345009', name: 'Joko Susilo', status: 'Hadir', time: '06:52:15', location: 'Valid', date: '2025-11-03' },
  { id: 10, nim: '12345010', name: 'Kartika Sari', status: 'Hadir', time: '06:41:30', location: 'Valid', date: '2025-11-03' },
  { id: 11, nim: '12345011', name: 'Lukman Hakim', status: 'Hadir', time: '06:44:50', location: 'Valid', date: '2025-11-03' },
  { id: 12, nim: '12345012', name: 'Maya Anggraini', status: 'Tidak Hadir', time: '-', location: '-', date: '2025-11-03' },
];

export function AttendanceData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('2025-11-03');

  const filteredData = attendanceData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.nim.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesDate = item.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleExportExcel = () => {
    alert('Data berhasil diekspor ke Excel! (Mock action)');
  };

  const handleExportPDF = () => {
    alert('Data berhasil diekspor ke PDF! (Mock action)');
  };

  const stats = {
    total: filteredData.length,
    present: filteredData.filter(d => d.status === 'Hadir').length,
    absent: filteredData.filter(d => d.status === 'Tidak Hadir').length,
    failed: filteredData.filter(d => d.status === 'Gagal').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#8B4513] mb-1">Data Kehadiran</h2>
        <p className="text-gray-600">Rekapitulasi kehadiran anggota KSI</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-blue-50 border-blue-200">
          <p className="text-blue-900">{stats.total}</p>
          <p className="text-blue-700">Total</p>
        </Card>
        <Card className="p-4 text-center bg-green-50 border-green-200">
          <p className="text-green-900">{stats.present}</p>
          <p className="text-green-700">Hadir</p>
        </Card>
        <Card className="p-4 text-center bg-gray-50 border-gray-200">
          <p className="text-gray-900">{stats.absent}</p>
          <p className="text-gray-700">Tidak Hadir</p>
        </Card>
        <Card className="p-4 text-center bg-red-50 border-red-200">
          <p className="text-red-900">{stats.failed}</p>
          <p className="text-red-700">Gagal</p>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <Label htmlFor="search">Cari Mahasiswa</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Cari nama atau NIM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="filterStatus">Filter Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Hadir">Hadir</SelectItem>
                <SelectItem value="Tidak Hadir">Tidak Hadir</SelectItem>
                <SelectItem value="Gagal">Gagal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="filterDate">Filter Tanggal</Label>
            <Input
              id="filterDate"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button 
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button 
            onClick={handleExportPDF}
            className="bg-red-600 hover:bg-red-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#8B4513]/5">
                <TableHead className="text-[#8B4513]">No</TableHead>
                <TableHead className="text-[#8B4513]">NIM</TableHead>
                <TableHead className="text-[#8B4513]">Nama Mahasiswa</TableHead>
                <TableHead className="text-[#8B4513]">Status</TableHead>
                <TableHead className="text-[#8B4513]">Waktu</TableHead>
                <TableHead className="text-[#8B4513]">Lokasi</TableHead>
                <TableHead className="text-[#8B4513]">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Tidak ada data yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-mono">{item.nim}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === 'Hadir' ? 'default' : 'secondary'}
                        className={
                          item.status === 'Hadir'
                            ? 'bg-green-500 hover:bg-green-600'
                            : item.status === 'Tidak Hadir'
                            ? 'bg-gray-400'
                            : 'bg-red-500'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
                      <span className={item.location === 'Valid' ? 'text-green-600' : 'text-red-600'}>
                        {item.location}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString('id-ID')}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Info */}
      <Card className="p-6 bg-gradient-to-br from-[#8B4513]/5 to-[#A0522D]/5 border-[#8B4513]/20">
        <h4 className="text-[#8B4513] mb-3">Keterangan</h4>
        <div className="space-y-2 text-gray-700">
          <p><strong className="text-[#8B4513]">Hadir:</strong> Mahasiswa berhasil scan QR Code dan lokasi valid</p>
          <p><strong className="text-[#8B4513]">Tidak Hadir:</strong> Mahasiswa tidak melakukan absensi</p>
          <p><strong className="text-[#8B4513]">Gagal:</strong> Mahasiswa scan QR Code namun lokasi tidak valid atau di luar waktu</p>
        </div>
      </Card>
    </div>
  );
}
