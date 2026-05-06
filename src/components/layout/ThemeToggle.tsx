import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-surface shadow-sm">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-colors ${
          theme === "light"
            ? "bg-bg text-text shadow-sm"
            : "text-text-muted hover:text-text hover:bg-surface-hover"
        }`}
        title="Light Mode"
        aria-label="Light Mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-colors ${
          theme === "system"
            ? "bg-bg text-text shadow-sm"
            : "text-text-muted hover:text-text hover:bg-surface-hover"
        }`}
        title="System Theme"
        aria-label="System Theme"
      >
        <Monitor size={16} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-colors ${
          theme === "dark"
            ? "bg-bg text-text shadow-sm"
            : "text-text-muted hover:text-text hover:bg-surface-hover"
        }`}
        title="Dark Mode"
        aria-label="Dark Mode"
      >
        <Moon size={16} />
      </button>
    </div>
  );
}
