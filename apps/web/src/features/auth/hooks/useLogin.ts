"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type ActionResult } from "../actions";

const initialState: ActionResult = {};

// useFormState é o equivalente ao useActionState no React 18 (Next.js 14)
export function useLogin() {
  const [state, formAction] = useFormState(loginAction, initialState);
  return { state, formAction };
}

// Hook separado para o estado de pending do botão de submit
export function useLoginPending() {
  const { pending } = useFormStatus();
  return pending;
}