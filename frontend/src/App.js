import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupForm from './components/signup';
import AddNewNotePage from './pages/AddNewNotePage';
import NoteCardPage from './pages/NoteCardPage';
import EditCardPage from './pages/editCardPage';
import ShowAllNotesPages from './pages/ShowAllNotesPages';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route
            path="/add-new-note"
            element={
              <ProtectedRoute>
                <AddNewNotePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/note-card"
            element={
              <ProtectedRoute>
                <NoteCardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-notes"
            element={
              <ProtectedRoute>
                <ShowAllNotesPages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-note/:id"
            element={
              <ProtectedRoute>
                <EditCardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/note-detials/:id"
            element={
              <ProtectedRoute>
                <NoteCardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

