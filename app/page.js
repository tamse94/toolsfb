"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [pesan, setPesan] = useState("");
  const [grupId, setGrupId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!pesan || !grupId) {
      alert("Isi pesan dan ID Grup dulu!");
      return;
    }

    setLoading(true);
    try {
      // Menggunakan Facebook Graph API untuk post ke feed grup
      const response = await fetch(`https://graph.facebook.com/v19.0/${grupId}/feed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: pesan,
          access_token: session.accessToken, // Otomatis pakai token hasil login
        }),
      });

      const data = await response.json();

      if (data.id) {
        alert("BERHASIL! Postingan terkirim. ID Post: " + data.id);
        setPesan(""); // Kosongkan form setelah sukses
      } else {
        alert("GAGAL: " + data.error.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
    }
    setLoading(false);
  };

  // Tampilan Jika Belum Login
  if (!session) {
    return (
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5' }}>
        <div style={{ textAlign: 'center', padding: '30px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h1 style={{ color: '#1877F2' }}>Meta Tools</h1>
          <p>Sila login untuk menggunakan Auto Post Grup.</p>
          <button 
            onClick={() => signIn("facebook")} 
            style={{ padding: '12px 24px', backgroundColor: '#1877F2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}
          >
            Login dengan Facebook
          </button>
        </div>
      </main>
    );
  }

  // Tampilan Utama Tools Jika Sudah Login
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <span>Halo, <strong>{session.user.name}</strong></span>
        <button onClick={() => signOut()} style={{ backgroundColor: '#ccc', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Auto Post Grup</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <label>ID Grup Facebook:</label>
          <input
            type="text"
            placeholder="Contoh: 169089576176057"
            value={grupId}
            onChange={(e) => setGrupId(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
          />
          
          <label>Isi Postingan:</label>
          <textarea
            placeholder="Tulis apa yang ingin kamu posting secara otomatis..."
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            rows="5"
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', resize: 'none' }}
          />
          
          <button
            onClick={handlePost}
            disabled={loading}
            style={{ 
              padding: '14px', 
              backgroundColor: loading ? '#ccc' : '#1877F2', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '16px', 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? "Sedang Mengirim..." : "Kirim Sekarang"}
          </button>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#777', textAlign: 'center', marginTop: '20px' }}>
        Pastikan akun kamu sudah bergabung di grup tersebut dan aplikasi sudah diberi izin di pengaturan grup.
      </p>
    </main>
  );
}
