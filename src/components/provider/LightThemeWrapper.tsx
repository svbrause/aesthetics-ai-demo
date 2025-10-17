"use client";

import { useEffect } from "react";

export function LightThemeWrapper({ children }: { children: React.ReactNode }) {
  const css = `
      .lightmode-theme {
        --primary: #367588;
        --primary-10: rgba(54, 117, 136, 0.10);
        --primary-20: rgba(54, 117, 136, 0.20);
        --primary-30: rgba(54, 117, 136, 0.30);
        --primary-50: rgba(54, 117, 136, 0.50);
        --primary-dark: #2c5f6e;
        --text-primary: #0f172a; /* slate-900 */
        --text-secondary: #334155; /* slate-700 */
        --text-muted: #64748b; /* slate-500 */
        --background: #ffffff;
        --surface: #ffffff;
        --surface-2: #f5f7f9;
        --border: #e5e7eb;
        --border-strong: #d1d5db;
      }

      .lightmode-theme, .lightmode-theme * { 
        color-scheme: only light; 
      }

      .lightmode-theme {
        background-color: #ffffff !important;
        background: #ffffff !important;
        color: #0f172a !important;
      }

      /* Force all children to inherit white background unless explicitly styled */
      .lightmode-theme > * {
        background-color: #ffffff !important;
      }

      /* Neutralize dark backgrounds used across components to white surfaces */
      .lightmode-theme .bg-gray-900, .lightmode-theme .bg-gray-900\/95,
      .lightmode-theme .bg-gray-800, .lightmode-theme .bg-gray-800\/50,
      .lightmode-theme .bg-gray-700, .lightmode-theme .bg-black,
      .lightmode-theme .from-gray-800, .lightmode-theme .to-gray-700,
      .lightmode-theme .bg-gradient-to-br {
        background: var(--surface) !important;
        background-color: var(--surface) !important;
        border-color: var(--border) !important;
      }

      .lightmode-theme .glass {
        background: var(--surface) !important;
        border: 1px solid var(--border) !important;
        backdrop-filter: blur(10px);
      }

      /* Text colors */
      .lightmode-theme .text-white, .lightmode-theme .text-gray-200, .lightmode-theme .text-gray-300 {
        color: var(--text-secondary) !important;
      }
      .lightmode-theme .text-gray-400 { color: var(--text-muted) !important; }

      /* Borders */
      .lightmode-theme .border-gray-700, .lightmode-theme .border-gray-600, .lightmode-theme .border-gray-800,
      .lightmode-theme .border-blue-500\/50, .lightmode-theme .border-blue-400\/50 {
        border-color: var(--border) !important;
      }

      /* Accent buttons and chips */
      .lightmode-theme .accent-button,
      .lightmode-theme .add-to-shortlist-btn,
      .lightmode-theme .bg-gradient-to-r.from-gray-700.to-gray-600 {
        background-color: var(--primary) !important;
        color: #ffffff !important;
        border-color: var(--primary) !important;
      }
      .lightmode-theme .accent-button:hover,
      .lightmode-theme .add-to-shortlist-btn:hover,
      .lightmode-theme .bg-gradient-to-r.from-gray-700.to-gray-600:hover {
        background-color: var(--primary-dark) !important;
        border-color: var(--primary-dark) !important;
      }

      /* Pills, filters, subtle surfaces */
      .lightmode-theme .bg-gray-100,
      .lightmode-theme .filter-chip,
      .lightmode-theme .bg-blue-500\/10,
      .lightmode-theme .bg-blue-600\/20 {
        background-color: var(--primary-10) !important;
        color: var(--text-secondary) !important;
        border: 1px solid var(--border) !important;
      }
      .lightmode-theme .filter-chip.selected,
      .lightmode-theme .bg-gray-100.selected,
      .lightmode-theme .border-gray-300 {
        border-color: var(--primary) !important;
        color: var(--primary) !important;
      }

      /* Tabs active state */
      .lightmode-theme [role="tab"][data-state="active"],
      .lightmode-theme .medspa-tab-active {
        color: #ffffff !important;
        background-color: var(--primary) !important;
        border-color: var(--primary) !important;
      }

      /* Progress/severity bars use the accent only */
      .lightmode-theme .severity-bar,
      .lightmode-theme .severity-scale-bar,
      .lightmode-theme [class*="progress"] {
        background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
      }

      /* Replace all blue/green/red utility accents with the primary */
      .lightmode-theme .bg-blue-600,
      .lightmode-theme .bg-green-600,
      .lightmode-theme .bg-red-600 {
        background-color: var(--primary) !important;
        color: #ffffff !important;
        border-color: var(--primary) !important;
      }
      .lightmode-theme .hover\:bg-blue-700:hover,
      .lightmode-theme .hover\:bg-green-700:hover,
      .lightmode-theme .hover\:bg-red-700:hover {
        background-color: var(--primary-dark) !important;
        border-color: var(--primary-dark) !important;
      }

      .lightmode-theme .text-blue-300,
      .lightmode-theme .text-blue-400,
      .lightmode-theme .text-green-400,
      .lightmode-theme .text-red-400,
      .lightmode-theme .text-yellow-400 {
        color: var(--primary) !important;
      }

      .lightmode-theme .border-blue-500\/50,
      .lightmode-theme .border-blue-400\/50,
      .lightmode-theme .border-green-500\/50,
      .lightmode-theme .border-red-500\/50,
      .lightmode-theme .border-yellow-500\/50 {
        border-color: var(--primary) !important;
      }

      /* Gradients mapped to primary */
      .lightmode-theme .bg-gradient-to-r.from-blue-600.to-purple-600,
      .lightmode-theme .bg-gradient-to-r.from-blue-500\/10.to-purple-500\/10,
      .lightmode-theme .bg-gradient-to-r.from-blue-600\/10.to-green-500\/10 {
        background: linear-gradient(90deg, var(--primary), var(--primary-dark)) !important;
        color: #ffffff !important;
        border-color: var(--primary) !important;
      }

      /* Chips and subtle fills use primary transparency */
      .lightmode-theme .bg-blue-500\/10,
      .lightmode-theme .bg-blue-600\/20,
      .lightmode-theme .bg-green-500\/10,
      .lightmode-theme .bg-red-500\/10,
      .lightmode-theme .bg-yellow-500\/10 {
        background-color: var(--primary-10) !important;
        border-color: var(--border) !important;
        color: var(--text-secondary) !important;
      }
  `;

  return (
    <div 
      className="lightmode-theme min-h-screen bg-white text-gray-900"
      style={{ 
        backgroundColor: '#ffffff',
        color: '#0f172a',
        minHeight: '100vh'
      }}
    >
      <style id="light-theme-overrides" dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </div>
  );
}
