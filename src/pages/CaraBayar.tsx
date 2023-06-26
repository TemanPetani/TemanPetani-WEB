import Layout from '../components/Layout';
import { product as dummyData } from '../json/dummyPembayaran..json';

function CaraBayar() {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="w-full min-h-screen -mt-[67px] xl:-mt-[64px]  px-16 py-8 md:py-16 flex "
      >
        <div className="w-full h-max flex flex-col pt-8">
          <p className="text-2xl uppercase lg:text-4xl font-semibold tracking-wider mb-8 self-start">
            Tata Cara Pembayaran
          </p>
          <div className="p-3 flex flex-col gap-2">
            <p className="text-xl">
              Produk: <span className="font-semibold">{dummyData.name}</span>{' '}
            </p>
            <p className="text-xl">
              Harga: <span className="font-semibold">{dummyData.price}</span>{' '}
            </p>
            <p className="text-xl">
              Quota: <span className="font-semibold">{dummyData.quantity}</span>{' '}
            </p>
            <p className="text-xl">
              Jumlah: <span className="font-semibold">{dummyData.amount}</span>{' '}
            </p>
            <p className="text-xl">
              Bank:{' '}
              <span className="font-semibold uppercase">{dummyData.bank}</span>{' '}
            </p>
            <p className="text-xl">
              VA Number:{' '}
              <span className="font-semibold">{dummyData.vaNumber}</span>{' '}
            </p>
          </div>
          <p className="text-2xl font-semibold tracking-wider my-3 self-start">
            Cara Pembayaran dengan VA Number
          </p>
          <div className="w-full h-max p-5 bg-base-200 rounded-xl text-lg ">
            <ol className="list-decimal list-inside leading-relaxed">
              {dummyData.bank === 'bri' ? (
                <li>
                  Buka laman{' '}
                  <a
                    className="link"
                    href="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bri"
                    target="_blank"
                  >
                    Simulator Midtrans Sandbox BRI Virtual Account
                  </a>{' '}
                  di peramban web Anda.
                </li>
              ) : dummyData.bank === 'bca' ? (
                <li>
                  Buka laman{' '}
                  <a
                    className="link"
                    href="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bca"
                    target="_blank"
                  >
                    Simulator Midtrans Sandbox BCA Virtual Account
                  </a>{' '}
                  di peramban web Anda.
                </li>
              ) : (
                <li>
                  Buka laman{' '}
                  <a
                    className="link"
                    href="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bni"
                    target="_blank"
                  >
                    Simulator Midtrans Sandbox BNI Virtual Account
                  </a>{' '}
                  di peramban web Anda.
                </li>
              )}

              <li>
                Di halaman tersebut, Anda akan melihat kotak teks yang
                bertuliskan "Inquiry".
              </li>
              <li>
                Salin kode Virtual Account (VA) number yang telah diberikan
                sebelumnya dan tempelkan ke dalam kotak teks "Inquiry" di
                simulator.
              </li>
              <li>
                Setelah memasukkan kode VA number, klik tombol "Inquiry" untuk
                mendapatkan informasi tagihan terkait.
              </li>
              <li>
                Anda akan melihat detail tagihan, termasuk jumlah yang harus
                Anda bayar.
              </li>
              <li>
                Pastikan jumlah yang tertera di simulator sesuai dengan jumlah
                yang seharusnya Anda bayarkan.
              </li>
              <li>
                Jika jumlah yang terbayar sesuai, klik tombol "Bayar" untuk
                menyelesaikan transaksi pembayaran di simulator.
              </li>
              <li>
                Setelah mengeklik tombol "Bayar", simulator akan menampilkan
                konfirmasi bahwa pembayaran Anda berhasil dan memberitahu bahwa
                Anda telah membayar melalui simulator.
              </li>
            </ol>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default CaraBayar;
