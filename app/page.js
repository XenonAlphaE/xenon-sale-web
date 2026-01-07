import App from './client-components/app/App'
import { GlobalConfigProvider } from './globalConfig-provider';
import { ReduxProvider } from './redux-provider';

import { WalletProvider } from './wallet-provider'
import { SolanaProvider } from './client-components/solana-ui/SolanaProvider';

export default async function Page() {
    return (
        <GlobalConfigProvider>
            <WalletProvider>
                <SolanaProvider>
                    <ReduxProvider><App /></ReduxProvider>
                </SolanaProvider>
            </WalletProvider>
        </GlobalConfigProvider>
    )
}
