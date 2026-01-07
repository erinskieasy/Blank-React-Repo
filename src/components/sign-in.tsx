"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await signIn.social({
                provider: "google",
                callbackURL: window.location.origin,
            });
        } catch (error) {
            console.error("Login failed", error);
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-[340px] rounded-[30px] border border-gray-300 bg-white p-8">
            <div className="flex flex-col items-center space-y-6">
                {/* Google Logo */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-9 w-9">
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Google Sign In</h1>
                    <p className="mt-2 text-sm text-gray-500">Continue to Google</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-12 w-full rounded-full bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50 transition-all duration-200"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Next"
                        )}
                    </Button>
                </form>

                {/* Footer Attribution */}
                <div className="w-full flex flex-col items-center gap-4 mt-6">
                    <div className="w-full h-px bg-gray-300" />
                    <p className="text-[12px] text-gray-500 text-center leading-tight">
                        This is a stock implementation of Google Authentication via{" "}
                        <a
                            href="https://better-auth.com"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-gray-600 transition-colors"
                        >
                            Better-Auth
                        </a>{" "}
                        by{" "}
                        <a
                            href="https://www.linkedin.com/in/erinskieasy"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-gray-600 transition-colors"
                        >
                            Erinski Easy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
