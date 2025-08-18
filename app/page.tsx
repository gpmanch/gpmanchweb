// import Header from "@/components/header";
import AboutSection from "./_components/about-section";
import ContactSection from "./_components/contact-section";
import HeroSection from "./_components/hero-section";
import HistorySection from "./_components/history-section";
import InstaReelsSection from "./_components/insta-reels-section";
import LatestVideosSection from "./_components/latest-videos-section";
import TeamSection from "./_components/team-section";
import YouthEmpowerment from "./_components/youth-empowerment";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <>
      {/* <Header/> */}

      {/* Hero Section */}
      <HeroSection/>

      {/* About Section */}
      <AboutSection/>

      {/* Team Section */}
      <TeamSection/>

      {/* History Section */}
      <HistorySection/>

      {/* Youth Empowerment */}
      <YouthEmpowerment/>

      {/* Popular Instagram Reels Section */}
      <InstaReelsSection/>

      {/* Latest Videos Section */}
      <LatestVideosSection/>

      {/* Contact Section */}
      <ContactSection/>

      <Footer/>
    </>
  );
}
