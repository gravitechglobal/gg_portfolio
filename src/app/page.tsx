import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CourseDirectory from "@/components/sections/CourseDirectory";
import ServiceMesh from "@/components/sections/ServiceMesh";
import CertMarquee from "@/components/sections/CertMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CourseDirectory />
        <ServiceMesh />
        <CertMarquee />
      </main>
      <Footer />
    </>
  );
}
