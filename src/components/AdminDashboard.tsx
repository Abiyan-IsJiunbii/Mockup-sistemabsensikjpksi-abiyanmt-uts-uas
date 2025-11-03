import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DashboardStats } from './DashboardStats';
import { QrGenerator } from './QrGenerator';
import { AttendanceData } from './AttendanceData';
import { LogOut, LayoutDashboard, QrCode, Database } from 'lucide-react';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
}

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white mb-1">Dashboard Admin KSI</h1>
              <p className="text-white/90">Sistem Absensi KJP</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white/90">{admin.name}</p>
                <p className="text-white/80">{admin.role}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="text-white hover:bg-white/20"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="qr-generator" className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white">
              <Database className="w-4 h-4 mr-2" />
              Data Kehadiran
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="qr-generator">
            <QrGenerator />
          </TabsContent>

          <TabsContent value="data">
            <AttendanceData />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
