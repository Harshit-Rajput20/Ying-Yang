"use client";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export default function PreOrderButton() {
    const { userId, isSignedIn } = useAuth();
    const [loading, setLoading] = useState(false);

    const handlePreOrder = async () => {
        if (!isSignedIn) {
            alert("Please sign in first.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/preorder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            });

            const data = await res.json();
            if (data.success) {
                alert("Pre-order placed for ₹99. Remaining will be due at launch.");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handlePreOrder}
            disabled={loading}
            className="bg-sky-950 hover:bg-sky-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
        >
            {loading ? "Processing..." : "Pre-order for ₹99"}
        </button>
    );
}
