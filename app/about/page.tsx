import Image from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            關於 Matt&apos;s AI Lab
          </h1>
          <p className="text-xl text-gray-300">
            我們致力於推動人工智慧技術的創新與應用，為企業提供最優質的 AI 解決方案
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">我們的故事</h2>
            <p className="text-gray-300 leading-relaxed">
              Matt&apos;s AI Lab 成立於 2020 年，由一群熱衷於人工智慧技術的專業人士共同創立。
              我們相信 AI 技術能夠為企業帶來革命性的改變，並致力於將最先進的 AI 技術轉化為實用的商業解決方案。
            </p>
            <p className="text-gray-300 leading-relaxed">
              從創立至今，我們已經成功協助超過 100 家企業實現數位轉型，
              並在 AI 技術應用領域建立了良好的口碑。
            </p>
          </div>
          <div className="relative">
            <Image
              src="https://picsum.photos/600/400?random=6"
              alt="Company Story"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coral-500 rounded-lg -z-10"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">我們的團隊</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg overflow-hidden group">
            <div className="relative">
              <Image
                src="https://picsum.photos/400/500?random=7"
                alt="Team Member 1"
                width={400}
                height={500}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Matt Chen</h3>
              <p className="text-coral-500 mb-4">創辦人 & CEO</p>
              <p className="text-gray-400">
                擁有超過 15 年 AI 領域經驗，曾任職於多家科技巨頭，專注於機器學習與深度學習研究。
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden group">
            <div className="relative">
              <Image
                src="https://picsum.photos/400/500?random=8"
                alt="Team Member 2"
                width={400}
                height={500}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Sarah Lin</h3>
              <p className="text-coral-500 mb-4">技術總監</p>
              <p className="text-gray-400">
                專注於 AI 系統架構設計，帶領團隊開發多個成功的 AI 產品，擁有豐富的專案管理經驗。
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden group">
            <div className="relative">
              <Image
                src="https://picsum.photos/400/500?random=9"
                alt="Team Member 3"
                width={400}
                height={500}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">David Wang</h3>
              <p className="text-coral-500 mb-4">AI 研究主管</p>
              <p className="text-gray-400">
                專注於自然語言處理與電腦視覺研究，發表多篇重要論文，推動 AI 技術的創新發展。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">我們的願景</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">創新驅動</h3>
              <p className="text-gray-400">
                持續探索 AI 技術的前沿，推動產業創新與發展
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">人才培育</h3>
              <p className="text-gray-400">
                培養 AI 領域的專業人才，建立強大的技術團隊
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">全球視野</h3>
              <p className="text-gray-400">
                放眼全球市場，打造具有國際競爭力的 AI 解決方案
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
