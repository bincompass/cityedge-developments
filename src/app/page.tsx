import Hero from "@/features/home/components/Hero";
import Destinations from "@/features/home/components/Destinations";
import PortfolioSlider from "@/features/home/components/PortfolioSlider";
import RegisterInterest from "@/features/home/components/RegisterInterest";

export default function Home() {
  return (
    <main>
      <Hero />
      <Destinations />
      <PortfolioSlider />
      <RegisterInterest />
    </main>
  );
}
