import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, GitBranch, Globe, Mail, MapPin, Send } from 'lucide-react';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactMe() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please use a valid email address.';
    }
    if (!form.subject.trim()) nextErrors.subject = 'Please add a subject.';
    if (!form.message.trim()) nextErrors.message = 'Please write a message.';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Please correct the highlighted fields and try again.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const mailtoLink = `mailto:maleesha@example.com?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`,
    )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'Your email client has been opened with your message ready to send.',
      });
      setForm(initialForm);
    }, 400);
  };

  return (
    <section id="contact" className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-900/40 px-4 py-2.5 backdrop-blur-xl">
            <span className="text-cyan-400 text-lg">✦</span>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-cyan-200/80">
              Contact Me
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8">
            <p className="text-cyan-300/80 text-sm uppercase tracking-[0.25em] font-mono mb-4">
              Let&apos;s Connect //
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              Build Something
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Reliable Together
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300/80">
              I am open to engineering conversations, technical collaborations, and project work involving electrical systems, industrial installations, automation, and control infrastructure.
            </p>

            <div className="mt-8 space-y-4">
              <a href="mailto:maleesha@example.com" className="flex items-center gap-4 rounded-2xl border border-cyan-400/15 bg-slate-950/30 p-4 transition hover:border-cyan-400/40">
                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-cyan-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-400 mb-1">Email</p>
                  <p className="text-sm sm:text-base text-white font-medium break-all">maleesha@example.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-cyan-400/15 bg-slate-950/30 p-4">
                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-cyan-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-400 mb-1">Location</p>
                  <p className="text-sm sm:text-base text-white font-medium">Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-slate-950/30 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/40">
                <GitBranch className="h-4 w-4 text-cyan-300" />
                GitHub
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-slate-950/30 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/40">
                <Globe className="h-4 w-4 text-cyan-300" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8">
            <p className="text-cyan-300/80 text-sm uppercase tracking-[0.25em] font-mono mb-4">
              Send Message //
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`contact-input ${errors.name ? 'border-red-400/60' : ''}`}
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className={`contact-input ${errors.email ? 'border-red-400/60' : ''}`}
                  />
                  {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email}</p>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`contact-input ${errors.subject ? 'border-red-400/60' : ''}`}
                />
                {errors.subject && <p className="mt-2 text-xs text-red-300">{errors.subject}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`contact-input min-h-[180px] resize-none ${errors.message ? 'border-red-400/60' : ''}`}
                />
                {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message}</p>}
              </div>

              {status.message && (
                <div
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200'
                      : 'border-red-400/25 bg-red-500/10 text-red-200'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}