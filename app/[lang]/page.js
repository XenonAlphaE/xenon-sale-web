import App from '../client-components/app/App'

export async function generateStaticParams() {
    const languages = ['en', 'vi', 'es', 'zh', 'de', 'jp', 'fr', 'it', 'pt', 'ru', 'ar', 'hi', 'ko', 'th', 'nl', 'tr', 'el', 'sv', 'he', 'uk', 'ms', 'id', 'fa', 'bn', 'ta', 'pl']
    return languages.map((lang) => ({
      lang, // This should match the name of the parameter in your filename
    }));
}
   
export default async function Page({ params }) {
    const lang = (await params).lang
    return <App/>
}
