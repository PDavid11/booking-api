import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";
import AboutMeData from "../constants/AboutMeData.json";

export default function AboutUsPage() {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-16">
      <FadeIn>
        <img
          src="/images/about-portrait.png"
          alt="Katalin Klára a stúdióban"
          className="w-full rounded-[12px] object-cover"
        />
      </FadeIn>
      <FadeIn>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Vastag Katalin Klára</h1>
        <p className="mt-6 max-w-[58ch] text-muted">
          {AboutMeData.text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
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
