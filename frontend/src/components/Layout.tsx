import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <div className="container">
                <main className="mt-4">{children}</main>
            </div>
            <Footer />
        </>);
};

export default Layout;
