import Footer from '@/components/Footer/Footer';
import AboutProjectPage from '@/components/pages/AboutProjectPage/AboutProjectPage';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'About the project',
  },
  description:
    'Discover the essence of our project: a dynamic platform designed to revolutionize task management. Dive into our innovative features and experience seamless organization, collaboration, and productivity like never before.',
};
export default function AboutProject() {
  return (
    <>
      <AboutProjectPage />
      <Footer />
    </>
  );
}
