import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Resources } from './pages/Resources';
import { Editor } from './pages/Editor';
import { RepoDetail } from './pages/RepoDetail';

export default function App() {
  return (
    <AuthProvider>
      {/* Yeh core routes hain, protected routes ensure karte hain ki user logged in hai */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/repo/:id" element={<RepoDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/editor" element={<Editor />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
