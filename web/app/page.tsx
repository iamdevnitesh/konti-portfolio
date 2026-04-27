import Hero from "@/components/home/Hero";
import FeaturedMoments from "@/components/home/FeaturedMoments";
import GalleryPreview from "@/components/home/GalleryPreview";
import ClosingSection from "@/components/home/ClosingSection";
import {
  heroPhotos,
  featuredPhotos,
  galleryPhotos,
  closingPhotos,
} from "@/data/photos.generated";

export default function HomePage() {
  const hero = heroPhotos[0] ?? galleryPhotos[0];
  const closing = closingPhotos[0] ?? galleryPhotos[galleryPhotos.length - 1];
  const featured = featuredPhotos.length
    ? featuredPhotos
    : galleryPhotos.slice(0, 4);

  return (
    <>
      {hero && <Hero photo={hero} />}
      {featured.length > 0 && <FeaturedMoments photos={featured} />}
      {galleryPhotos.length > 0 && <GalleryPreview photos={galleryPhotos} />}
      {closing && <ClosingSection photo={closing} />}
    </>
  );
}
