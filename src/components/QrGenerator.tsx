import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { QrCode, MapPin, Download, Copy, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function QrGenerator() {
  const [qrData, setQrData] = useState({
    eventName: 'KJP - Kajian Jumat Pagi',
    eventDate: '2025-11-07',
    latitude: '-6.200000',
    longitude: '106.816666',
    radius: '50',
  });
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setQrGenerated(true);
  };

  const handleDownload = () => {
    // In a real app, this would download the QR code as an image
    alert('QR Code berhasil diunduh! (Mock action)');
  };

  const handleCopyLocation = () => {
    const location = `${qrData.latitude}, ${qrData.longitude}`;
    navigator.clipboard.writeText(location);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#8B4513] mb-1">Generate QR Code & Geo-Fencing</h2>
        <p className="text-gray-600">Buat QR Code baru untuk kegiatan KJP</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="p-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <Label htmlFor="eventName">Nama Kegiatan</Label>
              <Input
                id="eventName"
                value={qrData.eventName}
                onChange={(e) => setQrData({ ...qrData, eventName: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="eventDate">Tanggal Kegiatan</Label>
              <Input
                id="eventDate"
                type="date"
                value={qrData.eventDate}
                onChange={(e) => setQrData({ ...qrData, eventDate: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#8B4513] mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Pengaturan Geo-Fencing
              </h4>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={qrData.latitude}
                    onChange={(e) => setQrData({ ...qrData, latitude: e.target.value })}
                    placeholder="-6.200000"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    value={qrData.longitude}
                    onChange={(e) => setQrData({ ...qrData, longitude: e.target.value })}
                    placeholder="106.816666"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="radius">Radius Validasi (meter)</Label>
                  <Input
                    id="radius"
                    type="number"
                    value={qrData.radius}
                    onChange={(e) => setQrData({ ...qrData, radius: e.target.value })}
                    className="mt-2"
                    required
                  />
                  <p className="text-gray-600 mt-1">
                    Area yang diizinkan untuk absen
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyLocation}
                  className="w-full border-[#8B4513]/20 text-[#8B4513] hover:bg-[#8B4513]/5"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Koordinat Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Salin Koordinat
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#8B4513] hover:bg-[#A0522D]"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </form>
        </Card>

        {/* QR Code Display */}
        <Card className="p-6">
          <h3 className="text-[#8B4513] mb-4">Preview QR Code</h3>
          
          {!qrGenerated ? (
            <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <QrCode className="w-16 h-16 mx-auto mb-4" />
                <p>QR Code akan muncul di sini</p>
                <p className="mt-2">setelah generate</p>
              </div>
            </div>
          ) : (
            <div ref={qrCodeRef} className="space-y-4">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center border-2 border-[#8B4513]/20 p-8">
                {/* Mock QR Code - in real app, use a QR code library */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-[#8B4513]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#8B4513]/5 rounded-lg p-4 space-y-2">
                <p className="text-gray-700">
                  <strong>Kegiatan:</strong> {qrData.eventName}
                </p>
                <p className="text-gray-700">
                  <strong>Tanggal:</strong> {new Date(qrData.eventDate).toLocaleDateString('id-ID')}
                </p>
                <p className="text-gray-700">
                  <strong>Lokasi:</strong> {qrData.latitude}, {qrData.longitude}
                </p>
                <p className="text-gray-700">
                  <strong>Radius:</strong> {qrData.radius} meter
                </p>
              </div>

              <Button
                onClick={handleDownload}
                className="w-full bg-[#8B4513] hover:bg-[#A0522D]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          )}
        </Card>
      </div>

      {qrGenerated && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            QR Code berhasil dibuat! QR Code dapat langsung digunakan untuk absensi. Pastikan untuk menampilkan atau mencetak QR Code di lokasi KJP.
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-6 bg-gradient-to-br from-[#8B4513]/5 to-[#A0522D]/5 border-[#8B4513]/20">
        <h4 className="text-[#8B4513] mb-3">Panduan Penggunaan</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#8B4513] mt-1">1.</span>
            <span>Isi data kegiatan dan tanggal pelaksanaan KJP</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8B4513] mt-1">2.</span>
            <span>Masukkan koordinat GPS lokasi KJP (dapat menggunakan Google Maps)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8B4513] mt-1">3.</span>
            <span>Tentukan radius validasi (disarankan 50-100 meter)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8B4513] mt-1">4.</span>
            <span>Generate dan download QR Code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8B4513] mt-1">5.</span>
            <span>Tampilkan QR Code di lokasi agar mahasiswa dapat scan</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
