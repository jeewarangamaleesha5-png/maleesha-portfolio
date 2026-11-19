import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2rem] border border-cyan-400/15 bg-slate-900/40 backdrop-blur-xl px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div>
              <p className="text-cyan-300/80 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] mb-3">
                Portfolio //
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Maleesha
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Jeewaranga
                </span>
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300/80 max-w-md">
                Electrical engineering, industrial electrical systems, power distribution, protection, and reliable control solutions.
              </p>
            </div>

            <div>
              <p className="text-cyan-300/80 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] mb-3">
                Quick Links //
              </p>
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <a href="#about" className="text-slate-300 transition hover:text-cyan-300">
                  About
                </a>
                <a href="#projects" className="text-slate-300 transition hover:text-cyan-300">
                  Projects
                </a>
                <a href="#contact" className="text-slate-300 transition hover:text-cyan-300">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="text-cyan-300/80 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] mb-3">
                Connect //
              </p>
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <a
                  href="mailto:maleesha@example.com"
                  className="text-slate-300 break-all transition hover:text-cyan-300"
                >
                  maleesha@example.com
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 transition hover:text-cyan-300"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 transition hover:text-cyan-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-cyan-400/10 pt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-5">
            <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
              © {new Date().getFullYear()} Maleesha Jeewaranga. All rights reserved.
            </p>

            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                Portfolio Designer &amp; Developer
              </p>
              <a
                href="mailto:matheeshanadiranga14@gmail.com?subject=Portfolio%20Development%20Inquiry"
                className="mt-1 inline-block text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
              >
                Matheesha Nadiranga De Silva
              </a>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <a
                  href="mailto:matheeshanadiranga14@gmail.com?subject=Portfolio%20Development%20Inquiry"
                  className="break-all transition hover:text-cyan-300"
                >
                  matheeshanadiranga14@gmail.com
                </a>
                <a
                  href="mailto:matheeshanadiranga14@gmail.com?subject=Portfolio%20Development%20Inquiry"
                  className="font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  Contact Developer
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="justify-self-center text-xs sm:text-sm text-cyan-300 transition hover:text-cyan-200 sm:justify-self-end"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}