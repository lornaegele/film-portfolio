"use client";

import { useRef, useState } from "react";

const EMAIL = "lorenznaegele@mail.de";

/** Big email that copies itself on click; falls back to a mailto link when the clipboard is refused. */
export default function CopyEmail() {
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const say = (msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2400);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      say("Email copied");
    } catch {
      location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <button className="mail" type="button" onClick={copy} data-cursor="Copy">
        {EMAIL}
      </button>
      <div className={`toast mono${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
