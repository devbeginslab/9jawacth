
import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#1a472a",
  accent: "#22c55e",
  gold: "#f59e0b",
  dark: "#0f1f13",
  card: "#162a1b",
  cardBorder: "#22c55e33",
  text: "#e2e8f0",
  muted: "#94a3b8",
  danger: "#ef4444",
  info: "#3b82f6",
  premium: "#a855f7",
};

const naira = (n) => `₦${Number(n).toLocaleString()}`;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockTasks = [
  { id: 1, type: "video", title: "Watch Brand Video – GTBank 2025", url: "https://youtube.com", reward: 5, done: false },
  { id: 2, type: "video", title: "Watch Promo – Flutterwave Campaign", url: "https://youtube.com", reward: 5, done: false },
  { id: 3, type: "video", title: "Watch Advert – Dangote Foundation", url: "https://youtube.com", reward: 5, done: false },
  { id: 4, type: "follow", title: "Follow @NigerianStartups on Instagram", url: "https://instagram.com", reward: 5, done: false },
  { id: 5, type: "follow", title: "Follow @TechPointNG on Twitter", url: "https://twitter.com", reward: 5, done: false },
  { id: 6, type: "like", title: "Like Post – Paystack New Feature Launch", url: "https://twitter.com", reward: 3, done: false },
  { id: 7, type: "like", title: "Like Post – Africa Fintech Festival", url: "https://instagram.com", reward: 3, done: false },
  { id: 8, type: "comment", title: "Comment on – MTN Data Offer Post", url: "https://facebook.com", reward: 2, done: false },
];

const premiumExtraTasks = [
  { id: 9, type: "video", title: "Watch – Konga Flash Sale 2025", url: "https://youtube.com", reward: 5, done: false },
  { id: 10, type: "video", title: "Watch – Zenith Bank Digital Ad", url: "https://youtube.com", reward: 5, done: false },
  { id: 11, type: "follow", title: "Follow @LagosTechHub on LinkedIn", url: "https://linkedin.com", reward: 5, done: false },
  { id: 12, type: "follow", title: "Follow @NaijaTech on Instagram", url: "https://instagram.com", reward: 5, done: false },
  { id: 13, type: "follow", title: "Follow @AfricanStartups on Twitter", url: "https://twitter.com", reward: 5, done: false },
  { id: 14, type: "like", title: "Like Post – Cowrywise Investment Tips", url: "https://twitter.com", reward: 3, done: false },
  { id: 15, type: "like", title: "Like Post – Carbon Financial Services", url: "https://instagram.com", reward: 3, done: false },
  { id: 16, type: "comment", title: "Comment on – Piggyvest Savings Post", url: "https://instagram.com", reward: 2, done: false },
  { id: 17, type: "comment", title: "Comment on – ChipperCash Promo", url: "https://facebook.com", reward: 2, done: false },
  { id: 18, type: "video", title: "Watch – Access Bank Youth Campaign", url: "https://youtube.com", reward: 5, done: false },
  { id: 19, type: "follow", title: "Follow @StartupNation on Twitter", url: "https://twitter.com", reward: 5, done: false },
  { id: 20, type: "like", title: "Like Post – Andela Nigeria Careers", url: "https://linkedin.com", reward: 3, done: false },
];

const taskIcon = (type) => {
  if (type === "video") return "▶";
  if (type === "follow") return "👤";
  if (type === "like") return "❤️";
  if (type === "comment") return "💬";
  return "📌";
};

const taskColor = (type) => {
  if (type === "video") return "#ef4444";
  if (type === "follow") return "#3b82f6";
  if (type === "like") return "#ec4899";
  if (type === "comment") return "#f59e0b";
  return "#94a3b8";
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Badge({ children, color = COLORS.accent }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}55`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700,
    }}>{children}</span>
  );
}

function GreenBtn({ children, onClick, disabled, small, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "#1a2e1a" : `linear-gradient(135deg, ${COLORS.accent}, #16a34a)`,
      color: disabled ? COLORS.muted : "#fff",
      border: "none", borderRadius: 10,
      padding: small ? "8px 18px" : "13px 28px",
      fontWeight: 700, fontSize: small ? 13 : 15,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all .2s", ...style,
    }}>{children}</button>
  );
}

function GoldBtn({ children, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      background: `linear-gradient(135deg, ${COLORS.gold}, #d97706)`,
      color: "#000", border: "none", borderRadius: 10,
      padding: small ? "8px 18px" : "13px 28px",
      fontWeight: 800, fontSize: small ? 13 : 15,
      cursor: "pointer", transition: "all .2s",
    }}>{children}</button>
  );
}

function PurpleBtn({ children, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      background: `linear-gradient(135deg, ${COLORS.premium}, #7c3aed)`,
      color: "#fff", border: "none", borderRadius: 10,
      padding: small ? "8px 18px" : "13px 28px",
      fontWeight: 700, fontSize: small ? 13 : 15,
      cursor: "pointer",
    }}>{children}</button>
  );
}

function StatCard({ label, value, icon, color = COLORS.accent }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${color}33`,
      borderRadius: 14, padding: "18px 20px", flex: 1, minWidth: 140,
    }}>
      <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
      <div style={{ color, fontSize: 22, fontWeight: 800 }}>{value}</div>
      <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ goTo }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.dark, color: COLORS.text, fontFamily: "Inter, sans-serif" }}>
      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold})`, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: 18 }}>9</div>
          <span style={{ fontWeight: 900, fontSize: 20, color: COLORS.accent }}>9jaWatchers</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => goTo("login")} style={{ background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontWeight: 600 }}>Login</button>
          <GreenBtn small onClick={() => goTo("signup")}>Get Started</GreenBtn>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "70px 20px 50px" }}>
        <Badge color={COLORS.gold}>🇳🇬 Nigeria's #1 Earning Platform</Badge>
        <h1 style={{ fontSize: 48, fontWeight: 900, margin: "20px 0 10px", lineHeight: 1.1 }}>
          Earn with Every <span style={{ color: COLORS.accent }}>Click</span>
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 18, maxWidth: 520, margin: "0 auto 36px" }}>
          Watch videos, follow accounts, like and comment on posts — get paid directly to your bank account.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <GreenBtn onClick={() => goTo("signup")}>Start Earning Today 🚀</GreenBtn>
          <button onClick={() => goTo("signup")} style={{ background: "transparent", color: COLORS.accent, border: `1px solid ${COLORS.accent}`, borderRadius: 10, padding: "13px 28px", fontWeight: 700, cursor: "pointer" }}>
            See Plans
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "flex", justifyContent: "center", gap: 40, padding: "20px 20px 50px", flexWrap: "wrap" }}>
        {[["₦2,400+", "Earned Daily (Basic)"], ["₦6,000+", "Earned Daily (Premium)"], ["24hrs", "Withdrawal Processing"], ["100%", "Paystack Secured"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.accent }}>{v}</div>
            <div style={{ color: COLORS.muted, fontSize: 13 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* PLANS */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px 60px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, marginBottom: 30 }}>Choose Your Plan</h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Basic */}
          <div style={{ flex: 1, minWidth: 260, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 18, padding: 28 }}>
            <Badge color={COLORS.accent}>Basic</Badge>
            <div style={{ fontSize: 36, fontWeight: 900, margin: "14px 0 4px" }}>₦4,000</div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>One-time activation fee</div>
            {["8 tasks per day", "₦500 signup bonus", "₦500 per referral", "Watch, Follow, Like, Comment", "Direct bank withdrawal", "Min. ₦2,000 withdrawal"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 14 }}>
                <span style={{ color: COLORS.accent }}>✓</span> {f}
              </div>
            ))}
            <GreenBtn onClick={() => goTo("signup")} style={{ width: "100%", marginTop: 16 }}>Activate Basic</GreenBtn>
          </div>
          {/* Premium */}
          <div style={{ flex: 1, minWidth: 260, background: COLORS.card, border: `2px solid ${COLORS.premium}`, borderRadius: 18, padding: 28, position: "relative" }}>
            <div style={{ position: "absolute", top: -12, right: 20, background: `linear-gradient(135deg, ${COLORS.gold}, #d97706)`, color: "#000", fontWeight: 800, fontSize: 11, borderRadius: 20, padding: "4px 12px" }}>BEST VALUE</div>
            <Badge color={COLORS.premium}>Premium</Badge>
            <div style={{ fontSize: 36, fontWeight: 900, margin: "14px 0 4px" }}>₦8,000</div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>One-time activation fee</div>
            {["20 tasks per day", "₦1,000 signup bonus", "₦1,000 per referral", "All task types", "Priority withdrawals", "Min. ₦2,000 withdrawal"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 14 }}>
                <span style={{ color: COLORS.premium }}>✓</span> {f}
              </div>
            ))}
            <PurpleBtn onClick={() => goTo("signup")} style={{ width: "100%", marginTop: 16 }}>Activate Premium</PurpleBtn>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: COLORS.card, padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 800, marginBottom: 36 }}>How It Works</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", maxWidth: 860, margin: "0 auto" }}>
          {[["1", "Sign Up & Pay", "Register and pay your activation fee via Paystack to unlock your plan."],
            ["2", "Complete Tasks", "Watch videos, follow accounts, like and comment on posts daily."],
            ["3", "Earn Naira", "Every completed task credits your wallet instantly."],
            ["4", "Withdraw", "Request a withdrawal directly to your bank account anytime."]].map(([n, t, d]) => (
            <div key={n} style={{ textAlign: "center", maxWidth: 180 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, #16a34a)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#000", margin: "0 auto 12px" }}>{n}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{t}</div>
              <div style={{ color: COLORS.muted, fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "30px 20px", color: COLORS.muted, fontSize: 13 }}>
        © 2025 9jaWatchers · Earn with every click... · Powered by Paystack
      </div>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({ mode, goTo, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", ref: "" });
  const [step, setStep] = useState(1); // 1=form, 2=payment

  const isLogin = mode === "login";

  const handleSubmit = () => {
    if (isLogin) {
      if (form.email.includes("admin")) { onLogin("admin"); }
      else if (form.email.includes("premium")) { onLogin("premium"); }
      else { onLogin("basic"); }
    } else {
      setStep(2);
    }
  };

  const handlePay = (plan) => {
    onLogin(plan);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.dark, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 440, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 36 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold})`, borderRadius: 12, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: 22, margin: "0 auto 12px" }}>9</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: COLORS.accent }}>9jaWatchers</div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>Earn with every click...</div>
        </div>

        {step === 1 && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 22, textAlign: "center", color: COLORS.text }}>
              {isLogin ? "Welcome Back 👋" : "Create Your Account"}
            </h2>
            {!isLogin && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>Full Name</label>
                <input placeholder="e.g. Oluwaseun Ogunseye" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
              </div>
            )}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>Email Address</label>
              <input placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            {!isLogin && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>Phone Number</label>
                <input placeholder="08012345678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
              </div>
            )}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            {!isLogin && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>Referral Code (Optional)</label>
                <input placeholder="Enter referral code" value={form.ref} onChange={e => setForm({ ...form, ref: e.target.value })}
                  style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
              </div>
            )}
            <GreenBtn onClick={handleSubmit} style={{ width: "100%" }}>
              {isLogin ? "Login to Dashboard" : "Continue to Payment →"}
            </GreenBtn>
            <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: COLORS.muted }}>
              {isLogin ? <>Don't have an account? <span onClick={() => goTo("signup")} style={{ color: COLORS.accent, cursor: "pointer", fontWeight: 700 }}>Sign Up</span></> :
                <>Already have an account? <span onClick={() => goTo("login")} style={{ color: COLORS.accent, cursor: "pointer", fontWeight: 700 }}>Login</span></>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, textAlign: "center" }}>Choose Your Plan</h2>
            <p style={{ color: COLORS.muted, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Select a plan to activate your account</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "#0f1f13", border: `1px solid ${COLORS.accent}55`, borderRadius: 14, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div><div style={{ fontWeight: 800 }}>Basic Plan</div><div style={{ color: COLORS.muted, fontSize: 12 }}>8 tasks/day · ₦500 bonus</div></div>
                  <div style={{ fontWeight: 900, color: COLORS.accent, fontSize: 20 }}>₦4,000</div>
                </div>
                <GreenBtn small onClick={() => handlePay("basic")} style={{ width: "100%" }}>Pay ₦4,000 via Paystack</GreenBtn>
              </div>
              <div style={{ background: "#0f1f13", border: `2px solid ${COLORS.premium}55`, borderRadius: 14, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>Premium Plan <Badge color={COLORS.premium}>Best Value</Badge></div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>20 tasks/day · ₦1,000 bonus</div>
                  </div>
                  <div style={{ fontWeight: 900, color: COLORS.premium, fontSize: 20 }}>₦8,000</div>
                </div>
                <PurpleBtn small onClick={() => handlePay("premium")} style={{ width: "100%" }}>Pay ₦8,000 via Paystack</PurpleBtn>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <span onClick={() => setStep(1)} style={{ color: COLORS.muted, fontSize: 13, cursor: "pointer" }}>← Back</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── TASK CARD ────────────────────────────────────────────────────────────────
function TaskCard({ task, onComplete }) {
  const [state, setState] = useState("idle"); // idle | counting | done
  const [seconds, setSeconds] = useState(50);
  const [externalOpen, setExternalOpen] = useState(false);
  const timerRef = useRef(null);

  const startTask = () => {
    setExternalOpen(true);
    setState("counting");
    setSeconds(50);
    let s = 50;
    timerRef.current = setInterval(() => {
      s -= 1;
      setSeconds(s);
      if (s <= 0) {
        clearInterval(timerRef.current);
        setState("done");
        onComplete(task.id, task.reward);
      }
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const color = taskColor(task.type);

  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${task.done ? COLORS.accent + "44" : COLORS.cardBorder}`,
      borderLeft: `4px solid ${task.done ? COLORS.accent : color}`,
      borderRadius: 14, padding: "16px 18px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
      opacity: task.done ? 0.6 : 1,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
        <div style={{ fontSize: 22 }}>{taskIcon(task.type)}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{task.title}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Badge color={color}>{task.type}</Badge>
            <Badge color={COLORS.gold}>+₦{task.reward}</Badge>
          </div>
        </div>
      </div>
      <div style={{ minWidth: 110, textAlign: "right" }}>
        {task.done ? (
          <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: 13 }}>✓ Completed</span>
        ) : state === "idle" ? (
          <GreenBtn small onClick={startTask}>Start Task</GreenBtn>
        ) : state === "counting" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ color: COLORS.gold, fontWeight: 900, fontSize: 22 }}>{seconds}s</div>
            <div style={{ color: COLORS.muted, fontSize: 11 }}>Verifying...</div>
            <div style={{ width: 80, height: 4, background: "#1a2e1a", borderRadius: 4, marginTop: 4 }}>
              <div style={{ width: `${((50 - seconds) / 50) * 100}%`, height: "100%", background: COLORS.accent, borderRadius: 4, transition: "width .9s" }} />
            </div>
          </div>
        ) : (
          <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: 13 }}>✓ Verified!</span>
        )}
      </div>
    </div>
  );
}

// ─── USER DASHBOARD ───────────────────────────────────────────────────────────
function UserDashboard({ plan, goTo, onLogout }) {
  const isPremium = plan === "premium";
  const allTasks = isPremium ? [...mockTasks, ...premiumExtraTasks] : mockTasks;
  const [tasks, setTasks] = useState(allTasks.map(t => ({ ...t })));
  const [balance, setBalance] = useState(isPremium ? 1000 : 500);
  const [page, setPage] = useState("dashboard");
  const [withdrawForm, setWithdrawForm] = useState({ bank: "", account: "", name: "", amount: "" });
  const [withdrawDone, setWithdrawDone] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.done).length;
  const todayEarned = tasks.filter(t => t.done).reduce((s, t) => s + t.reward, 0);
  const refCode = "9JW-" + (isPremium ? "PRE" : "BAS") + "-7842";

  const completeTask = (id, reward) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: true } : t));
    setBalance(prev => prev + reward);
  };

  const handleWithdraw = () => {
    if (Number(withdrawForm.amount) < 2000) return;
    setWithdrawDone(true);
  };

  const navItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "tasks", icon: "📋", label: "Tasks" },
    { id: "withdraw", icon: "💳", label: "Withdraw" },
    { id: "referral", icon: "👥", label: "Referral" },
    { id: "history", icon: "📊", label: "History" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.dark, color: COLORS.text, fontFamily: "Inter, sans-serif", display: "flex" }}>
      {/* SIDEBAR */}
      <div style={{ width: 220, background: COLORS.card, borderRight: `1px solid ${COLORS.cardBorder}`, padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold})`, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000", fontSize: 16 }}>9</div>
            <span style={{ fontWeight: 900, color: COLORS.accent, fontSize: 16 }}>9jaWatchers</span>
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: isPremium ? `linear-gradient(135deg, ${COLORS.premium}, #7c3aed)` : `linear-gradient(135deg, ${COLORS.accent}, #16a34a)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff" }}>
              {isPremium ? "P" : "B"}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Oluwaseun</div>
              <Badge color={isPremium ? COLORS.premium : COLORS.accent}>{isPremium ? "Premium" : "Basic"}</Badge>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map(n => (
            <div key={n.id} onClick={() => setPage(n.id)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 10, marginBottom: 4, cursor: "pointer",
              background: page === n.id ? COLORS.accent + "22" : "transparent",
              color: page === n.id ? COLORS.accent : COLORS.muted,
              fontWeight: page === n.id ? 700 : 500, fontSize: 14,
            }}>
              <span>{n.icon}</span>{n.label}
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 12px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
          {!isPremium && (
            <GoldBtn small onClick={() => setShowUpgrade(true)} style={{ width: "100%", marginBottom: 10 }}>⬆ Upgrade to Premium</GoldBtn>
          )}
          <button onClick={onLogout} style={{ width: "100%", background: "transparent", color: COLORS.muted, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 13 }}>Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>

        {/* UPGRADE MODAL */}
        {showUpgrade && (
          <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
            <div style={{ background: COLORS.card, border: `2px solid ${COLORS.gold}`, borderRadius: 20, padding: 32, maxWidth: 380, width: "90%" }}>
              <div style={{ fontSize: 36, textAlign: "center", marginBottom: 10 }}>⭐</div>
              <h3 style={{ textAlign: "center", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Upgrade to Premium</h3>
              <p style={{ color: COLORS.muted, textAlign: "center", fontSize: 13, marginBottom: 20 }}>Unlock 20 daily tasks, ₦1,000 signup bonus, and ₦1,000/referral.</p>
              <div style={{ background: "#0f1f13", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}><span>Upgrade fee</span><span style={{ fontWeight: 800 }}>₦8,000</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: COLORS.gold }}><span>Signup bonus credited</span><span>₦1,000</span></div>
              </div>
              <GoldBtn onClick={() => { setShowUpgrade(false); }} style={{ width: "100%", marginBottom: 10 }}>Pay ₦8,000 via Paystack</GoldBtn>
              <button onClick={() => setShowUpgrade(false)} style={{ width: "100%", background: "transparent", color: COLORS.muted, border: "none", cursor: "pointer", fontSize: 13 }}>Cancel</button>
            </div>
          </div>
        )}

        {/* DASHBOARD PAGE */}
        {page === "dashboard" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Good morning, Oluwaseun 👋</h1>
              <p style={{ color: COLORS.muted, fontSize: 14 }}>Here's your earning summary for today</p>
            </div>

            {/* BONUS BANNER */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}22, ${COLORS.gold}22)`, border: `1px solid ${COLORS.gold}44`, borderRadius: 14, padding: "16px 20px", marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 30 }}>🎉</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>Welcome Bonus Credited!</div>
                <div style={{ color: COLORS.muted, fontSize: 13 }}>{naira(isPremium ? 1000 : 500)} has been added to your wallet. Complete tasks to earn more!</div>
              </div>
            </div>

            {/* STAT CARDS */}
            <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
              <StatCard label="Total Balance" value={naira(balance)} icon="💰" color={COLORS.gold} />
              <StatCard label="Earned Today" value={naira(todayEarned)} icon="📈" color={COLORS.accent} />
              <StatCard label="Tasks Done" value={`${doneTasks}/${totalTasks}`} icon="✅" color={COLORS.info} />
              <StatCard label="Plan" value={isPremium ? "Premium" : "Basic"} icon="🏷️" color={isPremium ? COLORS.premium : COLORS.accent} />
            </div>

            {/* DAILY PROGRESS */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: "18px 20px", marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 700 }}>Daily Task Progress</span>
                <span style={{ color: COLORS.muted, fontSize: 13 }}>{doneTasks} of {totalTasks} tasks completed</span>
              </div>
              <div style={{ height: 10, background: "#1a2e1a", borderRadius: 10 }}>
                <div style={{ width: `${(doneTasks / totalTasks) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.gold})`, borderRadius: 10, transition: "width .4s" }} />
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: COLORS.muted, fontSize: 12 }}>Resets at midnight</span>
                <span style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700 }}>{totalTasks - doneTasks} tasks remaining</span>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <GreenBtn onClick={() => setPage("tasks")}>📋 View Today's Tasks</GreenBtn>
              <GreenBtn onClick={() => setPage("withdraw")} style={{ background: "transparent", border: `1px solid ${COLORS.accent}`, color: COLORS.accent }}>💳 Request Withdrawal</GreenBtn>
              <GreenBtn onClick={() => setPage("referral")} style={{ background: "transparent", border: `1px solid ${COLORS.gold}`, color: COLORS.gold }}>👥 Referral Program</GreenBtn>
            </div>
          </>
        )}

        {/* TASKS PAGE */}
        {page === "tasks" && (
          <>
            <div style={{ marginBottom: 22 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Today's Tasks</h1>
              <p style={{ color: COLORS.muted, fontSize: 13 }}>Complete tasks to earn. Each task opens an external page — stay for 50 seconds to verify and earn.</p>
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.gold}33`, borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div style={{ fontSize: 13, color: COLORS.muted }}><b style={{ color: COLORS.gold }}>How verification works:</b> Click "Start Task", spend at least 50 seconds on the page, then return. Your earning is credited automatically.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onComplete={completeTask} />
              ))}
            </div>
          </>
        )}

        {/* WITHDRAW PAGE */}
        {page === "withdraw" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Withdraw Earnings</h1>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 22 }}>Funds are sent directly to your bank account via Paystack.</p>
            {withdrawDone ? (
              <div style={{ textAlign: "center", padding: 50 }}>
                <div style={{ fontSize: 60 }}>✅</div>
                <div style={{ fontWeight: 800, fontSize: 20, margin: "16px 0 8px" }}>Withdrawal Requested!</div>
                <div style={{ color: COLORS.muted, fontSize: 14, marginBottom: 24 }}>Your request is pending admin approval. Funds will be sent to your bank within 24 hours.</div>
                <GreenBtn onClick={() => { setWithdrawDone(false); setWithdrawForm({ bank: "", account: "", name: "", amount: "" }); }}>Make Another Request</GreenBtn>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 280, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
                  <div style={{ marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.muted, fontSize: 13 }}>Available Balance</span>
                    <span style={{ fontWeight: 900, color: COLORS.gold, fontSize: 20 }}>{naira(balance)}</span>
                  </div>
                  {[["Bank Name", "bank", "e.g. Zenith Bank"], ["Account Number", "account", "10-digit number"], ["Account Name", "name", "As on bank app"], ["Amount (min. ₦2,000)", "amount", "₦2,000"]].map(([label, key, ph]) => (
                    <div key={key} style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>{label}</label>
                      <input placeholder={ph} value={withdrawForm[key]} onChange={e => setWithdrawForm({ ...withdrawForm, [key]: e.target.value })}
                        style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <GreenBtn onClick={handleWithdraw} disabled={Number(withdrawForm.amount) < 2000 || !withdrawForm.bank} style={{ width: "100%" }}>
                    Request Withdrawal via Paystack
                  </GreenBtn>
                  {Number(withdrawForm.amount) > 0 && Number(withdrawForm.amount) < 2000 && (
                    <div style={{ color: COLORS.danger, fontSize: 12, marginTop: 8, textAlign: "center" }}>Minimum withdrawal is ₦2,000</div>
                  )}
                </div>
                <div style={{ minWidth: 200 }}>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: 20 }}>
                    <div style={{ fontWeight: 700, marginBottom: 14 }}>Withdrawal Info</div>
                    {[["Min. Amount", "₦2,000"], ["Processing", "Within 24hrs"], ["Method", "Bank Transfer"], ["Fee", "₦0 (Free)"]].map(([l, v]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                        <span style={{ color: COLORS.muted }}>{l}</span>
                        <span style={{ fontWeight: 700 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* REFERRAL PAGE */}
        {page === "referral" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Referral Program</h1>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 22 }}>Earn {isPremium ? "₦1,000" : "₦500"} for every person you refer who activates their account.</p>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.card}, #1a2e1a)`, border: `1px solid ${COLORS.accent}44`, borderRadius: 18, padding: 28, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 8 }}>Your Referral Code</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "12px 18px", fontWeight: 900, fontSize: 18, letterSpacing: 2, color: COLORS.accent, flex: 1 }}>{refCode}</div>
                <GreenBtn small onClick={() => {}}>Copy</GreenBtn>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <StatCard label="Total Referrals" value="0" icon="👥" color={COLORS.info} />
                <StatCard label="Referral Earnings" value="₦0" icon="💰" color={COLORS.gold} />
                <StatCard label="Per Referral" value={isPremium ? "₦1,000" : "₦500"} icon="🎯" color={COLORS.accent} />
              </div>
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Share your link</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["WhatsApp", "Facebook", "Twitter", "Copy Link"].map(s => (
                  <button key={s} style={{ background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "9px 18px", color: COLORS.text, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{s}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* HISTORY PAGE */}
        {page === "history" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 22 }}>Transaction History</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Signup Bonus", amount: isPremium ? 1000 : 500, type: "credit", date: "Today" },
                ...tasks.filter(t => t.done).map(t => ({ label: `Task: ${t.title.substring(0, 35)}...`, amount: t.reward, type: "credit", date: "Today" })),
              ].map((tx, i) => (
                <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{tx.label}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>{tx.date}</div>
                  </div>
                  <span style={{ color: COLORS.accent, fontWeight: 800, fontSize: 16 }}>+{naira(tx.amount)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [taskForm, setTaskForm] = useState({ type: "video", title: "", url: "", reward: 5, plan: "both" });
  const [taskAdded, setTaskAdded] = useState(false);
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, user: "Chidi Okafor", plan: "basic", bank: "GTBank", account: "0123456789", amount: 2500, status: "pending", date: "13 May 2025" },
    { id: 2, user: "Amaka Nwosu", plan: "premium", bank: "Zenith Bank", account: "9876543210", amount: 5000, status: "pending", date: "13 May 2025" },
    { id: 3, user: "Tunde Balogun", plan: "basic", bank: "First Bank", account: "3456789012", amount: 3000, status: "approved", date: "12 May 2025" },
    { id: 4, user: "Ngozi Eze", plan: "premium", bank: "UBA", account: "6789012345", amount: 8000, status: "rejected", date: "12 May 2025" },
  ]);
  const [tasks, setTasks] = useState([...mockTasks]);

  const approveWithdrawal = (id) => setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: "approved" } : w));
  const rejectWithdrawal = (id) => setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: "rejected" } : w));

  const handleAddTask = () => {
    setTasks(prev => [...prev, { ...taskForm, id: Date.now(), done: false }]);
    setTaskAdded(true);
    setTimeout(() => setTaskAdded(false), 3000);
  };

  const navItems = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "tasks", icon: "📋", label: "Manage Tasks" },
    { id: "withdrawals", icon: "💳", label: "Withdrawals" },
    { id: "users", icon: "👥", label: "Users" },
  ];

  const pending = withdrawals.filter(w => w.status === "pending");

  return (
    <div style={{ minHeight: "100vh", background: COLORS.dark, color: COLORS.text, fontFamily: "Inter, sans-serif", display: "flex" }}>
      {/* SIDEBAR */}
      <div style={{ width: 220, background: COLORS.card, borderRight: `1px solid ${COLORS.cardBorder}`, padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
          <div style={{ fontWeight: 900, color: COLORS.accent, fontSize: 16, marginBottom: 4 }}>9jaWatchers</div>
          <Badge color={COLORS.danger}>Admin Panel</Badge>
        </div>
        <div style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map(n => (
            <div key={n.id} onClick={() => setPage(n.id)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 10, marginBottom: 4, cursor: "pointer",
              background: page === n.id ? COLORS.accent + "22" : "transparent",
              color: page === n.id ? COLORS.accent : COLORS.muted,
              fontWeight: page === n.id ? 700 : 500, fontSize: 14,
            }}>
              <span>{n.icon}</span>{n.label}
              {n.id === "withdrawals" && pending.length > 0 && (
                <span style={{ background: COLORS.danger, color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginLeft: "auto" }}>{pending.length}</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 12px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
          <button onClick={onLogout} style={{ width: "100%", background: "transparent", color: COLORS.muted, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 13 }}>Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>

        {/* OVERVIEW */}
        {page === "overview" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 22 }}>Admin Overview</h1>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
              <StatCard label="Total Users" value="1,284" icon="👥" color={COLORS.info} />
              <StatCard label="Basic Users" value="918" icon="🟢" color={COLORS.accent} />
              <StatCard label="Premium Users" value="366" icon="⭐" color={COLORS.premium} />
              <StatCard label="Pending Withdrawals" value={String(pending.length)} icon="⏳" color={COLORS.danger} />
              <StatCard label="Total Tasks Active" value={String(tasks.length)} icon="📋" color={COLORS.gold} />
              <StatCard label="Total Paid Out" value="₦2.4M" icon="💸" color={COLORS.accent} />
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Pending Withdrawal Requests</div>
              {pending.length === 0 ? <div style={{ color: COLORS.muted, fontSize: 13 }}>No pending requests</div> :
                pending.map(w => (
                  <div key={w.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{w.user}</div>
                      <div style={{ color: COLORS.muted, fontSize: 12 }}>{w.bank} · {w.account}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 800, color: COLORS.gold }}>{naira(w.amount)}</span>
                      <GreenBtn small onClick={() => approveWithdrawal(w.id)}>Approve</GreenBtn>
                      <button onClick={() => rejectWithdrawal(w.id)} style={{ background: COLORS.danger + "22", color: COLORS.danger, border: `1px solid ${COLORS.danger}44`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Reject</button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* MANAGE TASKS */}
        {page === "tasks" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Manage Tasks</h1>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 22 }}>Upload new tasks for Basic and Premium users. All active tasks will appear on user dashboards.</p>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {/* ADD TASK FORM */}
              <div style={{ flex: 1, minWidth: 300, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24 }}>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 18 }}>+ Upload New Task</div>
                {taskAdded && <div style={{ background: COLORS.accent + "22", border: `1px solid ${COLORS.accent}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: COLORS.accent }}>✓ Task added successfully!</div>}
                {[
                  ["Task Type", "type", "select", ["video", "follow", "like", "comment"]],
                  ["Task Title", "title", "text", null],
                  ["URL / Link", "url", "text", null],
                  ["Reward (₦)", "reward", "number", null],
                  ["Assign To", "plan", "select", ["basic", "premium", "both"]],
                ].map(([label, key, inputType, opts]) => (
                  <div key={key} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 5 }}>{label}</label>
                    {inputType === "select" ? (
                      <select value={taskForm[key]} onChange={e => setTaskForm({ ...taskForm, [key]: e.target.value })}
                        style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14 }}>
                        {opts.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                      </select>
                    ) : (
                      <input type={inputType} placeholder={label} value={taskForm[key]} onChange={e => setTaskForm({ ...taskForm, [key]: e.target.value })}
                        style={{ width: "100%", background: "#0f1f13", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "11px 14px", color: COLORS.text, fontSize: 14, boxSizing: "border-box" }} />
                    )}
                  </div>
                ))}
                <GreenBtn onClick={handleAddTask} style={{ width: "100%" }}>Upload Task</GreenBtn>
              </div>

              {/* ACTIVE TASKS LIST */}
              <div style={{ flex: 1.5, minWidth: 300 }}>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Active Tasks ({tasks.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 500, overflowY: "auto" }}>
                  {tasks.map(t => (
                    <div key={t.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                          <Badge color={taskColor(t.type)}>{t.type}</Badge>
                          <Badge color={COLORS.gold}>₦{t.reward}</Badge>
                        </div>
                      </div>
                      <button style={{ background: COLORS.danger + "22", color: COLORS.danger, border: `1px solid ${COLORS.danger}44`, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* WITHDRAWALS */}
        {page === "withdrawals" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 22 }}>Withdrawal Requests</h1>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {[["Pending", pending.length, COLORS.gold], ["Approved", withdrawals.filter(w => w.status === "approved").length, COLORS.accent], ["Rejected", withdrawals.filter(w => w.status === "rejected").length, COLORS.danger]].map(([l, v, c]) => (
                <div key={l} style={{ background: COLORS.card, border: `1px solid ${c}33`, borderRadius: 12, padding: "12px 20px", flex: 1 }}>
                  <div style={{ color: c, fontWeight: 900, fontSize: 24 }}>{v}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {withdrawals.map(w => (
                <div key={w.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700 }}>{w.user}</span>
                        <Badge color={w.plan === "premium" ? COLORS.premium : COLORS.accent}>{w.plan}</Badge>
                      </div>
                      <div style={{ color: COLORS.muted, fontSize: 13 }}>{w.bank} · {w.account} · {w.date}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 900, fontSize: 18, color: COLORS.gold }}>{naira(w.amount)}</span>
                      {w.status === "pending" ? (
                        <>
                          <GreenBtn small onClick={() => approveWithdrawal(w.id)}>✓ Approve</GreenBtn>
                          <button onClick={() => rejectWithdrawal(w.id)} style={{ background: COLORS.danger + "22", color: COLORS.danger, border: `1px solid ${COLORS.danger}44`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕ Reject</button>
                        </>
                      ) : (
                        <Badge color={w.status === "approved" ? COLORS.accent : COLORS.danger}>{w.status}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* USERS */}
        {page === "users" && (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 22 }}>User Management</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "Oluwaseun Ogunseye", email: "seun@email.com", plan: "premium", balance: 14500, joined: "10 May 2025", tasks: 18, referrals: 3 },
                { name: "Chidi Okafor", email: "chidi@email.com", plan: "basic", balance: 3200, joined: "11 May 2025", tasks: 6, referrals: 1 },
                { name: "Amaka Nwosu", email: "amaka@email.com", plan: "premium", balance: 22000, joined: "8 May 2025", tasks: 20, referrals: 7 },
                { name: "Tunde Balogun", email: "tunde@email.com", plan: "basic", balance: 1800, joined: "12 May 2025", tasks: 5, referrals: 0 },
              ].map((u, i) => (
                <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{u.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>{u.email} · Joined {u.joined}</div>
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                    <Badge color={u.plan === "premium" ? COLORS.premium : COLORS.accent}>{u.plan}</Badge>
                    <span style={{ fontSize: 13, color: COLORS.gold, fontWeight: 700 }}>{naira(u.balance)}</span>
                    <span style={{ fontSize: 12, color: COLORS.muted }}>Tasks: {u.tasks} · Refs: {u.referrals}</span>
                    <button style={{ background: COLORS.danger + "22", color: COLORS.danger, border: `1px solid ${COLORS.danger}44`, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Suspend</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
    setScreen("app");
  };

  if (screen === "landing") return <LandingPage goTo={setScreen} />;
  if (screen === "login") return <AuthPage mode="login" goTo={setScreen} onLogin={handleLogin} />;
  if (screen === "signup") return <AuthPage mode="signup" goTo={setScreen} onLogin={handleLogin} />;
  if (screen === "app") {
    if (userRole === "admin") return <AdminDashboard onLogout={() => { setScreen("landing"); setUserRole(null); }} />;
    return <UserDashboard plan={userRole} goTo={setScreen} onLogout={() => { setScreen("landing"); setUserRole(null); }} />;
  }
  return null;
}
