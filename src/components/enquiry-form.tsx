import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { PHONES } from "./site-layout";

const LEVELS = ["Nursery", "Primary", "Junior Secondary", "After School Care", "General enquiry"];

export function EnquiryForm({ title = "Send us an enquiry" }: { title?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submit = useServerFn(submitEnquiry);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const data = new FormData(event.currentTarget);
    const result = await submit({
      data: {
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        level: String(data.get("level") ?? ""),
        message: String(data.get("message") ?? ""),
      },
    });
    if (result.ok) {
      setStatus("sent");
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  }

  const field =
    "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-2xl uppercase tracking-tight text-navy">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Fill the form and we will get back to you. Your enquiry goes straight to our admissions desk.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Full name
          <input name="name" required className={field} placeholder="Parent or guardian" />
        </label>
        <label className="text-sm font-medium">
          Phone number
          <input name="phone" required className={field} placeholder="080..." />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium">
        Level of interest
        <select name="level" className={field} defaultValue={LEVELS[0]}>
          {LEVELS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-medium">
        Message
        <textarea name="message" rows={4} className={field} placeholder="Tell us about your child" />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-md bg-navy px-5 py-3 font-display text-sm uppercase tracking-widest text-navy-foreground transition-colors hover:bg-gold hover:text-navy disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "sent" && (
        <p className="mt-4 text-sm font-medium text-navy">
          Thank you — your enquiry has been received. We will be in touch shortly. For anything urgent, call{" "}
          <a href={`tel:${PHONES[0]}`} className="font-semibold underline">
            {PHONES[0]}
          </a>
          .
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-destructive">
          {errorMsg} You can also call{" "}
          <a href={`tel:${PHONES[0]}`} className="font-semibold underline">
            {PHONES[0]}
          </a>
          .
        </p>
      )}
    </form>
  );
}
