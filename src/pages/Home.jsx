import React from 'react';
import Background3D from '../components/Background3D.jsx';
import Navbar from '../components/Navbar.jsx';
import SideBar from '../components/SideBar.jsx';
import AboutMe from '../components/About.jsx';
import ContactMe from '../components/ContactMe.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import Projects from '../components/Projects.jsx';
import EducationExperience from '../components/EducationExperience.jsx';
import TechStack from '../components/TechStack.jsx';
import Services from '../components/Services.jsx';
import Skills from '../components/skills/Skills.jsx';
import Electromagnetism3D from '../components/Electromagnetism3D.jsx';

function Home() {
  return (
    <div id="home" className="relative min-h-screen text-white bg-transparent">
      <Background3D />
      <Navbar />
      <SideBar />
      <main className="relative z-10">
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <EducationExperience />
        <TechStack />
        <Services />
        <Electromagnetism3D />
        <ContactMe />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
