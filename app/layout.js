// app/layout.js
import { ReduxProvider } from './redux-provider';


import './globals.css'

const GA_TRACKING_ID = 'G-FYRE85430C';


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
          url: 'https://flockez.com/img/flockers/OG.png', // Path to your Open Graph image
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
      image: 'https://flockez.com/img/flockers/OG.png', // Path to your Open Graph image,
    },
    alternates: {
      canonical: 'https://flockez.com/', // Set the canonical URL
    },
  };
}



export default function RootLayout({ children }) {
   // Define your schema markup

   const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Flockerz",
    name: "Your Organization Name",
    url: "https://flockez.com",
    logo: "https://flockez.com/img/flockers/OG.png",
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
        <link rel="alternate" hrefLang="en" href="https://flockez.com/en" />   
        <link rel="alternate" hrefLang="vi" href="https://flockez.com/vi" />   
        <link rel="alternate" hrefLang="es" href="https://flockez.com/es" />   
        <link rel="alternate" hrefLang="zh" href="https://flockez.com/zh" />   
        <link rel="alternate" hrefLang="de" href="https://flockez.com/de" />   
        <link rel="alternate" hrefLang="jp" href="https://flockez.com/jp" />   
        <link rel="alternate" hrefLang="fr" href="https://flockez.com/fr" />   
        <link rel="alternate" hrefLang="it" href="https://flockez.com/it" />   
        <link rel="alternate" hrefLang="pt" href="https://flockez.com/pt" />   
        <link rel="alternate" hrefLang="ru" href="https://flockez.com/ru" />   
        <link rel="alternate" hrefLang="ar" href="https://flockez.com/ar" />   
        <link rel="alternate" hrefLang="hi" href="https://flockez.com/hi" />   
        <link rel="alternate" hrefLang="ko" href="https://flockez.com/ko" />   
        <link rel="alternate" hrefLang="th" href="https://flockez.com/th" />   
        <link rel="alternate" hrefLang="nl" href="https://flockez.com/nl" />   
        <link rel="alternate" hrefLang="tr" href="https://flockez.com/tr" />   
        <link rel="alternate" hrefLang="el" href="https://flockez.com/el" />   
        <link rel="alternate" hrefLang="sv" href="https://flockez.com/sv" />   
        <link rel="alternate" hrefLang="he" href="https://flockez.com/he" />   
        <link rel="alternate" hrefLang="uk" href="https://flockez.com/uk" />   
        <link rel="alternate" hrefLang="ms" href="https://flockez.com/ms" />   
        <link rel="alternate" hrefLang="id" href="https://flockez.com/id" />   
        <link rel="alternate" hrefLang="fa" href="https://flockez.com/fa" />   
        <link rel="alternate" hrefLang="bn" href="https://flockez.com/bn" />   
        <link rel="alternate" hrefLang="ta" href="https://flockez.com/ta" />   
        <link rel="alternate" hrefLang="pl" href="https://flockez.com/pl" />   
        <link rel="alternate" hrefLang="x-default" href="https://flockez.com/" />


        <link rel="canonical" href="https://flockez.com/" />
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
        <ReduxProvider>{children}</ReduxProvider>
        <script type="text/javascript" src="js/jquery.1.11.1.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <a href="https://hemifinance.com" style={{display: 'none'}}> Staking $HEMI</a>
        <a href="https://hemifinance.com/app" style={{display: 'none'}}> Staking $HEMI</a>
        <a href="https://dog2014.com" style={{display: 'none'}}> doge2014, doge14</a>

      </body>
    </html>
  );
}
