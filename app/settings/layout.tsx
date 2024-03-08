import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>hi </h1>
      <Link href={'/settings/profile'}>Профиль и видимость</Link>
      <br />
      <Link href={'/settings/security'}>Безопасность</Link>
      <br />
      <Link href={'/settings/email'}>Электронная почта</Link>
      {children}
    </>
  );
}
