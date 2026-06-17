import { ALL_MODULES } from '@/data/modules';
import { useProgressStore } from '@/store/useProgressStore';

function getSquareColor(status: 'locked' | 'empty' | 'partial' | 'done', moduleColor: string): string {
  switch (status) {
    case 'locked': return '#1C2028';
    case 'empty': return '#2A2F3A';
    case 'partial': return `${moduleColor}70`;
    case 'done': return moduleColor;
  }
}

export function CommitGraph() {
  const { getLessonStatus } = useProgressStore();

  return (
    <div className="bg-bg-secondary border border-bg-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text-primary font-semibold text-sm">Progression — vue commit graph</h2>
        <div className="flex items-center gap-3 text-text-muted text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-bg-border inline-block" />
            vide
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-accent/40 inline-block" />
            partiel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
            validé
          </span>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {ALL_MODULES.map((module) => {
          return (
            <div key={module.id} className="flex flex-col gap-1">
              <p
                className="text-xs font-mono truncate max-w-[80px]"
                style={{ color: module.color + 'AA' }}
                title={module.title}
              >
                M{module.order}
              </p>
              <div className="flex flex-col gap-1">
                {module.lessons.map((lesson) => {
                  const status = getLessonStatus(module.id, lesson.id);
                  const squareStatus =
                    status === 'locked' ? 'locked' :
                    status === 'completed' ? 'done' :
                    status === 'available' ? 'empty' : 'partial';

                  return (
                    <div
                      key={lesson.id}
                      className="w-5 h-5 rounded-sm transition-all duration-300 cursor-default"
                      style={{ backgroundColor: getSquareColor(squareStatus, module.color) }}
                      title={`${module.title} — ${lesson.title} (${status})`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-text-muted text-xs font-mono mt-4">
        {ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)} leçons au total · survol pour détails
      </p>
    </div>
  );
}
