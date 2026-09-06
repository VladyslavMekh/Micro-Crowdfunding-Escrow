import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import { HeroSection } from "./features/landing/HeroSection/HeroSection";
import { CryptoMarketSection } from "./features/landing/CryptoMarketSection/CryptoMarketSection";
import { WhyUsSection } from "./features/landing/WhyUsSection/WhyUsSection";
import { HowItWorksSection } from "./features/landing/HowItWorksSection/HowItWorksSection";
import { CreateCampaign } from "./features/create-campaign/CreateCampaign/CreateCampaign";
import { History } from "./features/history/History/History";
import { HowItWorks } from "./features/how-it-works/HowItWorks/HowItWorks";
import { Footer } from "./components/layout/Footer/Footer";
import './styles/global.css'


function HomePage() {
    return (
        <>
            <HeroSection />
            <CryptoMarketSection />
            <WhyUsSection />
            <HowItWorksSection />
        </>
    );
}

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreateCampaign />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;