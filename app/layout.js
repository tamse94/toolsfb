import SessionWrapper from "./components/SessionWrapper";

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="id">
        <body>{children}</body>
      </html>
    </SessionWrapper>
  );
}
