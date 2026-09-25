import React from 'react';
import { 
  X, 
  CheckCircle2, 
  BookOpen, 
  RotateCcw, 
  Calendar, 
  Flag, 
  FileText, 
  Youtube, 
  ExternalLink,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Chapter, Subtopic, SubtopicUserState } from '../data/syllabus';

interface SubtopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter | null;
  subtopic: Subtopic | null;
  data: SubtopicUserState;
  onUpdate: (updated: Partial<SubtopicUserState>) => void;
}

export const SubtopicModal: React.FC<SubtopicModalProps> = ({
  isOpen,
  onClose,
  chapter,
  subtopic,
  data,
  onUpdate,
}) => {
  if (!isOpen || !chapter || !subtopic) return null;

  const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  const revCount = [data.rev1, data.rev2, data.rev3, data.rev4].filter(Boolean).length;
  const isFullyMastered = data.notesDone && data.pyqSolved >= data.pyqTarget && data.rev4;

  const handleRevChange = (revKey: 'rev1' | 'rev2' | 'rev3' | 'rev4', dateKey: 'rev1Date' | 'rev2Date' | 'rev3Date' | 'rev4Date') => {
    const nextVal = !data[revKey];
    const updates: Partial<SubtopicUserState> = {
      [revKey]: nextVal,
      [dateKey]: nextVal ? (data[dateKey] || nowStr) : '',
    };

    // If completing the 4th revision or achieving 100%
    if (nextVal && revKey === 'rev4') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    onUpdate(updates);
  };

  const topicQuery = encodeURIComponent(`CSIR NET Chemical Sciences ${subtopic.title}`);
  const youtubeUrl = `https://www.youtube.com/results?search_query=${topicQuery}`;
  const redditUrl = `https://www.reddit.com/r/IndianAcademia/search/?q=${topicQuery}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-6 text-slate-100 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                {chapter.subjectName}
              </span>
              <span className="text-xs text-slate-400 font-medium truncate max-w-xs">
                {chapter.title}
              </span>
              {subtopic.highYield && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                  ★ High Yield ({subtopic.marksWeight || '4M'})
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white pt-1">{subtopic.title}</h3>
            <p className="text-xs text-slate-300">{subtopic.desc}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mastered Badge Banner */}
        {isFullyMastered && (
          <div className="p-3 bg-gradient-to-r from-emerald-950/80 via-teal-950/60 to-slate-900 border border-emerald-700/50 rounded-xl flex items-center gap-3 text-emerald-300">
            <Award className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold">100% Topic Mastered!</div>
              <div className="text-[11px] text-emerald-400/80">Notes studied, target PYQs solved, and all 4 revisions finished.</div>
            </div>
          </div>
        )}

        {/* Core Checklist */}
        <div className="space-y-3.5">
          {/* 1. Study Notes Toggle */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Study Notes & Theory</div>
                <div className="text-[11px] text-slate-400">Class notes, Clayden / Huheey / Atkins reading done</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.notesDone}
                onChange={(e) => onUpdate({ notesDone: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>

          {/* 2. PYQ Counter */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Previous Year Questions (PYQs)</div>
                <div className="text-[11px] text-slate-400">Solved CSIR NET & GATE past papers</div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onUpdate({ pyqSolved: Math.max(0, data.pyqSolved - 5) })}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  -5
                </button>
                <input
                  type="number"
                  min="0"
                  value={data.pyqSolved}
                  onChange={(e) => onUpdate({ pyqSolved: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-16 bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1.5 text-center font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => onUpdate({ pyqSolved: data.pyqSolved + 5 })}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
                >
                  +5
                </button>
              </div>

              <span className="text-xs text-slate-400 font-semibold">/</span>

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  value={data.pyqTarget}
                  onChange={(e) => onUpdate({ pyqTarget: Math.max(1, parseInt(e.target.value) || 25) })}
                  className="w-14 bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1.5 text-center font-bold text-slate-300 focus:outline-none"
                  title="Target PYQ questions count"
                />
                <span className="text-[11px] text-slate-400">Goal</span>
              </div>
            </div>
          </div>

          {/* 3. 4-Stage Revision Matrix */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <RotateCcw className="w-4 h-4 text-purple-400" />
                <span>4-Stage Revision Tracker (Spaced Repetition)</span>
              </div>
              <span className="text-xs font-extrabold text-purple-300">
                {revCount} / 4 Finished
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Rev 1 */}
              <div
                onClick={() => handleRevChange('rev1', 'rev1Date')}
                className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  data.rev1 ? 'bg-purple-950/40 border-purple-800/80 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${data.rev1 ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-600'}`}>
                    {data.rev1 && '✓'}
                  </div>
                  <span className="text-xs font-semibold">Round 1: Concept Lock</span>
                </div>
                <span className="text-[10px] text-slate-400">{data.rev1Date}</span>
              </div>

              {/* Rev 2 */}
              <div
                onClick={() => handleRevChange('rev2', 'rev2Date')}
                className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  data.rev2 ? 'bg-purple-950/40 border-purple-800/80 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${data.rev2 ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-600'}`}>
                    {data.rev2 && '✓'}
                  </div>
                  <span className="text-xs font-semibold">Round 2: Problem Solving</span>
                </div>
                <span className="text-[10px] text-slate-400">{data.rev2Date}</span>
              </div>

              {/* Rev 3 */}
              <div
                onClick={() => handleRevChange('rev3', 'rev3Date')}
                className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  data.rev3 ? 'bg-purple-950/40 border-purple-800/80 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${data.rev3 ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-600'}`}>
                    {data.rev3 && '✓'}
                  </div>
                  <span className="text-xs font-semibold">Round 3: Short Notes</span>
                </div>
                <span className="text-[10px] text-slate-400">{data.rev3Date}</span>
              </div>

              {/* Rev 4 */}
              <div
                onClick={() => handleRevChange('rev4', 'rev4Date')}
                className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  data.rev4 ? 'bg-purple-950/40 border-purple-800/80 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${data.rev4 ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-600'}`}>
                    {data.rev4 && '✓'}
                  </div>
                  <span className="text-xs font-semibold">Round 4: Exam Ready</span>
                </div>
                <span className="text-[10px] text-slate-400">{data.rev4Date}</span>
              </div>
            </div>
          </div>

          {/* 4. Target Deadline & Backlog Flag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Target Completion Date
              </label>
              <input
                type="date"
                value={data.deadline || ''}
                onChange={(e) => onUpdate({ deadline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5">
              <label className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-rose-500" /> Backlog Status
              </label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.isBacklog}
                    onChange={(e) => onUpdate({ isBacklog: e.target.checked })}
                    className="rounded border-slate-700 text-rose-600 bg-slate-900"
                  />
                  <span className="text-xs text-rose-200 font-medium">Flag Backlog</span>
                </label>

                <select
                  value={data.backlogPriority}
                  onChange={(e) => onUpdate({ backlogPriority: e.target.value as 'High' | 'Medium' | 'Low' })}
                  className="ml-auto bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Personal Notes & Formulas */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" /> Personal Notes & Key Formulas
            </label>
            <textarea
              rows={3}
              value={data.personalNotes}
              onChange={(e) => onUpdate({ personalNotes: e.target.value })}
              placeholder="e.g., Clayden p. 412, Cope rearrangement suprafacial stereospecificity, tricky PYQ 2023 Dec..."
              className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-y"
            />
          </div>

          {/* 6. Curated Quick Action Search Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-800/60">
            <span className="text-[11px] text-slate-400">Search Lectures & Community Discussions:</span>
            <div className="flex items-center gap-2">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                <span>YouTube Lectures</span>
                <ExternalLink className="w-3 h-3 text-red-400" />
              </a>

              <a
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-orange-950/80 hover:bg-orange-900 border border-orange-800/80 text-orange-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>Reddit Guides</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-cyan-600/20"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
