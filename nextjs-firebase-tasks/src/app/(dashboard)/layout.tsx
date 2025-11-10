import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div>
      <header>
        <h1>Welcome to Your Task Manager</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;