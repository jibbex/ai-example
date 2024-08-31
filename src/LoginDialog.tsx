import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "./components/ui/password";
import { Status } from "./lib/status";
import { Loader2 } from "lucide-react";

/**
 * A React component that renders a dialog with a login form.
 * 
 * @returns {JSX.Element} The LoginDialog component.
 */
function LoginDialog(): JSX.Element {
    const usernameRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);
    const [status, setStatus] = React.useState<{ code: Status; error?: Error }>({
        code: Status.READY,
    });

    const isLoading = status.code === Status.LOADING;

    const handleLoginClick = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setStatus(() => ({ code: Status.LOADING }));

        try {
            const res = await fetch(
                new Request("/api/v1/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: usernameRef.current?.value,
                        password: passwordRef.current?.value,
                    }),
                })
            );

            if (res.ok) {
                setStatus(() => ({ code: Status.OK }));
            } else {
                setStatus(() => ({
                    code: Status.FETCHED_FAILED,
                    error: new Error(res.statusText),
                }));
            }
        } catch (error) {
            setStatus(() => ({
                code: Status.FETCHED_FAILED,
                error: error as Error,
            }));
        }
    }, [usernameRef, passwordRef]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="relative z-10 pointer-events-auto text-md md:text-lg xl:text-xl">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-screen">
                <DialogHeader>
                    <DialogTitle className="text-white/80">Login</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Login with your user credentials and manage your vaults.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="username" className="text-right text-white/70">
                                Username
                            </Label>
                            <Input
                                id="username"
                                ref={usernameRef}
                                aria-label="username"
                                autoComplete="username"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="password" className="text-right text-white/70">
                                Password
                            </Label>
                            <Password
                                id="password"
                                ref={passwordRef}
                                className="col-span-3"
                                containerClassName="flex h-10 w-full col-span-3"
                                autoComplete="current-password"
                                type="password"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            type="submit"
                            className="transition-all" 
                            onClick={handleLoginClick} 
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Ok
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default LoginDialog;
