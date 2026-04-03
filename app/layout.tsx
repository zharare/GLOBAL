import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { AppInitializer } from '@/components/AppInitializer';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4"><AppInitializer />{children}</main>
        </div>
      </body>
    </html>
  );
}
