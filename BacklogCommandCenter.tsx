import React from 'react';
import { Flame, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { Chapter, Subtopic, UserState } from '../data/syllabus';

interface BacklogCommandCenterProps {
  syllabus: Chapter[];
  userState: UserState;
  onOpenModal: (subtopicId: string, chapterId: string) => void;
}

export const BacklogCommandCenter: React.FC<BacklogCommandCenterProps> = ({
  syllabus,
  userState,
  onOpenModal,
}) => {
  interface BacklogItem {
    chapter: Chapter;
    subtopic: Subtopic;
    priority: 'High' | 'Medium' | 'Low';
    notes: string;
    deadline?: string;
  }

  const backlogList: BacklogItem[] = [];

  syllabus.forEach(ch => {
    ch.subtopics.forEach(sub => {
      const d = userState.subtopics[sub.id];
      if (d && d.isBacklog) {
        backlogList.push({
          chapter: ch,
          subtopic: sub,
          priority: d.backlogPriority || 'Medium',
          notes: d.personalNotes,
          deadline: d.deadline,
        });
      }
    });
  });

  // Sort by High > Medium > Low
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  backlogList.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/50 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-200">Backlog Recovery Radar</h3>
              <p className="text-xs text-rose-300/80">
                Subtopics needing urgent recovery, review, or missed study targets
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-extrabold text-xs">
            {backlogList.length} Topics Pending
          </span>
        </div>

        {backlogList.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-200">No Active Backlogs!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You have no pending backlog topics flagged. Keep up the solid momentum!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 pt-1">
            {backlogList.map((item) => {
              const priorityBadge = 
                item.priority === 'High' 
                  ? 'bg-rose-950 text-rose-300 border-rose-800'
                  : item.priority === 'Medium'
                  ? 'bg-amber-950 text-amber-300 border-amber-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700';

              return (
                <div
                  key={item.subtopic.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${priorityBadge}`}>
                        {item.priority} Priority
                      </span>
                      <span className="text-xs font-bold text-white hover:text-cyan-300 transition">
                        {item.subtopic.title}
                      </span>
                      {item.deadline && (
                        <span className="text-[10px] text-amber-400/90 font-medium">
                          Due: {item.deadline}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {item.chapter.title} • {item.chapter.subjectName}
                    </p>
                    {item.notes && (
                      <p className="text-[11px] text-amber-300/90 italic flex items-center gap-1.5 pt-0.5">
                        <FileText className="w-3 h-3 shrink-0" />
                        "{item.notes}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenModal(item.subtopic.id, item.chapter.chapterId)}
                    className="self-end sm:self-auto px-3.5 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                  >
                    <span>Resolve / Update</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
