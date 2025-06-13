'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Matt&apos;s AI Lab";
  
  // 輪播狀態
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 精選作品數據
  const portfolioItems = [
    {
      id: 1,
      image: "https://picsum.photos/600/400?random=4",
      title: "智慧零售系統",
      description: "整合 AI 的零售解決方案"
    },
    {
      id: 2,
      image: "https://picsum.photos/600/400?random=5",
      title: "預測分析平台",
      description: "企業級數據分析系統"
    },
    {
      id: 3,
      image: "https://picsum.photos/600/400?random=6",
      title: "智慧客服機器人",
      description: "24/7 自動化客戶服務"
    },
    {
      id: 4,
      image: "https://picsum.photos/600/400?random=7",
      title: "圖像識別系統",
      description: "高精度視覺AI解決方案"
    }
  ];
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);
  
  // 自動輪播
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
    }, 4000); // 每4秒切換
    
    return () => clearInterval(slideTimer);
  }, [portfolioItems.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative">
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          探索人工智慧的無限可能，打造智慧未來
        </p>
      </header>

      {/* Section 1: Services */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">我們的服務</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,127,80,0.2)] group">
            <div className="overflow-hidden rounded-lg mb-4">
              <Image 
                src="https://picsum.photos/400/300?random=1" 
                alt="AI Development" 
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 transition-colors duration-300 group-hover:text-coral-500">AI 開發</h3>
            <p className="text-gray-400">客製化 AI 解決方案，為您的業務注入智慧動力</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,127,80,0.2)] group">
            <div className="overflow-hidden rounded-lg mb-4">
              <Image 
                src="https://picsum.photos/400/300?random=2" 
                alt="Machine Learning" 
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 transition-colors duration-300 group-hover:text-coral-500">機器學習</h3>
            <p className="text-gray-400">數據分析與預測模型，發掘數據中的價值</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,127,80,0.2)] group">
            <div className="overflow-hidden rounded-lg mb-4">
              <Image 
                src="https://picsum.photos/400/300?random=3" 
                alt="AI Consulting" 
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 transition-colors duration-300 group-hover:text-coral-500">AI 顧問</h3>
            <p className="text-gray-400">專業的 AI 策略規劃，協助企業數位轉型</p>
          </div>
        </div>
      </section>

      {/* Section 2: Portfolio */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">精選作品</h2>
        
        {/* 輪播容器 */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {portfolioItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 relative group">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-3xl font-bold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-200 text-lg">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 導航按鈕 */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* 指示器 */}
          <div className="flex justify-center mt-6 space-x-2">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-coral-500 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Contact Information */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">聯絡我們</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">電子郵件</h3>
                <p className="text-gray-400">contact@mattailab.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">電話</h3>
                <p className="text-gray-400">+886 2 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">地址</h3>
                <p className="text-gray-400">台北市信義區信義路五段7號</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">姓名</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-coral-500 focus:outline-none"
                  placeholder="請輸入您的姓名"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">電子郵件</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-coral-500 focus:outline-none"
                  placeholder="請輸入您的電子郵件"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">訊息</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-coral-500 focus:outline-none"
                  placeholder="請輸入您的訊息"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-coral-500 text-white py-3 px-6 rounded-lg hover:bg-coral-600 transition-colors duration-300"
              >
                送出訊息
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Matt&apos;s AI Lab</h3>
              <p className="text-gray-400">致力於推動人工智慧技術的創新與應用，為企業提供最優質的 AI 解決方案。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">快速連結</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">首頁</a></li>
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">服務</a></li>
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">作品集</a></li>
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">聯絡我們</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">服務項目</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">AI 開發</a></li>
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">機器學習</a></li>
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">AI 顧問</a></li>
                <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">技術支援</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">社群媒體</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Matt&apos;s AI Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
