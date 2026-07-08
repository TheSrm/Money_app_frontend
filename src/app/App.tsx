import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Expense, User} from "../features/expenses/types";
import {ExpenseForm, ExpenseList} from "../features/expenses/intex";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Logs de debugging
console.log('=== APP DEBUG ===');
console.log('VITE_GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);
console.log('API_URL:', API_URL);
console.log('import.meta.env:', import.meta.env);
console.log('================');

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSuccess = async (response: CredentialResponse) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/google`, {
        idToken: response.credential,
      });

      if (!data.googleId) {
        alert('Error: El servidor no devolvió googleId');
        return;
      }

      const userData: User = {
        googleId: data.googleId,
        email: data.email,
        name: data.name,
        createdAt: data.createdAt,
      };

      setUser(userData);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));

    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al iniciar sesión. Por favor, intenta nuevamente.');

    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    console.error('Login con Google falló');
    alert('Error al iniciar sesión con Google');
  };

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setShowForm(false);
    setEditingExpense(null);
  };

  const handleExpenseCreated = (_expense: Expense) => {
    setShowForm(false);
  };

  // Verifica que el CLIENT_ID esté definido antes de renderizar
  if (!GOOGLE_CLIENT_ID) {
    return (
        <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace' }}>
          <h2>❌ ERROR DE CONFIGURACIÓN</h2>
          <p>VITE_GOOGLE_CLIENT_ID no está definido</p>
          <p>Asegúrate de tener un archivo <strong>.env.local</strong> en la raíz del proyecto con:</p>
          <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
{`VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui
VITE_API_URL=http://localhost:8080`}
        </pre>
          <p>Después reinicia el servidor de React (npm start)</p>
        </div>
    );
  }

  return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="app-container">
          {user ? (
              <>
                <header className="app-header">
                  <div className="user-info">
                    <h1>💰 Money App</h1>

                    <div className="user-profile">
                  <span>
                    Hola, {user.name}
                  </span>

                      <button
                          onClick={handleLogout}
                          className="logout-btn"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </header>

                <main className="app-main">
                  <div className="expense-controls">
                    <button
                        className="btn-add"
                        onClick={() => {
                          setEditingExpense(null);
                          setShowForm(!showForm);
                        }}
                    >
                      {showForm ? '❌ Cancelar' : '➕ Agregar Gasto'}
                    </button>
                  </div>

                  {showForm && (
                      <ExpenseForm
                          user={user}
                          onExpenseCreated={handleExpenseCreated}
                          onCancel={() => {
                            setShowForm(false);
                            setEditingExpense(null);
                          }}
                          editExpense={editingExpense}
                      />
                  )}

                  <ExpenseList
                      user={user}
                      onEdit={setEditingExpense}
                  />
                </main>
              </>
          ) : (
              <div className="login-container">
                <h1>💰 Money App</h1>

                <p>
                  Gestiona tus gastos de manera fácil y rápida
                </p>

                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                        theme="filled_blue"
                        size="large"
                        text="signin_with"
                        shape="rectangular"
                    />
                )}
              </div>
          )}
        </div>
      </GoogleOAuthProvider>
  );
}

export default App;