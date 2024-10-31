
// app/[lang]/layout.js
export default async function RootLayout({ children }) {
    
    return (
    <html>  
        <body>{children}</body>
    </html>    
    );
  }
  