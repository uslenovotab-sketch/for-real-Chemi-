import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  FileCode, 
  AlertCircle, 
  Layers, 
  Sparkles, 
  X,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { generateApkProjectZip } from '../utils/apkGenerator';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  onInstallPrompt: () => Promise<boolean>;
  isInstalled: boolean;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  onInstallPrompt,
  isInstalled,
}) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'zip' | 'cloud' | 'instructions'>('instant');
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const currentAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://chemtracker.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?url=${encodeURIComponent(currentAppUrl)}`;

  const handleDownloadFullProjectZip = () => {
    const a = document.createElement('a');
    a.href = '/CSIR_NET_ChemTracker_Full_Project.zip';
    a.download = 'CSIR_NET_ChemTracker_Full_Project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadApkWrapperZip = async () => {
    try {
      setIsGeneratingZip(true);
      const zipBlob = await generateApkProjectZip(currentAppUrl);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CSIR_NET_ChemTracker_Android_APK_Project.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create APK ZIP package:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const copyCliCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-6 text-slate-100 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Android APK & Mobile Download Center</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Android Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Install as a native WebAPK or download full Android build files for offline studying
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('instant')}
            className={`flex-1 py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'instant' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click WebAPK</span>
          </button>

          <button
            onClick={() => setActiveTab('zip')}
            className={`flex-1 py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'zip' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Project (.zip)</span>
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'cloud' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Cloud APK Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-2 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'instructions' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sideload Guide</span>
          </button>
        </div>

        {/* Tab 1: Instant Native Android WebAPK */}
        {activeTab === 'instant' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/30 border border-cyan-800/40 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Instant Android Native WebAPK Installation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you tap install on an Android phone via Google Chrome, Edge, or Brave, the Android OS automatically compiles and signs a genuine <strong>.apk</strong> (WebAPK) on your phone! It adds an icon to your Android App Drawer, opens in full standalone mode with no browser address bar, and works completely offline.
              </p>

              <div className="pt-2">
                {isInstalled ? (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-800/50 rounded-xl flex items-center gap-3 text-emerald-300 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold">App Already Installed!</div>
                      <div className="text-[11px] text-emerald-400/80">You are running CSIR NET ChemTracker in native standalone mode.</div>
                    </div>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={async () => {
                      const success = await onInstallPrompt();
                      if (success) onClose();
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition active:scale-[0.99]"
                  >
                    <Smartphone className="w-4 h-4" />
                    Install Native Android APK Now
                  </button>
                ) : (
                  <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>How to install directly from your mobile browser:</span>
                    </div>
                    <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside pl-1">
                      <li>Open this website on your Android phone using <strong>Chrome</strong>.</li>
                      <li>Tap the <strong>three dots (⋮)</strong> menu in the top right corner.</li>
                      <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                      <li>Confirm installation: Android will automatically mint the WebAPK!</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5" /> 100% Offline
                </div>
                <p className="text-[11px] text-slate-400">All 44 chapters, PYQ data, and formulas are cached locally on your device.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> Fullscreen UI
                </div>
                <p className="text-[11px] text-slate-400">No browser URLs or tabs. Renders like a native Google Play app.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Auto-Syncing
                </div>
                <p className="text-[11px] text-slate-400">Progress, notes, and dates are saved into offline LocalStorage.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Download Full Project (.zip) & Android Source */}
        {activeTab === 'zip' && (
          <div className="space-y-4">
            {/* Primary: Full Project ZIP */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-cyan-950/40 border border-indigo-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <FileCode className="w-5 h-5 text-cyan-400" />
                  <span>Download Complete Source Code &amp; Project (.ZIP)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Full Project
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contains the entire CSIR NET ChemTracker application: React 19 source code, all 44 chapters syllabus database, PWA offline service worker, Tailwind styles, Android Studio build files, and pre-configured APK wrapper!
              </p>

              <button
                onClick={handleDownloadFullProjectZip}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                Download Complete Project .ZIP Archive (Instant)
              </button>
            </div>

            {/* How to use the downloaded ZIP file */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>How to use the downloaded .ZIP file:</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pl-1">
                <li>
                  <strong className="text-slate-100">Extract the .ZIP archive:</strong> Right-click the downloaded <code>CSIR_NET_ChemTracker_Full_Project.zip</code> file and choose <strong>"Extract All"</strong> or <strong>"Unzip"</strong>.
                </li>
                <li>
                  <strong className="text-slate-100">Run locally with Node.js:</strong>
                  <div className="mt-1.5 p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                    <span>npm install &amp;&amp; npm run dev</span>
                    <button
                      onClick={() => copyCliCommand('npm install && npm run dev')}
                      className="text-slate-400 hover:text-white p-1"
                      title="Copy command"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Then open <code>http://localhost:3000</code> in any web browser.</p>
                </li>
                <li>
                  <strong className="text-slate-100">Build into an Android APK:</strong> Open the extracted <code>android/</code> directory in <strong>Android Studio</strong> and select <strong>Build &gt; Build APK(s)</strong>, or run <code>./gradlew assembleDebug</code>.
                </li>
              </ol>
            </div>

            {/* Android Studio Gradle Wrapper */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-300">Alternate: Standalone Android Wrapper Only</div>
                <button
                  onClick={handleDownloadApkWrapperZip}
                  disabled={isGeneratingZip}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 rounded-lg font-medium border border-slate-700 flex items-center gap-1 transition"
                >
                  <Download className="w-3 h-3" />
                  <span>{isGeneratingZip ? 'Generating...' : 'Download Wrapper (.zip)'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Cloud 1-Click APK Generator (PWABuilder / Bubblewrap) */}
        {activeTab === 'cloud' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                <ExternalLink className="w-5 h-5 text-sky-400" />
                <span>Generate Signed APK in 30 Seconds via PWABuilder</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                PWABuilder (developed by Microsoft & Google engineers) converts any compliant Progressive Web App into a production-signed Android APK (.apk) or Google Play Store bundle (.aab) without needing Android Studio installed.
              </p>

              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition"
              >
                <span>Open PWABuilder for ChemTracker</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-200">3 Quick Steps on PWABuilder:</div>
                <p>1. The link above opens PWABuilder with your live app URL.</p>
                <p>2. Click <strong>"Package for Stores"</strong> and choose <strong>Android</strong>.</p>
                <p>3. Click <strong>"Generate APK"</strong> to download your signed APK file directly to your phone or computer!</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Step-by-step Sideloading Guide */}
        {activeTab === 'instructions' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-amber-300 text-sm">Android APK Sideloading Guide (Step-by-Step)</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</div>
                  <div>
                    <span className="font-bold text-slate-200">Download the .apk file</span>
                    <p className="text-[11px] text-slate-400">Save the APK file to your phone's "Downloads" folder.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</div>
                  <div>
                    <span className="font-bold text-slate-200">Enable "Install Unknown Apps"</span>
                    <p className="text-[11px] text-slate-400">Go to Android <strong>Settings &gt; Apps &gt; Special App Access &gt; Install Unknown Apps</strong>, then toggle allow for your Files app or Chrome.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</div>
                  <div>
                    <span className="font-bold text-slate-200">Tap to Install & Launch</span>
                    <p className="text-[11px] text-slate-400">Tap on <strong>app-debug.apk</strong> or the downloaded APK. Tap <strong>Install</strong>. Once complete, tap <strong>Open</strong> to start your CSIR NET prep!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Package ID: org.csir.chemtracker</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
