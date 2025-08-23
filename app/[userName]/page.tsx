import React from 'react'
import HeroSection from '../_components/hero-section';
import AboutSection from '../_components/about-section';
import TeamSection from '../_components/team-section';
import HistorySection from '../_components/history-section';
import YouthEmpowerment from '../_components/youth-empowerment';
import InstaReelsSection from '../_components/insta-reels-section';
import LatestVideosSection from '../_components/latest-videos-section';
import ContactSection from '../_components/contact-section';

async function UserPage({ params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params;
  console.log(userName);
  return (
    <>
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
    </>
  )
}

export default UserPage;