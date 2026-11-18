import type { Metadata } from "next";
import SplitTitle from "../components/SplitTitle";
import EmailLink from "../components/EmailLink";
import PhoneReveal from "../components/PhoneReveal";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact | Lorenz Naegele Documentary Filmmaker",
  description: "Get in touch with documentary filmmaker Lorenz Naegele.",
  alternates: {
    canonical: "https://lorenzvisuals.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="about page">
        <div className="wrap">
          <SplitTitle lines={["Say", "hello"]} label="Contact Lorenz Naegele" />
          <div className="contact">
            <span className="mono">Have a story to tell? · click to write</span>
            <EmailLink />
            <div className="links mono">
              <PhoneReveal />
              <a href="https://www.instagram.com/lorenznaegele" target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
