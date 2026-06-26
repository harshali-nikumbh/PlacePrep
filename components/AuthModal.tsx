"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({
  isOpen,
  onClose,
}: Props) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();


  if (!isOpen) return null;

const signInWithGoogle = async () => {
  toast("Redirecting to Google...");

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

const handleAuth = async () => {
  if (isLogin) {
    const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log("Login session:", data.session);

if (error) {
  toast.error(error.message);
  return;
}
  } else {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

if (error) {
  toast.error(error.message);
  return;
}
  }

  setFullName("");
setEmail("");
setPassword("");

toast.success(
  isLogin
    ? "Logged in successfully!"
    : "Account created successfully!"
);

onClose();
router.refresh();
};

  return (
    <div
  className="
    fixed
    inset-0
    z-[999]
    bg-black/70
    backdrop-blur-sm
    flex
    items-center
    justify-center
  "
>
      <div
  className="
    relative
    bg-[#0F172A]
    border
    border-white/10
    rounded-3xl
    p-8
    w-[420px]
    shadow-2xl
    shadow-black/50
  "
>

    <button
  onClick={onClose}
  className="
    absolute
    top-5
    right-5
    text-slate-400
    hover:text-white
    text-xl
  "
>
  ✕
</button>

        <h2 className="text-3xl font-bold text-white mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <button
  onClick={signInWithGoogle}
  className="
w-full
flex
items-center
justify-center
gap-3
bg-white
hover:bg-gray-100
border
border-gray-300
text-[#3c4043]
py-3
rounded-xl
font-medium
transition-all
duration-200
mb-4
"
>
<div className="flex items-center justify-center gap-3">
  <Image
    src="/google-logo.webp"
    alt="Google"
    width={20}
    height={20}
  />

  <span className="font-medium">
    Continue with Google
  </span>
</div>
</button>

        <div className="flex items-center my-6">
  <div className="flex-1 h-px bg-white/10" />
  <span className="px-4 text-slate-400 text-sm">OR</span>
  <div className="flex-1 h-px bg-white/10" />
</div>
        {!isLogin && (
  <input
    type="text"
    placeholder="Full Name"
    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />
)}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleAuth}
          className="w-full bg-[#D1A0D0] text-[#28445D] font-semibold py-3 rounded-xl"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="mt-4 text-[#D1A0D0] w-full"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        
      </div>
    </div>
  );
}