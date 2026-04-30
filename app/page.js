"use client";
import { useState } from "react";

export default function Home() {
  const [pesan, setPesan] = useState("");
  const [grupId, setGrupId] = useState("");

  const handlePost = async () => {
     alert("Sistem siap menembak pesan: " + pesan + " ke ID Grup: " + grupId);
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Alat Auto Post Grup</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Masukkan ID Angka Grup Facebook"
          value={grupId}
          onChange={(e) => setGrupId(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        
        <textarea
          placeholder="Tulis status otomatis kamu di sini..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          rows="5"
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', resize: 'vertical' }}
        />
        
        <button
          onClick={handlePost}
          style={{ padding: '14px', backgroundColor: '#1877F2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
        >
          Kirim Postingan Sekarang
        </button>
      </div>
    </main>
  );
}
