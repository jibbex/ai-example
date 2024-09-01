import * as React from 'react';
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
// import LoginDialog from "./LoginDialog";


const Left = ({ children }: React.PropsWithChildren): JSX.Element => (
    <div className="flex-1">
        {children}
    </div>
);

const Center = ({ children }: React.PropsWithChildren): JSX.Element => (
    <div className="flex-2">
        {children}
    </div>
);

const Right = (props: { children: React.ReactNode, className: string }): JSX.Element => (
    <div className={props.className}>
        {props.children}
    </div>
);

function Navbar({ children }: React.PropsWithChildren): JSX.Element {
    return (
        <nav className="flex w-screen m-0 top-20 max-h-[120px] h-auto absolute z-[2000]">
            <Left>
                {children}
            </Left>
            <Center />
            <Right className="p-12 text-right">
                <Button size="icon" variant="secondary" className="border-white/[0.4] border-2 focus:bg-slate-400 focus:text-black hover:bg-slate-600 focus:ring-2 ring-yellow-200 text-black hover:shadow-sm shadow-xl shadow-indigo- bg-slate-500 hover:text-indigo-400 hover:backdrop-blur-lg">
                    <DotsVerticalIcon className="h-4 w-4" />
                </Button>
            </Right>
        </nav>
    );
}

export default Navbar;