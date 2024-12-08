import { getLangDomain, getLocale, getMainDomain } from "../server-util";

export async function generateMetadata({ params }) {
  const lang = (await params).lang
  const canonicalUrl = getLangDomain(lang);


  const defaultMeta = await import(`../../locales/en.json`).then(content => content.metadata);
  const localMeta = await import(`../../locales/${lang}.json`).then(content => content.metadata||{});

  return {
    title:  localMeta?.title || defaultMeta?.title,
    description: localMeta?.description || defaultMeta?.description,
    openGraph: {
      title: localMeta?.title || defaultMeta?.title,
      description: localMeta?.description || defaultMeta?.description,
      url: getLangDomain(lang), // The URL of the page
      siteName: 'zapsdefi',
      images: [
        {
          url: `${getMainDomain()}/img/wepe/OG.jpeg`, // Path to your Open Graph image
          width: 1200,
          height: 800,
          alt: 'ZAPSDEFI',
        },
      ],
      locale:getLocale(lang),
      type: 'website',
    },
    twitter: {
      card: "summary_large_image", // Use "summary" or "summary_large_image"
      site: "@zap_defi", // Your Twitter handle
      title: localMeta?.title || defaultMeta?.title ,
      description: localMeta?.description || defaultMeta?.description,
      url: `${getMainDomain()}/img/wepe/OG.jpeg`, // Path to your Open Graph image
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
  