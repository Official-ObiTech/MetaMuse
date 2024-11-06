import Aos from "@/components/Aos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <Aos>
          <Component {...pageProps} />
        </Aos>
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
