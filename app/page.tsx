"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";

// ═══════════════════════════════════════════════════════════════════
// MOCK PRIVY SDK FOR PROTOTYPE PREVIEW
// (En producción, reemplazar con import real de @privy-io/react-auth)
// ═══════════════════════════════════════════════════════════════════
const PrivyContext = createContext();
const PrivyProvider = ({ children, appId, config }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = () => setIsModalOpen(true);

  const simulateLogin = (method) => {
    setIsModalOpen(false);
    setAuthenticated(true);
    setUser({
      wallet: { address: "0xBackerA1B2C3D4E5F678901234567890abc11" },
      email: method === 'email' || method === 'google' ? { address: "inversor@colmena.network" } : null
    });
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <PrivyContext.Provider value={{ ready: true, authenticated, user, login, logout }}>
      {children}
      {isModalOpen && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:16}}>
          <div style={{background:'var(--bg-main)', border:'1px solid var(--border-gray)', borderRadius:20, width:'100%', maxWidth:360, padding:24, boxShadow:'0 24px 64px rgba(0,0,0,0.3)', color:'var(--text-main)', animation:'slideUp 0.3s ease'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
               <h3 style={{fontWeight:800, margin:0, fontSize:18, fontFamily:"'DM Sans',sans-serif"}} className="text-gray-900 dark:text-white">Log in or sign up</h3>
               <button onClick={() => setIsModalOpen(false)} style={{background:'var(--bg-gray)', border:'none', borderRadius:'50%', width:32, height:32, cursor:'pointer', fontSize:14, color:'var(--text-main)', display:'flex', alignItems:'center', justifyContent:'center'}}>✕</button>
            </div>
            <div style={{marginBottom:20}}>
               <label style={{fontSize:12, fontWeight:700, opacity:0.6, marginBottom:8, display:'block'}} className="text-gray-900 dark:text-white">Email</label>
               <div style={{display:'flex', gap:8}}>
                  <input placeholder="you@email.com" style={{flex:1, padding:'12px 14px', borderRadius:10, border:'2px solid var(--border-gray)', background:'var(--bg-main)', color:'var(--text-main)', fontSize:14, outline:'none'}} />
                  <button onClick={() => simulateLogin('email')} style={{background:'var(--text-main)', color:'var(--bg-main)', border:'none', borderRadius:10, padding:'0 20px', fontWeight:700, cursor:'pointer', transition:'transform 0.1s'}}>Go</button>
               </div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:12, margin:'24px 0'}}>
               <div style={{flex:1, height:1, background:'var(--border-gray)'}}></div>
               <span style={{fontSize:11, opacity:0.5, fontWeight:700}} className="text-gray-900 dark:text-white">OR</span>
               <div style={{flex:1, height:1, background:'var(--border-gray)'}}></div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
               <button onClick={() => simulateLogin('google')} style={{width:'100%', padding:'12px', borderRadius:10, border:'2px solid var(--border-gray)', background:'var(--bg-main)', color:'var(--text-main)', fontWeight:700, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-gray)'} onMouseLeave={e=>e.currentTarget.style.background='var(--bg-main)'}>
                 <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 2.9l6.1-6.1C34.4 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.5-4z"/></svg> Continue with Google
               </button>
               <button onClick={() => simulateLogin('wallet')} style={{width:'100%', padding:'12px', borderRadius:10, border:'2px solid var(--border-gray)', background:'var(--bg-main)', color:'var(--text-main)', fontWeight:700, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-gray)'} onMouseLeave={e=>e.currentTarget.style.background='var(--bg-main)'}>
                 <span style={{fontSize:20}}>🦊</span> Continue with MetaMask
               </button>
            </div>
            <div style={{marginTop:24, textAlign:'center', fontSize:11, opacity:0.5, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:4}} className="text-gray-900 dark:text-white">
               Protected by <strong>Privy</strong>
            </div>
          </div>
        </div>
      )}
    </PrivyContext.Provider>
  );
};
const usePrivy = () => useContext(PrivyContext);

// ═══════════════════════════════════════════════════════════════════
// I18N SYSTEM (Next.js Hydration Safe)
// ═══════════════════════════════════════════════════════════════════
const translations = {
  es: {
    nav_explore: "EXPLORADOR", nav_create: "CREAR CAMPAÑA", nav_admin: "ADMIN", nav_login: "Entrar", nav_register: "Registro",
    hero_title1: "EL CAPITAL", hero_title2: "SIN", hero_title_highlight: "FRICCIÓN", hero_title3: "PARA LATAM",
    hero_desc: "Escrow on-chain en Avalanche. Tu USDC/AVAX va a ColmenaCampaign.sol — el creador cobra solo si cumple hitos verificados.",
    hero_btn_explore: "🔺 Explorar Proyectos", hero_btn_create: "⚡ Crear Campaña",
    float_landing: "🏠 Landing", float_project: "📄 Proyecto", float_onboarding: "🔑 Onboarding", float_dash_cr: "🚀 Dashboard Creador", float_dash_in: "💰 Dashboard Inversor", float_explorer: "🔍 Explorador", float_create: "✏️ Crear Campaña", float_admin: "⚙️ Admin",
    tab_rewards: "Beneficios", reward_selected: "Beneficio Seleccionado", reward_select: "Seleccionar", reward_unlocked: "Beneficio Desbloqueado"
  },
  en: {
    nav_explore: "EXPLORER", nav_create: "CREATE CAMPAIGN", nav_admin: "ADMIN", nav_login: "Login", nav_register: "Register",
    hero_title1: "FRICTIONLESS", hero_title2: "", hero_title_highlight: "CAPITAL", hero_title3: "FOR LATAM",
    hero_desc: "On-chain escrow on Avalanche. Your USDC/AVAX goes to ColmenaCampaign.sol — creators only get paid upon verified milestones.",
    hero_btn_explore: "🔺 Explore Projects", hero_btn_create: "⚡ Create Campaign",
    float_landing: "🏠 Landing", float_project: "📄 Project", float_onboarding: "🔑 Onboarding", float_dash_cr: "🚀 Creator Dash", float_dash_in: "💰 Investor Dash", float_explorer: "🔍 Explorer", float_create: "✏️ Create Campaign", float_admin: "⚙️ Admin",
    tab_rewards: "Rewards", reward_selected: "Reward Selected", reward_select: "Select Reward", reward_unlocked: "Reward Unlocked"
  }
};

const I18nContext = createContext();
export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('es');
  
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);
  }, []);

  useEffect(() => { 
    localStorage.setItem('lang', lang); 
  }, [lang]);

  const t = (key) => translations[lang][key] || key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};
export const useI18n = () => useContext(I18nContext);

// ═══════════════════════════════════════════════════════════════════
// THEME SYSTEM (Next.js Hydration Safe)
// ═══════════════════════════════════════════════════════════════════
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);

// ═══════════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════════
const C = {
  yellow:"#F5C842",yellowDark:"#E6A817",orange:"#D4841A",
  black:"var(--text-main)",white:"var(--bg-main)",success:"#22C55E",successBg:"var(--bg-success)",
  grayLight:"var(--bg-gray)",grayBorder:"var(--border-gray)",avax:"#E84142",avaxBg:"var(--bg-avax)",
  red:"#EF4444",redBg:"var(--bg-red)",
};
const HEX=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='%23E6A817' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E")`;

const G=`
:root {
  --text-main: #111111;
  --bg-main: #FFFFFF;
  --bg-hero: #F5C842;
  --bg-gray: #F4F4F4;
  --border-gray: #E5E5E5;
  --bg-success: #DCFCE7;
  --text-success: #166534;
  --bg-warn: #FFFBEB;
  --text-warn: #D4841A;
  --bg-avax: #FFF0F0;
  --bg-blue: #E0F2FE;
  --bg-purple: #F3E8FF;
  --border-purple: #8B5CF6;
  --text-purple: #5B21B6;
}
[data-theme="dark"], .dark {
  --text-main: #F9FAFB;
  --bg-main: #0D0D0D;
  --bg-hero: #111111;
  --bg-gray: #1A1A1A;
  --border-gray: #333333;
  --bg-success: #064E3B;
  --text-success: #6EE7B7;
  --bg-warn: #422006;
  --text-warn: #FBBF24;
  --bg-avax: rgba(232, 65, 66, 0.1); 
  --bg-blue: #082F49;
  --bg-purple: #3B0764;
  --border-purple: #6B21A8;
  --text-purple: #D8B4FE;
}

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{overflow-x:hidden;}
body{font-family:'DM Sans',sans-serif;background:var(--bg-main);color:var(--text-main);overflow-x:hidden;max-width:100vw;padding-bottom:70px;transition:background 0.3s ease, color 0.3s ease;}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatBee{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-14px) rotate(4deg)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes slideRight{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes checkPop{0%{transform:scale(0) rotate(-15deg)}65%{transform:scale(1.15) rotate(4deg)}100%{transform:scale(1) rotate(0)}}
@keyframes pulseSoft{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}

.d0{animation:fadeUp .6s ease forwards;}
.d1{animation:fadeUp .6s .1s ease forwards;opacity:0;}
.d2{animation:fadeUp .6s .2s ease forwards;opacity:0;}
.d3{animation:fadeUp .6s .3s ease forwards;opacity:0;}
.d4{animation:fadeUp .6s .4s ease forwards;opacity:0;}
.slide{animation:slideRight .3s ease forwards;}
.su{animation:slideUp .35s ease forwards;}

.btn-primary{background:var(--text-main);color:var(--bg-main);border:2px solid var(--text-main);padding:11px 22px;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.07em;border-radius:4px;box-shadow:4px 4px 0 var(--text-main);cursor:pointer;transition:transform .1s,box-shadow .1s;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:7px;word-break:break-word;}
.btn-primary:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--text-main);}
.btn-accent{background:#F5C842;color:#111;border:2px solid var(--text-main);padding:11px 22px;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.07em;border-radius:4px;box-shadow:4px 4px 0 var(--text-main);cursor:pointer;transition:transform .1s,box-shadow .1s;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:7px;}
.btn-accent:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--text-main);}
.btn-avax{background:#E84142;color:#fff;border:2px solid var(--text-main);padding:11px 22px;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.07em;border-radius:4px;box-shadow:4px 4px 0 var(--text-main);cursor:pointer;transition:transform .1s,box-shadow .1s;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:7px;word-break:break-word;}
.btn-avax:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--text-main);}
.btn-outline{background:transparent;color:var(--text-main);border:2px solid var(--text-main);padding:10px 20px;font-weight:800;font-size:12px;text-transform:uppercase;border-radius:4px;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:6px;transition:background .12s,color .12s;}
.btn-outline:hover{background:var(--bg-gray);}
.btn-ghost-dark{background:transparent;color:rgba(255,255,255,.5);border:1.5px solid #333;padding:7px 13px;font-weight:600;font-size:11px;text-transform:uppercase;border-radius:4px;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:5px;transition:border-color .12s,color .12s;}
.btn-ghost-dark:hover{border-color:#F5C842;color:#F5C842;}

/* ─── NAVBAR LINK STYLES ─── */
.nav-link {
  background: transparent;
  color: var(--text-main);
  border: none;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .05em;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
  opacity: 0.7;
}
.nav-link:hover {
  background: var(--bg-gray);
  opacity: 1;
}
.nav-link.active {
  opacity: 1;
  color: #F5C842;
}

.card{background:var(--bg-main);border:2px solid var(--text-main);border-radius:8px;box-shadow:4px 4px 0 var(--text-main);}
.card-hover{transition:transform .15s,box-shadow .15s;cursor:pointer;}
.card-hover:hover{transform:translate(-3px,-3px);box-shadow:7px 7px 0 var(--text-main);}
.dc{background:#1A1A1A;border:1.5px solid #2A2A2A;border-radius:8px;}
.pill{border:2px solid var(--text-main);background:var(--bg-main);color:var(--text-main);padding:5px 14px;font-size:12px;font-weight:700;border-radius:999px;cursor:pointer;transition:background .12s;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:5px;}
.pill:hover{background:var(--bg-gray);}
.pill.active{background:#F5C842;color:#111;}

.nav-item{padding:9px 12px;font-weight:700;font-size:12px;cursor:pointer;border-radius:6px;display:flex;align-items:center;gap:9px;transition:background .1s;text-transform:uppercase;letter-spacing:.04em;}
.nav-item:hover{background:rgba(245,200,66,.15);}
.nav-item.active{background:#F5C842;border:2px solid var(--text-main);box-shadow:2px 2px 0 var(--text-main);color:#111;}
.nav-item-dark{padding:9px 12px;font-weight:700;font-size:12px;cursor:pointer;border-radius:5px;display:flex;align-items:center;gap:9px;transition:background .1s;text-transform:uppercase;letter-spacing:.04em;color:rgba(255,255,255,.5);}
.nav-item-dark:hover{background:rgba(255,255,255,.06);color:#fff;}
.nav-item-dark.active{background:rgba(245,200,66,.15);color:#F5C842;border-left:3px solid #F5C842;}

.ticker-wrap{overflow:hidden;white-space:nowrap;background:#111;border-top:2px solid #111;border-bottom:2px solid #111;padding:9px 0;}
.ticker-inner{display:inline-flex;gap:52px;animation:ticker 30s linear infinite;}
.ticker-item{color:#F5C842;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:9px;}

/* CSS COPY HASH UI/UX */
.hash-copy { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #E84142; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s; margin: -2px -6px; }
.hash-copy:hover { background: rgba(232, 65, 66, 0.1); }

input,select,textarea{width:100%;border:2px solid var(--text-main);border-radius:4px;padding:10px 13px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;background:var(--bg-main);color:var(--text-main);transition:box-shadow .15s;}
input:focus,select:focus,textarea:focus{box-shadow:3px 3px 0 var(--text-main);}
textarea{resize:vertical;min-height:80px;}

/* Adaptación tipográfica universal por si Tailwind está activo */
label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;opacity:.6;display:block;margin-bottom:5px;color:var(--text-main);}
table{width:100%;border-collapse:collapse;}
th{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-main);opacity:0.5;padding:8px 11px;text-align:left;border-bottom:1px solid var(--border-gray);}
td{font-size:12px;padding:10px 11px;border-bottom:1px solid var(--border-gray);color:var(--text-main);}
tr:hover td{background:var(--bg-gray);}

/* ─── CONTENEDORES RESPONSIVOS CREADOS ─── */
.tbl-wrap{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
.rsp-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:20px;}
.rsp-metrics{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;}
.rsp-admin-metrics{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:11px;}
.rsp-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.rsp-milestone-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:9px;}
.rsp-rewards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;}

.reward-card{border:2px solid var(--text-main);border-radius:8px;padding:18px;background:var(--bg-main);cursor:pointer;transition:transform .2s,box-shadow .2s,border-color .2s;position:relative;overflow:hidden;display:flex;flex-direction:column;}
.reward-card:hover{transform:translateY(-3px);box-shadow:6px 6px 0 var(--text-main);}
.reward-card.selected{border-color:#F5C842;background:rgba(245,200,66,0.05);box-shadow:0 0 0 1px #F5C842,6px 6px 0 #F5C842;}
.reward-type-badge{background:var(--bg-gray);color:var(--text-main);border:1.5px solid var(--border-gray);font-size:10px;font-weight:700;padding:3px 8px;border-radius:999px;text-transform:uppercase;display:inline-block;}
.pulse-badge{animation:slideUp .3s ease forwards, pulseSoft 2.5s infinite ease-in-out;}

/* ─── FLOATING NAV (Web3 Premium Dashboard) ─── */
.rsp-page-nav-wrapper {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
  max-width: calc(100vw - 32px);
  width: max-content;
  background: rgba(20, 20, 20, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1);
  padding: 6px;
  display: flex;
}
.rsp-page-nav-scroll {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12px, black calc(100% - 12px), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 12px, black calc(100% - 12px), transparent 100%);
  padding: 0 8px;
}
.rsp-page-nav-scroll::-webkit-scrollbar {
  display: none;
}
.rsp-page-nav-item {
  scroll-snap-align: center;
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  text-transform: uppercase;
  letter-spacing: .05em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
.rsp-page-nav-item:hover:not(.active) {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}
.rsp-page-nav-item.active {
  background: #F5C842;
  color: #111;
  box-shadow: 0 2px 10px rgba(245, 200, 66, 0.3);
  transform: scale(1.02);
}

/* ─── TABLET ≤1024px ─── */
@media(max-width:1024px){
  .rsp-cards-grid{grid-template-columns:repeat(auto-fill,minmax(280px,1fr));}
  .rsp-admin-metrics{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));}
  .rsp-proyecto-grid{grid-template-columns:1fr !important;}
  .rsp-exp-grid{grid-template-columns:1fr !important;}
  .rsp-split{flex-direction:column !important;}
  .rsp-split > .rsp-split-left{width:100% !important;min-height:auto !important;border-right:none !important;border-bottom:2px solid var(--text-main) !important;}
  .rsp-footer-grid{grid-template-columns:1fr 1fr !important;}
  .rsp-fees-grid{grid-template-columns:1fr 1fr !important;}
}

/* ─── MOBILE ≤640px ─── */
@media(max-width:640px){
  .rsp-cards-grid{grid-template-columns:1fr !important;}
  .rsp-form-grid{grid-template-columns:1fr !important;}
  .rsp-milestone-grid{grid-template-columns:1fr !important;}
  .rsp-admin-metrics{grid-template-columns:1fr 1fr !important;}

  .rsp-nav-links{display:none !important;}
  .rsp-nav-wallet-addr{display:none !important;}

  .rsp-page-nav-wrapper { bottom: 16px !important; max-width: calc(100vw - 16px) !important; padding: 5px !important; }
  .rsp-page-nav-item { padding: 7px 14px !important; font-size: 10px !important; }

  .rsp-hero{padding:84px 16px 48px !important;min-height:auto !important;}
  .rsp-hero h1{font-size:clamp(32px,10vw,48px) !important;}
  .rsp-hero-bee{display:none !important;}
  .rsp-hero-badge{flex-wrap:wrap !important;font-size:9px !important;padding:5px 10px !important;}
  .rsp-hero-cta{flex-direction:column !important;align-items:stretch !important;}
  .rsp-hero-cta button{width:100% !important;justify-content:center !important;}
  .rsp-stats-bar > div{border-right:none !important;border-bottom:2px solid var(--text-main) !important;}
  .rsp-stats-bar > div:last-child{border-bottom:none !important;}

  .rsp-section{padding:40px 16px !important;}
  .rsp-trust-strip{flex-direction:column !important;align-items:flex-start !important;gap:10px !important;padding:16px !important;}
  .rsp-roadmap-row{flex-wrap:wrap !important;gap:10px !important;}
  .rsp-roadmap-inner{min-width:100% !important;}

  .rsp-cta-email{flex-direction:column !important;}
  .rsp-cta-email input{border-radius:4px !important;border-right:2px solid var(--text-main) !important;}
  .rsp-cta-email button{border-radius:4px !important;width:100% !important;justify-content:center !important;}

  .rsp-footer-grid{grid-template-columns:1fr !important;}

  .rsp-proyecto-grid{grid-template-columns:1fr !important;}
  .rsp-proyecto-widget{position:static !important;}
  .rsp-proyecto-tabs button{font-size:10px !important;padding:10px 4px !important;}

  .rsp-dash-wrap{flex-direction:column !important;}
  .rsp-dash-sidebar{
    width:100% !important;
    flex-direction:row !important;
    overflow-x:auto !important;
    flex-wrap:nowrap !important;
    -webkit-overflow-scrolling:touch;
    border-right:none !important;
    border-bottom:2px solid var(--text-main) !important;
    padding:8px !important;
    gap:4px !important;
    flex-shrink:0 !important;
  }
  .rsp-dash-sidebar .nav-item,
  .rsp-dash-sidebar .nav-item-dark{
    white-space:nowrap !important;
    flex-shrink:0 !important;
    padding:6px 10px !important;
    font-size:11px !important;
  }
  .rsp-dash-sidebar .rsp-sidebar-bottom{display:none !important;}
  .rsp-dash-main{padding:14px !important;overflow-x:hidden !important;}

  .rsp-split{flex-direction:column !important;}
  .rsp-split > .rsp-split-left{
    width:100% !important;
    padding:30px 20px !important; 
    min-height:auto !important;
    border-right:none !important;
    border-bottom:2px solid var(--text-main) !important;
  }
  .rsp-split > .rsp-split-right{padding:22px 16px !important;} 
  .rsp-step-label{display:none !important;}

  .rsp-exp-grid{grid-template-columns:1fr !important;}
  .rsp-exp-sidebar{position:static !important;}
  .rsp-exp-stats > div{border-right:none !important;border-bottom:2px solid var(--text-main) !important;}
  .rsp-exp-stats > div:last-child{border-bottom:none !important;}

  .rsp-admin-wrap{flex-direction:column !important;}
  .rsp-admin-sidebar{
    width:100% !important;
    flex-direction:row !important;
    overflow-x:auto !important;
    flex-wrap:nowrap !important;
    -webkit-overflow-scrolling:touch;
    border-right:none !important;
    border-bottom:1.5px solid #222 !important;
    padding:7px 6px !important;
    gap:3px !important;
  }
  .rsp-admin-sidebar .nav-item-dark{
    white-space:nowrap !important;
    flex-shrink:0 !important;
    padding:6px 9px !important;
    font-size:10px !important;
  }
  .rsp-admin-sidebar .rsp-sidebar-bottom{display:none !important;}
  .rsp-admin-main{padding:12px !important;}
  .rsp-fees-grid{grid-template-columns:1fr !important;}
}
`

// ═══════════════════════════════════════════════════════════════════
// SVG COMPONENTS (REPLACING EMOJIS)
// ═══════════════════════════════════════════════════════════════════
const CatIcon = ({ cat, size=24 }) => {
  const s = { width: size, height: size, stroke: "currentColor", strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } };
  switch(cat) {
    case "ENERGÍA": return <svg {...s} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#F5C842" stroke="var(--text-main)"/></svg>;
    case "AGRI-TECH": return <svg {...s} viewBox="0 0 24 24"><path d="M12 22c4-4 8-9.33 8-14a8 8 0 1 0-16 0c0 4.67 4 10 8 14z" fill="#DCFCE7" stroke="var(--text-main)"/><path d="M12 22V10" stroke="var(--text-main)"/></svg>;
    case "EDUCACIÓN": return <svg {...s} viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="#F3E8FF" stroke="var(--text-main)"/></svg>;
    case "FINTECH": return <svg {...s} viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" fill="#FEF3C7" stroke="var(--text-main)"/><line x1="2" y1="10" x2="22" y2="10" stroke="var(--text-main)"/></svg>;
    case "SALUD": return <svg {...s} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#FEE2E2" stroke="var(--text-main)"/></svg>;
    case "AGUA": return <svg {...s} viewBox="0 0 24 24"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.7L12 3 8 9.3C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" fill="#E0F2FE" stroke="var(--text-main)"/></svg>;
    default: return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
  }
};

const TrustIcon = ({ type }) => {
  const s = { width: 28, height: 28, stroke: "#fff", strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } };
  switch(type) {
    case "avax": return <svg {...s} viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/><path d="M12 10l-4 8h8l-4-8z" fill="#E84142" stroke="none"/></svg>;
    case "speed": return <svg {...s} viewBox="0 0 24 24" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#F5C842"/></svg>;
    case "security": return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#D4841A"/></svg>;
    case "fee": return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h6M9 15h6" stroke="#22C55E"/></svg>;
    case "wallet": return <svg {...s} viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-8H4z" fill="#0EA5E9" fillOpacity="0.2"/></svg>;
    default: return null;
  }
};

function ProjectCover({ cat }) {
  const s = { width: '100%', height: '100%', display: 'block', objectFit: 'cover' };
  if (cat === "ENERGÍA") {
    return (
      <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="solar" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#F5C842" stroke="var(--text-main)" strokeWidth="1.5" opacity="0.8"/>
            <line x1="20" y1="0" x2="20" y2="40" stroke="var(--text-main)" strokeWidth="1.5" opacity="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#solar)"/>
        <circle cx="50" cy="140" r="100" fill="#E6A817" stroke="var(--text-main)" strokeWidth="3"/>
        <path d="M300,140 Q350,80 400,140 Z" fill="var(--bg-main)" opacity="0.3"/>
      </svg>
    );
  }
  if (cat === "AGRI-TECH") {
    return (
      <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#DCFCE7"/>
        <path d="M-50,140 Q100,20 250,140 T550,140" fill="#22C55E" stroke="var(--text-main)" strokeWidth="3" opacity="0.9"/>
        <path d="M0,140 Q150,80 300,140 T600,140" fill="#166534" stroke="var(--text-main)" strokeWidth="3" opacity="0.4"/>
        <circle cx="320" cy="50" r="30" fill="#F5C842" stroke="var(--text-main)" strokeWidth="3"/>
      </svg>
    );
  }
  if (cat === "EDUCACIÓN") {
    return (
      <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F3E8FF"/>
        <path d="M0,0 L400,140 L0,140 Z" fill="#8B5CF6" opacity="0.1"/>
        <rect x="150" y="40" width="100" height="120" rx="8" fill="var(--bg-main)" stroke="var(--text-main)" strokeWidth="3"/>
        <rect x="160" y="50" width="80" height="40" fill="#8B5CF6" rx="4" opacity="0.8"/>
        <circle cx="200" cy="110" r="6" fill="var(--text-main)"/>
      </svg>
    );
  }
  if (cat === "FINTECH") {
    return (
      <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FEF3C7"/>
        <path d="M0,70 L400,70" stroke="var(--text-main)" strokeWidth="3" strokeDasharray="10 15" opacity="0.5"/>
        <path d="M0,35 L400,35" stroke="var(--text-main)" strokeWidth="2" strokeDasharray="5 10" opacity="0.3"/>
        <path d="M0,105 L400,105" stroke="var(--text-main)" strokeWidth="2" strokeDasharray="5 10" opacity="0.3"/>
        <rect x="120" y="30" width="160" height="100" rx="12" fill="#D4841A" stroke="var(--text-main)" strokeWidth="3"/>
        <rect x="120" y="55" width="160" height="20" fill="var(--text-main)"/>
        <rect x="140" y="95" width="30" height="15" rx="4" fill="#F5C842"/>
      </svg>
    );
  }
  if (cat === "SALUD") {
    return (
      <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#FEE2E2"/>
        <path d="M0,100 L80,100 L110,30 L160,140 L200,100 L400,100" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinejoin="round"/>
        <circle cx="300" cy="70" r="40" fill="var(--bg-main)" stroke="var(--text-main)" strokeWidth="3"/>
        <path d="M285,70 L315,70 M300,55 L300,85" stroke="#EF4444" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    );
  }
  if (cat === "AGUA") {
    return (
      <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#E0F2FE"/>
        <path d="M0,120 Q100,50 200,120 T400,120 L400,140 L0,140 Z" fill="#0EA5E9" opacity="0.4"/>
        <path d="M-50,140 Q100,80 250,140 T550,140 L550,150 L-50,150 Z" fill="#0284C7" opacity="0.6"/>
        <path d="M120,40 C120,40 95,80 95,100 A25,25 0 0,0 145,100 C145,80 120,40 120,40 Z" fill="var(--bg-main)" stroke="var(--text-main)" strokeWidth="3"/>
      </svg>
    );
  }
  return (
    <svg style={s} viewBox="0 0 400 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="var(--bg-gray)"/>
      <circle cx="200" cy="70" r="40" fill="none" stroke="var(--text-main)" strokeWidth="3" strokeDasharray="10 10"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════
const PROJECTS=[
  {id:1,cat:"ENERGÍA",title:"SolarHogar LATAM",loc:"Bogotá, CO",raised:18400,goal:25000,backers:143,days:12,live:true,contract:"0xA3f2...9c4E",tokenSymbol:"SLR",desc:"Paneles solares para 150 hogares rurales sin red eléctrica. Revenue sharing 8%."},
  {id:2,cat:"AGRI-TECH",title:"AgroDAO Bolivia",loc:"Santa Cruz, BO",raised:31000,goal:40000,backers:211,days:5,live:true,contract:"0xB7d1...5a1F",tokenSymbol:"AGR",desc:"Cooperativa agrícola tokenizada. Los agricultores son dueños del protocolo."},
  {id:3,cat:"EDUCACIÓN",title:"Aula Digital Mx",loc:"Oaxaca, MX",raised:9200,goal:15000,backers:87,days:22,live:true,contract:"0xD5c3...7d2B",tokenSymbol:"EDU",desc:"Tablets y conectividad para 500 niños en zonas marginadas."},
  {id:4,cat:"FINTECH",title:"MicroPréstamo AR",loc:"Buenos Aires, AR",raised:44200,goal:50000,backers:318,days:8,live:true,contract:"0xC2f0...8b3A",tokenSymbol:"MPR",desc:"Microcréditos DeFi con scoring reputacional on-chain en Avalanche."},
  {id:5,cat:"SALUD",title:"CliniBus Perú",loc:"Lima, PE",raised:7800,goal:20000,backers:62,days:31,live:false,contract:"0xE8f4...2e3C",tokenSymbol:"CLN",desc:"Clínicas móviles con IA diagnóstica para zonas sin hospitales."},
  {id:6,cat:"AGUA",title:"AguaPura Chile",loc:"Atacama, CL",raised:12600,goal:18000,backers:99,days:19,live:false,contract:"0xF1a5...9b0D",tokenSymbol:"APR",desc:"Captación de agua para comunidades del desierto atacameño."},
];
const MILESTONES=[
  {id:1,title:"Adquisición de Equipos",pct:30,amount:7500,asset:"USDC",status:"released",hash:"0x7f3a...d92b",date:"Feb 2025",votes:143,required:100},
  {id:2,title:"Instalación Lote 1 (50 hogares)",pct:30,amount:7500,asset:"USDC",status:"released",hash:"0x2c1e...4a88",date:"Mar 2025",votes:128,required:100},
  {id:3,title:"Instalación Lote 2 (100 hogares)",pct:25,amount:6250,asset:"USDC",status:"active",hash:null,date:"Abr 2025",votes:47,required:72},
  {id:4,title:"Operación & Mantenimiento 6m",pct:15,amount:3750,asset:"USDC",status:"pending",hash:null,date:"Jun 2025",votes:0,required:72},
];
const PORTFOLIO=[
  {symbol:"SLR",name:"SolarHogar LATAM",cat:"ENERGÍA",invested:500,currentVal:540,tokens:120,pending:18,contract:"0xA3f2...9c4E"},
  {symbol:"AGR",name:"AgroDAO Bolivia",cat:"AGRI-TECH",invested:250,currentVal:268,tokens:60,pending:9.5,contract:"0xB7d1...5a1F"},
  {symbol:"MPR",name:"MicroPréstamo AR",cat:"FINTECH",invested:1000,currentVal:1165,tokens:240,pending:42,contract:"0xC2f0...8b3A"},
];
const LIVE_TXS=[
  "SolarHogar LATAM — Hito 2 liberado +$7,500 USDC · 0x7f3a...d92b · Fuji #4,291,112",
  "AgroDAO Bolivia — Inversión +$250 USDC · 0xa1b2...cc44 · Fuji #4,291,098",
  "MicroPréstamo AR — Revenue share +$4,200 USDC · 0x9e4b...ff01 · Fuji #4,290,988",
  "CliniBus Perú — Inversión en escrow +1.2 AVAX · 0x2c1e...4a88 · Fuji #4,290,750",
];
const ADMIN_TXS=[
  {hash:"0x7f3a...d92b",project:"SolarHogar LATAM",type:"RELEASE",amount:"+$7,500 USDC",block:"#4,291,112",time:"hace 2h"},
  {hash:"0x9e4b...ff01",project:"AgroDAO Bolivia",type:"EVIDENCE",amount:"—",block:"#4,291,099",time:"hace 5h"},
  {hash:"0x2c1e...4a88",project:"MicroPréstamo AR",type:"FEE",amount:"-$663 USDC",block:"#4,290,800",time:"ayer"},
  {hash:"0xa1b2...cc44",project:"SolarHogar LATAM",type:"INVEST",amount:"+$150 USDC",block:"#4,290,750",time:"ayer"},
];
const ADMIN_PROJECTS=[
  {id:"SLR",name:"SolarHogar LATAM",raised:18400,locked:3400,released:15000,fee:225,backers:143,risk:"LOW",contract:"0xA3f2...9c4E"},
  {id:"AGR",name:"AgroDAO Bolivia",raised:31000,locked:6200,released:24800,fee:372,backers:211,risk:"LOW",contract:"0xB7d1...5a1F"},
  {id:"MPR",name:"MicroPréstamo AR",raised:44200,locked:0,released:44200,fee:663,backers:318,risk:"NONE",contract:"0xC2f0...8b3A"},
  {id:"EDU",name:"Aula Digital Mx",raised:9200,locked:9200,released:0,fee:0,backers:87,risk:"MED",contract:"0xD5c3...7d2B"},
  {id:"CLN",name:"CliniBus Perú",raised:7800,locked:7800,released:0,fee:0,backers:62,risk:"HIGH",contract:"0xE8f4...2e3C"},
];
const MSC={
  released:{bg:"var(--bg-success)",color:"var(--text-success)",border:C.success,label:"✓ LIBERADO"},
  active:{bg:"var(--bg-warn)",color:"var(--text-warn)",border:C.yellow,label:"⏳ ACTIVO"},
  pending:{bg:"var(--bg-gray)",color:"var(--text-main)",border:"var(--border-gray)",label:"🔒 PENDIENTE"}
};
const PROJECT_REWARDS=[
  {id:"r1",title:"Semilla Sol",minAmount:50,type:"NFT Badge",desc:"Recibe un NFT conmemorativo 'Semilla' en Avalanche Fuji y acceso al canal privado de Discord para inversores."},
  {id:"r2",title:"Panel Sponsor",minAmount:250,type:"NFT + Rev Share",desc:"Placa virtual on-chain con tu nombre en un panel solar + NFT 'Panel Sponsor' + 8% de Revenue Share proporcional."},
  {id:"r3",title:"Gobernanza VIP",minAmount:1000,type:"VIP + Rev Share",desc:"Poder de voto 2x en decisiones de la comunidad + NFT 'VIP' animado + llamada trimestral estratégica con los founders."},
  {id:"r4",title:"Founders Club",minAmount:5000,type:"Whitelabel + Board",desc:"Todo lo anterior + Asiento en el consejo de gobernanza + Setup whitelabel de paneles solares para tu comunidad."}
];

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════
function Logo({ isDarkBg }){
  const tColor = isDarkBg ? "#fff" : "var(--text-main)";
  return (
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:34,height:34,background:C.yellow,border:`2px solid ${tColor}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:17,boxShadow:`2px 2px 0 ${tColor}`,color:"#111"}}>C</div>
      <span style={{fontWeight:900,fontSize:17,letterSpacing:".05em",textTransform:"uppercase", color:tColor}}>COLMENA</span>
      <span style={{fontSize:10,background:"var(--bg-avax)",border:`1.5px solid ${C.avax}55`,color:C.avax,padding:"2px 8px",borderRadius:999,fontWeight:700,marginLeft:2}}>🔺 FUJI</span>
    </div>
  );
}

function Ticker(){return <div className="ticker-wrap"><div className="ticker-inner">{[...LIVE_TXS,...LIVE_TXS].map((tx,i)=><span key={i} className="ticker-item"><span style={{width:6,height:6,borderRadius:"50%",background:C.success,animation:"pulse 1.5s infinite",display:"inline-block"}}/>{tx}<span style={{opacity:.3}}>·</span></span>)}</div></div>;}

function Dot({color=C.success}){return <span style={{width:8,height:8,borderRadius:"50%",background:color,animation:"pulse 1.5s infinite",display:"inline-block"}}/>;}

function AvaxPill({text="Avalanche Fuji · Chain 43113",small}){return <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--bg-avax)",border:`1.5px solid ${C.avax}55`,color:C.avax,borderRadius:999,padding:small?"2px 8px":"5px 12px",fontSize:small?9:11,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{text}</span>;}

function Hash({h}){
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    const text = h.includes('·') ? h.split('·')[0].trim() : h.replace(/.*:\s*/, '');
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch(err){}
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(()=>setCopied(false), 1500);
  };
  return (
    <span className="hash-copy" onClick={handleCopy} title="Copiar Hash">
      {h} {copied ? <span style={{color:C.success, fontSize:10}}>✓</span> : <span style={{opacity:0.4, fontSize:10}}>⧉</span>}
    </span>
  );
}

function SnowtraceLink(){return <a href="https://testnet.snowtrace.io" target="_blank" rel="noreferrer" style={{fontSize:10,background:"var(--bg-avax)",color:C.avax,border:`1.5px solid ${C.avax}55`,padding:"2px 8px",borderRadius:999,fontWeight:700,textDecoration:"none"}}>Snowtrace ↗</a>;}

function ProgressBar({pct,color=C.yellow,h=8}){return <div style={{height:h,background:C.grayBorder,border:`1.5px solid var(--text-main)`,borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:pct>=100?C.success:color,borderRadius:999,transition:"width .5s ease"}}/></div>;}

function BeeCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice || window.innerWidth <= 640) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 641px) {
          * { cursor: none !important; }
          .bee-custom-cursor { display: flex !important; }
        }
        @media (max-width: 640px) {
          .bee-custom-cursor { display: none !important; }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="bee-custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          fontSize: '28px',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate3d(-100px, -100px, 0)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '-14px',
          marginTop: '-14px',
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
          willChange: 'transform'
        }}
      >
        🐝
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// NAVIGATION BAR
// ═══════════════════════════════════════════════════════════════════
function Navbar({page,setPage,role,wallet}){
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { ready, authenticated, user, login, logout } = usePrivy();
  const isAdmin=page==="admin";
  const bg=isAdmin?"#0D0D0D":"var(--bg-main)";
  const border=isAdmin?"1.5px solid #222":`2px solid var(--text-main)`;
  const h=isAdmin?56:64;
  return <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:300,background:bg,borderBottom:border,height:h,display:"flex",alignItems:"center",padding:"0 14px",justifyContent:"space-between",gap:8,transition:"background 0.3s"}}>
    <div onClick={()=>setPage("landing")} style={{cursor:"pointer",flexShrink:0}}><Logo isDarkBg={isAdmin} /></div>
    {!isAdmin&&<div className="rsp-nav-links" style={{display:"flex",gap:4}}>
      {[{k:"explorador",l:t("nav_explore")},{k:"crear",l:t("nav_create")},{k:"admin",l:t("nav_admin")}].map(n=><button key={n.k} onClick={()=>setPage(n.k)} className={`nav-link ${page === n.k ? 'active' : ''}`}>{n.l}</button>)}
    </div>}
    {isAdmin&&<div className="rsp-nav-links" style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:"rgba(255,255,255,.3)"}}><Dot/><span style={{fontFamily:"'JetBrains Mono',monospace"}}>🔺 Fuji · Chain 43113 · Block #4,291,141</span></div>}
    <div style={{display:"flex",gap:12,alignItems:"center"}}>
      
      <div style={{display:"flex", background:"var(--bg-gray)", border:"1px solid var(--border-gray)", borderRadius:999, padding:3, alignItems:"center", gap:2}}>
        <button onClick={toggleTheme} style={{background:theme==='dark'?"var(--text-main)":"transparent", color:theme==='dark'?"var(--bg-main)":"var(--text-main)", border:"none", borderRadius:999, padding:"4px 8px", fontSize:12, cursor:"pointer", transition:"all 0.2s"}} title="Cambiar Tema">{theme === 'dark' ? '🌙' : '☀️'}</button>
        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} style={{background:lang==='en'?"var(--text-main)":"transparent", color:lang==='en'?"var(--bg-main)":"var(--text-main)", border:"none", borderRadius:999, padding:"4px 8px", fontSize:10, fontWeight:800, cursor:"pointer", transition:"all 0.2s"}} title="Cambiar Idioma">{lang.toUpperCase()}</button>
      </div>

      {ready && authenticated ? <div style={{display:"flex",alignItems:"center",gap:7,background:isAdmin?"#1A1A1A":"var(--bg-gray)",border:isAdmin?"1px solid #333":`1.5px solid var(--border-gray)`,borderRadius:6,padding:"5px 10px"}}>
        <span style={{fontSize:14}}>{user?.wallet ? "🔺" : "🔑"}</span>
        <span className="rsp-nav-wallet-addr" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:isAdmin?C.yellow:C.avax,fontWeight:700}}>
          {user?.wallet?.address ? user.wallet.address.slice(0,6)+'...'+user.wallet.address.slice(-4) : user?.email?.address?.split('@')[0] || "User"}
        </span>
        <button onClick={logout} style={{background:'transparent', border:'none', cursor:'pointer', fontSize:10, marginLeft:4, color:'var(--text-main)'}} title="Cerrar sesión">✕</button>
      </div>:<>
        <button className="btn-outline" style={{padding:"7px 14px",fontSize:11,background:isAdmin?"#111":"transparent",color:isAdmin?"rgba(255,255,255,.6)":"var(--text-main)",borderColor:isAdmin?"#333":"var(--text-main)"}} onClick={login}>{t("nav_login")}</button>
        <button className="btn-primary" style={{padding:"7px 16px",fontSize:11,background:isAdmin?"#F5C842":"var(--text-main)",color:isAdmin?"#111":"var(--bg-main)",borderColor:isAdmin?"#333":"var(--text-main)"}} onClick={login}>{t("nav_register")}</button>
      </>}
      {role&&<div style={{width:32,height:32,borderRadius:"50%",background:"var(--text-main)",color:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,border:`2px solid var(--text-main)`,cursor:"pointer",flexShrink:0}} onClick={()=>setPage(role==="creator"?"dashboard-creator":"dashboard-investor")}>{role==="creator"?"CR":"IN"}</div>}
    </div>
  </nav>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: LANDING
// ═══════════════════════════════════════════════════════════════════
function Landing({setPage}){
  const { t } = useI18n();
  const [filter,setFilter]=useState("TODOS");
  const [email,setEmail]=useState("");const [sent,setSent]=useState(false);
  
  const bee1Ref = useRef(null);
  const bee2Ref = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let currentX1 = 0, currentY1 = 0;
    let currentX2 = 0, currentY2 = 0;
    let rafId;

    const onMouseMove = (e) => {
      if (window.innerWidth <= 640) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX = normX * 30;
      mouseY = normY * 30;
    };

    const animate = () => {
      if (window.innerWidth > 640) {
        currentX1 += (mouseX - currentX1) * 0.08;
        currentY1 += (mouseY - currentY1) * 0.08;
        currentX2 += (-mouseX * 0.5 - currentX2) * 0.08;
        currentY2 += (-mouseY * 0.5 - currentY2) * 0.08;
        
        if (bee1Ref.current) bee1Ref.current.style.transform = `translate(${currentX1}px, ${currentY1}px)`;
        if (bee2Ref.current) bee2Ref.current.style.transform = `translate(${currentX2}px, ${currentY2}px)`;
      } else {
        if (bee1Ref.current) bee1Ref.current.style.transform = `translate(0px, 0px)`;
        if (bee2Ref.current) bee2Ref.current.style.transform = `translate(0px, 0px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const CATS=["TODOS","ENERGÍA","AGRI-TECH","EDUCACIÓN","FINTECH","SALUD","AGUA"];
  const filtered=filter==="TODOS"?PROJECTS:PROJECTS.filter(p=>p.cat===filter);
  const STATS=[{icon:"🔺",l:"Red",v:"Avalanche Fuji"},{icon:"💰",l:"En Escrow",v:"$284K USDC"},{icon:"⚡",l:"Finalidad",v:"~2s"},{icon:"🏗️",l:"Proyectos",v:"47 activos"}];
  const STEPS=[{n:"01",i:"🔑",t:"Conecta tu Wallet",d:"Core Wallet o MetaMask en Fuji (43113). Google OAuth sin cripto."},{n:"02",i:"🔍",t:"Elige un Proyecto",d:"Hitos públicos en ColmenaCampaign.sol, verificables en Snowtrace."},{n:"03",i:"🔒",t:"Escrow Avalanche",d:"Tu USDC/AVAX va al contrato — el creador cobra solo al cumplir hitos."},{n:"04",i:"📈",t:"Recibe Dividendos",d:"Tokens ERC-20 en tu wallet. Revenue sharing automático en USDC."}];
  const ROADMAP=[{q:"Q1 2026",l:"Escrow Avalanche Fuji + ColmenaCampaign.sol",pct:65,active:true},{q:"Q2 2026",l:"Pilotos B2B + Google OAuth + Gas Abstraction",pct:0},{q:"Q3 2026",l:"Mainnet Avalanche C-Chain — USDC/AVAX",pct:0},{q:"Q4 2026",l:"API SaaS + Impact Subnet propia",pct:0}];
  return <div>
    <BeeCursor />
    {/* HERO */}
    <section className="rsp-hero" style={{paddingTop:64,background:"var(--bg-hero)",backgroundImage:HEX,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"110px 24px 72px",position:"relative",overflow:"hidden", transition:"background 0.3s ease"}}>
      
      {/* Se aíslan las animaciones: El div exterior es para el mouse (Parallax), el interior para el CSS (Flotar) */}
      <div className="rsp-hero-bee" style={{position:"absolute",top:100,right:"7%",zIndex:10}} ref={bee1Ref}>
        <div style={{fontSize:80,animation:"floatBee 3s ease-in-out infinite",userSelect:"none"}}>🐝</div>
      </div>
      
      <div className="rsp-hero-bee" style={{position:"absolute",bottom:80,left:"5%",opacity:.65,zIndex:10}} ref={bee2Ref}>
        <div style={{fontSize:52,animation:"floatBee 4.5s 1.2s ease-in-out infinite",userSelect:"none"}}>🍯</div>
      </div>

      <div style={{position:"absolute",right:"10%",top:"50%",transform:"translateY(-50%)",fontSize:200,opacity:.04,userSelect:"none",pointerEvents:"none"}}>🔺</div>
      <div className="d0 rsp-hero-badge" style={{display:"inline-flex",alignItems:"center",gap:8,background:"var(--text-main)",color:"var(--bg-main)",borderRadius:999,padding:"6px 16px",fontSize:11,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",marginBottom:26}}>
        <Dot/> 🔺 AVALANCHE FUJI TESTNET · CHAIN ID 43113 · Q1 2026
      </div>
      <h1 className="d1 text-gray-900 dark:text-white" style={{fontSize:"clamp(36px,8.5vw,96px)",fontWeight:900,textTransform:"uppercase",lineHeight:.88,letterSpacing:"-.025em",color:"var(--text-main)",maxWidth:900,marginBottom:24}}>
        {t("hero_title1")}<br/>{t("hero_title2")} <span style={{color:C.orange}}>{t("hero_title_highlight")}</span><br/>{t("hero_title3")}
      </h1>
      <p className="d2 text-gray-900 dark:text-white" style={{fontSize:16,lineHeight:1.65,color:"var(--text-main)",maxWidth:480,marginBottom:12,opacity:.8}}>
        {t("hero_desc")}
      </p>
      <div className="d2" style={{marginBottom:30}}><AvaxPill text="OpenZeppelin Escrow · wagmi · Core / MetaMask · USDC · AVAX"/></div>
      <div className="d3 rsp-hero-cta" style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:52}}>
        <button className="btn-primary" style={{fontSize:14,padding:"14px 32px",background:"var(--text-main)",color:"var(--bg-main)",borderColor:"var(--text-main)",boxShadow:"4px 4px 0 var(--text-main)"}} onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}>{t("hero_btn_explore")}</button>
        <button className="btn-outline" style={{fontSize:14,padding:"14px 32px",background:"rgba(255,255,255,.1)",color:"var(--text-main)",borderColor:"var(--text-main)"}} onClick={()=>setPage("crear")}>{t("hero_btn_create")}</button>
      </div>
      <div className="d4 rsp-stats-bar" style={{display:"flex",gap:0,background:"var(--bg-main)",color:"var(--text-main)",border:`2px solid var(--text-main)`,borderRadius:8,boxShadow:`4px 4px 0 var(--text-main)`,overflow:"hidden",flexWrap:"wrap",maxWidth:800,width:"100%"}}>
        {STATS.map((s,i)=><div key={i} style={{flex:"1 1 150px",padding:"18px 20px",borderRight:i<3?`2px solid var(--text-main)`:"none",textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:4}}>{s.icon}</div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:700,color:C.orange}}>{s.v}</div>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",opacity:.5,marginTop:3,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{s.l}</div>
        </div>)}
      </div>
    </section>
    <Ticker/>
    {/* PROJECTS */}
    <section id="projects" style={{padding:"72px 24px",background:"var(--bg-main)"}}>
      <div style={{maxWidth:1160,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--text-main)",color:"var(--bg-main)",borderRadius:999,padding:"4px 14px",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:14}}>🔺 CONTRATOS EN AVALANCHE FUJI</div>
          <h2 style={{fontSize:"clamp(30px,5vw,56px)",fontWeight:900,textTransform:"uppercase",letterSpacing:"-.02em",lineHeight:.9,marginBottom:12,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">FINANCIA EL <span style={{color:C.orange}}>CAMBIO</span><br/>REAL EN LATAM</h2>
          <p style={{fontSize:13,opacity:.6,maxWidth:440,margin:"0 auto",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Cada proyecto tiene un contrato <Hash h="ColmenaCampaign.sol"/> verificable en Snowtrace.</p>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:30}}>
          {CATS.map(c=><button key={c} className={`pill${filter===c?" active":""}`} onClick={()=>setFilter(c)}>{c}</button>)}
        </div>
        <div className="rsp-cards-grid">
          {filtered.map((p, index)=>{
            const pct=Math.round(p.raised/p.goal*100);
            return <div key={p.id} className={`card card-hover d${Math.min(index, 4)}`} onClick={()=>setPage("proyecto")} style={{overflow:"hidden"}}>
              <div style={{height:140,position:"relative",borderBottom:`2px solid var(--text-main)`,overflow:"hidden"}}>
                <ProjectCover cat={p.cat} />
                {p.live&&<span style={{position:"absolute",top:8,right:8,background:C.yellow,border:`1.5px solid var(--text-main)`,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:2,textTransform:"uppercase",display:"flex",alignItems:"center",gap:4,color:"#111"}}><Dot color="#111" style={{width:5,height:5}}/>LIVE</span>}
                <span style={{position:"absolute",top:8,left:8,background:"var(--bg-main)",border:`1.5px solid var(--text-main)`,borderRadius:999,padding:"2px 8px",fontSize:9,fontWeight:700,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{p.cat}</span>
              </div>
              <div style={{padding:"13px 15px 16px"}}>
                <div style={{fontWeight:800,fontSize:14,textTransform:"uppercase",marginBottom:2,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{p.title}</div>
                <div style={{fontSize:11,color:C.orange,fontWeight:600,marginBottom:7}}>📍 {p.loc}</div>
                <p style={{fontSize:12,lineHeight:1.55,color:"var(--text-main)",opacity:.7,marginBottom:12}} className="text-gray-900 dark:text-white">{p.desc}</p>
                <div style={{marginBottom:10}}><ProgressBar pct={pct}/><div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginTop:4}}><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.orange}}>${p.raised.toLocaleString()} USDC</span><span style={{opacity:.5,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{pct}% · {p.days}d</span></div></div>
                <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}><span style={{fontSize:10,background:"var(--bg-gray)",border:`1.5px solid var(--border-gray)`,padding:"2px 7px",borderRadius:999,fontWeight:600,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">👥 {p.backers}</span><AvaxPill text="Fuji Escrow" small/></div>
                <button className="btn-primary" style={{width:"100%",justifyContent:"center",fontSize:12,padding:"9px"}}>💰 Invertir en USDC / AVAX</button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </section>
    {/* HOW IT WORKS */}
    <section style={{padding:"72px 24px",background:"var(--bg-hero)",backgroundImage:HEX,color:"var(--text-main)", transition:"background 0.3s ease"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <h2 style={{fontSize:"clamp(30px,5vw,56px)",fontWeight:900,textTransform:"uppercase",letterSpacing:"-.02em",lineHeight:.9,marginBottom:12}}>DE DONANTE A<br/><span style={{color:C.orange}}>ACCIONISTA</span> EN 4 PASOS</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:16,marginBottom:30}}>
          {STEPS.map((s,i)=><div key={i} className="card" style={{padding:"22px 20px",position:"relative",background:"var(--bg-main)",borderColor:"var(--text-main)"}}>
            <div style={{position:"absolute",top:-14,left:16,background:"var(--text-main)",color:C.yellow,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:11,padding:"3px 11px",borderRadius:999}}>{s.n}</div>
            <div style={{fontSize:34,marginBottom:12,marginTop:6}}><TrustIcon type={s.i === "🔑" ? "wallet" : s.i === "🔍" ? "security" : s.i === "🔒" ? "avax" : "fee"} /></div>
            <div style={{fontWeight:800,fontSize:14,textTransform:"uppercase",marginBottom:7,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{s.t}</div>
            <p style={{fontSize:12,lineHeight:1.6,color:"var(--text-main)",opacity:0.8}} className="text-gray-900 dark:text-white">{s.d}</p>
          </div>)}
        </div>
        <div className="rsp-trust-strip" style={{background:"#111",color:"#fff",borderRadius:8,padding:"20px 26px",display:"flex",alignItems:"center",justifyContent:"space-around",flexWrap:"wrap",gap:14}}>
          {[
            [{type:"avax"},"Avalanche C-Chain","Mainnet Q3 2026"],
            [{type:"speed"},"Finalidad ~2s","Fuji Testnet"],
            [{type:"security"},"OpenZeppelin Escrow","Solidity auditado"],
            [{type:"fee"},"1.5% Fee","Solo fondos liberados"],
            [{type:"wallet"},"Core / MetaMask","Sin custodia"]
          ].map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,flex:"1 1 150px"}}><TrustIcon type={t[0].type}/><div><div style={{fontWeight:700,fontSize:12,textTransform:"uppercase",color:"#fff"}}>{t[1]}</div><div style={{fontSize:10,opacity:.4,color:"#fff"}}>{t[2]}</div></div></div>)}
        </div>
      </div>
    </section>
    {/* ROADMAP */}
    <section style={{padding:"72px 24px",background:"#111"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}><h2 style={{fontSize:"clamp(30px,5vw,56px)",fontWeight:900,textTransform:"uppercase",letterSpacing:"-.02em",lineHeight:.9,color:"#fff"}}>EL CAMINO AL<br/><span style={{color:C.yellow}}>MAINNET</span></h2></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {ROADMAP.map((m,i)=><div key={i} style={{background:"var(--bg-main)",color:"var(--text-main)",border:`2px solid ${m.active?C.yellow:"var(--text-main)"}`,borderRadius:8,padding:"16px 20px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",boxShadow:m.active?`4px 4px 0 ${C.yellow}`:`4px 4px 0 var(--border-gray)`}}>
            <div style={{background:m.active?C.yellow:"var(--bg-gray)",border:`2px solid var(--text-main)`,borderRadius:4,padding:"3px 12px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,flexShrink:0,minWidth:86,textAlign:"center",color:m.active?"#111":"var(--text-main)"}} className={m.active?"":"text-gray-900 dark:text-white"}>{m.q}</div>
            <div className="rsp-roadmap-inner" style={{flex:1,minWidth:180}}><div style={{fontWeight:700,fontSize:13,textTransform:"uppercase",marginBottom:6,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{m.l}</div><ProgressBar pct={m.pct} color={C.yellow} h={6}/></div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:20,color:m.active?C.orange:"var(--text-main)",opacity:m.active?1:.5}} className={m.active?"":"text-gray-900 dark:text-white"}>{m.pct}%</div>
            {m.active&&<span style={{background:C.success,color:"#fff",fontSize:9,fontWeight:700,padding:"2px 9px",borderRadius:999,display:"flex",alignItems:"center",gap:4,border:`1.5px solid var(--text-main)`}}><Dot color="#fff" style={{width:5}}/>EN PROGRESO</span>}
          </div>)}
        </div>
      </div>
    </section>
    {/* CTA */}
    <section style={{padding:"72px 24px",background:"var(--bg-hero)",backgroundImage:HEX,textAlign:"center",color:"var(--text-main)", transition:"background 0.3s ease"}}>
      <div style={{maxWidth:540,margin:"0 auto"}}>
        <div style={{fontSize:64,marginBottom:8,animation:"floatBee 3s ease-in-out infinite"}}>🐝</div>
        <h2 style={{fontSize:"clamp(28px,5vw,52px)",fontWeight:900,textTransform:"uppercase",letterSpacing:"-.02em",lineHeight:.9,marginBottom:16,color:"var(--text-main)"}}>SÉ EL PRIMERO<br/>EN LA <span style={{color:C.orange}}>COLMENA</span></h2>
        <p style={{fontSize:14,lineHeight:1.6,marginBottom:28,opacity:.8,color:"var(--text-main)"}}>Acceso anticipado al protocolo en Avalanche Fuji. Sin spam.</p>
        {!sent?<div className="rsp-cta-email" style={{display:"flex",maxWidth:440,margin:"0 auto"}}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" style={{flex:1,borderRight:"none",borderRadius:"4px 0 0 4px",fontSize:14,background:"var(--bg-main)",color:"var(--text-main)",borderColor:"var(--text-main)"}} className="text-gray-900 dark:text-white" />
          <button className="btn-primary" style={{borderRadius:"0 4px 4px 0",boxShadow:`4px 4px 0 var(--text-main)`,background:"var(--text-main)",color:"var(--bg-main)",borderColor:"var(--text-main)",padding:"10px 20px",fontSize:12}} onClick={()=>email&&setSent(true)}>Unirme →</button>
        </div>:<div className="card su" style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 24px",background:"var(--bg-main)",borderColor:"var(--text-main)",color:"var(--text-main)"}}><span style={{fontSize:28,animation:"checkPop .5s ease forwards"}}>✅</span><div style={{textAlign:"left"}}><div style={{fontWeight:800,textTransform:"uppercase",fontSize:13,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">¡En la lista!</div><div style={{fontSize:11,opacity:.6,marginTop:2,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Te avisamos del beta en Avalanche Fuji.</div></div></div>}
        <p style={{fontSize:10,marginTop:12,opacity:.4,fontFamily:"'JetBrains Mono',monospace",color:"var(--text-main)"}}>FUJI TESTNET · CHAIN 43113 · SIN FONDOS REALES</p>
      </div>
    </section>
    {/* FOOTER */}
    <footer style={{background:"#111",color:"#fff",padding:"44px 24px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="rsp-footer-grid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:24,marginBottom:32}}>
          <div>
            <div style={{marginBottom:12}}><Logo isDarkBg={true} /></div>
            <p style={{fontSize:12,opacity:.4,lineHeight:1.6,maxWidth:220,marginBottom:12}}>Protocolo descentralizado de crowdfunding con escrow por hitos en Avalanche C-Chain.</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#1A1A1A",border:"1px solid #333",borderRadius:6,padding:"7px 11px"}}>
              <span>🔺</span><div><div style={{fontSize:10,fontWeight:700,color:C.yellow}}>Avalanche Fuji Testnet</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"rgba(255,255,255,.3)"}}>Chain ID: 43113</div></div>
            </div>
          </div>
          {[{t:"PLATAFORMA",l:["Proyectos","Crear Campaña","Cómo Funciona","Tokenización"]},{t:"RECURSOS",l:["Docs","Smart Contracts","Snowtrace Fuji","Blog"]},{t:"LEGAL",l:["Términos","Privacidad","Riesgos","Contacto"]}].map(col=><div key={col.t}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",opacity:.3,marginBottom:12,textTransform:"uppercase",color:"#fff"}}>{col.t}</div>
            {col.l.map(l=><div key={l} style={{marginBottom:8}}><a href="#" style={{fontSize:12,color:"#fff",textDecoration:"none",opacity:.5}}>{l}</a></div>)}
          </div>)}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:11,opacity:.3,color:"#fff"}}>© 2025 Colmena. Construido sobre Avalanche.</span>
          <div style={{background:C.yellow,color:C.black,fontSize:9,fontWeight:700,padding:"3px 11px",borderRadius:999,fontFamily:"'JetBrains Mono',monospace"}}>🔺 FUJI TESTNET v0.1.0 · CHAIN 43113</div>
        </div>
      </div>
    </footer>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: PROYECTO
// ═══════════════════════════════════════════════════════════════════
function Proyecto({setPage,wallet}){
  const { t } = useI18n();
  const { login, authenticated } = usePrivy();
  const [tab,setTab]=useState("hitos");
  const [asset,setAsset]=useState("USDC");
  const [amount,setAmount]=useState("");
  const [wStep,setWStep]=useState(authenticated?"amount":"connect");
  const [txStep,setTxStep]=useState("idle");
  const pct=Math.round(18400/25000*100);
  const QUICK=[5,10,25,50];

  useEffect(() => {
    if (authenticated) setWStep("amount");
  }, [authenticated]);

  const doDonate=()=>{if(!amount)return;setTxStep("confirming");setTimeout(()=>setTxStep("success"),1800);};

  const currentAmount = Number(amount) || 0;
  const activeRewardId = PROJECT_REWARDS.slice().reverse().find(r => currentAmount >= r.minAmount)?.id;

  const handleRewardClick = (r) => {
    setAmount(String(r.minAmount));
  };

  return <div style={{background:"var(--bg-gray)",minHeight:"100vh",paddingTop:64}}>
    <div style={{background:"var(--bg-hero)",backgroundImage:HEX,padding:"36px 24px 24px",borderBottom:`2px solid var(--text-main)`,color:"var(--text-main)", transition:"background 0.3s ease"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
          <button className="btn-outline" style={{padding:"5px 12px",fontSize:11,color:"var(--text-main)",borderColor:"var(--text-main)"}} onClick={()=>setPage("landing")}>← Proyectos</button>
          <span style={{background:"var(--text-main)",color:"var(--bg-main)",padding:"2px 10px",borderRadius:999,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>ENERGÍA LIMPIA</span>
          <span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,color:"var(--text-main)"}}><Dot/>CAMPAÑA ACTIVA</span>
          <AvaxPill small/>
        </div>
        <h1 style={{fontSize:"clamp(26px,4.5vw,52px)",fontWeight:900,textTransform:"uppercase",letterSpacing:"-.02em",lineHeight:1,marginBottom:12,color:"var(--text-main)"}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}><CatIcon cat="ENERGÍA" size={42}/> SolarHogar LATAM</div>
        </h1>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:"50%",background:"var(--text-main)",color:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,border:`2px solid var(--text-main)`}}>VT</div><div><div style={{fontSize:13,fontWeight:700,color:"var(--text-main)"}}>Valentina Torres</div><div style={{fontSize:10,opacity:.6,color:"var(--text-main)"}}>Creador verificado ✅</div></div></div>
      </div>
    </div>
    <div className="rsp-proyecto-grid" style={{maxWidth:1100,margin:"0 auto",padding:"24px 24px",display:"grid",gridTemplateColumns:"1fr 340px",gap:24,alignItems:"start"}}>
      <div>
        <p style={{fontSize:15,lineHeight:1.7,marginBottom:24,opacity:.85,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Instalamos paneles solares fotovoltaicos en comunidades rurales de Colombia sin acceso a red eléctrica. Cada hito representa un lote de 50 hogares electrificados, verificado on-chain mediante pruebas en IPFS ancladas al contrato ColmenaCampaign.sol en Avalanche Fuji.</p>
        <div className="rsp-proyecto-tabs" style={{marginBottom:20,display:"flex",gap:0,background:"var(--bg-main)",borderRadius:"8px 8px 0 0",overflow:"hidden",border:`2px solid var(--text-main)`,borderBottom:"none"}}>
          {[{k:"hitos",l:"Hitos & Escrow"},{k:"rewards",l:t("tab_rewards")},{k:"updates",l:"Actualizaciones"},{k:"onchain",l:"On-Chain Explorer"}].map(tabItem=><button key={tabItem.k} onClick={()=>setTab(tabItem.k)} style={{flex:1,padding:"12px 8px",fontWeight:700,fontSize:12,textTransform:"uppercase",letterSpacing:".05em",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",background:tab===tabItem.k?C.yellow:"var(--bg-main)",color:tab===tabItem.k?"#111":"var(--text-main)",borderBottom:tab===tabItem.k?`3px solid var(--text-main)`:"3px solid transparent",transition:"background .15s"}}>{tabItem.l}</button>)}
        </div>
        
        {tab==="rewards"&&<div className="rsp-rewards-grid" style={{animation:"slideUp .3s ease forwards"}}>
          {PROJECT_REWARDS.map(r => {
            const isSelected = activeRewardId === r.id;
            return <div key={r.id} className={`reward-card ${isSelected ? 'selected' : ''}`} onClick={() => handleRewardClick(r)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{fontWeight:900,fontSize:16,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{r.title}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,color:C.orange,fontSize:15}}>${r.minAmount}+</div>
              </div>
              <div style={{marginBottom:12}}><span className="reward-type-badge">{r.type}</span></div>
              <p style={{fontSize:13,lineHeight:1.6,opacity:0.8,marginBottom:20,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{r.desc}</p>
              <div style={{marginTop:"auto"}}>
                <button className={`btn-outline`} style={{width:"100%",justifyContent:"center",background:isSelected?C.yellow:"transparent",color:isSelected?"#111":"var(--text-main)",borderColor:isSelected?"#111":"var(--text-main)",transition:"all .2s"}}>
                  {isSelected ? `✓ ${t("reward_selected")}` : t("reward_select")}
                </button>
              </div>
            </div>;
          })}
        </div>}

        {tab==="hitos"&&<div className="card" style={{overflow:"hidden"}}>
          {MILESTONES.map((m,i)=>{const s=MSC[m.status];return <div key={m.id} style={{padding:"16px 18px",borderBottom:i<MILESTONES.length-1?`2px solid var(--border-gray)`:"none",background:s.bg}}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:m.status==="active"?10:0}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:"var(--text-main)",color:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>H{m.id}</div>
              <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{m.title}</div><div style={{fontSize:11,opacity:.8,marginTop:1,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{m.pct}% · <Hash h={`${m.amount.toLocaleString()} ${m.asset}`}/> · {m.date}</div>
                {m.hash&&<div style={{marginTop:4,display:"flex",alignItems:"center",gap:6}}><Hash h={m.hash}/><SnowtraceLink/></div>}
              </div>
              <span style={{fontSize:10,fontWeight:700,padding:"3px 9px",background:s.bg,border:`1.5px solid ${s.border}`,borderRadius:999,color:s.color,flexShrink:0}}>{s.label}</span>
            </div>
            {m.status==="active"&&<div style={{marginTop:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><span style={{fontWeight:600}}>🗳️ Quorum on-chain</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:C.avax}}>{m.votes}/{m.required}</span></div><ProgressBar pct={Math.round(m.votes/m.required*100)} h={6}/></div>}
          </div>;})}
        </div>}
        {tab==="updates"&&<div className="card" style={{padding:18}}><p style={{fontSize:13,lineHeight:1.6,opacity:.75, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">No hay actualizaciones aún.</p></div>}
        {tab==="onchain"&&<div className="card" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`2px solid var(--text-main)`,background:"var(--text-main)",color:"var(--bg-main)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,fontSize:12,textTransform:"uppercase"}}>📊 Explorer On-Chain</span><Hash h="0xA3f2...9c4E"/></div>
          {[["🔺","Red","Avalanche Fuji (Chain 43113)"],["💰","En Escrow","$3,400 USDC (ColmenaCampaign.sol)"],["✅","Capital Liberado","$15,000 USDC (Hitos 1+2)"],["🏦","Fee Colmena 1.5%","$225 USDC"],["⛓️","Transacciones","287"],["🪙","Tokens SLR emitidos","1,716 (143 inversores)"]].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"11px 16px",borderBottom:`1px solid var(--border-gray)`,alignItems:"center"}}>
            <span style={{fontSize:13, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{r[0]} {r[1]}</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.orange,fontSize:13}}>{r[2]}</span>
          </div>)}
          <div style={{padding:"10px 16px",background:"var(--bg-gray)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,opacity:.5, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Verificar on-chain en Snowtrace Fuji</span><SnowtraceLink/></div>
        </div>}
      </div>

      {/* WIDGET */}
      <div className="rsp-proyecto-widget" style={{position:"sticky",top:80}}>
        <div className="card" style={{overflow:"hidden"}}>
          <div style={{background:"var(--bg-hero)",backgroundImage:HEX,padding:"16px 18px",borderBottom:`2px solid var(--text-main)`,color:"var(--text-main)", transition:"background 0.3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.7,color:"var(--text-main)"}}>CAPITAL EN ESCROW</span><AvaxPill text="FUJI" small/></div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,color:C.orange,lineHeight:1}}>$18,400 <span style={{fontSize:13,opacity:.7,color:"var(--text-main)"}}>USDC</span></div>
            <div style={{fontSize:11,opacity:.65,marginBottom:8,color:"var(--text-main)"}}>de $25,000 meta · 143 inversores</div>
            <ProgressBar pct={pct} color={C.success}/><div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginTop:3}}><span style={{fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:"#166534"}}>{pct}%</span><span style={{opacity:.6,color:"var(--text-main)"}}>⏱️ 12 días</span></div>
          </div>

          {txStep==="success"?<div style={{padding:22,textAlign:"center"}}><div style={{fontSize:48,marginBottom:8,animation:"checkPop .5s ease forwards"}}>🎉</div><div style={{fontWeight:900,fontSize:15,textTransform:"uppercase",marginBottom:6, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">¡Inversión Confirmada!</div><div style={{fontSize:12,opacity:.7,lineHeight:1.5,marginBottom:12, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Fondos en ColmenaCampaign.sol. Recibirás tokens <Hash h="SLR"/>.</div><div style={{background:"var(--bg-gray)",border:`1.5px solid var(--border-gray)`,borderRadius:6,padding:"7px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.avax,marginBottom:12,wordBreak:"break-all"}}>TX: 0x7f3a...d92b ✓ Fuji #4,291,200</div><button className="btn-outline" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setTxStep("idle");setAmount("");}}>← Nueva inversión</button></div>
          :txStep==="confirming"?<div style={{padding:22,textAlign:"center"}}><div style={{width:44,height:44,border:`4px solid var(--border-gray)`,borderTopColor:C.avax,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 14px"}}/><div style={{fontWeight:700,fontSize:13,textTransform:"uppercase",marginBottom:4, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Confirmando en Avalanche Fuji...</div><div style={{fontSize:11,opacity:.5,fontFamily:"'JetBrains Mono',monospace", color:"var(--text-main)"}} className="text-gray-900 dark:text-white">ColmenaCampaign.sol · ~2s finalidad</div></div>
          :wStep==="connect"?<div style={{padding:16}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",marginBottom:12,opacity:.7, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Conecta para invertir</div>
            
            <button onClick={login} style={{width:"100%",border:`2px solid var(--text-main)`,borderRadius:4,padding:"14px",background:"var(--text-main)",color:"var(--bg-main)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:`4px 4px 0 var(--text-main)`,fontFamily:"'DM Sans',sans-serif",justifyContent:"center",fontWeight:800,fontSize:14,marginBottom:8,transition:"transform .1s"}} onMouseEnter={e=>e.currentTarget.style.transform="translate(-2px,-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              Conectar con Privy
            </button>
            <div style={{fontSize:10,textAlign:"center",opacity:.6,marginTop:6, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Email, Google, Apple o Web3 Wallet</div>

            <div style={{borderTop:`1px solid var(--border-gray)`,paddingTop:10,marginTop:12}}>
              <div style={{fontSize:10,textAlign:"center",opacity:.4,fontFamily:"'JetBrains Mono',monospace", color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Gas absorbido en primera TX · HU 1.3</div>
            </div>
          </div>
          :<div style={{padding:16}}>
            <div style={{marginBottom:10}}><label>Activo</label><select value={asset} onChange={e=>setAsset(e.target.value)} style={{fontWeight:700}}><option>USDC</option><option>AVAX</option></select></div>
            <div style={{marginBottom:10}}><label>Monto</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" style={{fontSize:22,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}/></div>
            <div style={{display:"flex",gap:6,marginBottom:14}}>{QUICK.map(q=><button key={q} onClick={()=>setAmount(String(q))} style={{flex:1,padding:"5px 0",border:`2px solid var(--text-main)`,borderRadius:999,background:amount==String(q)?C.yellow:"transparent",color:amount==String(q)?"#111":"var(--text-main)",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>${q}</button>)}</div>
            
            {activeRewardId && (
               <div className="pulse-badge" style={{padding:"9px 12px", background:"rgba(245,200,66,0.15)", border:`1.5px dashed ${C.yellow}`, borderRadius:6, marginBottom:14, display:"flex", alignItems:"center", gap:10}}>
                 <span style={{fontSize:20}}>🎁</span>
                 <div>
                   <div style={{fontWeight:800, textTransform:"uppercase", fontSize:11, color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{PROJECT_REWARDS.find(r=>r.id===activeRewardId).title}</div>
                   <div style={{opacity:0.7, fontSize:10, color:"var(--text-main)", marginTop:1}} className="text-gray-900 dark:text-white">{t("reward_unlocked")}</div>
                 </div>
               </div>
            )}

            <button className="btn-avax" style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8}} onClick={doDonate}>💰 Donar {amount||"..."} {asset}</button>
            <div style={{fontSize:10,padding:"8px 10px",background:"var(--bg-gray)",border:`1.5px solid var(--border-gray)`,borderRadius:6,lineHeight:1.5, color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><strong>Revenue Share:</strong> Si alcanza $50K ventas → <strong>8%</strong> en tokens <Hash h="SLR"/> · Fee: 1.5% solo sobre liberados</div>
            <div style={{marginTop:8,fontSize:10,textAlign:"center",color:C.avax,fontFamily:"'JetBrains Mono',monospace"}}>ColmenaCampaign.sol · Fuji 43113</div>
          </div>}
          <div style={{padding:"9px 16px",borderTop:`2px solid var(--border-gray)`,background:"var(--bg-gray)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><Hash h="0xA3f2...9c4E"/><SnowtraceLink/></div>
        </div>
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: ONBOARDING
// ═══════════════════════════════════════════════════════════════════
function Onboarding({setPage,setRole}){
  const { ready, authenticated, user, login } = usePrivy();
  const [step,setStep]=useState(0);
  const [selRole,setSelRole]=useState(null);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");

  useEffect(() => {
    if (ready && authenticated && step === 1) {
      setStep(2);
    }
    if (user?.email?.address) {
      setEmail(user.email.address);
    }
  }, [ready, authenticated, step, user]);

  const STEPS=["Perfil","Acceso","Datos","Listo"];
  const ROLES=[{id:"backer",i:"💰",l:"Inversor / Donante",d:"Apoyo proyectos y recibo dividendos en USDC/AVAX."},{id:"creator",i:"🚀",l:"Creador de Proyecto",d:"Tengo una startup u ONG y quiero levantar capital con escrow on-chain."}];

  const doFinish=()=>{setRole(selRole);setPage(selRole==="creator"?"dashboard-creator":"dashboard-investor");};

  return <div className="rsp-split" style={{display:"flex",minHeight:"100vh",paddingTop:64}}>
    <div className="rsp-split-left" style={{width:"38%",background:"var(--bg-hero)",backgroundImage:HEX,padding:"40px 32px",display:"flex",flexDirection:"column",justifyContent:"space-between",borderRight:`2px solid var(--text-main)`,color:"var(--text-main)", transition:"background 0.3s ease"}}>
      <div/>
      <div>
        <div style={{fontSize:64,marginBottom:14,animation:"floatBee 3s ease-in-out infinite"}}>🐝</div>
        <h1 style={{fontSize:"clamp(32px,3.5vw,52px)",fontWeight:900,textTransform:"uppercase",lineHeight:.88,letterSpacing:"-.02em",marginBottom:18,color:"var(--text-main)"}}>EL CAPITAL<br/>CON<br/><span style={{color:C.orange}}>REGLAS</span></h1>
        <p style={{fontSize:13,lineHeight:1.6,opacity:.75,maxWidth:280,marginBottom:24,color:"var(--text-main)"}}>Smart contracts Solidity en Avalanche. Tu dinero se libera solo si el creador cumple los hitos.</p>
        {[{i:"🔺",t:"Avalanche Fuji · Chain ID 43113"},{i:"🔒",t:"ColmenaCampaign.sol (OpenZeppelin)"},{i:"⚡",t:"Finalidad ~2s"},{i:"🌐",t:"Core / MetaMask — sin custodia"},{i:"💡",t:"Primera TX sin gas (HU 1.3)"}].map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(255,255,255,.15)",border:`1.5px solid rgba(0,0,0,.1)`,borderRadius:999,padding:"5px 12px",marginBottom:7,fontSize:12,fontWeight:600,color:"var(--text-main)"}}><span style={{fontSize:14}}>{t.i}</span>{t.t}</div>)}
      </div>
      <div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",opacity:.4,color:"var(--text-main)"}}>FUJI TESTNET · CHAIN 43113</div>
    </div>

    <div className="rsp-split-right" style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 52px",overflowY:"auto",background:"var(--bg-main)"}}>
      <div style={{maxWidth:420,margin:"0 auto",width:"100%"}}>
        {step>0&&step<3&&<button onClick={()=>setStep(s=>s-1)} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,opacity:.5,marginBottom:18,padding:0,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">← Volver</button>}
        <div style={{display:"flex",alignItems:"center",marginBottom:28}}>
          {STEPS.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",flex:i<3?1:"auto"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:i<step?C.success:i===step?C.yellow:"var(--bg-gray)",border:`2px solid ${i<=step?"var(--text-main)":"var(--border-gray)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:i<step?13:11,fontWeight:700,boxShadow:i<=step?`2px 2px 0 var(--text-main)`:"none",color:i<=step?"#111":"var(--text-main)"}}>{i<step?"✓":i+1}</div>
              <span className="rsp-step-label text-gray-900 dark:text-white" style={{fontSize:9,fontWeight:700,textTransform:"uppercase",opacity:i===step?1:.35,whiteSpace:"nowrap",color:"var(--text-main)"}}>{s}</span>
            </div>
            {i<3&&<div style={{flex:1,height:2,background:i<step?C.success:"var(--border-gray)",margin:"0 5px",marginBottom:16,minWidth:10}}/>}
          </div>)}
        </div>

        {step===0&&<div className="slide">
          <h2 style={{fontSize:24,fontWeight:900,textTransform:"uppercase",marginBottom:6,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">¿Quién eres?</h2>
          <p style={{fontSize:13,opacity:.6,marginBottom:20,lineHeight:1.5,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Personaliza tu experiencia en Colmena Protocol.</p>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
            {ROLES.map(r=><div key={r.id} onClick={()=>setSelRole(r.id)} style={{border:`2px solid ${selRole===r.id?"var(--text-main)":"var(--border-gray)"}`,borderRadius:8,padding:"14px 16px",cursor:"pointer",background:selRole===r.id?C.yellow:"var(--bg-main)",color:selRole===r.id?"#111":"var(--text-main)",boxShadow:selRole===r.id?`3px 3px 0 var(--text-main)`:"none",transition:"all .15s",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:30}}>{r.i}</span><div style={{flex:1}}><div style={{fontWeight:800,fontSize:13,textTransform:"uppercase",marginBottom:2}}>{r.l}</div><div style={{fontSize:12,opacity:.65}}>{r.d}</div></div>{selRole===r.id&&<span style={{fontSize:18}}>✓</span>}
            </div>)}
          </div>
          <button className="btn-primary" style={{width:"100%",justifyContent:"center",opacity:selRole?1:.4}} onClick={()=>selRole&&setStep(1)}>Continuar →</button>
        </div>}

        {step===1&&<div className="slide">
          <h2 style={{fontSize:24,fontWeight:900,textTransform:"uppercase",marginBottom:6,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Conecta tu Acceso</h2>
          <p style={{fontSize:13,opacity:.6,marginBottom:18,lineHeight:1.5,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{selRole==="backer"?"Elige cómo entrar. Puedes migrar a wallet en cualquier momento.":"Como creador recomendamos wallet para control soberano de fondos."}</p>
          
          <button onClick={login} style={{width:"100%",border:`2px solid var(--text-main)`,borderRadius:4,padding:"14px",background:"var(--text-main)",color:"var(--bg-main)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:`4px 4px 0 var(--text-main)`,fontFamily:"'DM Sans',sans-serif",justifyContent:"center",fontWeight:800,fontSize:14,marginBottom:8,transition:"transform .1s"}} onMouseEnter={e=>e.currentTarget.style.transform="translate(-2px,-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
            Conectar / Continuar
          </button>

          <div style={{padding:"8px 11px",background:"var(--bg-blue)",border:`1.5px solid var(--border-blue, #93C5FD)`,borderRadius:5,fontSize:11,color:"var(--text-main)",marginBottom:18}} className="text-gray-900 dark:text-white">ℹ️ Privy gestiona tu acceso Web2 (Email, Google, Apple) y Web3 (MetaMask, Core) en un solo lugar.</div>
          <div style={{marginTop:10,padding:"8px 11px",background:C.avaxBg,border:`1.5px solid ${C.avax}55`,borderRadius:5,fontSize:10,color:"var(--text-main)",fontFamily:"'JetBrains Mono',monospace"}} className="text-gray-900 dark:text-white">🔺 Red requerida: Avalanche Fuji · Chain ID: 43113 · RPC: api.avax-test.network</div>
        </div>}

        {step===2&&<div className="slide">
          <h2 style={{fontSize:24,fontWeight:900,textTransform:"uppercase",marginBottom:6,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Tu Perfil</h2>
          {authenticated&&<div style={{padding:"10px 13px",background:"var(--bg-success)",border:`2px solid ${C.success}`,borderRadius:6,marginBottom:16,display:"flex",gap:9,alignItems:"center"}}><span style={{fontSize:18}}>✅</span><div><strong style={{color:"var(--text-success)"}}>Autenticado correctamente</strong><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.avax,marginTop:2}}>{user?.wallet?.address ? `${user.wallet.address.slice(0,6)}...${user.wallet.address.slice(-4)}` : user?.email?.address} ✓</div></div></div>}
          <div style={{marginBottom:14}}><label>Nombre completo</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre"/></div>
          <div style={{marginBottom:20}}><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" disabled={!!user?.email?.address} style={{opacity: user?.email?.address ? 0.7 : 1}}/></div>
          <div style={{padding:"9px 11px",background:"var(--bg-gray)",border:`1.5px solid var(--border-gray)`,borderRadius:5,fontSize:11,lineHeight:1.5,marginBottom:16,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">📋 Al continuar aceptas los Términos. Fee de 1.5% solo sobre hitos liberados en ColmenaCampaign.sol.</div>
          <button className="btn-primary" style={{width:"100%",justifyContent:"center",opacity:(name&&email)?1:.4}} onClick={()=>(name&&email)&&setStep(3)}>Crear cuenta →</button>
        </div>}

        {step===3&&<div style={{textAlign:"center",animation:"fadeUp .5s ease forwards"}}>
          <div style={{fontSize:64,marginBottom:10}}>🎉</div>
          <h2 style={{fontSize:24,fontWeight:900,textTransform:"uppercase",marginBottom:6,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">¡Bienvenido!</h2>
          <div className="card" style={{padding:"14px 18px",marginBottom:18,textAlign:"left"}}>
            {[["Perfil",selRole==="backer"?"💰 Inversor":"🚀 Creador"],["Acceso",user?.wallet?"🔑 Wallet Web3":"🔑 Email / Social"],["Identificador", user?.wallet?.address ? `${user.wallet.address.slice(0,6)}...${user.wallet.address.slice(-4)}` : user?.email?.address],["Red","🔺 Avalanche Fuji Testnet"],["Chain ID","43113"],["Contrato","ColmenaCampaign.sol"]].map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid var(--border-gray)`,fontSize:12}}><span style={{opacity:.55,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{l}</span><span style={{fontWeight:700,fontFamily:l==="Chain ID"||l==="Contrato"?"'JetBrains Mono',monospace":"inherit",color:l==="Chain ID"||l==="Contrato"?C.avax:"var(--text-main)",fontSize:l==="Chain ID"?11:12}} className={l!=="Chain ID"&&l!=="Contrato"?"text-gray-900 dark:text-white":""}>{v}</span></div>)}
          </div>
          <button className="btn-avax" style={{width:"100%",justifyContent:"center",padding:"13px",marginBottom:10,fontSize:14}} onClick={doFinish}>
            {selRole==="creator"?"🚀 Ir a mi Dashboard →":"💰 Explorar Proyectos →"}
          </button>
        </div>}

        {step<3&&<p style={{textAlign:"center",fontSize:12,marginTop:20,opacity:.5}}>¿Ya tienes cuenta? <a href="#" onClick={e=>{e.preventDefault();doFinish();}} style={{color:"var(--text-main)",fontWeight:700,textDecoration:"underline"}} className="text-gray-900 dark:text-white">Iniciar sesión</a></p>}
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: DASHBOARD CREADOR
// ═══════════════════════════════════════════════════════════════════
function DashboardCreator({setPage}){
  const [sec,setSec]=useState("overview");
  const [voted,setVoted]=useState({});
  const sideItems=[{k:"overview",i:"📊",l:"Resumen"},{k:"milestones",i:"🎯",l:"Hitos & Escrow"},{k:"evidence",i:"📎",l:"Subir Evidencia"},{k:"txlog",i:"⛓️",l:"On-Chain Log"},{k:"settings",i:"⚙️",l:"Config"}];
  const metrics=[{i:"💰",l:"Recaudado",v:"$18,400",s:"USDC",c:C.yellow},{i:"🔒",l:"En Escrow",v:"$3,400",s:"ColmenaCampaign.sol",c:"var(--bg-blue)"},{i:"✅",l:"Liberado",v:"$15,000",s:"2 hitos OK",c:"var(--bg-success)"},{i:"👥",l:"Inversores",v:"143",s:"holders SLR",c:"var(--bg-purple)"}];
  const TXLOG=[{d:"15 Mar 14:32",e:"💸 Hito 2 liberado",a:"+$7,500 USDC",h:"0x7f3a...d92b",b:"#4,291,112"},{d:"15 Mar 14:31",e:"🗳️ Quorum (128/143)",a:"—",h:"0x2c1e...4a88",b:"#4,291,111"},{d:"28 Feb 09:14",e:"💸 Hito 1 liberado",a:"+$7,500 USDC",h:"0xb4d9...3f01",b:"#4,288,022"},{d:"01 Feb 11:00",e:"🔒 Campaña desplegada",a:"—",h:"0x1a2b...cc44",b:"#4,270,001"}];
  return <div style={{background:"var(--bg-gray)",minHeight:"100vh",paddingTop:64}}>
    <div className="rsp-dash-wrap" style={{display:"flex",minHeight:"calc(100vh - 64px)"}}>
      <aside className="rsp-dash-sidebar" style={{width:210,background:"var(--bg-main)",borderRight:`2px solid var(--text-main)`,padding:"20px 13px",display:"flex",flexDirection:"column",gap:3,flexShrink:0}}>
        <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",opacity:.4,marginBottom:6,paddingLeft:10,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">MI CAMPAÑA</div>
        {sideItems.map(it=><div key={it.k} className={`nav-item${sec===it.k?" active":""}`} onClick={()=>setSec(it.k)}><span style={{fontSize:15}}>{it.i}</span>{it.l}</div>)}
        <div style={{flex:1}}/>
        <div className="rsp-sidebar-bottom" style={{padding:"11px",background:C.avaxBg,border:`1.5px solid ${C.avax}55`,borderRadius:6}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",opacity:.6,marginBottom:3,color:C.avax}}>🔺 ESCROW</div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",color:C.avax,fontWeight:700,fontSize:18}}>$3,400</div>
          <div style={{fontSize:10,opacity:.55,color:C.avax}}>USDC · Fuji 43113</div>
        </div>
      </aside>
      <main className="rsp-dash-main" style={{flex:1,padding:"26px 24px",overflowY:"auto"}}>
        <div style={{marginBottom:20}}>
          <h1 style={{fontSize:24,fontWeight:900,textTransform:"uppercase",letterSpacing:"-.01em",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{{overview:"Resumen General",milestones:"Hitos & Escrow",evidence:"Subir Evidencia",txlog:"Registro On-Chain",settings:"Config"}[sec]}</h1>
          <p style={{fontSize:10,opacity:.4,marginTop:2,fontFamily:"'JetBrains Mono',monospace",color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><Hash h="ColmenaCampaign.sol · 0xA3f2...9c4E"/> · Fuji (43113)</p>
        </div>
        {sec==="overview"&&<div>
          <div className="rsp-metrics" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:18}}>
            {metrics.map((m,i)=><div key={i} className="card" style={{padding:"16px",background:m.c,color:m.c===C.yellow?"#111":"var(--text-main)"}}><div style={{fontSize:22,marginBottom:6}}>{m.i}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,fontWeight:700,color:m.c===C.yellow?"#111":"var(--text-main)"}}>{m.v}</div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.6,marginTop:3}}>{m.l}</div><div style={{fontSize:10,opacity:.4,marginTop:1}}>{m.s}</div></div>)}
          </div>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"11px 16px",background:"var(--text-main)",color:"var(--bg-main)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,fontSize:12,textTransform:"uppercase"}}>⛓️ Últimas TXs — Snowtrace Fuji</span><Hash h="0xA3f2...9c4E"/></div>
            {TXLOG.slice(0,3).map((tx,i)=><div key={i} style={{padding:"11px 16px",borderBottom:i<2?`1px solid var(--border-gray)`:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:12,fontWeight:600,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{tx.e}</div><div style={{fontSize:10,opacity:.4,fontFamily:"'JetBrains Mono',monospace",marginTop:1,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><Hash h={tx.h}/> · {tx.d}</div></div><div style={{textAlign:"right"}}>{tx.a!=="—"&&<div style={{fontFamily:"'JetBrains Mono',monospace",color:C.success,fontWeight:700,fontSize:12}}>{tx.a}</div>}<div style={{fontSize:10,color:C.avax,fontWeight:600}}>Fuji {tx.b}</div></div></div>)}
          </div>
        </div>}
        {sec==="milestones"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {MILESTONES.map(m=>{const s=MSC[m.status];return <div key={m.id} className="card" style={{overflow:"hidden",border:`2px solid ${s.border}`,boxShadow:m.status==="active"?`4px 4px 0 ${C.yellow}`:`4px 4px 0 var(--border-gray)`}}>
            <div style={{background:s.bg,padding:"12px 16px",borderBottom:`2px solid ${s.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:6,background:"var(--text-main)",color:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13}}>H{m.id}</div><div><div style={{fontWeight:800,fontSize:13,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{m.title}</div><div style={{fontSize:11,opacity:.8,marginTop:1,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{m.pct}% · <Hash h={`${m.amount.toLocaleString()} ${m.asset}`}/> · {m.date}</div></div></div>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 9px",background:s.bg,border:`1.5px solid ${s.border}`,borderRadius:999,color:s.color}}>{s.label}</span>
            </div>
            <div style={{padding:"12px 16px"}}>
              {m.status==="active"&&<><div style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><span>🗳️ Validaciones on-chain</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:C.avax}}>{m.votes}/{m.required}</span></div><ProgressBar pct={Math.round(m.votes/m.required*100)} h={7}/></div>
              <div style={{background:"var(--bg-warn)",border:`2px dashed ${C.yellow}`,borderRadius:6,padding:"13px",textAlign:"center",color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><div style={{fontSize:18,marginBottom:3}}>📤</div><div style={{fontWeight:700,fontSize:12,marginBottom:6}}>Sube evidencia para solicitar liberación de fondos</div><button className="btn-accent" style={{fontSize:11,padding:"7px 14px"}}>📎 Subir a IPFS + Avalanche</button></div></>}
              {m.hash&&<div style={{display:"flex",alignItems:"center",gap:8}}><Hash h={m.hash}/><SnowtraceLink/><span style={{fontSize:10,background:"var(--bg-success)",color:"var(--text-success)",border:`1.5px solid ${C.success}`,padding:"2px 7px",borderRadius:999,fontWeight:600}}>✓ ON-CHAIN</span></div>}
              {m.status==="pending"&&<div style={{opacity:.45,fontSize:12,padding:"8px 0",textAlign:"center",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">🔒 Disponible cuando se complete H{m.id-1}</div>}
            </div>
          </div>;})}
        </div>}
        {sec==="evidence"&&<div className="card" style={{padding:24,maxWidth:520}}><div style={{fontWeight:900,fontSize:16,textTransform:"uppercase",marginBottom:12,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">📎 Subir Evidencia</div><p style={{fontSize:13,opacity:.65,marginBottom:18,lineHeight:1.5,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Los archivos se anclan a IPFS y el hash se registra en ColmenaCampaign.sol en Avalanche Fuji.</p><div style={{marginBottom:14}}><label>Hito a evidenciar</label><select><option>Hito 3 — Instalación Lote 2</option></select></div><div style={{border:`2px dashed var(--border-gray)`,borderRadius:8,padding:"32px 20px",textAlign:"center",background:"var(--bg-gray)",marginBottom:12,cursor:"pointer",color:"var(--text-main)"}}><div style={{fontSize:40,marginBottom:8}}>📂</div><div style={{fontWeight:700,fontSize:13,marginBottom:4}} className="text-gray-900 dark:text-white">Arrastra archivos aquí</div><div style={{fontSize:11,opacity:.6}} className="text-gray-900 dark:text-white">PDF, JPG, PNG — se anclan a IPFS</div></div><button className="btn-avax" style={{width:"100%",justifyContent:"center",padding:"12px",fontSize:13}}>🔺 Anclar a IPFS + Registrar en Avalanche Fuji</button><div style={{marginTop:8,fontSize:10,opacity:.5,fontFamily:"'JetBrains Mono',monospace",textAlign:"center",color:"var(--text-main)"}}>ColmenaCampaign.sol · Fuji 43113</div></div>}
        {sec==="txlog"&&<div className="card" style={{overflow:"hidden"}}><div style={{padding:"12px 16px",background:"var(--text-main)",color:"var(--bg-main)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,fontSize:12,textTransform:"uppercase"}}>⛓️ Registro On-Chain</span><SnowtraceLink/></div>{TXLOG.map((tx,i)=><div key={i} style={{padding:"12px 16px",borderBottom:`1px solid var(--border-gray)`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:9,alignItems:"center"}}><div style={{width:7,height:7,borderRadius:"50%",background:tx.a!=="—"?C.success:C.yellow,flexShrink:0}}/><div><div style={{fontSize:12,fontWeight:600,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{tx.e}</div><div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",opacity:.4,marginTop:1,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><Hash h={tx.h}/> · Fuji {tx.b}</div></div></div><div style={{textAlign:"right"}}>{tx.a!=="—"&&<div style={{fontFamily:"'JetBrains Mono',monospace",color:C.success,fontWeight:700,fontSize:12}}>{tx.a}</div>}<div style={{fontSize:10,opacity:.4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{tx.d}</div></div></div>)}</div>}
        {sec==="settings"&&<div className="card" style={{padding:22,maxWidth:440}}><div style={{fontWeight:900,fontSize:14,textTransform:"uppercase",marginBottom:14,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">⚙️ Configuración del Contrato</div>{[["Nombre","SolarHogar LATAM"],["Token Symbol","SLR (ERC-20)"],["Revenue Share","8%"],["Umbral","$50,000 en ventas"],["Wallet del Creador","0xVT...4a2f"],["Contrato","ColmenaCampaign.sol"],["Red","Avalanche Fuji (43113)"]].map(([l,v],i)=><div key={i} style={{marginBottom:12}}><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.5,marginBottom:3,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{l}</div><div style={{border:`2px solid var(--border-gray)`,borderRadius:4,padding:"8px 12px",fontSize:13,fontWeight:600,background:"var(--bg-gray)",fontFamily:i>=4?"'JetBrains Mono',monospace":"inherit",color:i>=4?C.avax:"var(--text-main)"}} className={i>=4?"":"text-gray-900 dark:text-white"}>{i>=4?<Hash h={v}/>:v}</div></div>)}<div style={{fontSize:11,color:C.avax,fontWeight:700}}>⚠️ Parámetros Solidity inmutables una vez desplegado.</div></div>}
      </main>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: DASHBOARD INVERSOR
// ═══════════════════════════════════════════════════════════════════
function DashboardInvestor({setPage}){
  const [sec,setSec]=useState("portfolio");
  const [claimed,setClaimed]=useState({});
  const [loadingClaim,setLoadingClaim]=useState(null);
  const [voted,setVoted]=useState({});
  const sideItems=[{k:"portfolio",i:"💼",l:"Portfolio"},{k:"dividends",i:"💸",l:"Dividendos"},{k:"tokens",i:"🪙",l:"Mis Tokens"},{k:"votes",i:"🗳️",l:"Votar Hitos"},{k:"activity",i:"⛓️",l:"Actividad"}];
  const totalInv=PORTFOLIO.reduce((a,p)=>a+p.invested,0);
  const totalVal=PORTFOLIO.reduce((a,p)=>a+p.currentVal,0);
  const totalPend=PORTFOLIO.reduce((a,p)=>a+p.pending,0);
  const doClaim=(sym)=>{setLoadingClaim(sym);setTimeout(()=>{setLoadingClaim(null);setClaimed(c=>({...c,[sym]:true}));},1800);};
  const ACTIVITY=[{d:"15 Mar",e:"💸 Dividendos Claim",a:"+$42 USDC",h:"0x7f3a...d92b",b:"Fuji #4,291,112"},{d:"15 Mar",e:"🪙 Tokens SLR recibidos",a:"+120 SLR",h:"0x2c1e...4a88",b:"Fuji #4,291,100"},{d:"01 Feb",e:"💰 Inversión en escrow",a:"-$500 USDC",h:"0x1a2b...cc44",b:"Fuji #4,270,001"}];
  return <div style={{background:"var(--bg-gray)",minHeight:"100vh",paddingTop:64}}>
    <div className="rsp-dash-wrap" style={{display:"flex",minHeight:"calc(100vh - 64px)"}}>
      <aside className="rsp-dash-sidebar" style={{width:210,background:"var(--bg-main)",borderRight:`2px solid var(--text-main)`,padding:"20px 13px",display:"flex",flexDirection:"column",gap:3,flexShrink:0}}>
        <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",opacity:.4,marginBottom:6,paddingLeft:10,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">MI CUENTA</div>
        {sideItems.map(it=><div key={it.k} className={`nav-item${sec===it.k?" active":""}`} onClick={()=>setSec(it.k)}><span style={{fontSize:15}}>{it.i}</span>{it.l}</div>)}
        <div style={{flex:1}}/>
        <div className="rsp-sidebar-bottom" style={{padding:"11px",background:C.avaxBg,border:`1.5px solid ${C.avax}55`,borderRadius:6}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",opacity:.6,marginBottom:3,color:C.avax}}>🔺 WALLET</div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",color:C.avax,fontWeight:700,fontSize:11}}>0xBacker...aa11</div>
          <div style={{fontSize:10,opacity:.5,color:C.avax}}>Fuji 43113</div>
        </div>
      </aside>
      <main className="rsp-dash-main" style={{flex:1,padding:"26px 24px",overflowY:"auto"}}>
        <div style={{marginBottom:20}}><h1 style={{fontSize:24,fontWeight:900,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{{"portfolio":"Mi Portfolio","dividends":"Dividendos USDC","tokens":"Mis Tokens ERC-20","votes":"Votar Hitos","activity":"Actividad On-Chain"}[sec]}</h1><p style={{fontSize:10,opacity:.4,marginTop:2,fontFamily:"'JetBrains Mono',monospace",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">Avalanche Fuji · Chain 43113 · Core / MetaMask</p></div>
        {sec==="portfolio"&&<div>
          <div className="rsp-metrics" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:18}}>
            {[{i:"💰",l:"Invertido",v:`$${totalInv.toLocaleString()}`,s:"en escrow",c:C.yellow},{i:"📈",l:"Valor Actual",v:`$${totalVal.toLocaleString()}`,s:`+${Math.round((totalVal/totalInv-1)*100)}% ROI`,c:"var(--bg-success)"},{i:"💸",l:"Dividendos",v:`$${totalPend.toFixed(2)}`,s:"USDC pending",c:"var(--bg-avax)"},{i:"🪙",l:"Tokens",v:PORTFOLIO.reduce((a,p)=>a+p.tokens,0),s:"en wallet",c:"var(--bg-purple)"}].map((m,i)=><div key={i} className="card" style={{padding:"16px",background:m.c,color:m.c===C.yellow?"#111":"var(--text-main)"}}><div style={{fontSize:22,marginBottom:6}}>{m.i}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,fontWeight:700,color:m.c===C.yellow?"#111":"var(--text-main)"}}>{m.v}</div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.6,marginTop:3}}>{m.l}</div><div style={{fontSize:10,opacity:.4,marginTop:1}}>{m.s}</div></div>)}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {PORTFOLIO.map((p,i)=>{const roi=Math.round((p.currentVal/p.invested-1)*100);return <div key={i} className="card" style={{padding:16,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{display:"flex",alignItems:"center"}}><CatIcon cat={p.cat || "ENERGÍA"} size={42}/></span>
              <div style={{flex:1,minWidth:140}}><div style={{fontWeight:800,fontSize:13,textTransform:"uppercase",marginBottom:4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{p.name}</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}><AvaxPill text="Fuji" small/><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,background:"var(--bg-gray)",border:`1.5px solid var(--border-gray)`,padding:"2px 7px",borderRadius:999,fontWeight:600,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><Hash h={p.contract}/></span></div></div>
              <div style={{display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
                {[{l:"Invertido",v:`$${p.invested}`},{l:"Valor",v:`$${p.currentVal}`,c:C.success},{l:"ROI",v:`+${roi}%`,c:C.success},{l:"Tokens",v:`${p.tokens} ${p.symbol}`},{l:"Dividendo",v:`$${p.pending}`,c:C.avax}].map((s,j)=><div key={j} style={{textAlign:"center"}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:700,color:s.c||"var(--text-main)",lineHeight:1}} className={s.c?"":"text-gray-900 dark:text-white"}>{s.v}</div><div style={{fontSize:9,opacity:.45,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{s.l}</div></div>)}
              </div>
              <button className="btn-primary" style={{fontSize:11,padding:"7px 14px"}} onClick={()=>setPage("proyecto")}>Ver →</button>
            </div>;})}
          </div>
        </div>}
        {sec==="dividends"&&<div>
          <div className="card" style={{padding:20,marginBottom:16,background:C.yellow,color:"#111"}}><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.7,marginBottom:4}}>TOTAL DISPONIBLE</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:36,fontWeight:700,color:C.orange,lineHeight:1,marginBottom:3}}>${totalPend.toFixed(2)} <span style={{fontSize:14,opacity:.7}}>USDC</span></div><div style={{fontSize:12,opacity:.65}}>Vía ColmenaCampaign.sol en Avalanche Fuji</div></div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {PORTFOLIO.map((p,i)=><div key={i} className="card" style={{padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{display:"flex",alignItems:"center"}}><CatIcon cat={p.cat || "ENERGÍA"} size={28}/></span><div><div style={{fontWeight:800,fontSize:12,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{p.name}</div><div style={{fontSize:10,opacity:.5,fontFamily:"'JetBrains Mono',monospace",color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><Hash h={p.contract}/></div></div></div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,fontWeight:700,color:C.avax}}>${p.pending} <span style={{fontSize:11,opacity:.6}}>USDC</span></div>
              {claimed[p.symbol]?<span style={{background:"var(--bg-success)",color:"var(--text-success)",border:`2px solid ${C.success}`,borderRadius:999,padding:"5px 14px",fontWeight:700,fontSize:11}}>✓ Reclamado</span>:<button className="btn-avax" style={{padding:"8px 16px",fontSize:12}} onClick={()=>doClaim(p.symbol)}>{loadingClaim===p.symbol?<span style={{width:15,height:15,border:`2px solid rgba(255,255,255,.3)`,borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/>:"💸"} {loadingClaim===p.symbol?"Procesando...":"Claim USDC"}</button>}
            </div>)}
          </div>
        </div>}
        {sec==="tokens"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
          {PORTFOLIO.map((p,i)=><div key={i} style={{background:"#111",border:`2px solid var(--text-main)`,borderRadius:10,overflow:"hidden",boxShadow:`5px 5px 0 ${C.yellow}`}}>
            <div style={{background:`linear-gradient(135deg,${C.yellow},${C.yellowDark})`,padding:"18px 16px",textAlign:"center",borderBottom:`2px solid var(--text-main)`,color:"#111"}}><div style={{fontSize:42,marginBottom:5,display:"flex",justifyContent:"center"}}><CatIcon cat={p.cat} size={48}/></div><div style={{fontWeight:900,fontSize:20,textTransform:"uppercase"}}>{p.symbol}</div><div style={{fontSize:11,opacity:.7,fontWeight:600}}>{p.name}</div></div>
            <div style={{padding:"14px 16px"}}>
              {[["Tokens",`${p.tokens} ${p.symbol}`,C.yellow],["Valor est.",`$${p.currentVal}`,C.success],["Contrato (Fuji)",p.contract,C.avax]].map(([l,v,col],j)=><div key={j} style={{marginBottom:8}}><div style={{fontSize:9,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>{l}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:l==="Contrato (Fuji)"?10:15,color:col}}>{l==="Contrato (Fuji)"?<Hash h={v}/>:v}</div></div>)}
              <div style={{marginTop:8,padding:"7px 9px",background:"rgba(255,255,255,.06)",borderRadius:5,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>🔺 Fuji 43113</span><SnowtraceLink/></div>
            </div>
          </div>)}
        </div>}
        {sec==="votes"&&<div>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{background:C.yellow,padding:"12px 16px",borderBottom:`2px solid var(--text-main)`,fontWeight:800,fontSize:13,textTransform:"uppercase",display:"flex",justifyContent:"space-between",alignItems:"center",color:"#111"}}><span>🗳️ Hito 3 — SolarHogar LATAM</span><Hash h="SLR"/></div>
            <div style={{padding:"16px 18px"}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.5,marginBottom:8,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">EVIDENCIAS — IPFS + FUJI</div>
              {[{t:"PDF",n:"acta_l2.pdf",h:"QmAb4...cc22"},{t:"IMG",n:"foto_hogares.jpg",h:"QmXf7...2k9a"}].map((ev,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"var(--bg-gray)",border:`1.5px solid var(--border-gray)`,borderRadius:5,marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:16}}>{ev.t==="PDF"?"📄":"🖼️"}</span><div><div style={{fontSize:12,fontWeight:600,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{ev.n}</div><div style={{fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:C.avax}}><Hash h={`IPFS: ${ev.h}`}/></div></div></div>
                <button className="btn-outline" style={{padding:"3px 9px",fontSize:10}}>Ver ↗</button>
              </div>)}
              <div style={{margin:"14px 0"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><span>Quorum on-chain</span><Hash h="47/72 votos · Fuji"/></div><ProgressBar pct={65} h={8}/><div style={{fontSize:10,opacity:.5,marginTop:3,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">65% — falta 25 votos para liberar fondos</div></div>
              {!voted[0]?<div style={{display:"flex",gap:9}}><button className="btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setVoted({0:"approve"})}>✅ Aprobar Hito</button><button className="btn-outline" style={{flex:1,justifyContent:"center"}} onClick={()=>setVoted({0:"reject"})}>❌ Rechazar</button></div>:<div style={{background:"var(--bg-success)",border:`2px solid ${C.success}`,borderRadius:6,padding:"11px",fontWeight:700,fontSize:12,color:"var(--text-success)",textAlign:"center"}}>✅ Voto registrado en Avalanche Fuji</div>}
            </div>
          </div>
        </div>}
        {sec==="activity"&&<div className="card" style={{overflow:"hidden"}}><div style={{padding:"11px 16px",background:"var(--text-main)",color:"var(--bg-main)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,fontSize:12,textTransform:"uppercase"}}>⛓️ Actividad On-Chain</span><SnowtraceLink/></div>{ACTIVITY.map((a,i)=><div key={i} style={{padding:"12px 16px",borderBottom:`1px solid var(--border-gray)`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:12,fontWeight:600,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{a.e}</div><div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",opacity:.4,marginTop:1,color:"var(--text-main)"}} className="text-gray-900 dark:text-white"><Hash h={a.h}/> · {a.b}</div></div><div style={{textAlign:"right"}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:12,color:a.a.startsWith("+")?C.success:C.avax}}>{a.a}</div><div style={{fontSize:10,opacity:.4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{a.d}</div></div></div>)}</div>}
      </main>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: EXPLORADOR
// ═══════════════════════════════════════════════════════════════════
function Explorador({setPage}){
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("TODOS");
  const [open,setOpen]=useState(null);
  const filtered=ADMIN_PROJECTS.filter(p=>(filter==="TODOS"||(filter==="ACTIVOS"&&p.locked>0)||(filter==="COMPLETADOS"&&p.locked===0))&&p.name.toLowerCase().includes(search.toLowerCase()));
  const riskC={LOW:C.success,MED:C.yellow,HIGH:C.red,NONE:"#555"};
  const PROTO_STATS=[{i:"💰",l:"En Escrow",v:"$284K USDC"},{i:"✅",l:"Liberado",v:"$84K USDC"},{i:"⛓️",l:"TXs Fuji",v:"3,891"},{i:"🏦",l:"Fee Colmena",v:"$1,260"},{i:"🏗️",l:"Proyectos",v:"47"},{i:"👥",l:"Inversores",v:"1,240"}];
  return <div style={{paddingTop:64}}>
    <div style={{background:"#111",backgroundImage:HEX,padding:"48px 24px 40px",borderBottom:`2px solid #111`}}>
      <div style={{maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:C.avax,color:"#fff",borderRadius:999,padding:"5px 14px",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:20}}><Dot color="#fff"/>🔺 AVALANCHE FUJI — EN VIVO — CHAIN 43113</div>
        <h1 style={{fontSize:"clamp(32px,6vw,68px)",fontWeight:900,textTransform:"uppercase",lineHeight:.9,letterSpacing:"-.02em",color:"#fff",marginBottom:18}}>TRANSPARENCIA<br/><span style={{color:C.yellow}}>RADICAL</span><br/>ON-CHAIN</h1>
        <p style={{fontSize:15,color:"rgba(255,255,255,.55)",maxWidth:480,margin:"0 auto 30px",lineHeight:1.6}}>Cada peso, cada hito, cada TX — verificable en <strong style={{color:C.yellow}}>Snowtrace Fuji</strong> sin cuenta ni wallet.</p>
        <div className="rsp-exp-stats" style={{display:"flex",gap:0,background:"var(--bg-main)",color:"var(--text-main)",border:`2px solid var(--text-main)`,borderRadius:8,boxShadow:`4px 4px 0 ${C.yellow}`,overflow:"hidden",flexWrap:"wrap",maxWidth:860,margin:"0 auto"}}>
          {PROTO_STATS.map((s,i)=><div key={i} style={{flex:"1 1 120px",padding:"14px 16px",borderRight:i<5?`2px solid var(--text-main)`:"none",textAlign:"center"}}><div style={{fontSize:20,marginBottom:3}}>{s.i}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:700,color:C.orange}}>{s.v}</div><div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",opacity:.5,marginTop:2,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{s.l}</div></div>)}
        </div>
      </div>
    </div>
    <Ticker/>
    <div className="rsp-exp-grid" style={{maxWidth:1100,margin:"0 auto",padding:"26px 24px",display:"grid",gridTemplateColumns:"1fr 300px",gap:22,alignItems:"start"}}>
      <div>
        <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar proyecto, contrato o TX..." style={{flex:1,minWidth:180}}/>
          <div style={{display:"flex",gap:6}}>
            {["TODOS","ACTIVOS","COMPLETADOS"].map(f=><button key={f} className={`pill${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtered.map((p, index)=><div key={p.id} className={`card d${Math.min(index, 4)}`} style={{overflow:"hidden"}}>
            <div onClick={()=>setOpen(open===p.id?null:p.id)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:13,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:160}}><div style={{fontWeight:800,fontSize:14,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{p.name}<span style={{fontSize:9,background:p.locked>0?C.yellow:"var(--bg-success)",color:p.locked>0?"#111":"var(--text-success)",border:`1.5px solid var(--text-main)`,padding:"2px 8px",borderRadius:999,fontWeight:700}}>{p.locked>0?"⚡ ACTIVO":"✓ COMPLETADO"}</span><AvaxPill small/></div><Hash h={`${p.id} · ${p.contract}`}/></div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                {[{l:"Recaudado",v:`$${(p.raised/1000).toFixed(0)}K`},{l:"Liberado",v:`$${(p.released/1000).toFixed(0)}K`,c:C.success},{l:"Escrow",v:`$${(p.locked/1000).toFixed(0)}K`,c:C.orange}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:17,fontWeight:700,color:s.c||"var(--text-main)"}} className={s.c?"":"text-gray-900 dark:text-white"}>{s.v}</div><div style={{fontSize:9,opacity:.45,textTransform:"uppercase",color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{s.l}</div></div>)}
              </div>
              <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",background:`${riskC[p.risk]}22`,color:riskC[p.risk],borderRadius:999,border:`1px solid ${riskC[p.risk]}55`}}>RISK {p.risk}</span>
              <span style={{fontSize:18,opacity:.3,transition:"transform .2s",transform:open===p.id?"rotate(90deg)":"none",color:"var(--text-main)"}}>›</span>
            </div>
            {open===p.id&&<div style={{padding:"16px 18px",borderTop:`2px solid var(--border-gray)`,background:"var(--bg-gray)",animation:"slideUp .3s ease forwards"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.45,marginBottom:8,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">HITOS ColmenaCampaign.sol</div>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {MILESTONES.filter((_,i)=>i<(p.id===1?4:2)).map(m=>{const s=MSC[m.status];return <div key={m.id} style={{display:"flex",gap:8,alignItems:"center",padding:"6px 9px",border:`1.5px solid ${s.border}`,borderRadius:5,background:s.bg}}><div style={{width:20,height:20,borderRadius:"50%",background:s.bg,border:`1.5px solid ${s.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,flexShrink:0,color:s.color}}>{m.id}</div><span style={{fontSize:11,fontWeight:600,flex:1,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{m.title}</span>{m.hash&&<><Hash h={m.hash}/><SnowtraceLink/></>}<span style={{fontSize:9,fontWeight:700,color:s.color}}>{s.label}</span></div>;})}
                  </div>
                </div>
                <div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",opacity:.45,marginBottom:8,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">FLUJO CAPITAL</div>
                  <div style={{background:"#111",borderRadius:7,padding:"14px 16px"}}>
                    {[["Total recaudado",`$${p.raised.toLocaleString()} USDC`,C.yellow],["Capital liberado",`$${p.released.toLocaleString()} USDC`,C.success],["Aún en escrow",`$${p.locked.toLocaleString()} USDC`,C.orange],["Fee 1.5%",`$${p.fee}`,"rgba(255,255,255,0.4)"]].map(([l,v,col],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<3?`1px solid rgba(255,255,255,.06)`:"none"}}><span style={{fontSize:11,color:"rgba(255,255,255,.45)"}}>{l}</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:13,color:col}}>{v}</span></div>)}
                  </div>
                  <div style={{marginTop:9,display:"flex",justifyContent:"flex-end"}}><SnowtraceLink/></div>
                </div>
              </div>
            </div>}
          </div>)}
        </div>
      </div>
      <div className="rsp-exp-sidebar" style={{position:"sticky",top:80}}>
        <div className="card" style={{overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"11px 14px",background:"#111",color:"#fff",display:"flex",alignItems:"center",gap:7}}><Dot/><span style={{fontWeight:700,fontSize:11,textTransform:"uppercase"}}>TXs en Vivo · Snowtrace Fuji</span></div>
          {ADMIN_TXS.map((tx,i)=><div key={i} style={{padding:"10px 13px",borderBottom:i<3?`1px solid var(--border-gray)`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11,fontWeight:700,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{tx.project}</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,color:tx.amount.startsWith("+")?C.success:tx.amount==="—"?"#aaa":C.avax}}>{tx.amount}</span></div>
            <div style={{fontSize:11,opacity:.55,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">{tx.type}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:C.avax,marginTop:2}}><Hash h={tx.hash}/> · Fuji {tx.block}</div>
          </div>)}
        </div>
        <div className="card" style={{padding:14}}>
          <div style={{fontWeight:800,fontSize:12,textTransform:"uppercase",marginBottom:5,color:"var(--text-main)"}} className="text-gray-900 dark:text-white">🔍 Verificar TX</div>
          <input placeholder="0x..." style={{marginBottom:8,fontSize:12}}/>
          <a href="https://testnet.snowtrace.io" target="_blank" rel="noreferrer" className="btn-avax" style={{width:"100%",justifyContent:"center",textDecoration:"none",display:"flex",padding:"8px",fontSize:12}}>🔺 Snowtrace Fuji</a>
        </div>
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// CREAR CAMPAÑA
// ═══════════════════════════════════════════════════════════════════
function CrearCampana({setPage}){
  const [step,setStep]=useState(0);
  const [data,setData]=useState({name:"",cat:"",loc:"",desc:"",goal:"",dur:"",milestones:[{id:1,title:"",pct:25,deadline:""},{id:2,title:"",pct:25,deadline:""}],sym:"",rev:"",thresh:"",ttype:"erc20"});
  const [deploying,setDeploying]=useState(false);const [deployed,setDeployed]=useState(false);
  const STEPS=["Info","Hitos","Token","Review","Deploy"];
  const pctTotal=(data.milestones||[]).reduce((a,m)=>a+Number(m.pct||0),0);
  const updM=(id,f,v)=>setData(d=>({...d,milestones:d.milestones.map(m=>m.id===id?{...m,[f]:v}:m)}));
  const addM=()=>setData(d=>({...d,milestones:[...d.milestones,{id:d.milestones.reduce((a,m)=>Math.max(a,m.id),0)+1,title:"",pct:0,deadline:""}]}));
  const canNext=()=>{if(step===0)return data.name&&data.goal;if(step===1)return pctTotal===100&&data.milestones.every(m=>m.title);if(step===2)return data.sym&&data.rev;return true;};
  const doDeploy=()=>{setDeploying(true);setTimeout(()=>{setDeploying(false);setDeployed(true);},2200);};
  return <div className="rsp-split" style={{display:"flex",minHeight:"100vh",paddingTop:64}}>
    <div className="rsp-split-left" style={{width:"34%",background:"var(--bg-hero)",backgroundImage:HEX,padding:"36px 28px",display:"flex",flexDirection:"column",justifyContent:"center",borderRight:`2px solid var(--text-main)`,minHeight:"calc(100vh - 64px)",color:"var(--text-main)", transition:"background 0.3s ease"}}>
      <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:C.orange,opacity:.8,marginBottom:12}}>CREAR CAMPAÑA</div>
      <h2 style={{fontSize:"clamp(26px,3vw,42px)",fontWeight:900,textTransform:"uppercase",lineHeight:.88,marginBottom:16,letterSpacing:"-.02em"}}>EL DINERO<br/>TIENE<br/><span style={{color:C.orange}}>REGLAS</span></h2>
      <p style={{fontSize:13,lineHeight:1.6,opacity:.75,marginBottom:20,maxWidth:270}}>Define hitos on-chain. El escrow libera fondos solo al cumplir cada etapa — verificado en Avalanche Fuji.</p>
      {[{i:"🔺",t:"Avalanche Fuji · Chain 43113"},{i:"⚡",t:"Finalidad ~2s"},{i:"🔒",t:"ColmenaCampaign.sol"},{i:"💰",t:"1.5% solo sobre liberados"}].map((t,i)=><div key={i} style={{display:"flex",gap:9,background:"rgba(255,255,255,.15)",border:`1.5px solid rgba(0,0,0,.1)`,borderRadius:999,padding:"5px 12px",marginBottom:6,fontSize:12,fontWeight:600,alignItems:"center"}}><span style={{fontSize:13}}>{t.i}</span>{t.t}</div>)}
      {data.name&&<div style={{marginTop:18,background:"var(--bg-main)",border:`2px solid var(--text-main)`,borderRadius:8,padding:"12px 14px",boxShadow:`3px 3px 0 var(--text-main)`}}><div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",opacity:.5,marginBottom:3}}>PREVIEW</div><div style={{fontWeight:800,fontSize:13,marginBottom:2,wordBreak:"break-word"}}>{data.name}</div>{data.goal&&<div style={{fontFamily:"'JetBrains Mono',monospace",color:C.orange,fontWeight:700,fontSize:15}}>${Number(data.goal).toLocaleString()} USDC</div>}{data.sym&&<div style={{fontSize:10,opacity:.6,marginTop:2}}>Token: {data.sym} ERC-20 · {data.rev||"?"}% rev</div>}</div>}
    </div>
    <div className="rsp-split-right" style={{flex:1,padding:"36px 44px",overflowY:"auto",background:"var(--bg-main)"}}>
      <div style={{maxWidth:520,margin:"0 auto"}}>
        <button className="btn-outline" style={{padding:"5px 12px",fontSize:11,marginBottom:18}} onClick={()=>setPage("landing")}>← Volver</button>
        {/* stepbar */}
        <div style={{display:"flex",alignItems:"center",marginBottom:26}}>
          {STEPS.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",flex:i<4?1:"auto"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{width:30,height:30,borderRadius:"50%",flexShrink:0,background:i<step?C.success:i===step?C.yellow:"var(--bg-gray)",border:`2px solid ${i<=step?"var(--text-main)":"var(--border-gray)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:i<step?12:10,fontWeight:700,boxShadow:i<=step?`2px 2px 0 var(--text-main)`:"none",color:i<=step?"#111":"var(--text-main)"}}>{i<step?"✓":i+1}</div><span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",opacity:i===step?1:.35,whiteSpace:"nowrap"}}>{s}</span></div>
            {i<4&&<div style={{flex:1,height:2,background:i<step?C.success:"var(--border-gray)",margin:"0 4px",marginBottom:14,minWidth:8}}/>}
          </div>)}
        </div>

        {step===0&&<div className="slide">
          <h2 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:4}}>Información Básica</h2>
          <p style={{fontSize:12,opacity:.6,marginBottom:18}}>Datos del contrato <Hash h="ColmenaCampaign.sol"/> en Fuji.</p>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div><label>Nombre del Proyecto *</label><input value={data.name} onChange={e=>setData(d=>({...d,name:e.target.value}))} placeholder="Ej. SolarHogar LATAM"/></div>
            <div className="rsp-form-grid"><div><label>Categoría</label><select value={data.cat} onChange={e=>setData(d=>({...d,cat:e.target.value}))}><option value="">Seleccionar...</option>{["ENERGÍA","EDUCACIÓN","AGRI-TECH","SALUD","FINTECH","AGUA","VIVIENDA"].map(c=><option key={c}>{c}</option>)}</select></div><div><label>País / Ciudad</label><input value={data.loc} onChange={e=>setData(d=>({...d,loc:e.target.value}))} placeholder="Bogotá, Colombia"/></div></div>
            <div><label>Descripción *</label><textarea value={data.desc} onChange={e=>setData(d=>({...d,desc:e.target.value}))} placeholder="Describe el impacto de tu proyecto..."/></div>
            <div className="rsp-form-grid"><div><label>Meta (USDC) *</label><input type="number" value={data.goal} onChange={e=>setData(d=>({...d,goal:e.target.value}))} placeholder="25000"/></div><div><label>Duración (días)</label><input type="number" value={data.dur} onChange={e=>setData(d=>({...d,dur:e.target.value}))} placeholder="60"/></div></div>
            <div style={{padding:"8px 11px",background:C.avaxBg,border:`1.5px solid ${C.avax}55`,borderRadius:4,fontSize:11,color:C.avax,fontFamily:"'JetBrains Mono',monospace"}}>🔺 Red: Avalanche Fuji · Chain 43113 · ColmenaCampaign.sol</div>
          </div>
        </div>}

        {step===1&&<div className="slide">
          <h2 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:4}}>Hitos & Capital</h2>
          <p style={{fontSize:12,opacity:.6,marginBottom:14}}>Los fondos se liberan del escrow Avalanche solo al cumplir cada hito. Suma = 100%.</p>
          <div style={{background:pctTotal===100?"var(--bg-success)":pctTotal>100?C.redBg:"var(--bg-gray)",border:`2px solid ${pctTotal===100?C.success:pctTotal>100?C.red:"var(--border-gray)"}`,borderRadius:6,padding:"9px 13px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1,height:7,background:"rgba(0,0,0,.1)",border:`1.5px solid var(--text-main)`,borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(pctTotal,100)}%`,background:pctTotal===100?C.success:pctTotal>100?C.red:C.yellow,borderRadius:999}}/></div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:700,color:pctTotal===100?C.success:pctTotal>100?C.red:C.orange}}>{pctTotal}%</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:13}}>
            {data.milestones.map((m,i)=><div key={m.id} style={{border:`2px solid var(--text-main)`,borderRadius:7,overflow:"hidden",boxShadow:`3px 3px 0 var(--text-main)`}}>
              <div style={{background:C.yellow,backgroundImage:HEX,padding:"7px 12px",borderBottom:`2px solid var(--text-main)`,display:"flex",justifyContent:"space-between",alignItems:"center",color:"#111"}}><span style={{fontWeight:800,fontSize:12,textTransform:"uppercase"}}>Hito {i+1}</span>{data.milestones.length>2&&<button onClick={()=>setData(d=>({...d,milestones:d.milestones.filter(mm=>mm.id!==m.id)}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,opacity:.5,fontFamily:"'DM Sans',sans-serif",color:"#111"}}>✕</button>}</div>
              <div className="rsp-milestone-grid" style={{padding:"11px 12px"}}>
                <div><label>Título</label><input value={m.title} onChange={e=>updM(m.id,"title",e.target.value)} placeholder="Ej. Adquisición equipos"/></div>
                <div><label>% Capital</label><input type="number" value={m.pct} onChange={e=>updM(m.id,"pct",e.target.value)} placeholder="25"/>{data.goal&&m.pct?<div style={{fontSize:9,opacity:.4,marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>${(Number(data.goal)*m.pct/100).toLocaleString()}</div>:null}</div>
                <div><label>Fecha límite</label><input value={m.deadline} onChange={e=>updM(m.id,"deadline",e.target.value)} placeholder="Mar 2025"/></div>
              </div>
            </div>)}
          </div>
          <button className="btn-outline" style={{fontSize:12}} onClick={addM}>+ Agregar Hito</button>
        </div>}

        {step===2&&<div className="slide">
          <h2 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:4}}>Tokenización</h2>
          <p style={{fontSize:12,opacity:.6,marginBottom:18}}>Tokens ERC-20 en Avalanche para revenue sharing automático.</p>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div className="rsp-form-grid"><div><label>Símbolo Token ERC-20 *</label><input value={data.sym} onChange={e=>setData(d=>({...d,sym:e.target.value.toUpperCase().slice(0,5)}))} placeholder="SLR" maxLength={5}/></div><div><label>Revenue Share % *</label><input type="number" value={data.rev} onChange={e=>setData(d=>({...d,rev:e.target.value}))} placeholder="8"/></div></div>
            <div><label>Umbral de Activación *</label><input value={data.thresh} onChange={e=>setData(d=>({...d,thresh:e.target.value}))} placeholder="$50,000 en ventas anuales"/></div>
            <div style={{background:"var(--bg-purple)",border:`2px solid var(--border-purple)`,borderRadius:7,padding:"14px 16px"}}>
              <div style={{fontWeight:800,fontSize:12,textTransform:"uppercase",color:"var(--text-purple)",marginBottom:9}}>🪙 Flujo en Avalanche</div>
              {["Inversor deposita USDC/AVAX en ColmenaCampaign.sol","Recibe tokens "+((data.sym||"XYZ"))+" ERC-20 proporcionales","Al alcanzar umbral, creador inyecta ingresos al contrato","Smart contract distribuye "+(data.rev||"X")+"% a todos los holders","Claim desde Dashboard — fondos en Fuji"].map((t,i)=><div key={i} style={{fontSize:12,marginBottom:5,display:"flex",gap:7,color:"var(--text-main)"}}><span style={{color:C.success,fontWeight:700}}>✓</span>{t}</div>)}
            </div>
            <div><label>Tipo de Token</label><div style={{display:"flex",gap:9,flexWrap:"wrap"}}>{["Transferible (ERC-20)","Soulbound (SBT)"].map((t,i)=><div key={i} onClick={()=>setData(d=>({...d,ttype:i===0?"erc20":"sbt"}))} style={{flex:1,minWidth:"140px",padding:"11px 13px",border:`2px solid ${data.ttype===(i===0?"erc20":"sbt")?"var(--text-main)":"var(--border-gray)"}`,borderRadius:5,cursor:"pointer",background:data.ttype===(i===0?"erc20":"sbt")?C.yellow:"var(--bg-main)",color:data.ttype===(i===0?"erc20":"sbt")?"#111":"var(--text-main)",fontWeight:700,fontSize:12,transition:"all .15s"}}>{i===0?"🔄":"🔒"} {t}</div>)}</div></div>
          </div>
        </div>}

        {step===3&&<div className="slide">
          <h2 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:4}}>Revisión Final</h2>
          <p style={{fontSize:12,opacity:.6,marginBottom:16}}>Los parámetros del contrato Solidity son <strong>inmutables</strong> una vez desplegado.</p>
          {[{t:"📋 General",rows:[["Proyecto",data.name||"—"],["Meta",data.goal?`$${Number(data.goal).toLocaleString()} USDC`:"—"],["Duración",data.dur?`${data.dur} días`:"—"]]},{t:`🎯 Hitos (${data.milestones.length})`,rows:data.milestones.map((m,i)=>[`H${i+1}: ${m.title||"Sin título"}`,`${m.pct}%${data.goal?` · $${(Number(data.goal)*m.pct/100).toLocaleString()}`:""}`])},{t:"🪙 Token ERC-20 · Avalanche Fuji",rows:[["Símbolo",data.sym||"—"],["Revenue Share",data.rev?`${data.rev}%`:"—"],["Umbral",data.thresh||"—"],["Tipo",data.ttype==="sbt"?"Soulbound":"ERC-20"],["Fee Colmena","1.5% — solo sobre liberados"],["Red","Avalanche Fuji · Chain 43113"]]}].map((sec,si)=><div key={si} style={{border:`2px solid var(--text-main)`,borderRadius:7,overflow:"hidden",boxShadow:`3px 3px 0 var(--text-main)`,marginBottom:12}}>
            <div style={{padding:"9px 13px",background:"var(--text-main)",color:"var(--bg-main)",fontWeight:700,fontSize:11,textTransform:"uppercase"}}>{sec.t}</div>
            {sec.rows.map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",gap:"10px",padding:"7px 13px",borderBottom:`1px solid var(--border-gray)`,fontSize:12}}><span style={{opacity:.55}}>{l}</span><span style={{fontWeight:700,wordBreak:"break-word",textAlign:"right"}}>{l==="Red"?v:<Hash h={v}/>}</span></div>)}
          </div>)}
        </div>}

        {step===4&&<div className="slide">
          {deployed?<div style={{textAlign:"center"}}>
            <div style={{fontSize:60,marginBottom:10,animation:"checkPop .5s ease forwards"}}>🔺</div>
            <h2 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:6}}>¡Contrato Desplegado!</h2>
            <div className="card" style={{padding:"13px 16px",marginBottom:16,textAlign:"left"}}>
              {[["Contrato","0xNEW...F4b2"],["Función","ColmenaCampaign.sol"],["Red","Avalanche Fuji Testnet"],["Chain ID","43113"],["TX Deploy","0x8a1c...33ef"],["Token",`${data.sym||"XYZ"} ERC-20 emitido`],["Estado","⚡ CAMPAÑA ACTIVA"]].map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",gap:10,padding:"6px 0",borderBottom:`1px solid var(--border-gray)`,fontSize:12}}><span style={{opacity:.55}}>{l}</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.avax,fontSize:11,textAlign:"right"}}>{v}</span></div>)}
            </div>
            <div style={{display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-avax" style={{padding:"11px 22px",width:"100%"}} onClick={()=>setPage("dashboard-creator")}>Ver mi Dashboard →</button>
              <SnowtraceLink/>
            </div>
          </div>:<div>
            <h2 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:6}}>Desplegar ColmenaCampaign.sol</h2>
            <div style={{background:"var(--bg-warn)",border:`2px solid ${C.yellow}`,borderRadius:7,padding:"14px 16px",marginBottom:16,color:"var(--text-main)"}}>
              <div style={{fontWeight:800,fontSize:12,marginBottom:8}}>⚠️ Antes de continuar</div>
              {["Parámetros Solidity INMUTABLES una vez desplegado","Necesitas Core Wallet / MetaMask en Fuji (Chain 43113)","Fee del 1.5% solo sobre fondos liberados exitosamente","Estás en TESTNET — sin dinero real"].map((t,i)=><div key={i} style={{fontSize:12,marginBottom:4}}>• {t}</div>)}
            </div>
            <button className="btn-avax" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:14,opacity:deploying?.7:1}} onClick={doDeploy}>
              {deploying?<><span style={{width:18,height:18,border:`3px solid rgba(255,255,255,.3)`,borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/>Desplegando en Avalanche Fuji...</>:"🔺 Desplegar en Avalanche Fuji"}
            </button>
            <div style={{marginTop:8,fontSize:10,opacity:.45,fontFamily:"'JetBrains Mono',monospace",textAlign:"center"}}>Core / MetaMask · ColmenaCampaign.sol · OpenZeppelin · Fuji 43113</div>
          </div>}
        </div>}

        {step<4&&<div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:18,borderTop:`2px solid var(--border-gray)`}}>
          {step>0?<button className="btn-outline" onClick={()=>setStep(s=>s-1)}>← Anterior</button>:<div/>}
          <button className="btn-primary" onClick={()=>setStep(s=>s+1)} style={{opacity:canNext()?1:.4}}>{step===3?"Ir a Desplegar →":"Siguiente →"}</button>
        </div>}
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// PAGE: ADMIN
// ═══════════════════════════════════════════════════════════════════
function Admin({setPage}){
  const [sec,setSec]=useState("overview");
  const [selContract,setSelContract]=useState(null);
  const sideItems=[{k:"overview",i:"📊",l:"Resumen Global"},{k:"contracts",i:"🔒",l:"Contratos"},{k:"txs",i:"⛓️",l:"TXs Fuji"},{k:"alerts",i:"🚨",l:"Alertas",b:1},{k:"fees",i:"💼",l:"Revenue"},{k:"audit",i:"🔍",l:"Auditoría"}];
  const PSTATS=[{i:"💰",l:"En Escrow",v:"$284K",s:"USDC",c:C.yellow},{i:"✅",l:"Liberado",v:"$84K",s:"hitos OK",c:C.success},{i:"⛓️",l:"TXs Fuji",v:"3,891",s:"on-chain",c:"#8B5CF6"},{i:"🏦",l:"Fees",v:"$1,260",s:"1.5%",c:C.orange},{i:"🏗️",l:"Proyectos",v:"47",s:"contratos",c:"#3B82F6"},{i:"👥",l:"Inversores",v:"1,240",s:"wallets",c:"#F59E0B"}];
  const riskC={LOW:C.success,MED:C.yellow,HIGH:C.red,NONE:"#555"};
  const riskBg={LOW:"var(--bg-success)",MED:"#FEF3C7",HIGH:"var(--bg-red)",NONE:"#222"};
  const txTypeC={RELEASE:C.success,EVIDENCE:"#8B5CF6",FEE:C.orange,INVEST:"#3B82F6"};
  const ALERTS=[{lv:"HIGH",p:"CliniBus Perú",m:"Hito 1 vencido hace 8 días sin evidencia IPFS",t:"hace 2h"},{lv:"MED",p:"Aula Digital Mx",m:"Quorum en Fuji al 61% — riesgo de bloqueo",t:"hace 5h"},{lv:"LOW",p:"SolarHogar LATAM",m:"Gas limit cerca del tope en último batch de TXs",t:"hace 1d"}];
  const AUDIT=[["Balances on-chain coinciden con frontend — Fuji","PASS"],["Contratos no tienen renounced ownership","PASS"],["Fee nunca excede 1.5% verificado en Fuji","PASS"],["Hitos liberados solo con quorum on-chain","PASS"],["CliniBus Perú: evidencia IPFS vencida +7 días","WARN"],["Tokens ERC-20 corresponden a inversiones on-chain","PASS"],["Snowtrace Fuji accesible (Chain 43113)","PASS"]];
  return <div style={{background:"#0D0D0D",minHeight:"100vh",paddingTop:56}}>
    <div className="rsp-admin-wrap" style={{display:"flex",minHeight:"calc(100vh - 56px)"}}>
      <aside className="rsp-admin-sidebar" style={{width:200,background:"#111",borderRight:"1.5px solid #222",padding:"18px 11px",display:"flex",flexDirection:"column",gap:3,flexShrink:0}}>
        <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".14em",color:"rgba(255,255,255,.2)",marginBottom:5,paddingLeft:10}}>ADMIN</div>
        {sideItems.map(it=><div key={it.k} className={`nav-item-dark${sec===it.k?" active":""}`} onClick={()=>setSec(it.k)}><span style={{fontSize:14}}>{it.i}</span><span style={{flex:1}}>{it.l}</span>{it.b&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:999}}>{it.b}</span>}</div>)}
        <div style={{flex:1}}/>
        <div className="rsp-sidebar-bottom" style={{padding:"11px",background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:6}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",color:"rgba(255,255,255,.25)",marginBottom:4}}>RED ACTIVA</div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><Dot/><span style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:C.yellow}}>🔺 Avalanche Fuji</span></div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"rgba(255,255,255,.25)",marginTop:3}}>Chain ID: 43113 · Block: #4,291,141</div>
        </div>
      </aside>
      <main className="rsp-admin-main" style={{flex:1,padding:"24px 22px",overflowY:"auto"}}>
        <div style={{marginBottom:18}}><h1 style={{fontSize:22,fontWeight:900,textTransform:"uppercase",color:"#fff"}}>{{"overview":"Resumen Global","contracts":"Contratos Solidity","txs":"TXs Fuji","alerts":"Alertas","fees":"Revenue Colmena","audit":"Auditoría"}[sec]}</h1><p style={{fontSize:10,color:"rgba(255,255,255,.2)",marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}><Hash h="ColmenaCampaign.sol"/> · Avalanche Fuji · Chain 43113</p></div>

        {sec==="overview"&&<div>
          <div className="rsp-admin-metrics" style={{marginBottom:18}}>
            {PSTATS.map((m,i)=><div key={i} className="dc" style={{padding:"14px 16px",borderLeft:`3px solid ${m.c}`}}><div style={{fontSize:20,marginBottom:5}}>{m.i}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:700,color:m.c,lineHeight:1}}>{m.v}</div><div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",marginTop:3,color:"rgba(255,255,255,.35)"}}>{m.l}</div><div style={{fontSize:9,color:"rgba(255,255,255,.2)",marginTop:1}}>{m.s}</div></div>)}
          </div>
          <div className="dc" style={{padding:16,marginBottom:14}}><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>FLUJO CAPITAL — AVALANCHE FUJI</div><div style={{height:40,display:"flex",border:"1.5px solid #333",borderRadius:4,overflow:"hidden",marginBottom:9}}>{[{l:"LIBERADO",pct:30,c:C.success},{l:"ESCROW",pct:55,c:C.yellow},{l:"FEE",pct:.4,c:C.orange},{l:"",pct:14.6,c:"#2A2A2A"}].map((s,i)=><div key={i} style={{flex:s.pct,background:s.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:s.c===C.yellow?"#111":"#fff",minWidth:s.pct>3?36:0}}>{s.pct>3&&s.l}</div>)}</div><div style={{display:"flex",gap:16,flexWrap:"wrap"}}>{[{c:C.success,l:"Liberado 30%"},{c:C.yellow,l:"Escrow 55%"},{c:C.orange,l:"Fee 0.4%"},{c:"#333",l:"Libre 14.6%"}].map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"rgba(255,255,255,.4)"}}><div style={{width:8,height:8,borderRadius:2,background:l.c}}/>{l.l}</div>)}</div></div>
          <div className="dc" style={{overflow:"hidden"}}><div style={{padding:"10px 14px",borderBottom:"1px solid #2A2A2A",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#fff"}}>🚨 Alertas</span></div>{ALERTS.map((a,i)=><div key={i} style={{padding:"10px 14px",borderBottom:`1px solid #1E1E1E`,display:"flex",gap:9,alignItems:"center"}}><span style={{fontSize:13}}>{a.lv==="HIGH"?"🔴":a.lv==="MED"?"🟡":"🟢"}</span><div style={{flex:1}}><span style={{fontSize:11,fontWeight:700,color:riskC[a.lv]}}>[{a.lv}] </span><span style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{a.p} — {a.m}</span></div><span style={{fontSize:9,color:"rgba(255,255,255,.2)",fontFamily:"'JetBrains Mono',monospace"}}>{a.t}</span></div>)}</div>
        </div>}

        {sec==="contracts"&&<div className="dc" style={{overflow:"hidden"}}>
          <div style={{padding:"10px 14px",borderBottom:"1px solid #2A2A2A",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#fff"}}>ColmenaCampaign.sol — {ADMIN_PROJECTS.length} Contratos</span><AvaxPill text="Fuji 43113" small/></div>
          <div className="tbl-wrap"><table><thead><tr>{["Proyecto","Contrato","Escrow","Liberado","Fee","Risk",""].map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
            <tbody>{ADMIN_PROJECTS.map((p,i)=><tr key={i} onClick={()=>setSelContract(selContract===p.id?null:p.id)} style={{cursor:"pointer"}}>
              <td><span style={{fontWeight:700,color:"#fff"}}>{p.name}</span><br/><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:C.yellow}}>{p.id}</span></td>
              <td><Hash h={p.contract}/></td>
              <td><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.yellow}}>${p.locked.toLocaleString()}</span></td>
              <td><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.success}}>${p.released.toLocaleString()}</span></td>
              <td><span style={{fontFamily:"'JetBrains Mono',monospace",color:C.orange,fontSize:11}}>${p.fee}</span></td>
              <td><span style={{fontSize:9,fontWeight:700,padding:"2px 7px",background:riskBg[p.risk],color:riskC[p.risk],borderRadius:999}}>{p.risk}</span></td>
              <td><div style={{display:"flex",gap:4}}><button className="btn-ghost-dark" style={{padding:"3px 8px",fontSize:10}}>Ver</button>{p.risk==="HIGH"&&<button style={{background:"#FEE2E2",color:"#991B1B",border:"1px solid #EF4444",borderRadius:4,padding:"3px 8px",fontSize:9,fontWeight:700,cursor:"pointer"}}>⚠️ Acción</button>}</div></td>
            </tr>)}</tbody>
          </table></div>
          {selContract&&(()=>{const p=ADMIN_PROJECTS.find(pp=>pp.id===selContract);return p?<div style={{padding:"14px 16px",borderTop:"1px solid #333",background:"#151515",animation:"slideUp .25s ease forwards"}}>
            <div style={{fontWeight:700,fontSize:12,textTransform:"uppercase",color:C.yellow,marginBottom:10}}>🔍 {p.name} — ColmenaCampaign.sol</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:9}}>
              {[["Contrato",p.contract],["Escrow",`$${p.locked.toLocaleString()} USDC`],["Liberado",`$${p.released.toLocaleString()} USDC`],["Fee 1.5%",`$${p.fee}`],["Red","Avalanche Fuji (43113)"]].map(([l,v],i)=><div key={i} style={{background:"rgba(255,255,255,.04)",borderRadius:5,padding:"9px 11px"}}><div style={{fontSize:9,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:2}}>{l}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:C.yellow}}>{l==="Contrato"?<Hash h={v}/>:v}</div></div>)}
            </div>
            <div style={{marginTop:10,display:"flex",gap:7}}><a href="https://testnet.snowtrace.io" target="_blank" rel="noreferrer" style={{background:C.yellow,color:C.black,border:`2px solid ${C.yellow}`,padding:"6px 12px",borderRadius:4,fontWeight:700,fontSize:11,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:5}}>🔺 Snowtrace ↗</a>{p.risk==="HIGH"&&<button style={{background:"#FEE2E2",color:"#991B1B",border:"1px solid #EF4444",borderRadius:4,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>🔓 Habilitar Reembolso</button>}</div>
          </div>:null})()}
        </div>}

        {sec==="txs"&&<div className="dc" style={{overflow:"hidden"}}><div style={{padding:"10px 14px",borderBottom:"1px solid #2A2A2A",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:7,alignItems:"center"}}><Dot/><span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#fff"}}>TXs en Vivo · Snowtrace Fuji</span></div><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.avax,fontWeight:600}}>Chain 43113</span></div>
          <div className="tbl-wrap"><table><thead><tr>{["Hash","Proyecto","Tipo","Monto","Bloque","Hora"].map(h=><th key={h}>{h}</th>)}</tr></thead>
            <tbody>{ADMIN_TXS.map((tx,i)=><tr key={i}><td><Hash h={tx.hash}/></td><td style={{fontWeight:600,color:"#fff"}}>{tx.project}</td><td><span style={{fontSize:10,fontWeight:700,padding:"2px 8px",background:`${txTypeC[tx.type]}22`,color:txTypeC[tx.type],borderRadius:999}}>{tx.type}</span></td><td><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:tx.amount.startsWith("+")?C.success:tx.amount.startsWith("-")?C.orange:"rgba(255,255,255,.4)"}}>{tx.amount}</span></td><td style={{color:C.avax,fontFamily:"'JetBrains Mono',monospace",fontSize:10}}>Fuji {tx.block}</td><td style={{color:"rgba(255,255,255,.3)",fontSize:10}}>{tx.time}</td></tr>)}
            </tbody>
          </table></div>
          <div style={{padding:"9px 14px",background:"#141414",borderTop:"1px solid #1E1E1E",display:"flex",justifyContent:"flex-end"}}><a href="https://testnet.snowtrace.io" target="_blank" rel="noreferrer" style={{background:C.yellow,color:C.black,padding:"5px 12px",borderRadius:4,fontWeight:700,fontSize:11,textDecoration:"none"}}>🔺 Snowtrace Fuji ↗</a></div>
        </div>}

        {sec==="alerts"&&<div>{ALERTS.map((a,i)=><div key={i} className="dc" style={{marginBottom:11,padding:"14px 18px",borderLeft:`3px solid ${riskC[a.lv]}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}><div style={{display:"flex",gap:10}}><span style={{fontSize:20}}>{a.lv==="HIGH"?"🔴":a.lv==="MED"?"🟡":"🟢"}</span><div><div style={{display:"flex",gap:7,alignItems:"center",marginBottom:3}}><span style={{fontSize:10,fontWeight:700,padding:"2px 7px",background:riskBg[a.lv],color:riskC[a.lv],borderRadius:999}}>{a.lv}</span><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{a.p}</span></div><div style={{fontSize:13,color:"rgba(255,255,255,.55)"}}>{a.m}</div></div></div><div style={{display:"flex",gap:6,flexShrink:0}}>{a.lv==="HIGH"&&<button style={{background:"#FEE2E2",color:"#991B1B",border:"1px solid #EF4444",borderRadius:4,padding:"6px 11px",fontSize:11,fontWeight:700,cursor:"pointer"}}>⚠️ Acción</button>}<button className="btn-ghost-dark">Ignorar</button></div></div></div>)}</div>}

        {sec==="fees"&&<div><div className="rsp-fees-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:11,marginBottom:16}}>{[{l:"Fees Acumulados",v:"$1,260",s:"USDC · Fuji",c:C.yellow},{l:"Fee Rate",v:"1.5%",s:"sobre liberados",c:C.orange},{l:"Proyección",v:"$8,400",s:"si todos liberan",c:C.success}].map((m,i)=><div key={i} className="dc" style={{padding:"14px 16px",borderLeft:`3px solid ${m.c}`}}><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,fontWeight:700,color:m.c,marginBottom:3}}>{m.v}</div><div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",color:"rgba(255,255,255,.35)"}}>{m.l}</div><div style={{fontSize:9,color:"rgba(255,255,255,.2)",marginTop:1}}>{m.s}</div></div>)}</div>
          <div className="dc" style={{overflow:"hidden"}}><div style={{padding:"10px 14px",borderBottom:"1px solid #2A2A2A",fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#fff"}}>Por Contrato</div>{ADMIN_PROJECTS.filter(p=>p.fee>0).map((p,i)=><div key={i} style={{padding:"11px 14px",borderBottom:"1px solid #1E1E1E",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><div style={{flex:1,minWidth:"150px"}}><div style={{fontWeight:700,fontSize:12,color:"#fff"}}>{p.name}</div><div style={{fontSize:10,color:"rgba(255,255,255,.3)",fontFamily:"'JetBrains Mono',monospace",marginTop:2,wordBreak:"break-all"}}><Hash h={p.contract}/> · 1.5% de ${p.released.toLocaleString()}</div></div><div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.yellow,fontSize:16,minWidth:50,textAlign:"right"}}>${p.fee}</div></div>)}</div></div>}

        {sec==="audit"&&<div><div className="dc" style={{padding:18,marginBottom:14}}><div style={{fontWeight:800,fontSize:13,textTransform:"uppercase",color:C.yellow,marginBottom:12}}>🔍 Verificación de Integridad — Fuji</div>{AUDIT.map(([c,s],i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid #1E1E1E`}}><span style={{fontSize:14}}>{s==="PASS"?"✅":"⚠️"}</span><span style={{flex:1,fontSize:12,color:s==="WARN"?"#FCA5A5":"rgba(255,255,255,.65)"}}>{c}</span><span style={{fontSize:10,fontWeight:700,padding:"2px 7px",background:s==="PASS"?"var(--bg-success)":"var(--bg-red)",color:s==="PASS"?"var(--text-success)":"#991B1B",borderRadius:999}}>{s}</span></div>)}</div><div style={{display:"flex",gap:9}}><button style={{background:C.yellow,color:C.black,border:`2px solid ${C.yellow}`,padding:"9px 18px",borderRadius:4,fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>📥 Exportar Reporte</button><a href="https://testnet.snowtrace.io" target="_blank" rel="noreferrer" style={{background:C.yellow,color:C.black,border:`2px solid ${C.yellow}`,padding:"9px 16px",borderRadius:4,fontWeight:800,fontSize:12,textDecoration:"none"}}>🔺 Snowtrace ↗</a></div></div>}
      </main>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// ROOT ROUTER
// ═══════════════════════════════════════════════════════════════════
export default function RootApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Previene errores de hidratación en Next.js App Router

  return (
    <PrivyProvider
      appId="clx_example_app_id_here"
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple'],
        appearance: {
          theme: 'light',
          accentColor: '#F5C842',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <ThemeProvider>
        <I18nProvider>
          <ColmenaAppInner />
        </I18nProvider>
      </ThemeProvider>
    </PrivyProvider>
  );
}

function ColmenaAppInner() {
  const { user } = usePrivy();
  const [page,setPage]=useState("landing");
  const wallet = user?.wallet?.address;
  const [role,setRole]=useState(null);
  
  const { t } = useI18n();
  const navRef = useRef(null);

  const handleWheel = (e) => {
    if (navRef.current) {
      navRef.current.scrollLeft += e.deltaY;
    }
  };

  const PAGES=["landing","proyecto","onboarding","dashboard-creator","dashboard-investor","explorador","crear","admin"];
  const LABELS=[t("float_landing"),t("float_project"),t("float_onboarding"),t("float_dash_cr"),t("float_dash_in"),t("float_explorer"),t("float_create"),t("float_admin")];

  const renderPage=()=>{
    if(page==="landing")return <Landing setPage={setPage}/>;
    if(page==="proyecto")return <Proyecto setPage={setPage} wallet={wallet}/>;
    if(page==="onboarding")return <Onboarding setPage={setPage} setRole={setRole}/>;
    if(page==="dashboard-creator")return <DashboardCreator setPage={setPage}/>;
    if(page==="dashboard-investor")return <DashboardInvestor setPage={setPage}/>;
    if(page==="explorador")return <Explorador setPage={setPage}/>;
    if(page==="crear")return <CrearCampana setPage={setPage}/>;
    if(page==="admin")return <Admin setPage={setPage}/>;
    return <Landing setPage={setPage}/>;
  };

  return <>
    <style dangerouslySetInnerHTML={{ __html: G }} />
    <Navbar page={page} setPage={setPage} role={role} wallet={wallet}/>
    {renderPage()}

    {/* PAGE SWITCHER FLOATING NAV */}
    <div className="rsp-page-nav-wrapper">
      <div className="rsp-page-nav-scroll" ref={navRef} onWheel={handleWheel}>
        {PAGES.map((p, i) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`rsp-page-nav-item ${page === p ? "active" : ""}`}
          >
            {LABELS[i]}
          </button>
        ))}
      </div>
    </div>
  </>;
}
