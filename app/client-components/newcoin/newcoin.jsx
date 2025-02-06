import { useState } from "react";

export const NewCoinForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        symbol:"",
        description:"",
        email: "",
    });
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file)); // Show preview
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.symbol) {
            setMessage("Name and symbol are required!");
            return;
        }

        const form = new FormData();
        form.append("name", formData.name);
        form.append("symbol", formData.symbol);
        if (avatar) form.append("avatar", avatar);

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/tokens", {
                method: "POST",
                body: form,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Something went wrong!");

            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{paddingTop:140}}>
            <h2 className="text-xl font-bold mb-4">NEW TOKEN</h2>
            {message && <p className="mb-3 text-red-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label className="block font-semibold">Symbol</label>
                    <input
                        type="text"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Avatar Upload */}
                <div>
                    <label className="block font-semibold">Avatar</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="mt-2 w-24 h-24 rounded-full object-cover"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

