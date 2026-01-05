"use client"

import { Link } from "@tanstack/react-router"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Loader2, LogOut } from "lucide-react"

export function EasyAuthBlock() {
    const { data: session, isPending } = useSession()

    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!session) {
        return (
            <Button asChild variant="default" size="sm">
                <Link to="/sign-in">Sign In</Link>
            </Button>
        )
    }

    return (
        <div className="flex items-center gap-4">
            <div className="hidden flex-col items-end md:flex">
                <span className="text-sm font-medium leading-none">{session.user.name}</span>
                <span className="text-xs text-muted-foreground">{session.user.email}</span>
            </div>

            <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                    await signOut()
                }}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
        </div>
    )
}
