"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { LeadActionResult } from "../actions";

const initialState: LeadActionResult = {};

export function useLeadForm(
  action: (state: LeadActionResult, formData: FormData) => Promise<LeadActionResult>
) {
  const [state, formAction] = useFormState(action, initialState);
  return { state, formAction };
}

export function useLeadFormPending() {
  const { pending } = useFormStatus();
  return pending;
}