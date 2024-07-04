import type { Metadata } from 'next';
import { ThemeProvider } from './components/ThemeProvider';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import './styles/index.scss';
import { Toaster } from 'sonner';
import UserProvider from './components/UserProvider';

export const metadata: Metadata = {
  title: {
    template: 'eLearn | %s',
    default: '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <html lang='en'>
        {/* Emplacement des icons tout ce qui doit être dans la balise head */}
        <head></head>
        <body>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <Header />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </UserProvider>
  );
}

