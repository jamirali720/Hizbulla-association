import { useState } from "react";

import {
  BookOpen,
  ChevronRight,
  Send,
  Mail,
  MapPin,
  Phone,
  MoonStar,
  Heart,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaTelegram,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Quran", href: "/quran" },
  { name: "Hadith", href: "/hadith" },
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Dua & Azkar", href: "/dua" },
  { name: "Islamic Articles", href: "/articles" },
  { name: "Contact Us", href: "/contact" },
];

const resources = [
  { name: "Quran Translation", href: "/quran-translation" },
  { name: "Tafsir", href: "/tafsir" },
  { name: "Hadith Collection", href: "/hadith" },
  { name: "Islamic Books", href: "/books" },
  { name: "Islamic Calendar", href: "/calendar" },
  { name: "Learning Center", href: "/learning" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    Icon: FaFacebookF,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    Icon: FaYoutube,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    Icon: FaInstagram,
  },
  {
    name: "X",
    href: "https://x.com",
    Icon: FaXTwitter,
  },
  {
    name: "Telegram",
    href: "https://telegram.org",
    Icon: FaTelegram,
  },
];

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Connect your backend API to save the email.
    console.log("Newsletter email:", email);

    alert("Please connect your newsletter API to complete subscription.");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#052e2b] text-gray-200 py-5">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[35px] border-amber-400/[0.04]" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[35px] border-amber-400/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand section */}
          <div>
            <a href="/" className="group mb-5 inline-flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-[#052e2b] transition duration-300 group-hover:rotate-6 group-hover:scale-105">
                <MoonStar size={32} />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Islamic Path
                </h2>
                <p className="text-xs tracking-widest text-amber-300">
                  QURAN • SUNNAH • LIFE
                </p>
              </div>
            </a>

            <p className="max-w-sm text-sm leading-7 text-gray-300">
              Discover authentic Islamic knowledge, Quranic guidance, Hadith,
              and daily reminders to bring peace and purpose into your everyday
              life.
            </p>

            {/* Social media */}
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-400 hover:text-[#052e2b]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            {/* Quranic inspiration */}
            <div className="mt-7 border-l-2 border-amber-400 pl-4">
              <p
                lang="ar"
                dir="rtl"
                className="text-right text-xl leading-loose text-amber-300"
              >
                إِنَّ اللَّهَ مَعَ الصَّابِرِينَ
              </p>

              <p className="mt-2 text-sm italic text-gray-300">
                "Indeed, Allah is with the patient."
              </p>

              <p className="mt-1 text-xs text-amber-300">Quran 2:153</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="h-6 w-1 rounded-full bg-amber-400" />
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between gap-2 text-sm text-gray-300 transition hover:text-amber-300"
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      size={15}
                      className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Islamic resources */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="h-6 w-1 rounded-full bg-amber-400" />
              Islamic Resources
            </h3>

            <ul className="space-y-4">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="group flex items-center gap-3 text-sm text-gray-300 transition hover:translate-x-1 hover:text-amber-300"
                  >
                    <BookOpen size={16} className="shrink-0 text-amber-400" />
                    <span>{resource.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/quran"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-amber-400/40 px-4 py-2.5 text-sm text-amber-300 transition hover:bg-amber-400 hover:text-[#052e2b]"
            >
              Explore Quran
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Contact and newsletter */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="h-6 w-1 rounded-full bg-amber-400" />
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-amber-400" />
                <span>Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-amber-400" />
                <a
                  href="tel:+8801234567890"
                  className="transition hover:text-amber-300"
                >
                  +880 1234-567890
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-amber-400" />
                <a
                  href="mailto:info@example.com"
                  className="break-all transition hover:text-amber-300"
                >
                  info@example.com
                </a>
              </li>
            </ul>

            <div className="my-7 border-t border-white/10" />

            <h4 className="mb-2 font-semibold text-white">Islamic Reminders</h4>

            <p className="mb-4 text-sm leading-6 text-gray-300">
              Subscribe to receive beneficial articles and reminders.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 transition focus-within:border-amber-400">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex items-center justify-center bg-amber-400 px-4 text-[#052e2b] transition hover:bg-amber-300"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              We respect your privacy. Your email will be handled according to
              our privacy policy.
            </p>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Islamic Path. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-400">
              <a href="/privacy" className="transition hover:text-amber-300">
                Privacy Policy
              </a>

              <a href="/terms" className="transition hover:text-amber-300">
                Terms & Conditions
              </a>

              <a href="/contact" className="transition hover:text-amber-300">
                Contact
              </a>
            </div>

            <p className="flex items-center gap-1 text-sm text-gray-400">
              Made with
              <Heart size={14} className="fill-amber-400 text-amber-400" />
              for the Ummah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
