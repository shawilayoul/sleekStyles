import axios from "axios";
import { create } from "zustand";
const apiUrl = "https://sleekbackendexpress.onrender.com/api/auth";

const useAuthStore = create((set) => ({
  user: null,
  isloading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  signUp: async (username, email, password) => {
    set({ isloading: true, error: null });
    try {
      const response = await axios.post(`${apiUrl}/register`, {
        username,
        email,
        password,
      });
      set({ user: response.data.user, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "error signing up",
        isloading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    try {
      const response = await axios.post(`${apiUrl}/verifyEmail`, { code });
      set({ user: response.data.user, isloading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "error verifing the code",
        isloading: false,
      });
      throw error;
    }
  },

  signIn: async (email, password) => {
    set({ user: null, isloading: true });
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      set({ user: response.data.user, error: null, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "error signing in",
        isloading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ user: null, isloading: true });
    try {
      const response = await axios.post(`${apiUrl}/forgotPassword`, { email });
      set({ user: response.data.user, error: null, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "wrong email",
        isloading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ user: null, isloading: true });
    try {
      const response = await axios.post(`${apiUrl}/resetPasssword/${token}`, {
        password,
      });
      set({ user: response.data.user, error: null, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error resetting the password",
        isloading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/checkAuth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
