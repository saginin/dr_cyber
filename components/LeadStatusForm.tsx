"use client";

import { useState } from "react";
import { pipelineStages } from "@/lib/config/pipeline";

export function LeadStatusForm({
  leadId,
  currentStage,
  currentStatus,
  notes,
  nextFollowUpAt
}: {
  leadId: string;
  currentStage: string;
  currentStatus: string;
  notes?: string;
  nextFollowUpAt?: string;
}) {
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    setMessage(response.ok ? "Lead updated." : "Update failed.");
    if (response.ok) window.location.reload();
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <label className="block text-sm font-semibold">
        Pipeline stage
        <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" name="stage" defaultValue={currentStage}>
          {pipelineStages.map((stage) => (
            <option key={stage}>{stage}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        Status
        <input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" name="status" defaultValue={currentStatus} />
      </label>
      <label className="block text-sm font-semibold">
        Follow-up date
        <input
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          name="nextFollowUpAt"
          type="datetime-local"
          defaultValue={nextFollowUpAt?.slice(0, 16)}
        />
      </label>
      <label className="block text-sm font-semibold">
        Notes
        <textarea className="mt-2 min-h-32 w-full rounded-md border border-slate-300 px-3 py-2" name="notes" defaultValue={notes} />
      </label>
      <button className="rounded-md bg-cyan px-4 py-2 font-bold text-navy" type="submit">
        Save update
      </button>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}
