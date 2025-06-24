import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react"; // icons
import useThemeToggle from "../hooks/useThemeToggle";

export default function Navbar() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg p-4 md:px-8 flex justify-between items-center text-white">
      <Link
        to="/"
        className="text-xl md:text-2xl font-semibold tracking-tight hover:text-teal-300 transition-all duration-300"
      >
        <span className="inline-block mr-2">🌿</span>StepUp IPD Platform
      </Link>

      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={toggleTheme}
          className="hover:text-teal-400 transition-all cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <span className="text-sm md:text-base text-gray-300 hidden md:inline-block">
          Welcome back to care 👋
        </span>

        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 md:w-10 md:h-10",
              avatarBox: "ring-2 ring-teal-500"
            }
          }}
        />
      </div>
    </header>
  );
}
