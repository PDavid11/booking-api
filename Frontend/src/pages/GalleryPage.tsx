import { FadeIn } from "../components/FadeIn";

const shots = [
  { src: "/images/gallery-classic.jpg", alt: "Klasszikus szempilla szett közeli", span: "md:col-span-1" },
  { src: "/images/gallery-volume.jpg", alt: "Volume szempilla szett közeli", span: "md:col-span-1" },
  { src: "/images/gallery-studio.jpg", alt: "A stúdió belsőtere", span: "md:col-span-2" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <FadeIn>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Gallery</h1>
        <p className="mt-4 max-w-[50ch] text-muted">
          Nézd át a munkáimat foglalás előtt, hogy a választott stílus illeszkedjen az elképzelésedhez.
        </p>
      </FadeIn>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {shots.map((shot) => (
          <FadeIn key={shot.src} className={shot.span}>
            <img
              src={shot.src}
              alt={shot.alt}
              className="h-[280px] w-full rounded-[12px] object-cover md:h-[360px]"
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
