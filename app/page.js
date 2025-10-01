import App from './client-components/app/App'
import { GlobalConfigProvider } from './globalConfig-provider';
import { ReduxProvider } from './redux-provider';

import { WalletProvider } from './wallet-provider'


export default async function Page() {
    return (
        <GlobalConfigProvider>
            <WalletProvider>
                <ReduxProvider><App /></ReduxProvider>
            </WalletProvider>
        </GlobalConfigProvider>
    )
}
