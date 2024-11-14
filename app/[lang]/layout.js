export async function generateMetadata({ params }) {
  const lang = (await params).lang


  const defaultMeta = await import(`../../locales/en.json`).then(content => content.metadata);
  const localMeta = await import(`../../locales/${lang}.json`).then(content => content.metadata||{});

  return {
    title:  localMeta?.title || defaultMeta?.title,
    description: localMeta?.description || defaultMeta?.description,
    icons: {
      icon: { rel: 'icon', type: 'image/x-icon', url: '/token.svg' },
    },
    keywords: 'doge2014, doge2014 presale, doge2014 crypto, doge14 presale, doge14, doge14 crypto', // Add keywords here
    robots: 'index, follow', // Add robots directives here
    openGraph: {
      title: localMeta?.openGraph?.title || defaultMeta?.openGraph?.title,
      description: localMeta?.openGraph?.description || defaultMeta?.openGraph?.description,
      url: localMeta?.openGraph?.url || defaultMeta?.openGraph?.url, // The URL of the page
      siteName: 'Doge2014',
      images: [
        {
          url: 'https://dogcoin20.com/OG.png', // Path to your Open Graph image
          width: 1200,
          height: 800,
          alt: 'Doge 2014',
        },
      ],
      locale:localMeta?.openGraph?.locale || defaultMeta?.openGraph?.locale,
      type: 'website',
    },
    twitter: {
      card: "summary_large_image", // Use "summary" or "summary_large_image"
      site: "@Doge2014token", // Your Twitter handle
      title: localMeta?.openGraph?.title || defaultMeta?.openGraph?.title ,
      description: localMeta?.openGraph?.description || defaultMeta?.openGraph?.description,
      image: 'https://dogcoin20.com/OG.png', // Path to your Open Graph image,
    },
  };
}



export default async function LangLayout({ children, params }) {
    const lang = (await params).lang

    return (
      <div>
        <input type="hidden" value={lang} id="current-lang" />
        {children}
      </div>
    );
  }
  