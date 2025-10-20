import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 mb-2 mx-auto">
            <Link href="/">
              <Image
                src="/logo-memew.svg"
                alt="Memew Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Nhập email của bạn để đăng nhập vào tài khoản
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </Field>
        <Link
          href="/forgot-password"
          className="ml-auto text-sm underline-offset-4 hover:underline"
        >
          Quên mật khẩu?
        </Link>
        <Field>
          <Button type="submit">Đăng nhập</Button>
        </Field>
        <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="ml-2">Đăng nhập với Google</span>
          </Button>
          <FieldDescription className="text-center">
            Bạn chưa có tài khoản?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Đăng ký ngay
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
