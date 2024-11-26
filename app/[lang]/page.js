import App from '../client-components/app/App'
import { getLangKeys } from '../server-util';
export async function generateStaticParams() {
  
    const languages = getLangKeys()
    return languages.map((lang) => ({
      lang, // This should match the name of the parameter in your filename
    }));
}
   
export default async function Page({ params }) {
    const lang = (await params).lang
    return <App/>
}
