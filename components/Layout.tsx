import Header from "./Header";
import { useTheme } from 'next-themes'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ( {children} : LayoutProps ) => {

    const {theme, setTheme} = useTheme()

    console.log(theme)
    return (
        <div className=" bg-dark_bg dark:bg-black">
            
            <Header />
            <main>{children}</main>

        </div>
      );
}
 
export default Layout;
<>
</>