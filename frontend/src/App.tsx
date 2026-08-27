import React, { useState } from "react";
import { Header } from "./components/layout/Header/Header";
import { HeroSection } from "./features/landing/HeroSection/HeroSection";
import { WhyUsSection } from "./features/landing/WhyUsSection/WhyUsSection";
import { HowItWorksSection } from "./features/landing/HowItWorksSection/HowItWorksSection";
import { Footer } from "./components/layout/Footer/Footer";
import './styles/global.css'

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <HeroSection />
                <WhyUsSection />
                <HowItWorksSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;