"use client";

import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";

interface PhoneRevealProps {
  className?: string;
}

const PhoneReveal = ({ className = "" }: PhoneRevealProps) => {
  const [showPhone, setShowPhone] = useState(false);

  if (showPhone) {
    return (
      <Link
        href="tel:+4915208536210"
        className={`transition-colors duration-300 tracking-wide ${className}`}
      >
        +49 1520 8536 210
      </Link>
    );
  }

  return (
    <button
      onClick={() => setShowPhone(true)}
      className={`inline-flex items-center gap-2 transition-colors duration-300 tracking-wide ${className}`}
    >
      <FaPhone size={14} />
      Show Phone Number
    </button>
  );
};

export default PhoneReveal;
