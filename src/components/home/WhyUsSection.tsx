import { ShieldCheck, Tag, Truck, CreditCard, RefreshCw, Smartphone } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Produk Original',
    desc:  'Semua produk asli Indonesia, bukan KW. Langsung dari brand yang kamu kenal dan percaya.',
  },
  {
    icon: Tag,
    title: 'Harga Terjangkau',
    desc:  'Harga bersaing dengan kualitas terjamin. Hemat lebih banyak dengan belanja lengkap sekaligus.',
  },
  {
    icon: Truck,
    title: 'Kirim ke Seluruh USA',
    desc:  'Pengiriman via USPS dan UPS ke seluruh Amerika Serikat. Estimasi ongkir langsung di halaman checkout.',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Aman',
    desc:  'Transaksi diamankan oleh Stripe. Kartu kredit, debit, dan metode pembayaran lainnya diterima.',
  },
  {
    icon: RefreshCw,
    title: 'Stok Selalu Update',
    desc:  'Produk diupdate secara berkala. Kalau stok habis, kamu langsung tahu.',
  },
  {
    icon: Smartphone,
    title: 'Mudah & Praktis',
    desc:  'Belanja dari rumah, kantor, atau mana saja. Checkout cepat dalam beberapa langkah.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-wim">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">
            Kenapa Warung Indo Michigan?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-700 text-gray-900 mt-2">
            Belanja Produk Indonesia Tanpa Ribet
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-red-200 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Icon className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-display font-600 text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
