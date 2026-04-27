import Image from "next/image";
import { heroPhotos, galleryPhotos } from "@/data/photos.generated";
import Reveal from "@/components/animations/Reveal";

export const metadata = { title: "About — konti" };

const facts = [
  { label: "Name", value: "konti" },
  { label: "Nicknames", value: "the small king · floof · biscuit" },
  { label: "Personality", value: "regal, suspicious, occasionally feral" },
  { label: "Favorite spots", value: "warm laundry, sunlit windows, your keyboard" },
  { label: "Favorite activities", value: "stalking shadows · ignoring you · loaf mode" },
  { label: "Funny traits", value: "judgemental stare, silent zoomies, dramatic stretching" },
];

export default function AboutPage() {
  const portrait = heroPhotos[0] ?? galleryPhotos[0];

  return (
    <div className="container-wide pt-32 md:pt-40 pb-24">
      <Reveal>
        <p className="eyebrow">About</p>
        <h1 className="display-hero text-6xl md:text-8xl mt-4 max-w-3xl">
          Part-time philosopher, full-time nap strategist.
        </h1>
      </Reveal>

      <div className="mt-16 md:mt-24 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          {portrait && (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={portrait.src}
                alt={portrait.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="md:col-span-7 space-y-10">
          <Reveal>
            <p className="text-bone/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Known for silent judgement, dramatic stretching, and claiming
              every soft surface as personal territory. This is a quiet
              archive of an otherwise ordinary creature, photographed with
              the seriousness of any other subject.
            </p>
          </Reveal>

          <dl className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-12">
            {facts.map((f) => (
              <div key={f.label} className="border-t border-white/10 pt-4">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-1 text-bone/90">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
