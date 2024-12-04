// app/layout.js
import { ReduxProvider } from './redux-provider';

import {WalletProvider} from './wallet-provider'

import './globals.css'
import { getBacklinkUrls, getLangDomain, getLangKeys, getLocale, getMainDomain } from './server-util';

const GA_TRACKING_ID = '';


export async function generateMetadata() {
  const {metadata} = await import(`../locales/en.json`);
  return {
    title: metadata?.title,
    description: metadata?.description,

    icons: {
      icon: { rel: 'icon', type: 'image/png', url: '/img/zappy/zap-logo2.png' },
    },
    keywords: 'zap defi, zappy, zappy defi,zap presale, zappy presale, zap defi presale', // Add keywords here
    robots: 'index, follow', // Add robots directives here
    openGraph: {
      title: metadata?.title,
      description: metadata?.description,
      url: getMainDomain(), // The URL of the page
      siteName: 'zapsdefi',
      images: [
        {
          url: `${getMainDomain()}/img/zappy/OG.jpg`, // Path to your Open Graph image
          width: 1200,
          height: 800,
          alt: 'ZAPSDEFI',
        },
      ],
      locale: getLocale(),
      type: 'website',
    },
    twitter: {
      card: "summary_large_image", // Use "summary" or "summary_large_image"
      site: "@zap_defi", // Your Twitter handle
      title: metadata?.title,
      description: metadata?.description,
      url: `${getMainDomain()}/img/zappy/OG.jpg`, // Path to your Open Graph image
    },
    alternates: {
      canonical: getMainDomain(), // Set the canonical URL
    },
  };
}



export default function RootLayout({ children }) {
   // Define your schema markup

   const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "zapsdefi",
    name: "Your Organization Name",
    url: getMainDomain(),
    logo: `${getMainDomain()}/img/zappy/zap-logo2.png'`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-123-456-7890",
      contactType: "Customer Service",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://duckduckgo.com/?q=zappydefi",
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

        {getLangKeys().map((item, index) => (
            <link rel="alternate" hrefLang={item} href={getLangDomain(item)} />   
        ))}  
        <link rel="alternate" hrefLang="x-default" href={getLangDomain('en')} />


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

        {getBacklinkUrls().map(item => {
          return <a href={item.url} style={{display: 'none'}}> {item.text}</a>
        })}
      </body>
    </html>
  );
}
