import { SolanaProvider } from "../solana-ui/SolanaProvider"
import { WalletButton } from "../solana-ui/WalletMultiButton"

   
export default async function Page({ params }) {
    const lang = (await params).lang
    return (<SolanaProvider><WalletButton/></SolanaProvider>)
}
