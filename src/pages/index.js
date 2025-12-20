import Head from "next/head";
import SarjanAIHero from "@/components/Home/HeroSection";
import FlowPage from "@/components/OurFlow/flow";
import WhySarjanAI from "@/components/why choose us/about";
import ExamplesSection from "@/components/Example/ExamplesSection";

export default function Home() {
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
      <SarjanAIHero />
      <FlowPage />
      <WhySarjanAI />
      <ExamplesSection />
    </>
  );
}
