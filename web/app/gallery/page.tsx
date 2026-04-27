import { galleryPhotos } from "@/data/photos.generated";
import GalleryClient from "@/components/gallery/GalleryClient";
import Reveal from "@/components/animations/Reveal";

export const metadata = {
  title: "Gallery — konti",
};

export default function GalleryPage() {
  return (
    <div className="container-wide pt-32 md:pt-40 pb-24">
      <Reveal>
        <p className="eyebrow">Index · 2026</p>
        <h1 className="display-hero text-6xl md:text-8xl mt-4 max-w-5xl">
          Every quiet moment, archived.
        </h1>
        <p className="mt-6 max-w-md text-sm text-muted">
          {galleryPhotos.length} photographs. Click any image to enlarge —
          press <span className="text-bone">i</span> for context, arrows to
          navigate, esc to close.
        </p>
      </Reveal>

      <div className="mt-16 md:mt-24">
        <GalleryClient photos={galleryPhotos} />
      </div>
    </div>
  );
}
