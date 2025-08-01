// import localFont from 'next/font/local'
// import { PrismicPreview } from "@prismicio/next";
// import { repositoryName } from "@/prismicio";
// import "./app.css"
// import Header from '@/components/Header';
// import ViewCanvas from '@/components/ViewCanvas';


// const alpino = localFont({
//   src: '../../public/fonts/Alpino-Variable.woff2',
//   display :'swap',
//   weight :"100 900",
//   variable :"--font-alpino"
// })
 

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={alpino.variable}>
//       <body className='overflow-x-hidden bg-yellow-300'>
//        <Header/>
//        <main>

//         {children}
// <ViewCanvas/>
//        </main>
//         </body>
//       <PrismicPreview repositoryName={repositoryName} />
//     </html>
//   );
// }



import localFont from 'next/font/local'
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./app.css"
import Header from '@/components/Header';
import ViewCanvas from '@/components/ViewCanvas';
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from '@/context/AppContext'; // ✅ import your context

const alpino = localFont({
  src: '../../public/fonts/Alpino-Variable.woff2',
  display: 'swap',
  weight: "100 900",
  variable: "--font-alpino"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppContextProvider> {/* ✅ wrap context here */}
        <html lang="en" className={alpino.variable}>
          <body className='overflow-x-hidden bg-yellow-300'>
            <Header />
            <main>
              {children}
              <ViewCanvas />
            </main>
          </body>
          <PrismicPreview repositoryName={repositoryName} />
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
