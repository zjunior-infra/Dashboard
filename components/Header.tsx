import Image from "next/image";

const Header = ( ) => {
    return (
        <>
            <header className="top-0 z-30 w-full px-1 xs:px-4 bg-white shadow-lg fixed sm:static">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-between gap-2 pt-6 sm:h-20 sm:flex-row sm:pt-0">
                        <Image src={"/logo.png"}  width={36} height={45} alt="logo" />

                        <div className="end flex items-center grow">
                            <div className="div flex flex-wrap items-center justify-end sm:gap-4 grow">
                               
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
      );
}
 
export default Header;
<>
</>