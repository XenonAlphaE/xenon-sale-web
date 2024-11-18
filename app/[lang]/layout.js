export async function generateMetadata({ params }) {
  const baseUrl = "https://flockserz.com";

  const lang = (await params).lang
  const canonicalUrl = `${baseUrl}/${lang}`;


  const defaultMeta = await import(`../../locales/en.json`).then(content => content.metadata);
  const localMeta = await import(`../../locales/${lang}.json`).then(content => content.metadata||{});

  return {
    title:  localMeta?.title || defaultMeta?.title,
    description: localMeta?.description || defaultMeta?.description,
    openGraph: {
      title: localMeta?.openGraph?.title || defaultMeta?.openGraph?.title,
      description: localMeta?.openGraph?.description || defaultMeta?.openGraph?.description,
      url: localMeta?.openGraph?.url || defaultMeta?.openGraph?.url, // The URL of the page
      siteName: 'FLOCKERZ',
      images: [
        {
          url: 'https://flockserz.com/img/flockers/OG.png', // Path to your Open Graph image
          width: 1200,
          height: 800,
          alt: 'Flockerz',
        },
      ],
      locale:localMeta?.openGraph?.locale || defaultMeta?.openGraph?.locale,
      type: 'website',
    },
    twitter: {
      card: "summary_large_image", // Use "summary" or "summary_large_image"
      site: "@FlockerzToken", // Your Twitter handle
      title: localMeta?.openGraph?.title || defaultMeta?.openGraph?.title ,
      description: localMeta?.openGraph?.description || defaultMeta?.openGraph?.description,
      image: 'https://flockserz.com/img/flockers/OG.png', // Path to your Open Graph image,
    },
    alternates: {
      canonical: canonicalUrl, // Set the canonical URL
    }

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
  