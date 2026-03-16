import { ChatPanel } from "@/components/ChatPanel";
import { DocumentList } from "@/components/DocumentList";
import { UploadPanel } from "@/components/UploadPanel";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold">AI Document Copilot</h1>
        <p className="text-slate-600">Upload PDFs, index chunks, and ask grounded questions with source citations.</p>
      </header>
      <UploadPanel onDone={async () => undefined} />
      <div className="grid gap-6 md:grid-cols-2">
        <DocumentList />
        <ChatPanel />
      </div>
    </main>
  );
}
