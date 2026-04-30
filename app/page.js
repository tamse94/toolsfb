"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Selamat Datang, {session.user.name}!</h1>
          <img src={session.user.image} alt="Profil" style={{ borderRadius: '50%', width: '100px' }} />
          <p>Email: {session.user.email}</p>
          <br />
          <button onClick={() => signOut()} style={{ padding: '10px 20px', backgroundColor: '#FF4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Dashboard Meta Tools</h1>
        <p>Sila login untuk mula menggunakan tools.</p>
        <br />
        <button onClick={() => signIn("facebook")} style={{ padding: '12px 24px', backgroundColor: '#1877F2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          Mulai Login Facebook
        </button>
      </div>
    </main>
  );
}
