import { MessageCircle, Facebook, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section className="py-20 bg-red-50">
      <div className="container-wim">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">
            Hubungi Kami
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-700 text-gray-900 mt-2 mb-4">
            Ada Pertanyaan? Kami Siap Membantu
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Punya pertanyaan soal produk, pengiriman, atau pesanan? Hubungi kami langsung via WhatsApp atau ikuti komunitas kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
              <a href="https://wa.me/16264614963?text=Hi%2C%20Warung%20IndoMI.%20Saya%20mau%20order%20dan%20bertanya" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat via WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50">
              <a href="https://www.facebook.com/levi.chen.11503/reels/" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 mr-2" />
                Ikuti kami di Facebook
              </a>
            </Button>
          </div>

          <p className="text-sm text-gray-400 mb-2">WhatsApp</p>
          <p className="font-display font-600 text-gray-900 text-xl">+1 (626) 461-4963</p>

          {/* Community note */}
          <div className="mt-10 bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4 text-left">
            <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-display font-600 text-gray-900 mb-1">Komunitas Indonesia di USA</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Bergabunglah dengan ratusan anggota komunitas Indonesia yang sudah belanja di Warung Indo Michigan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
