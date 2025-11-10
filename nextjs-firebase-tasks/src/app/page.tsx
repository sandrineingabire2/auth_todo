import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

const Page = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to the Task Management App</h1>
        {user ? (
          <p>You are logged in as {user.email}</p>
        ) : (
          <p>Please log in to manage your tasks.</p>
        )}
      </main>
    </div>
  );
};

export default Page;