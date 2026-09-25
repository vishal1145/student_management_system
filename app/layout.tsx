import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { AppFooter } from "@/components/layout/AppFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { themeInitScript } from "@/components/layout/theme";
import { ToastProvider } from "@/components/ui/Toast";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { getCurrentUser } from "@/server/auth/guard";

export const metadata: Metadata = {
  title: { default: `${APP_NAME} | ${APP_TAGLINE}`, template: `%s | ${APP_NAME}` },
  description: "A student management system with separate dashboards for admins, teachers and students.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#090c18" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ToastProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
          >
            Skip to content
          </a>
          <div aria-hidden="true" className="scroll-progress" />
          <SiteHeader user={user} />
          <main id="main" className="page-main">{children}</main>
          <AppFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
