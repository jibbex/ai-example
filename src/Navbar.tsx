import * as React from 'react';
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

const Right = (props: { children: React.ReactNode, className: string}): JSX.Element => (
    <div className={props.className}>
        {props.children}
    </div>
);

function Navbar({ children }: React.PropsWithChildren): JSX.Element  {
    return (
        <nav className="flex w-screen h-[10em] absolute top-0 z-10 pointer-events-none">
            <Left>
                {children}
            </Left>
            <Center />
            <Right className="p-12 text-right">
                <div />
                {/* <LoginDialog /> */}
            </Right>
        </nav>
    );
}

export default Navbar;