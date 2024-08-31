import * as React from "react";

import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";

export interface PasswordProps extends InputProps {
    containerClassName?: string;
}

interface EyeIconProps extends React.HTMLProps<HTMLOrSVGElement> {
    active: boolean;
}

const twEyeIcoClasses = "absolute transition-all opacity-0 scale-0 data-[active=true]:scale-100 duration-400 data-[active=true]:opacity-100";
const EyeIcon = ({ active }: EyeIconProps) => 
    <div className="relative w-6 h-6">
        <svg xmlns="http://www.w3.org/2000/svg" data-active={active} viewBox="0 0 24 24" fill="currentColor" className={twEyeIcoClasses}>
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
        </svg>
            <svg xmlns="http://www.w3.org/2000/svg" data-active={!active} viewBox="0 0 24 24" fill="currentColor" className={twEyeIcoClasses}>
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
        </svg>
    </div>;
          

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
    ({ className, containerClassName, ...props }, ref) => {
        const [displayPw, setDisplayPw] = React.useState(true);
        const passRef = React.createRef<HTMLInputElement>();
        const pwRef = ref as React.RefObject<HTMLInputElement> ?? passRef;
        const btnRef = React.useRef<HTMLButtonElement>({} as HTMLButtonElement);
        const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            pwRef.current?.focus();
            // Ensures that the input element has focus on chromium based browser. 
            setTimeout(() => {
                if (pwRef.current) {
                    const buffer = pwRef.current.value;
                    pwRef.current.value = '';
                    pwRef.current.value = buffer;
                    pwRef.current.type = displayPw ? 'text' : 'password';
                    btnRef.current.ariaLabel = displayPw ? 'hide password' : 'show password';
                    setDisplayPw(!displayPw);
                }
            });
        };

        return (
            <div className={cn("relative", containerClassName)}>
                <Input 
                    className={cn(
                        "pr-10",
                        className
                    )}
                    aria-label="password"
                    type='text'
                    ref={pwRef}
                    { ...props }
                /> 
                <button 
                    ref={btnRef}
                    type="button"
                    aria-label="show password" 
                    onClick={handleClick}
                    className="size-8 absolute right-1 top-1" 
                >
                    <EyeIcon active={displayPw} />
                </button>
                {displayPw}
            </div>
        );
    }
);

Password.displayName = 'Password';

export { Password };
