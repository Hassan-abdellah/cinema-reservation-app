import { Show, UserButton } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-baby-pink w-full py-4">
      <nav className="flex items-center justify-between container text-white-smoke">
        {/* Logo */}
        <Link
          href="/"
          aria-label="App logo"
          className="flex items-center gap-1.5"
        >
          <Clapperboard className="size-6" />
          <span>Cinema APP</span>
        </Link>

        <ul className="flex items-center gap-2">
          <Show when="signed-in">
            <UserButton />
          </Show>

          <Show when="signed-out">
            <li>
              <Link href="/auth/sign-in">Login</Link>
            </li>
            <li>
              <Link href="/auth/sign-up">Create Account</Link>
            </li>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
