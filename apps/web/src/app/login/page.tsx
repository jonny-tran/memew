import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <LoginForm />
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/login-bg.png"
          alt="Login Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
