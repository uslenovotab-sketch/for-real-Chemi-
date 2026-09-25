import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FlaskConical, 
  Search, 
  Download, 
  Upload, 
  RotateCw, 
  Layers, 
  Atom, 
  Activity, 
  Dna, 
  CheckCircle2, 
  AlertTriangle, 
  Youtube, 
  TrendingUp, 
  Trophy, 
  Calendar, 
  Smartphone, 
  ChevronsDown, 
  ChevronsUp, 
  BookOpen, 
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight
} from 'lucide-react';
import { SYLLABUS_DATA, Chapter, Subtopic, SubtopicUserState, UserState } from './data/syllabus';
import { ChapterCard } from './components/ChapterCard';
import { SubtopicModal } from './components/SubtopicModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { ResourceHub } from './components/ResourceHub';
import { BacklogCommandCenter } from './components/BacklogCommandCenter';
import { AnalyticsView } from './components/AnalyticsView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePWAInstall } from './hooks/usePWAInstall';

const STORAGE_KEY = 'csir_net_chem_prep_tracker_v2';

export default function App() {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  // State management
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user state from localStorage', e);
    }
    return {
      subtopics: {},
      examTargetDate: '',
    };
  });

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [allExpanded, setAllExpanded] = useState<boolean | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Specialization topics expansion state in sidebar
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    inorganic: false,
    physical: true,
    organic: false,
    interdisciplinary: false,
  });

  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  // Active Subtopic for Modal
  const [activeModalData, setActiveModalData] = useState<{
    subtopicId: string;
    chapterId: string;
  } | null>(null);

  const importFileRef = useRef<HTMLInputElement>(null);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {
      console.error('Failed to persist user state', e);
    }
  }, [userState]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper to get or create subtopic state
  const getSubtopicData = (subId: string): SubtopicUserState => {
    return (
      userState.subtopics[subId] || {
        notesDone: false,
        pyqSolved: 0,
        pyqTarget: 25,
        rev1: false,
        rev1Date: '',
        rev2: false,
        rev2Date: '',
        rev3: false,
        rev3Date: '',
        rev4: false,
        rev4Date: '',
        deadline: '',
        isBacklog: false,
        backlogPriority: 'Medium',
        personalNotes: '',
      }
    );
  };

  const handleUpdateSubtopic = (subId: string, updates: Partial<SubtopicUserState>) => {
    setUserState((prev) => {
      const existing = prev.subtopics[subId] || {
        notesDone: false,
        pyqSolved: 0,
        pyqTarget: 25,
        rev1: false,
        rev1Date: '',
        rev2: false,
        rev2Date: '',
        rev3: false,
        rev3Date: '',
        rev4: false,
        rev4Date: '',
        deadline: '',
        isBacklog: false,
        backlogPriority: 'Medium',
        personalNotes: '',
      };

      return {
        ...prev,
        subtopics: {
          ...prev.subtopics,
          [subId]: {
            ...existing,
            ...updates,
          },
        },
      };
    });
  };

  const handleQuickToggleNotes = (subId: string) => {
    const current = getSubtopicData(subId);
    handleUpdateSubtopic(subId, { notesDone: !current.notesDone });
    showToast(!current.notesDone ? 'Marked Notes as Done!' : 'Notes marked pending', 'info');
  };

  // Calculate Overall Progress Metrics
  const metrics = useMemo(() => {
    let totalSubtopics = 0;
    let totalNotes = 0;
    let totalPyqSolved = 0;
    let totalPyqTarget = 0;
    let totalRevisions = 0;
    let activeBacklogs = 0;

    SYLLABUS_DATA.forEach((ch) => {
      ch.subtopics.forEach((sub) => {
        totalSubtopics++;
        const d = userState.subtopics[sub.id];
        if (d) {
          if (d.notesDone) totalNotes++;
          totalPyqSolved += d.pyqSolved || 0;
          totalPyqTarget += d.pyqTarget || 25;
          if (d.rev1) totalRevisions++;
          if (d.rev2) totalRevisions++;
          if (d.rev3) totalRevisions++;
          if (d.rev4) totalRevisions++;
          if (d.isBacklog) activeBacklogs++;
        } else {
          totalPyqTarget += 25;
        }
      });
    });

    const overallPct = Math.min(
      100,
      Math.round(
        (totalNotes / (totalSubtopics || 1)) * 35 +
          (totalPyqSolved / (totalPyqTarget || 1)) * 35 +
          (totalRevisions / ((totalSubtopics * 4) || 1)) * 30
      )
    );

    return {
      totalSubtopics,
      totalNotes,
      totalPyqSolved,
      totalPyqTarget,
      totalRevisions,
      activeBacklogs,
      overallPct,
    };
  }, [userState]);

  // Exam Countdown calculation
  const examDaysRemaining = useMemo(() => {
    if (!userState.examTargetDate) return null;
    const target = new Date(userState.examTargetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [userState.examTargetDate]);

  // Group chapters by specialisation
  const chaptersBySubject = useMemo(() => {
    return {
      inorganic: SYLLABUS_DATA.filter((c) => c.subject === 'inorganic'),
      physical: SYLLABUS_DATA.filter((c) => c.subject === 'physical'),
      organic: SYLLABUS_DATA.filter((c) => c.subject === 'organic'),
      interdisciplinary: SYLLABUS_DATA.filter((c) => c.subject === 'interdisciplinary'),
    };
  }, []);

  // Filter Chapters for center view
  const filteredChapters = useMemo(() => {
    return SYLLABUS_DATA.filter((ch) => {
      // Subject filter
      if (
        activeTab !== 'all' &&
        activeTab !== 'backlogs' &&
        activeTab !== 'resources' &&
        activeTab !== 'analytics'
      ) {
        if (ch.subject !== activeTab) return false;
      }

      // Search Query filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const titleMatch = ch.title.toLowerCase().includes(q) || ch.description.toLowerCase().includes(q);
        const subMatch = ch.subtopics.some(
          (s) => s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
        );
        if (!titleMatch && !subMatch) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        return ch.subtopics.some((s) => {
          const d = getSubtopicData(s.id);
          if (statusFilter === 'backlog') return d.isBacklog;
          if (statusFilter === 'notes_pending') return !d.notesDone;
          if (statusFilter === 'pyq_pending') return d.pyqSolved < d.pyqTarget;
          if (statusFilter === 'rev_pending') return !(d.rev1 && d.rev2 && d.rev3 && d.rev4);
          if (statusFilter === 'completed') return d.notesDone && d.pyqSolved >= d.pyqTarget && d.rev4;
          return true;
        });
      }

      return true;
    });
  }, [activeTab, searchQuery, statusFilter, userState]);

  // Handle clicking a topic directly from the sidebar
  const handleSelectSidebarChapter = (chapterId: string, subject: 'inorganic' | 'physical' | 'organic' | 'interdisciplinary') => {
    if (activeTab !== 'all' && activeTab !== subject) {
      setActiveTab(subject);
    }
    setSelectedChapterId(chapterId);
    setIsMobileMenuOpen(false);

    // Auto-scroll to chapter element
    setTimeout(() => {
      const el = document.getElementById(`chapter-${chapterId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const toggleAllSubjectTrees = () => {
    const areAllExpanded = Object.values(expandedSubjects).every(Boolean);
    setExpandedSubjects({
      inorganic: !areAllExpanded,
      physical: !areAllExpanded,
      organic: !areAllExpanded,
      interdisciplinary: !areAllExpanded,
    });
  };

  // Export JSON Backup
  const handleExportData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(userState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `CSIR_NET_ChemTracker_Backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON downloaded successfully!');
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object' && parsed.subtopics) {
          setUserState(parsed);
          showToast('Data imported successfully!', 'success');
        } else {
          showToast('Invalid backup file format', 'error');
        }
      } catch (err) {
        showToast('Error reading JSON backup file', 'error');
      }
    };
    reader.readAsText(file);
    if (importFileRef.current) importFileRef.current.value = '';
  };

  // Reset progress
  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all your progress, PYQ counts, and revision logs?'
      )
    ) {
      setUserState({ subtopics: {}, examTargetDate: '' });
      localStorage.removeItem(STORAGE_KEY);
      showToast('All progress reset', 'info');
    }
  };

  // Download Full Project ZIP archive
  const handleDownloadFullZip = () => {
    const link = document.createElement('a');
    link.href = '/CSIR_NET_ChemTracker_Full_Project.zip';
    link.download = 'CSIR_NET_ChemTracker_Full_Project.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Starting download of full project .ZIP...', 'success');
  };

  // Active Chapter & Subtopic for modal
  const activeChapter = activeModalData
    ? SYLLABUS_DATA.find((c) => c.chapterId === activeModalData.chapterId) || null
    : null;
  const activeSubtopic = activeModalData && activeChapter
    ? activeChapter.subtopics.find((s) => s.id === activeModalData.subtopicId) || null
    : null;

  // Title for right section based on activeTab
  const currentTabTitle = useMemo(() => {
    if (activeTab === 'all') return 'All Syllabus Topics';
    if (activeTab === 'inorganic') return 'Inorganic Topics';
    if (activeTab === 'physical') return 'Physical Topics';
    if (activeTab === 'organic') return 'Organic Topics';
    if (activeTab === 'interdisciplinary') return 'Interdisciplinary Topics';
    if (activeTab === 'backlogs') return 'Backlog Command Center';
    if (activeTab === 'resources') return 'YouTube & Reddit Resource Vault';
    if (activeTab === 'analytics') return 'Revision & Syllabus Analytics';
    return 'All Syllabus Topics';
  }, [activeTab]);

  // Helper for rendering a nested topic list in the sidebar with notes, PYQs, deadlines
  const renderSidebarTopicList = (chapters: Chapter[], subjectColorClass: string) => {
    return (
      <div className={`pl-2 pr-1 py-1.5 space-y-1.5 border-l-2 ${subjectColorClass} ml-3 animate-in fade-in`}>
        {chapters.map((ch) => {
          const isSelected = selectedChapterId === ch.chapterId;
          const totalSub = ch.subtopics.length;
          let notesDone = 0;
          let pyqsSolved = 0;
          let pyqsTarget = 0;
          let rev4Done = 0;
          let nearestDeadline = '';
          let hasBacklog = false;

          ch.subtopics.forEach((s) => {
            const d = userState.subtopics[s.id];
            if (d) {
              if (d.notesDone) notesDone++;
              pyqsSolved += d.pyqSolved || 0;
              pyqsTarget += d.pyqTarget || 25;
              if (d.rev4) rev4Done++;
              if (d.deadline && (!nearestDeadline || d.deadline < nearestDeadline)) {
                nearestDeadline = d.deadline;
              }
              if (d.isBacklog) hasBacklog = true;
            } else {
              pyqsTarget += 25;
            }
          });

          const chPercent = Math.round(
            (notesDone / (totalSub || 1)) * 40 +
              Math.min(1, pyqsSolved / (pyqsTarget || 1)) * 30 +
              (rev4Done / (totalSub || 1)) * 30
          );

          return (
            <div
              key={ch.chapterId}
              onClick={() => handleSelectSidebarChapter(ch.chapterId, ch.subject)}
              className={`p-2 rounded-xl border transition cursor-pointer text-left space-y-1.5 group select-none ${
                isSelected
                  ? 'bg-cyan-950/70 border-cyan-500/70 text-cyan-200 ring-1 ring-cyan-500/30 shadow-md'
                  : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700/80 text-slate-300'
              }`}
            >
              {/* Title & Progress % */}
              <div className="flex items-start justify-between gap-1.5">
                <span className="font-semibold text-xs text-slate-200 group-hover:text-cyan-300 line-clamp-1 leading-snug">
                  {ch.title}
                </span>
                <span className="text-[10px] font-bold text-cyan-400 shrink-0">
                  {chPercent}%
                </span>
              </div>

              {/* Badges: Notes completed + PYQs progress + Deadline */}
              <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                {/* Notes Completed Pill */}
                <span
                  className={`px-1.5 py-0.5 rounded flex items-center gap-1 font-medium ${
                    notesDone === totalSub && totalSub > 0
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  <BookOpen className="w-2.5 h-2.5 text-sky-400" />
                  <span>{notesDone}/{totalSub} Notes</span>
                </span>

                {/* PYQs Progress Pill */}
                <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1 font-medium">
                  <span className="text-slate-400">PYQ:</span>
                  <span className="text-emerald-400 font-bold">{pyqsSolved}</span>
                  <span className="text-slate-500">/{pyqsTarget}</span>
                </span>

                {/* Deadline if set */}
                {nearestDeadline ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-800/50 text-amber-300 flex items-center gap-1 font-medium">
                    <Calendar className="w-2.5 h-2.5 text-amber-400" />
                    <span>Due: {nearestDeadline}</span>
                  </span>
                ) : null}

                {/* Backlog indicator */}
                {hasBacklog && (
                  <span className="px-1.5 py-0.2 rounded bg-rose-950 border border-rose-800 text-rose-300 text-[9px] font-bold">
                    Backlog
                  </span>
                )}
              </div>

              {/* Mini progress bar */}
              <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-800/60">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${chPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Top Header matching exact screenshot */}
      <header className="glass-panel sticky top-0 z-30 border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-cyan-600 via-violet-600 to-fuchsia-600 rounded-xl shadow-lg shadow-cyan-500/20">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                  CSIR NET ChemTracker
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Chemical Sciences Syllabus &amp; Prep Companion
                </p>
              </div>
            </div>

            {/* Mobile Actions Menu Toggle */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setIsApkModalOpen(true)}
                className="p-2 bg-slate-800 rounded-lg text-cyan-300 hover:text-white"
                title="Download APK"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Global Search & Action Buttons Header */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subtopics, topics, keywords.."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Download APK Button */}
            <button
              onClick={() => setIsApkModalOpen(true)}
              title="Download Android APK"
              className="p-2 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-700/60 rounded-lg text-cyan-300 text-xs flex items-center gap-1.5 transition font-semibold shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">APK App</span>
            </button>

            {/* Download Full Project ZIP Button */}
            <button
              onClick={handleDownloadFullZip}
              title="Download Full Project (.ZIP)"
              className="p-2 bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-700/60 rounded-lg text-indigo-300 text-xs flex items-center gap-1.5 transition font-semibold shadow-sm"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span className="hidden md:inline">Download ZIP</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExportData}
              title="Backup Data"
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </button>

            {/* Import Button */}
            <label
              title="Import Data"
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden md:inline">Import</span>
              <input
                ref={importFileRef}
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>

            {/* Reset Button */}
            <button
              onClick={handleResetData}
              title="Reset All"
              className="p-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 rounded-lg text-rose-300 text-xs transition"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar with Unified Sliding Topic, Progress & Deadline Panel */}
        <aside
          className={`lg:col-span-3 lg:sticky lg:top-20 self-start space-y-4 ${
            isMobileMenuOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Main Slide Panel */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800/90 shadow-xl space-y-4 max-h-[85vh] lg:max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-y-contain scroll-smooth touch-pan-y scrollbar-thin">
            
            {/* 1. Quick Download Project .ZIP Banner (in that slide) */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-cyan-950/70 border border-indigo-700/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Project Download (.ZIP)</span>
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Ready
                </span>
              </div>
              <button
                onClick={handleDownloadFullZip}
                className="w-full py-2 px-3 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950/50 transition active:scale-[0.99]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full Project .ZIP</span>
              </button>
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                <span>React + Syllabus + Android APK</span>
                <button
                  onClick={() => setIsApkModalOpen(true)}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
                >
                  APK Center &rarr;
                </button>
              </div>
            </div>

            {/* 2. Target Exam Date Deadline (in that slide) */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exam Date Deadline</span>
                </span>
                {examDaysRemaining !== null && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    examDaysRemaining <= 15 
                      ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {examDaysRemaining < 0 
                      ? 'Passed' 
                      : examDaysRemaining === 0 
                      ? 'Exam Today!' 
                      : `${examDaysRemaining} Days Left`}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={userState.examTargetDate}
                  onChange={(e) =>
                    setUserState((prev) => ({ ...prev, examTargetDate: e.target.value }))
                  }
                  className="w-full bg-slate-950 border border-slate-700/80 text-xs rounded-lg px-2.5 py-1.5 text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                />
              </div>

              {/* Quick Goal Presets */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="shrink-0 text-slate-500">Quick set:</span>
                <button
                  type="button"
                  onClick={() => setUserState((prev) => ({ ...prev, examTargetDate: '2026-06-25' }))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                >
                  June '26
                </button>
                <button
                  type="button"
                  onClick={() => setUserState((prev) => ({ ...prev, examTargetDate: '2026-12-20' }))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                >
                  Dec '26
                </button>
              </div>
            </div>

            {/* 3. Notes Completed & All PYQs Progress (in that slide) */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              {/* Header with overall percentage */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Overall Prep Progress</span>
                </span>
                <span className="text-xs font-extrabold text-cyan-400">
                  {metrics.overallPct}%
                </span>
              </div>

              {/* Notes Completed */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-sky-400" />
                    <span>Notes Completed</span>
                  </span>
                  <span className="font-bold text-sky-300">
                    {metrics.totalNotes} <span className="text-slate-500 font-normal">/ {metrics.totalSubtopics}</span>
                    <span className="text-[10px] text-slate-400 ml-1">
                      ({Math.round((metrics.totalNotes / (metrics.totalSubtopics || 1)) * 100)}%)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((metrics.totalNotes / (metrics.totalSubtopics || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* All PYQs Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>All PYQs Progress</span>
                  </span>
                  <span className="font-bold text-emerald-400">
                    {metrics.totalPyqSolved} <span className="text-slate-500 font-normal">/ {metrics.totalPyqTarget}</span>
                    <span className="text-[10px] text-slate-400 ml-1">
                      ({Math.round((metrics.totalPyqSolved / (metrics.totalPyqTarget || 1)) * 100)}%)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.round((metrics.totalPyqSolved / (metrics.totalPyqTarget || 1)) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Stat badges */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                <div className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">4x Revisions:</span>
                  <span className="font-bold text-indigo-300">{metrics.totalRevisions}</span>
                </div>
                <div className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Backlogs:</span>
                  <span className={`font-bold ${metrics.activeBacklogs > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                    {metrics.activeBacklogs}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Syllabus Subjects Specialisation Tree */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Syllabus Subjects
                </span>
                <button
                  onClick={toggleAllSubjectTrees}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium transition"
                >
                  {Object.values(expandedSubjects).every(Boolean) ? 'Collapse Topics' : 'Expand Topics'}
                </button>
              </div>

              {/* All Subjects Root Button */}
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSelectedChapterId(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition ${
                  activeTab === 'all' && !selectedChapterId
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>All Subjects</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-bold">
                  44 Ch.
                </span>
              </button>

              {/* 1. Inorganic Chemistry Specialisation Tree */}
              <div className="space-y-1">
                <div
                  className={`w-full px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition cursor-pointer select-none ${
                    activeTab === 'inorganic'
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                  onClick={() => {
                    setActiveTab('inorganic');
                    setExpandedSubjects((prev) => ({ ...prev, inorganic: !prev.inorganic }));
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Atom className="w-4 h-4 text-cyan-400" />
                    <span>Inorganic Chemistry</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-[10px] text-cyan-300 font-semibold">
                      13 Ch
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSubjects((prev) => ({ ...prev, inorganic: !prev.inorganic }));
                      }}
                      className="p-0.5 text-slate-400 hover:text-white transition-transform duration-200"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expandedSubjects.inorganic ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Nested Inorganic Topics List with Sliding Accordion Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSubjects.inorganic
                      ? 'max-h-[850px] opacity-100'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {renderSidebarTopicList(chaptersBySubject.inorganic, 'border-cyan-800/50')}
                </div>
              </div>

              {/* 2. Physical Chemistry Specialisation Tree */}
              <div className="space-y-1">
                <div
                  className={`w-full px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition cursor-pointer select-none ${
                    activeTab === 'physical'
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                  onClick={() => {
                    setActiveTab('physical');
                    setExpandedSubjects((prev) => ({ ...prev, physical: !prev.physical }));
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span>Physical Chemistry</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/40 text-[10px] text-amber-300 font-semibold">
                      14 Ch
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSubjects((prev) => ({ ...prev, physical: !prev.physical }));
                      }}
                      className="p-0.5 text-slate-400 hover:text-white transition-transform duration-200"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expandedSubjects.physical ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Nested Physical Topics List with Sliding Accordion Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSubjects.physical
                      ? 'max-h-[900px] opacity-100'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {renderSidebarTopicList(chaptersBySubject.physical, 'border-amber-800/50')}
                </div>
              </div>

              {/* 3. Organic Chemistry Specialisation Tree */}
              <div className="space-y-1">
                <div
                  className={`w-full px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition cursor-pointer select-none ${
                    activeTab === 'organic'
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                  onClick={() => {
                    setActiveTab('organic');
                    setExpandedSubjects((prev) => ({ ...prev, organic: !prev.organic }));
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Dna className="w-4 h-4 text-purple-400" />
                    <span>Organic Chemistry</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-800/40 text-[10px] text-purple-300 font-semibold">
                      13 Ch
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSubjects((prev) => ({ ...prev, organic: !prev.organic }));
                      }}
                      className="p-0.5 text-slate-400 hover:text-white transition-transform duration-200"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expandedSubjects.organic ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Nested Organic Topics List with Sliding Accordion Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSubjects.organic
                      ? 'max-h-[850px] opacity-100'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {renderSidebarTopicList(chaptersBySubject.organic, 'border-purple-800/50')}
                </div>
              </div>

              {/* 4. Interdisciplinary Specialisation Tree */}
              <div className="space-y-1">
                <div
                  className={`w-full px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition cursor-pointer select-none ${
                    activeTab === 'interdisciplinary'
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                  onClick={() => {
                    setActiveTab('interdisciplinary');
                    setExpandedSubjects((prev) => ({ ...prev, interdisciplinary: !prev.interdisciplinary }));
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-400" />
                    <span>Interdisciplinary</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-pink-950/80 border border-pink-800/40 text-[10px] text-pink-300 font-semibold">
                      5 Ch
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSubjects((prev) => ({ ...prev, interdisciplinary: !prev.interdisciplinary }));
                      }}
                      className="p-0.5 text-slate-400 hover:text-white transition-transform duration-200"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expandedSubjects.interdisciplinary ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Nested Interdisciplinary Topics List with Sliding Accordion Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSubjects.interdisciplinary
                      ? 'max-h-[500px] opacity-100'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {renderSidebarTopicList(chaptersBySubject.interdisciplinary, 'border-pink-800/50')}
                </div>
              </div>
            </div>

            {/* 5. Special Views */}
            <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 pb-1">
                Special Views
              </div>

              <button
                onClick={() => {
                  setActiveTab('backlogs');
                  setSelectedChapterId(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition ${
                  activeTab === 'backlogs'
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Backlog Command Center</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-950 border border-rose-800 text-[10px] text-rose-300 font-bold">
                  {metrics.activeBacklogs}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('resources');
                  setSelectedChapterId(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition ${
                  activeTab === 'resources'
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>Reddit &amp; YouTube Hub</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-800/40 text-[10px] text-red-300 font-semibold">
                  Curated
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('analytics');
                  setSelectedChapterId(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition ${
                  activeTab === 'analytics'
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Revision &amp; Prep Matrix</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-[10px] text-emerald-300 font-semibold">
                  4x Rev
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* Center Main Content */}
        <section className="lg:col-span-9 space-y-5">
          {/* Dynamic Header Toolbar matching screenshot */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>{currentTabTitle}</span>
              </h2>
              <p className="text-xs text-slate-400">
                Detailed syllabus breakdown, PYQs, and 4x revision tracker.
              </p>
            </div>

            {/* Quick Status Dropdown, Expand and Collapse buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="backlog">Has Backlog</option>
                <option value="notes_pending">Notes Pending</option>
                <option value="pyq_pending">PYQs Pending</option>
                <option value="rev_pending">Revision Needed</option>
                <option value="completed">100% Completed</option>
              </select>

              <button
                onClick={() => setAllExpanded(true)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 transition flex items-center gap-1.5"
              >
                <ChevronsDown className="w-3.5 h-3.5" />
                <span>Expand</span>
              </button>

              <button
                onClick={() => setAllExpanded(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 transition flex items-center gap-1.5"
              >
                <ChevronsUp className="w-3.5 h-3.5" />
                <span>Collapse</span>
              </button>
            </div>
          </div>

          {/* Conditional Center Views */}
          {activeTab === 'backlogs' ? (
            <BacklogCommandCenter
              syllabus={SYLLABUS_DATA}
              userState={userState}
              onOpenModal={(subtopicId, chapterId) =>
                setActiveModalData({ subtopicId, chapterId })
              }
            />
          ) : activeTab === 'resources' ? (
            <ResourceHub />
          ) : activeTab === 'analytics' ? (
            <AnalyticsView syllabus={SYLLABUS_DATA} userState={userState} />
          ) : (
            /* Chapters List */
            <div className="space-y-4">
              {filteredChapters.length === 0 ? (
                <div className="glass-panel p-8 text-center rounded-2xl border border-slate-800 space-y-3">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-300">
                    No matching chapters or topics found
                  </h4>
                  <p className="text-xs text-slate-500">
                    Try adjusting your search keywords or active status filter.
                  </p>
                </div>
              ) : (
                filteredChapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.chapterId}
                    chapter={chapter}
                    userState={userState}
                    isExpandedInitial={allExpanded !== undefined ? allExpanded : (activeTab !== 'all' || selectedChapterId === chapter.chapterId)}
                    isHighlighted={selectedChapterId === chapter.chapterId}
                    onOpenModal={(subtopicId, chapterId) =>
                      setActiveModalData({ subtopicId, chapterId })
                    }
                    onQuickToggleNotes={handleQuickToggleNotes}
                  />
                ))
              )}
            </div>
          )}
        </section>
      </main>

      {/* Subtopic Checklist Modal */}
      {activeModalData && activeChapter && activeSubtopic && (
        <SubtopicModal
          isOpen={true}
          onClose={() => setActiveModalData(null)}
          chapter={activeChapter}
          subtopic={activeSubtopic}
          data={getSubtopicData(activeSubtopic.id)}
          onUpdate={(updates) => handleUpdateSubtopic(activeSubtopic.id, updates)}
        />
      )}

      {/* Android APK Download Center Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        isInstallable={isInstallable}
        onInstallPrompt={install}
        isInstalled={isInstalled}
      />

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
