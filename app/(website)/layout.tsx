import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import GetNavbar from "@/components/getnavbar";
import { urlForImage } from "@/lib/sanity/image";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Badminton Lover - World's best badminton blog",
      template: "%s"
    },
    description: settings?.description || "",
    keywords: ["Badminton", "Yonex", "Rackets"],
    authors: [{ name: "Santhosh Bhoopal" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Badminton Lover",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable)}>
      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        <Providers>
          <GetNavbar {...settings} />
          <div>{children}</div>
          <Footer {...settings} />
        </Providers>
        <GoogleAnalytics gaId="G-PFSVNFVPTR" />
      </body>
    </html>
  );
}

export const revalidate = 86400;
