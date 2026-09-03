import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChatSection from "@/components/ChatSection";
import QualitySection from "@/components/QualitySection";
import MarineSection from "@/components/MarineSection";
import HydrationSection from "@/components/HydrationSection";
import StickerSection from "@/components/StickerSection";
import Footer from "@/components/Footer";
import OceanCanvas from "@/components/OceanCanvas";
import RippleCursor from "@/components/RippleCursor";
import FloatingMascot from "@/components/FloatingMascot";
import WaveDivider from "@/components/WaveDivider";
import WaterTestPage from "@/pages/WaterTestPage";

const Home = () => {
  const scrollToChat = () => {
    const el = document.getElementById("chat");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main className="relative z-10">
      <HeroSection onOpenChat={scrollToChat} />
      <WaveDivider />
      <ChatSection />
      <WaveDivider flip />
      <QualitySection />
      <WaveDivider />
      <MarineSection />
      <WaveDivider flip />
      <HydrationSection />
      <WaveDivider />
      <StickerSection />
      <Footer />
    </main>
  );
};

function App() {
  const openChat = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/#chat";
      return;
    }
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App relative">
      <BrowserRouter>
        <OceanCanvas />
        <RippleCursor />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<WaterTestPage />} />
        </Routes>
        <FloatingMascot onOpenChat={openChat} />
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(12,25,44,0.95)",
              border: "1px solid rgba(56,189,248,0.35)",
              color: "#F0FDFA",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
