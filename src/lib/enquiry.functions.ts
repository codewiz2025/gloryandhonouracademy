import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  level: z.string().trim().min(1).max(50),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const supabaseUrl = process.env["SUPABASE_URL"];
    const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!supabaseUrl || !publishableKey) {
      console.error("[enquiry] Missing Supabase env vars");
      return { ok: false, error: "Service unavailable. Please call us instead." };
    }

    const supabase = createClient<Database>(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("enquiries").insert({
      name: data.name,
      phone: data.phone,
      level: data.level,
      message: data.message ?? null,
    });

    if (error) {
      console.error("[enquiry] insert failed:", error.message);
      return { ok: false, error: "We could not send your enquiry. Please call us." };
    }

    return { ok: true };
  });
