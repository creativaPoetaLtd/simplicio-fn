// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Churches from './pages/dashboard/Churches';
import Roles from './pages/dashboard/Roles';
import { isAuthenticated, isAdmin, isManager } from './utils/ProtectedRoute';
import Church from './pages/dashboard/Church';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';
import ChurchHomePage from './pages/ChurchHomePage';
import Settings from './pages/dashboard/Settings';
import SuccessPage from './pages/SuccessPage';
import Transaction from './pages/dashboard/Transaction';
import ChurchTransaction from './pages/dashboard/ChurchTransaction';
import Message from './pages/Message';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/church/:id" element={<ChurchHomePage />} />
        <Route path="/" element={<App />} />
        <Route path='/message' element={<Message />} />
        <Route path="/login" element={<Login />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="transaction" element={
            isAdmin() ? <Transaction /> : <ChurchTransaction />} />
          <Route path="churches" element={<Churches />} />
          <Route path="settings" element={<Settings />} />
          <Route
            path="roles"
            element={isAdmin() ? <Roles /> : <Navigate to="/login" />}
          />
          <Route
            path="church"
            element={isManager() ? <Church /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>

    <Toaster position="top-center"
      reverseOrder={false} />
  </React.StrictMode>,
  document.getElementById('root')
);