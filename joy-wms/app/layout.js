import { Inter } from "next/font/google";
import "../styles/main.scss";
import Auth from '@/components/dashboard/Auth';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Warehouse Management System | Joy",
  description: "Warehouse Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth>
          {children}
        </Auth>
      </body>
    </html>
  );
}
