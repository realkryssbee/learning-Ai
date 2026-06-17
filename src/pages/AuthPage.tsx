import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { isSupabaseConfigured } from '@/lib/supabase';

type Mode = 'login' | 'signup';

export function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGitHub } = useAuthStore();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate('/');
      } else {
        await signUp(email, password, displayName);
        if (isSupabaseConfigured) {
          setSuccess("Compte créé ! Vérifie ton email pour confirmer ton inscription.");
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    setError('');
    try {
      await signInWithGitHub();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur GitHub OAuth');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
            <span className="font-mono font-bold text-white text-xl">K</span>
          </div>
          <h1 className="text-text-primary font-bold text-2xl">kryssbee Learning</h1>
          <p className="text-text-secondary text-sm mt-1">
            {mode === 'login' ? 'Connecte-toi pour continuer ta progression' : 'Crée ton compte gratuit'}
          </p>
          {!isSupabaseConfigured && (
            <div className="mt-3 px-3 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-warning text-xs font-mono">Mode local — Supabase non configuré</p>
            </div>
          )}
        </div>

        {/* GitHub OAuth */}
        {isSupabaseConfigured && (
          <>
            <button
              onClick={handleGitHub}
              className="w-full flex items-center justify-center gap-3 bg-bg-secondary hover:bg-bg-tertiary border border-bg-border text-text-primary font-semibold text-sm py-2.5 rounded-lg transition-colors mb-4"
            >
              <Github size={16} />
              Continuer avec GitHub
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-bg-border" />
              <span className="text-text-muted text-xs font-mono">ou</span>
              <div className="flex-1 h-px bg-bg-border" />
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-text-muted text-xs font-mono mb-1.5">Prénom / pseudo</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="Kryssbee"
                className="w-full bg-bg-secondary border border-bg-border focus:border-accent/50 rounded-lg px-3 py-2.5 text-text-primary text-sm outline-none transition-colors placeholder:text-text-muted"
              />
            </div>
          )}

          <div>
            <label className="block text-text-muted text-xs font-mono mb-1.5">
              {isSupabaseConfigured ? 'Email' : 'Email ou pseudo'}
            </label>
            <input
              type={isSupabaseConfigured ? 'email' : 'text'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="toi@exemple.com"
              className="w-full bg-bg-secondary border border-bg-border focus:border-accent/50 rounded-lg px-3 py-2.5 text-text-primary text-sm outline-none transition-colors placeholder:text-text-muted"
            />
          </div>

          {isSupabaseConfigured && (
            <div>
              <label className="block text-text-muted text-xs font-mono mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full bg-bg-secondary border border-bg-border focus:border-accent/50 rounded-lg px-3 py-2.5 pr-10 text-text-primary text-sm outline-none transition-colors placeholder:text-text-muted"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-text-muted text-xs mt-1">Minimum 8 caractères</p>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-400/5 border border-red-400/20 rounded-lg">
              <AlertCircle size={13} className="text-error flex-shrink-0 mt-0.5" />
              <p className="text-error text-xs">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-400/5 border border-green-400/20 rounded-lg">
              <p className="text-success text-xs">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {mode === 'login'
              ? (isSupabaseConfigured ? 'Se connecter' : 'Entrer')
              : 'Créer mon compte'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-text-secondary text-sm mt-5">
          {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
          {' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
            className="text-accent hover:text-accent-hover font-medium transition-colors"
          >
            {mode === 'login' ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
}
