export default async function RootLayout({ children, params }) {
    const lang = (await params).lang

    return (
      <div>
        <input type="hidden" value={lang} id="current-lang" />
        {children}
      </div>
    );
  }
  