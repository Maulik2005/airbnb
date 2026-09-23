import { Globe, Menu, Search, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  onSearch: (field: "where" | "when" | "who") => void;
  searchOpen: "where" | "when" | "who" | null;
  where: string;
  when: string;
  who: string;
  onWhere: (value: string) => void;
  onCloseSearch: () => void;
};

export function Header({ onSearch, searchOpen, where, when, who, onWhere, onCloseSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchId = useId();

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) setMenuOpen(false);
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  return (
    <header className={styles.header}>
      <a className={styles.logo} href="#photos" aria-label="Airbnb home">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 2C10 2 4 9 4 15c0 6.6 5.4 12 12 12s12-5.4 12-12C28 9 22 2 16 2zm0 22c-5 0-9-4-9-9 0-4.5 4.5-10.5 9-10.5S25 10.5 25 15c0 5-4 9-9 9z" />
        </svg>
        <span>airbnb</span>
      </a>

      <div className={styles.searchWrap}>
        <div className={styles.search} role="search">
          <button type="button" className={styles.segment} onClick={() => onSearch("where")} aria-expanded={searchOpen === "where"}>
            {where || "Anywhere"}
          </button>
          <span className={styles.divider} aria-hidden="true" />
          <button type="button" className={styles.segment} onClick={() => onSearch("when")} aria-expanded={searchOpen === "when"}>
            {when || "Anytime"}
          </button>
          <span className={styles.divider} aria-hidden="true" />
          <button type="button" className={`${styles.segment} ${styles.muted}`} onClick={() => onSearch("who")} aria-expanded={searchOpen === "who"}>
            {who || "Add guests"}
          </button>
          <button type="button" className={styles.searchButton} aria-label="Search" onClick={() => onSearch("where")}>
            <Search size={14} strokeWidth={2.75} />
          </button>
        </div>
        {searchOpen && (
          <div className={styles.popover} id={searchId} role="dialog" aria-label="Search stays">
            {searchOpen === "where" && (
              <label className={styles.popLabel}>
                Destination
                <input autoFocus value={where} onChange={(event) => onWhere(event.target.value)} placeholder="Search destinations" />
              </label>
            )}
            {searchOpen === "when" && <p className={styles.popNote}>Choose dates on the calendar below. The stay shown is 18–23 Oct 2026.</p>}
            {searchOpen === "who" && <p className={styles.popNote}>This apartment hosts up to 3 guests. Adjust guests on the booking card.</p>}
            <button type="button" className={styles.popClose} onClick={onCloseSearch}>Close</button>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <a className={styles.hostLink} href="#host">Become a host</a>
        <div className={styles.popWrap} ref={langRef}>
          <button type="button" className={styles.iconButton} aria-label="Choose a language and region" aria-expanded={langOpen} onClick={() => { setLangOpen((open) => !open); setMenuOpen(false); }}>
            <Globe size={16} strokeWidth={2} />
          </button>
          {langOpen && (
            <div className={styles.menu} role="menu">
              <p className={styles.menuTitle}>Language and region</p>
              <button type="button" role="menuitemradio" aria-checked="true" onClick={() => setLangOpen(false)}>English (India) · ₹ INR</button>
            </div>
          )}
        </div>
        <div className={styles.popWrap} ref={menuRef}>
          <button type="button" className={styles.menuButton} aria-label="Open main menu" aria-expanded={menuOpen} onClick={() => { setMenuOpen((open) => !open); setLangOpen(false); }}>
            <Menu size={16} strokeWidth={2} />
            <span className={styles.avatar} aria-hidden="true"><User size={16} strokeWidth={2} /></span>
          </button>
          {menuOpen && (
            <div className={styles.menu} role="menu">
              <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>Sign up</button>
              <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>Log in</button>
              <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>Help Centre</button>
              <a role="menuitem" href="#host" onClick={() => setMenuOpen(false)}>Become a host</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
