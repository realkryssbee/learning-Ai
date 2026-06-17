import { useState, useEffect } from 'react';
import { X, Key, Save, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink, RotateCcw, Trash2, Presentation } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '@/lib/anthropic';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useProgressStore } from '@/store/useProgressStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const { resetProgress, isDemoMode, setDemoMode } = useProgressStore();

  useEffect(() => {
    if (open) {
      setApiKey(getStoredApiKey());
      setSaved(false);
      setConfirmReset(false);
    }
  }, [open]);

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetProgress();
    setConfirmReset(false);
    onClose();
  };

  const handleSave = () => {
    setStoredApiKey(apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-bg-secondary border border-bg-border rounded-2xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-bg-border">
          <h2 className="text-text-primary font-semibold">Paramètres</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Claude API Key */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Key size={15} className="text-accent" />
              <h3 className="text-text-primary font-medium text-sm">Clé API Claude (Anthropic)</h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">
              Requise pour tester tes prompts en direct et obtenir des évaluations IA dans les exercices.
              Ta clé est stockée localement dans ton navigateur, jamais envoyée à nos serveurs.
            </p>

            <div className="relative mb-2">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full bg-bg-primary border border-bg-border focus:border-accent/50 rounded-lg px-3 py-2.5 pr-10 text-text-primary text-sm font-mono outline-none transition-colors placeholder:text-text-muted"
              />
              <button
                type="button"
                onClick={() => setShowKey((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
              >
                Obtenir une clé sur console.anthropic.com
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                {saved ? <CheckCircle size={13} /> : <Save size={13} />}
                {saved ? 'Sauvegardé !' : 'Sauvegarder'}
              </button>
              {apiKey && (
                <button
                  onClick={handleClear}
                  className="text-xs font-mono text-text-muted hover:text-error transition-colors px-3 py-2"
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>

          {/* Supabase status */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isSupabaseConfigured ? (
                <CheckCircle size={14} className="text-success" />
              ) : (
                <AlertCircle size={14} className="text-warning" />
              )}
              <h3 className="text-text-primary font-medium text-sm">Supabase</h3>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                isSupabaseConfigured
                  ? 'bg-green-400/10 text-success'
                  : 'bg-yellow-400/10 text-warning'
              }`}>
                {isSupabaseConfigured ? 'Configuré' : 'Non configuré'}
              </span>
            </div>
            {!isSupabaseConfigured && (
              <p className="text-text-secondary text-xs leading-relaxed">
                Sans Supabase, ta progression est sauvegardée localement dans le navigateur.
                Pour synchroniser entre appareils et activer l'auth, ajoute tes clés dans le fichier{' '}
                <code className="font-mono text-accent bg-accent-muted px-1 rounded">.env.local</code>.
              </p>
            )}
            {isSupabaseConfigured && (
              <p className="text-text-secondary text-xs">
                Progression synchronisée avec Supabase. ✓
              </p>
            )}
          </div>

          {/* Demo mode */}
          <div className="border-t border-bg-border pt-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Presentation size={14} className="text-accent" />
                <h3 className="text-text-primary font-medium text-sm">Mode démo</h3>
                {isDemoMode && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    Actif
                  </span>
                )}
              </div>
              <button
                onClick={() => setDemoMode(!isDemoMode)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  isDemoMode ? 'bg-accent' : 'bg-bg-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isDemoMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              Débloque tous les modules et toutes les leçons sans condition. Utile pour présenter la plateforme ou explorer le contenu librement.
            </p>
          </div>

          {/* Reset progression */}
          <div className="border-t border-bg-border pt-5">
            <div className="flex items-center gap-2 mb-2">
              <RotateCcw size={14} className="text-error" />
              <h3 className="text-text-primary font-medium text-sm">Réinitialiser la progression</h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">
              Efface toutes tes données de progression, badges et scores. Cette action est irréversible.
            </p>
            {confirmReset ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-error/10 hover:bg-error/20 text-error border border-error/30 font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                  Confirmer la réinitialisation
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors px-3 py-2"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-text-secondary hover:text-error border border-bg-border hover:border-error/30 text-xs px-4 py-2 rounded-lg transition-colors"
              >
                <RotateCcw size={13} />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-bg-tertiary border border-bg-border rounded-lg">
            <AlertCircle size={13} className="text-text-muted flex-shrink-0 mt-0.5" />
            <p className="text-text-muted text-xs leading-relaxed">
              La clé API Claude est utilisée directement depuis le navigateur (usage personnel uniquement). Ne partage pas cette app publiquement avec ta clé configurée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
