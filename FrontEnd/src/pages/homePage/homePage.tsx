
import Navbar from '../../components/navbar/navbar';
import Carousel from '../../components/carousel/carousel';
import ChatBot from '../../components/chatbot/chatbot';
import Footer from '../../components/footer/footer';
import Testimonials from '../../components/testimonials/testimonial';
import ExploreCampus from '../../components/exploreCampus/exploreCampus';
import ActionMenu from '../../components/actionMenu/actionMenu';
import WhyChooseUs from '../../components/whyChooseUs/whyChooseUs';
import AboutCarousel from '../../components/aboutCarousel/aboutCarousel';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <AboutCarousel/>
      <WhyChooseUs/>
      
      <ChatBot />
      <Testimonials/>
      <ExploreCampus/>
      <Footer/>
      <ActionMenu/>
      
    </>
  );
}
