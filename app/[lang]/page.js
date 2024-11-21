import App from '../client-components/app/App'

export async function generateStaticParams() {
  
    const languages = ['ar', 'bn', 'de', 'el', 'en', 'es', 'fa', 'fr', 'he', 'hi', 'id', 'it', 'jp', 'ka', 'ko', 'ms', 'nl', 'pl', 'pt', 'ru', 'sv', 'ta', 'th', 'tr', 'uk', 'vi', 'zh'];
    return languages.map((lang) => ({
      lang, // This should match the name of the parameter in your filename
    }));
}
   
export default async function Page({ params }) {
    const lang = (await params).lang
    return <App/>
}
