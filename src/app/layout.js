import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "My Finance Tracker",
  description: "Kelola keuangan Anda dengan mudah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}