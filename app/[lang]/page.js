export async function generateMetadata({ params }) {

    const lang = (await params).lang
    console.log(lang)
    return {
      title: 'FlockerZ: Revolutionary Vote-To-Earn Meme Coin | Crypto Presale',
      description: 'Join the $FLOCK, where every Flocker has a voice...',
      openGraph: {
        title: 'FlockerZ: Revolutionary Vote-To-Earn Meme Coin',
        description: 'Join the $FLOCK, where every Flocker has a voice...',
      },
      htmlAttributes: {
        lang: lang || 'en',
      },
    };
  }


export default async function Page({ params }) {
    const lang = (await params).lang
    return <div>My Post: {lang}</div>
  }