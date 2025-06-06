import CallToActionSection from '@/components/CallToActionSection/CallToActionSection';
import Footer from '@/components/Footer/Footer';
import HeroSection from '@/components/HeroSection/HeroSection';
import ShareSection from '@/components/ShareSection/ShareSection';
import ViewSection from '@/components/ViewSection/ViewSection';
import WriteSection from '@/components/WriteSection/WriteSection';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeroSection />
        <WriteSection />
      </div>
      <ShareSection />
      <ViewSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
