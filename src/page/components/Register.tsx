import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"
import { Password } from "@/components/ui/password";
import { Status } from "@/lib/status";
import "./css/Register.css";
/**
 * Props for displaying status messages.
 */
interface StatusMessageProps extends React.PropsWithChildren {
    status: Status; // The current status.
    message?: string; // Optional message to display.
    error?: Error; // Optional error object.
    onClick?: () => void; // Optional onclick handler. Is passed to button.
}

/**
 * A React component for displaying status messages.
 *
 * @param {StatusMessageProps} props - Props containing status, message, and error.
 * @returns {JSX.Element} - A styled card displaying the status information.
 */
function StatusMessage(props: StatusMessageProps): JSX.Element {
    const title =
        props.status === Status.FETCHED_FAILED
            ? "Something went wrong"
            : "Account created";
    
    /**
     * Icon component based on status.
     *
     * @returns {JSX.Element} - SVG icon representing the status.
     */
    const Icon = (): JSX.Element =>
        props.status === Status.FETCHED_FAILED ? (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[96px] h-[96px] color-[var(--destructive-foreground)]"
            >
                <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                />
            </svg>
        ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[96px] h-[96px]"
            >
                <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                />
            </svg>
        );
    return (
        <>
            <CardHeader>
                <CardTitle className="text-white/80">{title}</CardTitle>
                <CardDescription className="text-white/60">
                    {props.error?.message}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <Icon />
                <p>{!!props.message && props.message}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="button" onClick={props.onClick}>
                    Ok
                </Button>
            </CardFooter>
        </>
    );
}

/**
 * When a value was assigned to the hidden input field, certainly
 * no human has the formular filled. The values should be dropped.
 * @param honeypot {React.MutableRefObject<HTMLInputElement | null>} 
 * @returns 
 */
const verify = (honeypot: React.MutableRefObject<HTMLInputElement | null>) =>
    honeypot.current?.value === '';

/**
 * Creates the user registration form and implements its functionality.
 *
 * @returns {JSX.Element} - SVG icon representing the status.
 */
export function Register(): JSX.Element {
    const [status, setStatus] = React.useState<{ code: Status; error?: Error }>({
        code: Status.READY,
    });
    const usernameRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);
    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const honeypotRef  = React.useRef<HTMLInputElement | null>(null);
    /**
     * Handles the registration process when the user clicks the register button.
     *
     * @async
     * @function handleRegisterClick
     * @returns {Promise<void>} - Resolves when the registration process is complete.
     */
    const handleRegisterClick = React.useCallback(async (): Promise<void> => {
        // Set the status to "loading" while processing the registration.
        setStatus(() => ({ code: Status.LOADING }));

        // Verify the honeypot field to prevent spam.
        if (!verify(honeypotRef)) {
            return;
        }

        try {
             // Make a POST request to the user registration API.
            const res = await fetch(
                new Request("/api/v1/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: 0,
                        name: usernameRef.current?.value,
                        email: emailRef.current?.value,
                        password: passwordRef.current?.value,
                    }),
                })
            );

            // Check if the response is successful.
            if (res.ok) {
                setStatus(() => ({ code: Status.OK }));
            } else {
                // Handle the case where registration fails.
                setStatus(() => ({
                    code: Status.FETCHED_FAILED,
                    error: new Error(res.statusText),
                }));
            }
        } catch (error) {
            // Handle any other errors during the registration process.
            setStatus(() => ({
                code: Status.FETCHED_FAILED,
                error: error as Error,
            }));
        }
    }, [usernameRef, passwordRef, emailRef]);

    const isLoading = status.code === Status.LOADING;

    return (
        <Card
            className="max-w-[550px] w-11/12 sm:w-full shadow-2xl"
            data-aos="zoom-out-down"
            data-aos-mirror={true}
        >
            {status.code === Status.READY || isLoading ? (
                <form>
                    <CardHeader>
                        <CardTitle className="text-white/80">Create account</CardTitle>
                        <CardDescription className="text-white/60">
                            Register your account in few steps.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name" className="text-right text-white/70">
                                    Username
                                </Label>
                                <Input
                                    id="name"
                                    autoComplete="username"
                                    ref={usernameRef}
                                    tabIndex={1}
                                    className="col-span-3 transition-all placeholder-white/60 "
                                    placeholder="Choose a username"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="mail" className="text-right text-white/70">
                                    E-Mail
                                </Label>
                                <Input
                                    id="email"
                                    autoComplete="email"
                                    ref={emailRef}
                                    tabIndex={2}
                                    className="col-span-3 transition-all placeholder-white/60 "
                                    placeholder="Your email address"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="password"
                                    className="text-right text-white/70"
                                >
                                    Password
                                </Label>
                                <Password
                                    autoComplete="current-password"
                                    id="password"
                                    ref={passwordRef}
                                    tabIndex={3}
                                    className="col-span-3 transition-all placeholder-white/60 "
                                    type="password"
                                    placeholder="Your password"
                                />
                            </div>
                        </div>
                        <input ref={honeypotRef} type="hidden" name="_usr" value="" />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button 
                            className="transition-all" 
                            onClick={handleRegisterClick} 
                            disabled={isLoading}
                            type="submit"
                            tabIndex={4}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Register
                        </Button>
                    </CardFooter>
                </form>
            ) : (
                <StatusMessage
                    status={status.code}
                    error={status.error}
                    onClick={() => setStatus(status => ({ ...status, code: Status.READY }))}
                    message={
                        Status.FETCHED_FAILED === status.code
                            ? "Couldn`t create user account."
                            : ""
                    }
                />
            )}
        </Card>
    );
}
