import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  BookOpen, 
  Check, 
  FileEdit, 
  RotateCw, 
  Sliders, 
  Flag 
} from 'lucide-react';
import { Chapter, UserState } from '../data/syllabus';

interface ChapterCardProps {
  chapter: Chapter;
  userState: UserState;
  onOpenModal: (subtopicId: string, chapterId: string) => void;
  onQuickToggleNotes: (subtopicId: string) => void;
  isExpandedInitial?: boolean;
  isHighlighted?: boolean;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  userState,
  onOpenModal,
  onQuickToggleNotes,
  isExpandedInitial = false,
  isHighlighted = false,
}) => {
  const [isOpen, setIsOpen] = useState(isExpandedInitial || isHighlighted);

  useEffect(() => {
    if (isHighlighted) {
      setIsOpen(true);
    } else {
      setIsOpen(isExpandedInitial);
    }
  }, [isExpandedInitial, isHighlighted]);

  const totalSubtopics = chapter.subtopics.length;
  let notesCount = 0;
  let pyqsSolved = 0;
  let pyqsTarget = 0;
  let rev4Count = 0;
  let backlogsCount = 0;

  chapter.subtopics.forEach((sub) => {
    const d = userState.subtopics[sub.id];
    if (d) {
      if (d.notesDone) notesCount++;
      pyqsSolved += d.pyqSolved || 0;
      pyqsTarget += d.pyqTarget || 25;
      if (d.rev4) rev4Count++;
      if (d.isBacklog) backlogsCount++;
    } else {
      pyqsTarget += 25;
    }
  });

  const progressPercent = Math.round(
    (notesCount / totalSubtopics) * 40 +
      Math.min(1, pyqsSolved / (pyqsTarget || 1)) * 30 +
      (rev4Count / totalSubtopics) * 30
  );

  // Badge styling matching screenshot
  let badgeStyle = 'bg-amber-950/80 text-amber-400 border border-amber-800/40';
  let badgeText = 'PHYSICAL CHEMISTRY';

  if (chapter.subject === 'inorganic') {
    badgeStyle = 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/40';
    badgeText = 'INORGANIC CHEMISTRY';
  } else if (chapter.subject === 'physical') {
    badgeStyle = 'bg-amber-950/80 text-amber-300 border border-amber-800/40';
    badgeText = 'PHYSICAL CHEMISTRY';
  } else if (chapter.subject === 'organic') {
    badgeStyle = 'bg-purple-950/80 text-purple-300 border border-purple-800/40';
    badgeText = 'ORGANIC CHEMISTRY';
  } else if (chapter.subject === 'interdisciplinary') {
    badgeStyle = 'bg-pink-950/80 text-pink-300 border border-pink-800/40';
    badgeText = 'INTERDISCIPLINARY';
  }

  return (
    <div 
      id={`chapter-${chapter.chapterId}`}
      className={`glass-panel rounded-2xl border ${
        isHighlighted 
          ? 'border-cyan-500 shadow-cyan-500/20 ring-2 ring-cyan-500/40' 
          : 'border-slate-800/90'
      } overflow-hidden shadow-xl transition-all duration-300 scroll-mt-24`}
    >
      {/* Chapter Accordion Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition select-none"
      >
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase inline-block ${badgeStyle}`}>
              {badgeText}
            </span>
            {backlogsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 border border-rose-800 text-rose-300 flex items-center gap-1">
                <Flag className="w-3 h-3 text-rose-400" />
                {backlogsCount} Backlog
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white leading-snug">
            {chapter.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
            {chapter.description}
          </p>
        </div>

        {/* Progress & Expand/Collapse */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-800/60 pt-2 sm:pt-0 shrink-0">
          <div className="text-right">
            <div className="text-xs font-bold text-cyan-400">{progressPercent}%</div>
            <div className="text-[11px] text-slate-400 whitespace-nowrap">
              {notesCount}/{totalSubtopics} Notes | {pyqsSolved} PYQs
            </div>
          </div>

          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
            <div
              className="bg-cyan-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-slate-400">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Subtopics List */}
      {isOpen && (
        <div className="border-t border-slate-800/60 bg-slate-950/60 p-3 sm:p-4 space-y-2.5 animate-in fade-in">
          {chapter.subtopics.map((sub) => {
            const d = userState.subtopics[sub.id] || {
              notesDone: false,
              pyqSolved: 0,
              pyqTarget: 25,
              rev1: false,
              rev2: false,
              rev3: false,
              rev4: false,
              isBacklog: false,
              backlogPriority: 'Medium',
            };

            const revDoneCount = [d.rev1, d.rev2, d.rev3, d.rev4].filter(Boolean).length;

            return (
              <div
                key={sub.id}
                className="glass-card p-3 sm:p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div
                  className="space-y-0.5 flex-1 cursor-pointer"
                  onClick={() => onOpenModal(sub.id, chapter.chapterId)}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-200 hover:text-cyan-300 transition">
                      {sub.title}
                    </span>
                    {sub.highYield && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-[9px] font-bold">
                        ★ {sub.marksWeight || '4M'}
                      </span>
                    )}
                    {d.isBacklog && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-950 border border-rose-800 text-rose-300 text-[9px] font-bold">
                        BACKLOG ({d.backlogPriority || 'Medium'})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{sub.desc}</p>
                </div>

                {/* Subtopic Action Controls */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-800/40 pt-2 sm:pt-0 shrink-0">
                  {/* Notes Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickToggleNotes(sub.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                      d.notesDone
                        ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {d.notesDone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>Notes</span>
                  </button>

                  {/* PYQ Counter Pill */}
                  <button
                    onClick={() => onOpenModal(sub.id, chapter.chapterId)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 transition flex items-center gap-1.5"
                  >
                    <FileEdit className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-300">PYQ:</span>
                    <span className="text-emerald-400 font-bold">{d.pyqSolved}</span>
                    <span className="text-slate-400">/{d.pyqTarget || 25}</span>
                  </button>

                  {/* Revision Pill */}
                  <button
                    onClick={() => onOpenModal(sub.id, chapter.chapterId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
                      revDoneCount === 4
                        ? 'bg-purple-950/80 border-purple-800 text-purple-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-slate-300">Rev:</span>
                    <span className="text-slate-200 font-bold">{revDoneCount}/4</span>
                  </button>

                  {/* Sliders / Full Details Modal Button */}
                  <button
                    onClick={() => onOpenModal(sub.id, chapter.chapterId)}
                    title="Open Full Checklist"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
