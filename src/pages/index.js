import Head from "next/head";
import SarjanAIHero from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Sarjan AI</title>
        <meta name="description" content="Home - Sarjan AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SarjanAIHero />
    </>
  );
}
