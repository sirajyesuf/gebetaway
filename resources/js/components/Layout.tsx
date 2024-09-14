import AppBar from "./AppBar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <>
            <AppBar />
            {children}
            <Footer />
        </>
    );
}
