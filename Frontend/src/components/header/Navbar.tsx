import Link from "next/link";
import HomeIcon from "@/icons/homeIcon";
import ToggleTheme from "@/components/theme/ToggleTheme";

export const Navbar = () => {
  return (
    <section className="flex items-center w-full">
      <nav className="w-full">
        <ul className="flex gap-4 justify-center">
          <li>
            <Link
              href="/"
              className="border-b-4 hover:border-current border-transparent flex gap-1 items-center"
            >
              Home
              <HomeIcon className="w-6 h-6 fill-cyan dark:fill-bone" />
            </Link>
          </li>

          <li>
            <ToggleTheme />
          </li>
        </ul>
      </nav>
    </section>
  );
};