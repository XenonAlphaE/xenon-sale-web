import SolanaApp from "../client-components/app/SolanaApp"
import { ReduxProvider } from "../redux-provider"
import { SolanaProvider } from "../client-components/solana-ui/SolanaProvider"
import CustomWalletButton from "../client-components/solana-ui/WalletMultiButton/WalletMultiButton"
import { GlobalConfigProvider } from "../globalConfig-provider"


export default async function Page({ params }) {
    const lang = (await params).lang
    return (
        <GlobalConfigProvider>
            <SolanaProvider>
                <ReduxProvider>
                    <SolanaApp />
                </ReduxProvider>
            </SolanaProvider>
        </GlobalConfigProvider>
    )
}
