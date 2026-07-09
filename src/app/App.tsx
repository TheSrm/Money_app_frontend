import { useAuth } from "../features/auth/context/AuthContext";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";


function App() {

  const { user } = useAuth();

  return user ? ( <HomePage />) : ( <LoginPage />);

}


export default App;