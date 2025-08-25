import App from '../client-components/app/App'
import { ReduxProvider } from '../redux-provider';
import { getLangKeys } from '../server-util';
import { WalletProvider } from '../wallet-provider';
export async function generateStaticParams() {
  
    const languages = getLangKeys()
    return languages.map((lang) => ({
      lang, // This should match the name of the parameter in your filename
    }));
}
   
export default async function Page({ params }) {
    const lang = (await params).lang
    return (    
    <WalletProvider>
        <ReduxProvider><App /></ReduxProvider>
    </WalletProvider>
    )
}
