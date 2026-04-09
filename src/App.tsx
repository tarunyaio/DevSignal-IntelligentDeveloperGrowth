import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Resources } from './pages/Resources';
import { Editor } from './pages/Editor';
import { RepoDetail } from './pages/RepoDetail';
import { NotFound } from './pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/repo/:id" element={<RepoDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/editor" element={<Editor />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </ErrorBoundary>
  );
}
