'use client'
import Header from "./Header";
import { useTheme } from 'next-themes'


interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ( {children} : LayoutProps ) => {

    const {theme, setTheme} = useTheme()
    return (
        <div className=" bg-dark_bg">
            
            <Header />
            <main>{children}</main>

        </div>
      );
}
 
export default Layout;
<>
</>