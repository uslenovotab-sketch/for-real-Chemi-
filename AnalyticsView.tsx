import React from 'react';
import { BarChart3, RotateCcw, Award, CheckCircle, Target } from 'lucide-react';
import { Chapter, UserState } from '../data/syllabus';

interface AnalyticsViewProps {
  syllabus: Chapter[];
  userState: UserState;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ syllabus, userState }) => {
  const subjects = [
    { key: 'inorganic', name: 'Inorganic Chemistry', color: 'cyan', border: 'border-cyan-800/40', barBg: 'bg-cyan-500', text: 'text-cyan-300' },
    { key: 'physical', name: 'Physical Chemistry', color: 'amber', border: 'border-amber-800/40', barBg: 'bg-amber-500', text: 'text-amber-300' },
    { key: 'organic', name: 'Organic Chemistry', color: 'purple', border: 'border-purple-800/40', barBg: 'bg-purple-500', text: 'text-purple-300' },
    { key: 'interdisciplinary', name: 'Interdisciplinary Topics', color: 'pink', border: 'border-pink-800/40', barBg: 'bg-pink-500', text: 'text-pink-300' },
  ] as const;

  // Calculate subject-wise completion
  const subjectStats = subjects.map(s => {
    const chapters = syllabus.filter(ch => ch.subject === s.key);
    let totalSubtopics = 0;
    let completedSubtopics = 0;
    let notesCompleted = 0;
    let pyqTotalSolved = 0;

    chapters.forEach(ch => {
      ch.subtopics.forEach(sub => {
        totalSubtopics++;
        const d = userState.subtopics[sub.id];
        if (d) {
          if (d.notesDone) notesCompleted++;
          pyqTotalSolved += d.pyqSolved || 0;
          if (d.notesDone && d.rev4) completedSubtopics++;
        }
      });
    });

    const percent = totalSubtopics ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;
    return {
      ...s,
      chaptersCount: chapters.length,
      totalSubtopics,
      completedSubtopics,
      notesCompleted,
      pyqTotalSolved,
      percent,
    };
  });

  // Calculate 4 revision round totals
  let r1Count = 0;
  let r2Count = 0;
  let r3Count = 0;
  let r4Count = 0;
  let totalSubtopicsAll = 0;
  let totalPyqsSolvedAll = 0;
  let totalPyqTargetAll = 0;

  syllabus.forEach(ch => {
    ch.subtopics.forEach(sub => {
      totalSubtopicsAll++;
      const d = userState.subtopics[sub.id];
      if (d) {
        if (d.rev1) r1Count++;
        if (d.rev2) r2Count++;
        if (d.rev3) r3Count++;
        if (d.rev4) r4Count++;
        totalPyqsSolvedAll += d.pyqSolved || 0;
        totalPyqTargetAll += d.pyqTarget || 25;
      } else {
        totalPyqTargetAll += 25;
      }
    });
  });

  const pyqPercent = totalPyqTargetAll ? Math.min(100, Math.round((totalPyqsSolvedAll / totalPyqTargetAll) * 100)) : 0;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Subject Completion Grid */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-emerald-400">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white text-base">Subject-Wise Syllabus Completion Matrix</h3>
            <p className="text-xs text-slate-400 font-normal">Track mastery across all 4 key sections of CSIR-UGC NET Chemical Sciences:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {subjectStats.map(sub => (
            <div key={sub.key} className={`p-4 rounded-xl bg-slate-950/80 border ${sub.border} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${sub.text}`}>{sub.name}</span>
                <span className={`text-xs font-extrabold ${sub.text}`}>{sub.percent}% Mastered</span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className={`${sub.barBg} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${sub.percent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                <div>Chapters: <span className="font-bold text-slate-200">{sub.chaptersCount}</span></div>
                <div>Subtopics: <span className="font-bold text-slate-200">{sub.totalSubtopics}</span></div>
                <div>Notes Done: <span className="font-bold text-slate-200">{sub.notesCompleted} / {sub.totalSubtopics}</span></div>
                <div>PYQs Solved: <span className="font-bold text-emerald-400">{sub.pyqTotalSolved}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spaced Repetition 4x Funnel */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-purple-400">
          <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-400">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white text-base">Spaced Repetition Revision Funnel (4 Rounds)</h3>
            <p className="text-xs text-slate-400 font-normal">
              Retention curve science: Reviewing 4 times solidifies reaction mechanisms and quantum equations for Part C:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {/* Round 1 */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-1">
            <span className="text-xs font-bold text-cyan-400">Revision 1</span>
            <div className="text-[10px] text-slate-400">Concept Lock</div>
            <div className="text-2xl font-black text-white pt-1">{r1Count}</div>
            <div className="text-[10px] text-slate-500">/ {totalSubtopicsAll} subtopics</div>
          </div>

          {/* Round 2 */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-1">
            <span className="text-xs font-bold text-indigo-400">Revision 2</span>
            <div className="text-[10px] text-slate-400">Problem Solving</div>
            <div className="text-2xl font-black text-white pt-1">{r2Count}</div>
            <div className="text-[10px] text-slate-500">/ {totalSubtopicsAll} subtopics</div>
          </div>

          {/* Round 3 */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-1">
            <span className="text-xs font-bold text-purple-400">Revision 3</span>
            <div className="text-[10px] text-slate-400">Short Notes & Formulas</div>
            <div className="text-2xl font-black text-white pt-1">{r3Count}</div>
            <div className="text-[10px] text-slate-500">/ {totalSubtopicsAll} subtopics</div>
          </div>

          {/* Round 4 */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-1">
            <span className="text-xs font-bold text-emerald-400">Revision 4</span>
            <div className="text-[10px] text-slate-400">Mock Test Ready</div>
            <div className="text-2xl font-black text-emerald-400 pt-1">{r4Count}</div>
            <div className="text-[10px] text-slate-500">/ {totalSubtopicsAll} subtopics</div>
          </div>
        </div>
      </div>

      {/* Global PYQ Target Metric */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Global Previous Year Questions (PYQs) Milestone</div>
            <div className="text-[11px] text-slate-400">
              {totalPyqsSolvedAll} questions solved out of {totalPyqTargetAll} targeted questions
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pyqPercent}%` }} />
          </div>
          <span className="text-xs font-bold text-emerald-400">{pyqPercent}%</span>
        </div>
      </div>
    </div>
  );
};
