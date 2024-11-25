// app/layout.js
import { ReduxProvider } from './redux-provider';

import {WalletProvider} from './wallet-provider'

import './globals.css'

const GA_TRACKING_ID = 'G-MFD7Q1PPT9';


export async function generateMetadata() {
  const {metadata} = await import(`../locales/en.json`);
  return {
    title: metadata?.title,
    description: metadata?.description,

    icons: {
      icon: { rel: 'icon', type: 'image/png', url: '/img/flockers/favicon.png' },
      icon: { rel: 'icon', type: 'image/svg+xml', url: '/img/flockers/favicon.svg' },
      icon: { rel: 'icon', type: 'image/x-icon', url: '/img/flockers/favicon.svg' },
    },
    keywords: 'FLOCKERZ, $FLOCK, $FLOCK-TOKEN, FLOCKER, FLOCKEZ, floker coin, flockers coin, flokerz coin', // Add keywords here
    robots: 'index, follow', // Add robots directives here
    openGraph: {
      title: metadata?.openGraph?.title,
      description: metadata?.openGraph?.description,
      url: metadata?.openGraph?.url, // The URL of the page
      siteName: 'FLOCKERZ',
      images: [
        {
          url: 'https://flockserz.com/img/flockers/OG.png', // Path to your Open Graph image
          width: 1200,
          height: 800,
          alt: 'Flockerz',
        },
      ],
      locale: metadata?.openGraph?.locale,
      type: 'website',
    },
    twitter: {
      card: "summary_large_image", // Use "summary" or "summary_large_image"
      site: "@FlockerzToken", // Your Twitter handle
      title: metadata?.openGraph?.title,
      description: metadata?.openGraph?.description,
      image: 'https://flockserz.com/img/flockers/OG.png', // Path to your Open Graph image,
    },
    alternates: {
      canonical: 'https://flockserz.com/', // Set the canonical URL
    },
  };
}



export default function RootLayout({ children }) {
   // Define your schema markup

   const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Flockerz",
    name: "Your Organization Name",
    url: "https://flockserz.com",
    logo: "https://flockserz.com/img/flockers/OG.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-123-456-7890",
      contactType: "Customer Service",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://duckduckgo.com/?q=flockerz",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html>
      <head>

        <meta httpEquiv="Cache-Control" content="max-age=0, no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />


        {/* <!-- Metadata for language versions --> */}
        <link rel="alternate" hrefLang="en" href="https://flockserz.com/en" />   
        <link rel="alternate" hrefLang="vi" href="https://flockserz.com/vi" />   
        <link rel="alternate" hrefLang="es" href="https://flockserz.com/es" />   
        <link rel="alternate" hrefLang="zh" href="https://flockserz.com/zh" />   
        <link rel="alternate" hrefLang="de" href="https://flockserz.com/de" />   
        <link rel="alternate" hrefLang="jp" href="https://flockserz.com/jp" />   
        <link rel="alternate" hrefLang="fr" href="https://flockserz.com/fr" />   
        <link rel="alternate" hrefLang="it" href="https://flockserz.com/it" />   
        <link rel="alternate" hrefLang="pt" href="https://flockserz.com/pt" />   
        <link rel="alternate" hrefLang="ru" href="https://flockserz.com/ru" />   
        <link rel="alternate" hrefLang="ar" href="https://flockserz.com/ar" />   
        <link rel="alternate" hrefLang="hi" href="https://flockserz.com/hi" />   
        <link rel="alternate" hrefLang="ko" href="https://flockserz.com/ko" />   
        <link rel="alternate" hrefLang="th" href="https://flockserz.com/th" />   
        <link rel="alternate" hrefLang="nl" href="https://flockserz.com/nl" />   
        <link rel="alternate" hrefLang="tr" href="https://flockserz.com/tr" />   
        <link rel="alternate" hrefLang="el" href="https://flockserz.com/el" />   
        <link rel="alternate" hrefLang="sv" href="https://flockserz.com/sv" />   
        <link rel="alternate" hrefLang="he" href="https://flockserz.com/he" />   
        <link rel="alternate" hrefLang="uk" href="https://flockserz.com/uk" />   
        <link rel="alternate" hrefLang="ms" href="https://flockserz.com/ms" />   
        <link rel="alternate" hrefLang="id" href="https://flockserz.com/id" />   
        <link rel="alternate" hrefLang="fa" href="https://flockserz.com/fa" />   
        <link rel="alternate" hrefLang="bn" href="https://flockserz.com/bn" />   
        <link rel="alternate" hrefLang="ta" href="https://flockserz.com/ta" />   
        <link rel="alternate" hrefLang="pl" href="https://flockserz.com/pl" />   
        <link rel="alternate" hrefLang="x-default" href="https://flockserz.com/en" />


        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css" />

        {/* Add the schema markup here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />

        <link rel="stylesheet" type="text/css" href="fonts/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/nivo-lightbox.css" />
        <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/default.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900" rel="stylesheet" />
       {/* Load Google Analytics */}
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
          />
      </head>
      <body>
        <WalletProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </WalletProvider>
        <script type="text/javascript" src="js/jquery.1.11.1.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <a href="https://hemifinance.com" style={{display: 'none'}}> Staking $HEMI</a>
        <a href="https://hemifinance.com/app" style={{display: 'none'}}> Staking $HEMI</a>
        <a href="https://dog2014.com" style={{display: 'none'}}> doge2014, doge14</a>
        <a href="https://doge14.com" style={{'display': 'none'}}> Join Doge, Doge2014, doge14, dog2014</a>
        <a href="https://doge.mba" style={{'display': 'none'}}> Join Doge, doge2014, doge14, dog2014</a>
        <a href="https://cryptocallstars.com" style={{'display': 'none'}}> Join Crypto Star, Crypto All Stars</a>
        <a href="https://pepeunchaineds.com/" style={{display: 'none'}}> Join Pepu, pepeunchained</a>


      </body>
    </html>
  );
}
