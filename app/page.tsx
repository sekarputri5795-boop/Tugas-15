import Herosection from "./component/Herosection";
import Navbar from "./component/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Herosection />
      <section>
        <h2>Update Terbaru</h2>
        <p>Halaman ini sudah diperbarui dan di-deploy ke Vercel.</p>
      </section>
    </main>
  );
}