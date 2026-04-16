import { ExternalLink, Share } from 'lucide-react';
import { getMobilePlatform } from '../../lib/browserUtils';

export default function InAppBrowserGate() {
  const platform = getMobilePlatform();
  const url = window.location.href;

  const iosSteps = [
    { icon: '···', text: 'Tap the three-dot menu (top right)' },
    { icon: '↗', text: 'Tap "Open in Safari"' },
  ];
  const androidSteps = [
    { icon: '⋮', text: 'Tap the three-dot menu (top right)' },
    { icon: '↗', text: 'Tap "Open in Chrome" or "Open in browser"' },
  ];
  const steps = platform === 'android' ? androidSteps : iosSteps;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-6 z-50 text-center">
      {/* Logo */}
      <div className="mb-8">
        <div className="text-white font-semibold text-2xl tracking-wide mb-1">CONTINUUM</div>
        <div className="text-white/30 text-xs">Uber Health · Care Intelligence</div>
      </div>

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-6">
        <ExternalLink size={28} className="text-white/60" />
      </div>

      <h2 className="text-white font-semibold text-xl mb-3 leading-tight">
        Open in your browser<br />for the full experience
      </h2>
      <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
        LinkedIn's built-in browser blocks some features this demo needs. It only takes a second to open properly.
      </p>

      {/* Steps */}
      <div className="w-full max-w-xs bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
        {steps.map((step, i) => (
          <div key={i} className={`flex items-center gap-4 px-4 py-3.5 ${i > 0 ? 'border-t border-white/[0.06]' : ''}`}>
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center text-white font-mono text-sm flex-shrink-0">
              {step.icon}
            </div>
            <span className="text-sm text-white/70 text-left">{step.text}</span>
          </div>
        ))}
      </div>

      {/* Copy link fallback */}
      <button
        onClick={() => {
          navigator.clipboard?.writeText(url).catch(() => {});
        }}
        className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
      >
        <Share size={12} />
        Or copy link to open manually
      </button>

      <p className="text-white/15 text-xs mt-8 max-w-xs">
        {url}
      </p>
    </div>
  );
}
