import { useState } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OSIntro from "./components/OSIntro";
import UbuntuArchitecture from "./components/UbuntuArchitecture";
import VirtualMemoryCore from "./components/VirtualMemoryCore";
import Model3DSection from "./components/Model3DSection";
import DiagnosticCLI from "./components/DiagnosticCLI";
import References from "./components/References";
import Footer from "./components/Footer";
import TriviaBubble from "./components/TriviaBubble";
import VirtualLab from "./components/lab/VirtualLab";
import FloatingLabButton from "./components/lab/FloatingLabButton";

export default function App() {
  const [labOpen, setLabOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar onOpenLab={() => setLabOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <OSIntro />
        <UbuntuArchitecture />
        <VirtualMemoryCore />
        <Model3DSection />
        <DiagnosticCLI />
        <References />
      </main>
      <Footer />

      <TriviaBubble />
      <FloatingLabButton onClick={() => setLabOpen(true)} />
      <VirtualLab open={labOpen} onClose={() => setLabOpen(false)} />
    </div>
  );
}
