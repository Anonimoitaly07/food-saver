import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

const Admin = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se l'utente è loggato e ha i permessi di admin
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    setCurrentUser(user);
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/users.php", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento degli utenti");
      }

      const data = await response.json();
      if (data.status) {
        setUsers(data.users);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Si è verificato un errore durante il caricamento degli utenti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-beige">
        <p className="text-dark-green">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-beige">
      <header className="bg-dark-green text-light-beige p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Amministratore</h1>
          <div className="flex items-center space-x-4">
            <span>Benvenuto, {currentUser?.username}</span>
            <Button onClick={handleLogout} variant="outline" className="bg-transparent border-light-beige text-light-beige hover:bg-sage hover:text-dark-green">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-dark-green mb-4">Gestione Utenti</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Ruolo</th>
                  <th className="py-2 px-4 text-left">Data Creazione</th>
                  <th className="py-2 px-4 text-left">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">{user.created_at}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                        >
                          Modifica
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => {
                            if (window.confirm(`Sei sicuro di voler eliminare l'utente ${user.username}?`)) {
                              // Implementare la logica di eliminazione
                              alert("Funzionalità di eliminazione da implementare");
                            }
                          }}
                        >
                          Elimina
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sezione per la gestione dei contenuti */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-dark-green mb-4">Gestione Contenuti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sage/20 p-4 rounded-lg">
              <h3 className="font-medium text-dark-green mb-2">Ricette</h3>
              <p className="text-neutral-gray mb-4">Gestisci le ricette del sito</p>
              <Button 
                className="w-full bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green"
                onClick={() => navigate('/admin/recipes')}
              >
                Gestisci Ricette
              </Button>
            </div>
            <div className="bg-sage/20 p-4 rounded-lg">
              <h3 className="font-medium text-dark-green mb-2">Articoli</h3>
              <p className="text-neutral-gray mb-4">Gestisci gli articoli del blog</p>
              <Button 
                className="w-full bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green"
                onClick={() => navigate('/admin/articles')}
              >
                Gestisci Articoli
              </Button>
            </div>
            <div className="bg-sage/20 p-4 rounded-lg">
              <h3 className="font-medium text-dark-green mb-2">Categorie</h3>
              <p className="text-neutral-gray mb-4">Gestisci le categorie di contenuti</p>
              <Button 
                className="w-full bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green"
                onClick={() => navigate('/admin/categories')}
              >
                Gestisci Categorie
              </Button>
            </div>
          </div>
        </div>

        {/* Sezione per le impostazioni del sito */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-dark-green mb-4">Impostazioni Sito</h2>
          <p className="text-neutral-gray mb-4">
            Gestisci le impostazioni generali del sito web.
          </p>
          <Button 
            className="bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green"
            onClick={() => navigate('/admin/settings')}
          >
            Modifica Impostazioni
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Admin;