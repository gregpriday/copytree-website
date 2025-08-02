import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DocsLayout from '../components/docs/DocsLayout';

export const metadata = {
  title: 'Documentation - CopyTree',
  description: 'Learn how to use CopyTree to transform your codebase into AI-ready formats.',
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <main>
        <DocsLayout />
      </main>
      <Footer />
    </>
  );
}