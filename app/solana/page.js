import { SolanaProvider } from "../solana-ui/SolanaProvider"
import CustomWalletButton from "../solana-ui/WalletMultiButton/WalletMultiButton"

   
export default async function Page({ params }) {
    const lang = (await params).lang
    return (<SolanaProvider><CustomWalletButton/></SolanaProvider>)
}
