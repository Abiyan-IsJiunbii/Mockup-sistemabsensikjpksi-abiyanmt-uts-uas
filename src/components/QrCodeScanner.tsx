import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Camera, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface QrCodeScannerProps {
  user: any;
  onBack: () => void;
}

export function QrCodeScanner({ user, onBack }: QrCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'failed-location' | 'failed-time' | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Use mock location if permission denied
          setLocation({ lat: -6.200000, lng: 106.816666 });
        }
      );
    } else {
      setLocation({ lat: -6.200000, lng: 106.816666 });
    }
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate QR code scanning and validation
    setTimeout(() => {
      setIsScanning(false);
      
      // Mock validation - 80% success rate for demo
      const isLocationValid = Math.random() > 0.2;
      const isTimeValid = Math.random() > 0.1;
      
      if (isLocationValid && isTimeValid) {
        setScanResult('success');
      } else if (!isLocationValid) {
        setScanResult('failed-location');
      } else {
        setScanResult('failed-time');
      }
    }, 2000);
  };

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
        <h4 className="text-[#8B4513]">Scan QR Code</h4>
      </div>

      {/* Location Status */}
      <Card className="p-3 mb-4 bg-[#8B4513]/5 border-[#8B4513]/20">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#8B4513]" />
          <div>
            <p className="text-gray-700">Status Lokasi</p>
            {location ? (
              <p className="text-[#8B4513]">Lokasi terdeteksi</p>
            ) : (
              <p className="text-gray-600">Mencari lokasi...</p>
            )}
          </div>
        </div>
      </Card>

      {/* Scanner Area */}
      <Card className="p-4 mb-4 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-[#8B4513]/30">
        <div className="aspect-square w-full bg-white rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
          {!isScanning && !scanResult && (
            <div className="text-center px-4">
              <Camera className="w-12 h-12 text-[#8B4513] mx-auto mb-3" />
              <p className="text-gray-600">Arahkan kamera ke QR Code</p>
            </div>
          )}
          
          {isScanning && (
            <div className="text-center px-4">
              <div className="w-12 h-12 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-[#8B4513]">Memindai QR Code...</p>
              <p className="text-gray-600 mt-1">Validasi lokasi...</p>
            </div>
          )}

          {scanResult === 'success' && (
            <div className="text-center animate-in fade-in zoom-in duration-300 px-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
              <p className="text-green-600 mb-1">Absen Berhasil!</p>
              <p className="text-gray-600">Kehadiran Anda tercatat</p>
              <p className="text-gray-500 mt-2">{new Date().toLocaleString('id-ID')}</p>
            </div>
          )}

          {scanResult === 'failed-location' && (
            <div className="text-center animate-in fade-in zoom-in duration-300 px-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 mb-1">Absen Gagal</p>
              <p className="text-gray-600">Lokasi tidak valid</p>
              <p className="text-gray-500 mt-2">Pastikan Anda di lokasi KJP</p>
            </div>
          )}

          {scanResult === 'failed-time' && (
            <div className="text-center animate-in fade-in zoom-in duration-300 px-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 mb-1">Absen Gagal</p>
              <p className="text-gray-600">Waktu tidak valid</p>
              <p className="text-gray-500 mt-2">Absen hanya saat KJP</p>
            </div>
          )}

          {/* Scanning animation overlay */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B4513] animate-pulse" 
                   style={{ animation: 'scan 2s linear infinite' }} />
            </div>
          )}
        </div>
      </Card>

      {/* Action Button */}
      {!isScanning && (
        <Button
          onClick={handleScan}
          disabled={!location}
          className="w-full bg-[#8B4513] hover:bg-[#A0522D]"
        >
          <Camera className="w-4 h-4 mr-2" />
          {scanResult ? 'Scan Ulang' : 'Mulai Scan QR Code'}
        </Button>
      )}

      {/* Instructions */}
      <Alert className="mt-4 border-[#8B4513]/20">
        <AlertDescription>
          <p className="mb-2">Panduan Absen:</p>
          <ul className="space-y-1 text-gray-700 ml-4">
            <li>• Pastikan GPS aktif</li>
            <li>• Berada di lokasi KJP</li>
            <li>• Scan QR Code tersedia</li>
            <li>• Tunggu konfirmasi</li>
          </ul>
        </AlertDescription>
      </Alert>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
}
