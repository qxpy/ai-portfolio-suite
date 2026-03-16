import { Dashboard } from "@/components/Dashboard";
import { SiteManager } from "@/components/SiteManager";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold">AI Competitor Monitor</h1>
        <p className="text-slate-600">Track website content changes, classify updates, and generate AI summaries.</p>
      </header>
      <SiteManager onRefresh={async () => undefined} />
      <Dashboard />
    </main>
  );
}
