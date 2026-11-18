import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer mono">
      <span>© {new Date().getFullYear()} Lorenz Naegele · Filmmaker &amp; photographer</span>
      <nav aria-label="Footer">
        <Link href="/contact">Contact</Link>
        <a href="https://www.instagram.com/lorenznaegele" target="_blank" rel="noopener noreferrer">
          Instagram ↗
        </a>
      </nav>
    </footer>
  );
}
