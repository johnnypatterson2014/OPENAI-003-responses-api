
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import "@/styles/SideNavToggle.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <SideNav />
            <div className='static'>
                <Header />
                <div className='relative mt-[10px]'>
                    {children}
                </div>

            </div>

        </>
    );
}

