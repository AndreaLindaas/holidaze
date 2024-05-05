import React from "react";
import Link from "next/link";
export default function SuccessPage() {
  return (
    <div>
      <h3>Your booking was successfully made.</h3>
      <p>
        return to your <Link href="/trips">Trips</Link>
      </p>
      <p>
        or <Link href="/">Home</Link>
      </p>
    </div>
  );
}
