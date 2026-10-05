import { useState } from "react";
import type { FC } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { List, X, Phone, EnvelopeSimple, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" },
  { to: "/house-rules", label: "House Rules" },
];

export const PublicLayout: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-40 h-16 border-b border-line bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-[15px] font-semibold tracking-tight">
            Katalin Klára
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-[12px] px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-accent-soft text-accent" : "text-ink hover:bg-canvas"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-line bg-surface px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-[12px] px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-accent-soft text-accent" : "text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-line bg-ink text-canvas">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">Katalin Klára</p>
            <p className="mt-2 max-w-[36ch] text-sm text-canvas/75">
              Szempilla stúdió időpontfoglalással. A saját pilláid egészsége az első.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Kapcsolat</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-canvas/80">
              <Phone size={16} weight="bold" />
              <a href="tel:+36301234567">Valami telefonszám</a>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-canvas/80">
              <EnvelopeSimple size={16} weight="bold" />
              <a href="mailto:info@example.com">Valami e-mailcím</a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Közösségi oldalaim</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-canvas/80">
              <li>
                <a
                  className="inline-flex items-center gap-2"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookLogo size={16} weight="bold" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo size={16} weight="bold" />
                  Instagram
                </a>
              </li>
            </ul>
            <Link to="/login" className="mt-6 inline-block text-sm text-canvas/55 hover:text-canvas">
              Staff login
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-canvas/50">
          © 2026 Minden jog fenntartva.
        </div>
      </footer>
    </div>
  );
};
