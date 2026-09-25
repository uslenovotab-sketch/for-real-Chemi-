import React from 'react';
import { Youtube, ExternalLink, BookMarked, Sparkles } from 'lucide-react';

export const ResourceHub: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Recommended YouTube Channels */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-red-400">
          <div className="p-2 rounded-xl bg-red-950/80 border border-red-800 text-red-400">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white text-base">Top Curated YouTube Channels for CSIR NET Chemical Sciences</h3>
            <p className="text-xs text-slate-400 font-normal">Free video series, PYQ walkthroughs, and conceptual lectures recommended by past JRF qualifiers:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Channel 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-cyan-300">J Chemistry</span>
                <span className="px-2 py-0.5 bg-red-950 border border-red-800 text-red-300 rounded text-[10px] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-400" /> Must Watch
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Complete courses on Organic Reagents, Electrochemistry, Reaction Mechanisms, Group Theory, and Spectroscopy with detailed Part B & C past question solutions.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">Free Playlists & One-Shots</span>
              <a
                href="https://www.youtube.com/@JChemistry"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                Visit Channel <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Channel 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-300">Chem Academy / GATE Chemistry</span>
                <span className="px-2 py-0.5 bg-amber-950 border border-amber-800 text-amber-300 rounded text-[10px] font-semibold">
                  Physical & Numericals
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Rigorous physical chemistry derivations, quantum mechanics, organometallics, and rapid revision marathons with extensive problem solving drills.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">Numerical Practice</span>
              <a
                href="https://www.youtube.com/results?search_query=GATE+Chemistry+CSIR+NET"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                Search Playlists <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Channel 3 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-purple-300">Chemistry Untold & All 'Bout Chemistry</span>
                <span className="px-2 py-0.5 bg-purple-950 border border-purple-800 text-purple-300 rounded text-[10px] font-semibold">
                  Pericyclic & NMR
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Specialized in pericyclic reactions, photochemical synthesis, NMR spectroscopy interpretation tricks, and named rearrangements mechanisms.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">Organic Tricks</span>
              <a
                href="https://www.youtube.com/results?search_query=Chemistry+Untold+CSIR+NET"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                Explore Lectures <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Channel 4 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-300">NPTEL CSIR NET Chemistry</span>
                <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded text-[10px] font-semibold">
                  IIT Professor Series
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Rigorous theoretical mastery in Quantum Chemistry, Group Theory, Organometallic Catalysis, and Molecular Spectroscopy taught by IIT/IISc professors.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400">Standard Theory</span>
              <a
                href="https://www.youtube.com/results?search_query=NPTEL+Chemical+Sciences+CSIR+NET"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                NPTEL Courses <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Reddit & Standard Textbooks Guide */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-orange-400">
          <div className="p-2 rounded-xl bg-orange-950/80 border border-orange-800 text-orange-400">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white text-base">Reddit Community Prep Guides & Standard Reference Books</h3>
            <p className="text-xs text-slate-400 font-normal">Verified preparation roadmaps, high-yield chapters, and book lists from r/IndianAcademia:</p>
          </div>
        </div>

        <a
          href="https://www.reddit.com/r/IndianAcademia/search/?q=CSIR+NET+Chemical+Sciences"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-orange-500/50 flex items-center justify-between transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-950 text-orange-400 rounded-lg group-hover:bg-orange-900 transition">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-200 group-hover:text-orange-300">
                r/IndianAcademia - CSIR NET Chemical Sciences Mega Threads
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Preparation strategies, cutoffs for JRF vs LS, test series reviews, and subject-wise textbook recommendations.
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 shrink-0 ml-2" />
        </a>

        {/* Standard Textbooks List */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Essential Standard Textbooks for CSIR NET Part B & C:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-purple-300">Organic Chemistry:</span>
              <p className="text-slate-300 mt-1">Jonathan Clayden, Nick Greeves & Stuart Warren</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Gold standard for reaction mechanisms, pericyclics & reagents.</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-cyan-300">Inorganic Chemistry:</span>
              <p className="text-slate-300 mt-1">Huheey, Keiter & Medhi / Miessler & Tarr</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Coordination chemistry, term symbols & organometallics.</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-300">Physical Chemistry:</span>
              <p className="text-slate-300 mt-1">Peter Atkins & Julio de Paula / Ira N. Levine</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Thermodynamics, chemical kinetics & surface chemistry.</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-300">Quantum & Spectroscopy:</span>
              <p className="text-slate-300 mt-1">Donald A. McQuarrie / William Kemp & Pavia</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Postulates, particle in a box, 1H/13C NMR & Mass spec.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
