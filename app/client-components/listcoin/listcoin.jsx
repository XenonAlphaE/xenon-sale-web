import { useState, useEffect } from "react";
import { useAuth } from "../../../redux/utils/authUtils";
import axios from "axios";
import { useListCoin } from "../../../redux/utils/coinUtils";

export const ListCoin = () => {
    
    const{coins} = useListCoin()
    return (
        <div>
            <h2>Your Coins</h2>
            {coins.length === 0 ? (
                <p>No tokens found.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) => (
                            <tr key={coin?.id}>
                                <td>{coin?.id}</td>
                                <td>{coin?.name}</td>
                                <td>{coin?.symbol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
