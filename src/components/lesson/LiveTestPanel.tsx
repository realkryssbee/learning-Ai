import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, Zap, RotateCcw } from 'lucide-react';
import { streamPrompt } from '@/services/claudeService';
import { isApiKeyConfigured } from '@/lib/anthropic';

interface Props {
  defaultPrompt?: string;
  defaultSystemPrompt?: string;
  onOpenSettings: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function LiveTestPanel({ defaultPrompt = '', defaultSystemPrompt = '', onOpenSettings }: Props) {
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [userPrompt, setUserPrompt] = useState(defaultPrompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [showSystem, setShowSystem] = useState(Boolean(defaultSystemPrompt));
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userPrompt.trim() || streaming) return;
    if (!isApiKeyConfigured()) {
      setError('Clé API Claude non configurée. Configure-la dans les Paramètres.');
      return;
    }

    setError('');
    const userMsg = userPrompt.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    setStreaming(true);

    let accumulated = '';
    try {
      for await (const chunk of streamPrompt(userMsg, systemPrompt || undefined)) {
        if (chunk.type === 'text') {
          accumulated += chunk.content;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: accumulated };
            return next;
          });
        } else if (chunk.type === 'error') {
          setError(chunk.content);
          setMessages((prev) => prev.slice(0, -1));
        }
      }
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const reset = () => {
    setMessages([]);
    setError('');
    setUserPrompt(defaultPrompt);
    setSystemPrompt(defaultSystemPrompt);
  };

  const configured = isApiKeyConfigured();

  return (
    <div className="border border-bg-border rounded-xl overflow-hidden bg-bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-bg-border">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-accent" />
          <span className="text-text-primary text-sm font-semibold">Tester avec Claude</span>
          <span className="text-text-muted text-xs font-mono">claude-haiku-4-5</span>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button onClick={reset} className="text-text-muted hover:text-text-secondary transition-colors">
              <RotateCcw size={13} />
            </button>
          )}
          <button
            onClick={() => setShowSystem((s) => !s)}
            className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors"
          >
            {showSystem ? 'Masquer' : 'System prompt'}
          </button>
        </div>
      </div>

      {/* No API key warning */}
      {!configured && (
        <div className="px-4 py-3 bg-yellow-400/5 border-b border-yellow-400/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-warning flex-shrink-0" />
            <p className="text-warning text-xs">Clé API Claude requise pour tester en direct.</p>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-xs font-mono text-accent hover:text-accent-hover transition-colors flex-shrink-0"
          >
            Configurer →
          </button>
        </div>
      )}

      {/* System prompt */}
      {showSystem && (
        <div className="px-4 py-3 border-b border-bg-border bg-bg-secondary/50">
          <label className="block text-text-muted text-xs font-mono mb-1.5">System prompt (optionnel)</label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={3}
            placeholder="Ex: Tu es un expert en marketing digital. Réponds toujours en français."
            className="w-full bg-bg-primary border border-bg-border focus:border-accent/50 rounded-lg px-3 py-2 text-text-secondary text-xs font-mono leading-relaxed resize-none outline-none transition-colors placeholder:text-text-muted"
          />
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div
          ref={outputRef}
          className="max-h-64 overflow-y-auto px-4 py-3 space-y-3"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-5 h-5 rounded bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-accent/10 text-text-primary border border-accent/20'
                    : 'bg-bg-tertiary text-text-secondary border border-bg-border'
                }`}
              >
                {msg.content}
                {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                  <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 animate-pulse-soft align-text-bottom" />
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-5 h-5 rounded bg-bg-tertiary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-text-muted text-xs font-mono">T</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-4 py-2 bg-red-400/5 border-t border-red-400/20 flex items-center gap-2">
          <AlertCircle size={13} className="text-error flex-shrink-0" />
          <p className="text-error text-xs">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-bg-border bg-bg-secondary/30">
        <div className="flex gap-2">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={streaming || !configured}
            placeholder={configured ? "Écris ton prompt ici… (Ctrl+Entrée pour envoyer)" : "Configure ta clé API pour activer le test en direct"}
            className="flex-1 bg-bg-primary border border-bg-border focus:border-accent/50 rounded-lg px-3 py-2 text-text-primary text-sm leading-relaxed resize-none outline-none transition-colors placeholder:text-text-muted disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={streaming || !userPrompt.trim() || !configured}
            className="self-end bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors"
          >
            {streaming ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="text-text-muted text-xs font-mono mt-1.5">Ctrl+Entrée pour envoyer · Streaming en temps réel</p>
      </div>
    </div>
  );
}
