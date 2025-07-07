import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
  FaGlobe
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#37CAD2] to-[#91CBE3] text-white pt-14 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Kontak */}
        <div className="bg-white/95 text-[#34BBD1] p-4 rounded-xl shadow-md space-y-4 text-sm w-full md:w-[230px]">
          <div className="flex items-start gap-3">
            <FaPhoneAlt className="text-xl mt-1" />
            <div>
              <h4 className="font-bold text-base">Kontak</h4>
              <p>(0765) 53939</p>
              <p>(0765) 554224</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-xl mt-1" />
            <div>
              <h4 className="font-bold text-base">Email</h4>
              <p>pmb@pcr.ac.id</p>
              <p>pcr@pcr.ac.id</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-xl mt-1" />
            <div>
              <h4 className="font-bold text-base">Alamat</h4>
              <p>Jl. Umbansari No.1 Rumbai</p>
              <p>Pekanbaru – Riau 28265</p>
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div>
          <h3 className="text-lg font-bold mb-3">Sistem</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:underline">Beranda</Link></li>
            <li><Link to="/about" className="hover:underline">Tentang</Link></li>
            <li><Link to="/artikel" className="hover:underline">Artikel</Link></li>
            <li><Link to="/layanan" className="hover:underline">Layanan</Link></li>
            <li><Link to="/pengaduan" className="hover:underline">Pengaduan</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Media Sosial */}
        <div>
          <h3 className="text-lg font-bold mb-3">Media Sosial</h3>
          <p className="mb-3 text-sm">Tetap terhubung dengan kami:</p>
          <div className="flex space-x-3 text-xl">
            <a href="https://instagram.com/politeknikcaltexriau" target="_blank" rel="noreferrer" className="hover:scale-110 transition"><FaInstagram /></a>
            <a href="https://youtube.com/PoliteknikCaltexRiauOfficial" target="_blank" rel="noreferrer" className="hover:scale-110 transition"><FaYoutube /></a>
            <a href="https://twitter.com/infopcr" target="_blank" rel="noreferrer" className="hover:scale-110 transition"><FaTwitter /></a>
            <a href="https://facebook.com/Politeknik.Caltex.Riau" target="_blank" rel="noreferrer" className="hover:scale-110 transition"><FaFacebookF /></a>
            <a href="https://pcr.ac.id" target="_blank" rel="noreferrer" className="hover:scale-110 transition"><FaGlobe /></a>
          </div>
        </div>

        {/* Google Maps dibungkus kotak */}
        <div className="bg-white/95 p-2 rounded-xl shadow-md flex items-center justify-center">
          <iframe
            title="Lokasi PCR"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7979.240418812393!2d101.426097!3d0.570975!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ab67086f2e89%3A0x65a24264fec306bb!2sPoliteknik%20Caltex%20Riau!5e0!3m2!1sid!2sid!4v1750930204291!5m2!1sid!2sid"
            width="100%"
            height="200"
            className="rounded-md w-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="mt-8 text-center text-sm text-white/80 border-t border-white/30 pt-6">
        © {new Date().getFullYear()} Politeknik Caltex Riau. All rights reserved.
      </div>
    </footer>
  );
}
