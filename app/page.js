export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Dashboard Meta Tools</h1>
        <p>Sistem otomatisasi sedang dibangun.</p>
        <br />
        
        {/* Ini adalah tombol saktinya */}
        <a href="/api/auth/signin" style={{ padding: '12px 24px', backgroundColor: '#1877F2', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
          Mulai Login Facebook
        </a>
        
      </div>
    </main>
  )
}
