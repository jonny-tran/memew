import { SignupForm } from "@/components/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <SignupForm />
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/signup-bg.png"
          alt="Signup Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
