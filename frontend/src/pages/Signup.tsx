import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthShell } from "../components/auth/AuthShell";
import { AuthField } from "../components/auth/AuthField";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setPending(true);
    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch {
      setError("Could not sign up — email may already be in use.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell heading="Create your account" subheading="Start running AI-assisted research in minutes.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@firm.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          helperText="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={pending}
          className="mt-1 h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Sign up"}
        </button>
        {error && <p className="-mt-2 text-xs text-destructive">{error}</p>}
        <p className="mt-2 text-[13px] text-muted-foreground">
          {"Already have an account? "}
          <Link to="/login" className="text-foreground underline underline-offset-4 hover:decoration-primary">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}