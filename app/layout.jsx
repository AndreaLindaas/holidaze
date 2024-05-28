import { IBM_Plex_Sans } from "next/font/google";
import "./_styles/globals.scss";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import Providers from "./_components/Providers";
const IBM = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Holidaze - Unlock your next adventure",
  description: "Book your next adventure venue now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={IBM.className}>
          <Header />

          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
