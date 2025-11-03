import { useState } from 'react';
import { StudentLogin } from './components/StudentLogin';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileFrame } from './components/MobileFrame';
import { Button } from './components/ui/button';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'student-login' | 'student-dashboard' | 'admin-login' | 'admin-dashboard'>('student-login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('mobile');

  const handleStudentLogin = (userData: any) => {
    setCurrentUser(userData);
    setView('student-dashboard');
  };

  const handleAdminLogin = (adminData: any) => {
    setCurrentUser(adminData);
    setView('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('student-login');
  };

  const renderContent = () => (
    <>
      {view === 'student-login' && (
        <StudentLogin 
          onLogin={handleStudentLogin}
          onSwitchToAdmin={() => setView('admin-login')}
        />
      )}
      {view === 'student-dashboard' && (
        <StudentDashboard 
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
      {view === 'admin-login' && (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onSwitchToStudent={() => setView('student-login')}
        />
      )}
      {view === 'admin-dashboard' && (
        <AdminDashboard 
          admin={currentUser}
          onLogout={handleLogout}
        />
      )}
    </>
  );

  // Show admin dashboard in desktop view
  if (view.includes('admin') && deviceView === 'mobile') {
    return (
      <div className="min-h-screen bg-[#F5F6FA]">
        {renderContent()}
      </div>
    );
  }

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => setDeviceView('mobile')}
          variant={deviceView === 'mobile' ? 'default' : 'outline'}
          size="sm"
          className={deviceView === 'mobile' ? 'bg-[#8B4513]' : ''}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Mobile
        </Button>
        <Button
          onClick={() => setDeviceView('desktop')}
          variant={deviceView === 'desktop' ? 'default' : 'outline'}
          size="sm"
          className={deviceView === 'desktop' ? 'bg-[#8B4513]' : ''}
        >
          <Monitor className="w-4 h-4 mr-2" />
          Desktop
        </Button>
      </div>

      {deviceView === 'mobile' ? (
        <MobileFrame>
          {renderContent()}
        </MobileFrame>
      ) : (
        <div className="min-h-screen bg-[#F5F6FA]">
          {renderContent()}
        </div>
      )}
    </>
  );
}
