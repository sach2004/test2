"use client";

import axios from "axios";
import { useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault(); 
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("/api/signup", {
                email: email,
                password: password
            });
            
            setMessage("User registered successfully!");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An error occurred during registration");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign Up
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {message && (
                        <div className={`p-4 rounded ${message.includes('successfully') 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                            {message}
                        </div>
                    )}
                    
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email address"
                            required
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            required
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}