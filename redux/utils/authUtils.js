import { useDispatch, useSelector } from 'react-redux';
import { loginUser, getNonce } from '../thunks/authThunks';


export const useAuth = (walletEth) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isLoading = useSelector((state) => state.auth.isLoading);

   // 🔹 New function: Get nonce & login in one step
   const loginWithWallet = async () => {
    if (!walletEth?.currentAddress) {
        await walletEth?.connect();
        return;
    }

    try {
        // ✅ Step 1: Fetch nonce directly (no Redux needed)
        const response = await getNonce(walletEth.currentAddress)

        if (!response.data?.nonce) throw new Error("Nonce not received");

        // ✅ Step 2: Sign nonce
        const signedMessage = await walletEth.signNonce(response.data.nonce);
        if (!signedMessage) throw new Error("Signing failed");

        // ✅ Step 3: Login with signed message
        dispatch(loginUser(signedMessage, walletEth.currentAddress));
    } catch (error) {
        console.error("Login failed:", error.message);
    }
};

    return { user, isLoading, loginWithWallet};
};
