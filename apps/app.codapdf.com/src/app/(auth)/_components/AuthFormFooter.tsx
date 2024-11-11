import { ROUTES } from "@/app/routes";
import Link from "next/link";
import type { AuthFormProps } from "../_containers/AuthForm";

const AuthFormFooter = ({ type }: { type: AuthFormProps["type"] }) => (
  <div className="text-foreground">
    {type === "login" && (
      <p className="text-center">
        Don't have an account?{" "}
        <Link href={ROUTES.AUTH.SIGNUP.pathname} className="text-blue-500">
          Signup
        </Link>
      </p>
    )}
    {type === "signup" && (
      <p className="text-center">
        Already have an account?{" "}
        <Link href={ROUTES.AUTH.LOGIN.pathname} className="text-blue-500">
          Login
        </Link>
      </p>
    )}
    {(type === "forgot-password" || type === "reset-password") && (
      <p className="text-center">
        Remember your password?{" "}
        <Link href={ROUTES.AUTH.LOGIN.pathname} className="text-blue-500">
          Login
        </Link>
      </p>
    )}
  </div>
);
export { AuthFormFooter };
