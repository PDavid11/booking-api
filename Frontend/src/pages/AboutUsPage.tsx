import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";

export default function AboutUsPage() {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-16">
      <FadeIn>
        <img
          src="/images/about-portrait.jpg"
          alt="Katalin Klára a stúdióban"
          className="w-full rounded-[12px] object-cover"
        />
      </FadeIn>
      <FadeIn>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">About Me</h1>
        <p className="mt-6 max-w-[58ch] text-muted">
          Katalin Klára vagyok. Szempillát készítek úgy, hogy a saját pilláid egészsége mindig elsődleges
          szempont maradjon.
        </p>
        <p className="mt-4 max-w-[58ch] text-muted">
          A hosszúságot a természetes pilláid állapotához igazítom. Ha nem vagy biztos az időkeretben,
          kérdezz rá már az egyeztetéskor.
        </p>
        <Link
          to="/booking"
          className="mt-8 inline-flex whitespace-nowrap rounded-[12px] bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover active:scale-[0.98]"
        >
          Booking
        </Link>
      </FadeIn>
    </div>
  );
}
