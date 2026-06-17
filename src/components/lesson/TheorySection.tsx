import ReactMarkdown from 'react-markdown';
import type { Lesson } from '@/types';

interface Props {
  lesson: Lesson;
  onNext: () => void;
}

export function TheorySection({ lesson, onNext }: Props) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-text-muted text-xs font-mono mb-1">Section 1/3 — Théorie</p>
          <h2 className="text-text-primary font-semibold text-lg">{lesson.title}</h2>
        </div>
        <span className="text-text-muted text-xs font-mono bg-bg-tertiary px-2 py-1 rounded">
          ~{lesson.estimatedMinutes} min
        </span>
      </div>

      <div className="prose-custom bg-bg-secondary border border-bg-border rounded-xl p-6 mb-6">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-text-primary font-bold text-xl mb-4 pb-2 border-b border-bg-border">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-text-primary font-semibold text-base mt-6 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-text-primary font-medium text-sm mt-4 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-text-secondary text-sm leading-relaxed mb-3">{children}</p>
            ),
            code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) =>
              inline ? (
                <code
                  className="font-mono text-accent bg-accent-muted px-1.5 py-0.5 rounded text-xs"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code
                  className="block font-mono text-text-primary bg-bg-primary border border-bg-border rounded-lg p-4 text-xs leading-relaxed overflow-x-auto"
                  {...props}
                >
                  {children}
                </code>
              ),
            pre: ({ children }) => <div className="my-3">{children}</div>,
            ul: ({ children }) => (
              <ul className="list-none space-y-1.5 mb-3 pl-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1.5 mb-3 text-text-secondary text-sm">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-text-secondary text-sm flex gap-2">
                <span className="text-accent mt-1 flex-shrink-0">›</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="text-text-primary font-semibold">{children}</strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-accent pl-4 my-3 text-text-secondary text-sm italic">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="text-left text-text-muted text-xs font-mono uppercase tracking-wider px-3 py-2 border-b border-bg-border">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="text-text-secondary text-sm px-3 py-2 border-b border-bg-border/50">
                {children}
              </td>
            ),
            hr: () => <hr className="border-bg-border my-6" />,
          }}
        >
          {lesson.theory}
        </ReactMarkdown>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
        >
          Passer au QCM →
        </button>
      </div>
    </div>
  );
}
