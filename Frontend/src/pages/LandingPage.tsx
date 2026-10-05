import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";

export default function LandingPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-8 pb-12 md:grid-cols-2 md:gap-12 md:pt-10 lg:pt-12">
        <FadeIn>
          <img
            src="/images/hero-studio.jpg"
            alt="Szempilla kezelés a stúdióban"
            className="h-[min(62vh,560px)] w-full rounded-[12px] object-cover"
          />
        </FadeIn>
        <FadeIn>
          <h1 className="max-w-[14ch] text-4xl font-semibold tracking-tight leading-[1.1] md:text-5xl lg:text-6xl">
            Szép szett, egészséges saját pilla.
          </h1>
          <p className="mt-5 max-w-[42ch] text-base text-muted">
            Foglalj időpontot klasszikus vagy volumen szempillára, nyugodt stúdióban.
          </p>
          <Link
            to="/booking"
            className="mt-7 inline-flex whitespace-nowrap rounded-[12px] bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover active:scale-[0.98]"
          >
            Booking
          </Link>
        </FadeIn>
      </section>

      <section className="border-y border-line bg-surface">
        <FadeIn className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">Így zajlik egy alkalom</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            <li className="rounded-[12px] bg-canvas p-6">
              <p className="text-3xl font-semibold text-accent">01</p>
              <p className="mt-3 text-lg font-semibold">Válassz szolgáltatást</p>
              <p className="mt-2 max-w-[36ch] text-sm text-muted">
                Új szett vagy töltés. A hosszt a saját pilláid állapotához igazítom.
              </p>
            </li>
            <li className="md:mt-8">
              <p className="text-3xl font-semibold text-accent">02</p>
              <p className="mt-3 text-lg font-semibold">Foglalj időt</p>
              <p className="mt-2 max-w-[36ch] text-sm text-muted">
                Válassz stylistot, szabad sávot, és add meg a nevedet és telefonszámodat.
              </p>
            </li>
            <li className="rounded-[12px] bg-accent p-6 text-white md:mt-16">
              <p className="text-3xl font-semibold">03</p>
              <p className="mt-3 text-lg font-semibold">Gyere nyugodtan</p>
              <p className="mt-2 max-w-[36ch] text-sm text-white/80">
                Érkezz egyedül, maximum 5 perccel korábban. A többit a stúdióban intézzük.
              </p>
            </li>
          </ol>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <FadeIn>
          <img
            src="/images/gallery-studio.jpg"
            alt="A stúdió kezelőágya nappali fénnyel"
            className="h-[380px] w-full rounded-[12px] object-cover md:h-[460px]"
          />
          <h2 className="mt-8 max-w-[20ch] text-3xl font-semibold tracking-tight">
            Új szett 2,5 to 3 óra. Töltés 1,5 to 2 óra.
          </h2>
          <p className="mt-3 max-w-[55ch] text-muted">
            Olvasd el a házirendet foglalás előtt, hogy a választott stílus és az időkeret is stimmeljen.
          </p>
          <Link
            to="/house-rules"
            className="mt-6 inline-flex whitespace-nowrap rounded-[12px] border border-ink px-5 py-2.5 text-sm font-semibold hover:bg-ink hover:text-white"
          >
            House Rules
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
