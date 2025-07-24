import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout showContact={false}>
      <ContactForm />
    </PageLayout>
  );
};

export default Contact;