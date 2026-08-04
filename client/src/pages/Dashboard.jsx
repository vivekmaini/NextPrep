import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, isAuthenticated, initializing, logout } = useAuth();

  if (initializing) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main className="grid min-h-screen place-items-center bg-[#f8faff] p-6">
      <section className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-[0_24px_80px_rgba(30,64,175,0.12)] sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb] font-display text-lg font-bold text-white">N</div>
        <p className="mt-6 text-sm font-semibold text-[#2563eb]">YOU&apos;RE SIGNED IN</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">
          Welcome, {user?.full_name || user?.name || "there"}!
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Your NextPrep account is ready.</p>
        <button
          type="button"
          onClick={logout}
          className="mt-8 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Log out
        </button>
      </section>
    </main>
  );
}
