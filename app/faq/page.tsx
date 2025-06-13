'use client';

import { useState } from 'react';
import styles from './faq.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "如何開始使用我們的服務？",
    answer: "您只需要註冊一個帳號，填寫基本資料後即可開始使用我們的服務。我們提供詳細的新手教學指南，幫助您快速上手。"
  },
  {
    question: "服務費用如何計算？",
    answer: "我們提供多種收費方案，包括月付和年付選項。基本方案每月NT$299起，您可以根據需求選擇適合的方案。詳細價格請參考我們的價格頁面。"
  },
  {
    question: "如何聯繫客服？",
    answer: "您可以通過以下方式聯繫我們的客服團隊：\n1. 線上客服系統（24/7）\n2. 客服專線：0800-XXX-XXX\n3. 電子郵件：support@example.com"
  },
  {
    question: "如何取消訂閱？",
    answer: "您可以在會員中心找到訂閱管理選項，選擇取消訂閱即可。取消後，您仍可使用服務直到當前訂閱期結束。"
  },
  {
    question: "資料安全如何保障？",
    answer: "我們採用最先進的加密技術保護您的資料安全。所有資料傳輸都經過SSL加密，並定期進行安全審計和備份。"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.title}>常見問題</h1>
      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={`${styles.question} ${openIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className={styles.answer}>
                {faq.answer.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
