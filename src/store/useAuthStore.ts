import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { SupabaseUser } from '@/lib/supabase';

interface AuthStore {
  user: SupabaseUser | null;
  loading: boolean;
  init: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  async init() {
    if (!isSupabaseConfigured) {
      // Guest mode: load a fake local user
      const storedName = localStorage.getItem('kryssbee_guest_name');
      if (storedName) {
        set({ user: { id: 'guest', email: storedName } as SupabaseUser, loading: false });
      } else {
        set({ loading: false });
      }
      return;
    }

    const { data } = await supabase.auth.getSession();
    set({ user: data.session?.user ?? null, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  async signUp(email, password, displayName) {
    if (!isSupabaseConfigured) {
      localStorage.setItem('kryssbee_guest_name', displayName || email);
      set({ user: { id: 'guest', email: displayName || email } as SupabaseUser });
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
  },

  async signIn(email, password) {
    if (!isSupabaseConfigured) {
      localStorage.setItem('kryssbee_guest_name', email);
      set({ user: { id: 'guest', email } as SupabaseUser });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  async signInWithGitHub() {
    if (!isSupabaseConfigured) throw new Error('Supabase non configuré');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  },

  async signOut() {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('kryssbee_guest_name');
      set({ user: null });
      return;
    }
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
