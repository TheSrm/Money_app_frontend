import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { User } from "../features/expenses/types";
import { HomePage } from "../features/home/pages/HomePage";
import { GoogleLoginButton } from "../features/auth/components/GoogleLoginButton";
import { authService } from "../features/auth/services/authService";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = authService.getStoredUser();

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (user: User, token: string) => {
    authService.saveSession(user, token);
    setUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (!GOOGLE_CLIENT_ID) {
    return (
        <div style={{ padding: "20px", color: "red" }}>
          Falta configurar VITE_GOOGLE_CLIENT_ID
        </div>
    );
  }

  return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {user ? (
            <HomePage
                user={user}
                onLogout={handleLogout}
            />
        ) : (
            <GoogleLoginButton
                onLoginSuccess={handleLogin}
            />
        )}
      </GoogleOAuthProvider>
  );
}

export default App;