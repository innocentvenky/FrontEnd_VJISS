import React from 'react';
import Hero from './HeroSection';  
import Navbar from '../navabar/navbar';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import InstructorsSection from './InstructorsSection';
// import StatsSection from './StatsSection';
// import CTASection from './CTASection';
import Footer from './Footer';
import InternshipsSection from './internship';


const HomePage = () => { 
    return (    
        <div>
            <Navbar />
            <Hero /> 
            <AboutSection /> 
            <ServicesSection />
            <InternshipsSection />
            <InstructorsSection />
        
            <Footer />
        </div> 
    ); 
}

export default HomePage;