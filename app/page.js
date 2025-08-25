import App from './client-components/app/App'
import { ReduxProvider } from './redux-provider';

import { WalletProvider } from './wallet-provider'


export default async function Page() {
    return (
    <WalletProvider>
        <ReduxProvider><App /></ReduxProvider>
    </WalletProvider>
    )
}
