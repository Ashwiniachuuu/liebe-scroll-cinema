const links = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
  { label: "Offers", id: "offers" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass-panel flex w-full max-w-5xl items-center justify-between rounded-full px-6 py-3">
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          className="font-display text-xl tracking-[0.35em] text-foreground"
        >
          LIEBE
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-accent-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#menu"
          onClick={(e) => go(e, "menu")}
          className="btn-gold rounded-full px-5 py-2 text-xs font-semibold tracking-[0.18em]"
        >
          ORDER
        </a>
      </nav>
    </header>
  );
}
