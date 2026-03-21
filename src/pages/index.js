import Head from "next/head";
import SarjanAIHero from "@/components/Home/HeroSection";
import FlowPage from "@/components/OurFlow/flow";
import WhySarjanAI from "@/components/why choose us/about";
import ExamplesSection from "@/components/Example/ExamplesSection";
import { useState } from "react";
import { useRouter } from "next/router";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Head>
        <title>Home - Sarjan AI</title>
        <meta name="description" content="Home - Sarjan AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

      </Head>
      <SarjanAIHero  onRequireLogin={() => router.push("/auth/login")}/>
      <FlowPage />
      <WhySarjanAI />
      <ExamplesSection />
      
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onOpenRegister={() => setShowRegister(true)}
      />

      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onOpenLogin={() => setShowLogin(true)}
      />
    </>
  );
}
