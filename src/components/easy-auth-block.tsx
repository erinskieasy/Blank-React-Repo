"use client"

import { Link } from "@tanstack/react-router"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { LogOut } from "lucide-react"

export function EasyAuthBlock() {
    const { data: session } = useSession()

    return (
        <header className="absolute top-0 right-0 p-4 flex items-center gap-4 z-50">
            <div className="flex items-center gap-4 bg-background/90 backdrop-blur-sm p-2 rounded-full border border-border shadow-sm">
                {session && (
                    <div className="hidden flex-col items-end md:flex px-2">
                        <span className="text-sm font-medium leading-none text-foreground">{session.user.name}</span>
                        <span className="text-xs text-muted-foreground">{session.user.email}</span>
                    </div>
                )}

                {session ? (
                    <>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                            <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={async () => {
                                await signOut()
                            }}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="sr-only">Sign Out</span>
                        </Button>
                    </>
                ) : (
                    <Button asChild variant="secondary" size="sm" className="rounded-full px-4">
                        <Link to="/sign-in">Sign In</Link>
                    </Button>
                )}
            </div>
        </header>
    )
}
