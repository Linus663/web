'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { wordAiCollection } from '../../services/firebase';
import { addDoc, getDocs, query, orderBy } from 'firebase/firestore';

interface WordResponse {
  words: string[];
  meanings: string[];
  topic: string;
  language: string;
  timestamp: number;
  examples?: { [key: string]: { sentence: string; translation: string } };
}

const AILagPage = () => {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('english');
  const [wordDataList, setWordDataList] = useState<WordResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingExamples, setLoadingExamples] = useState<{ [key: string]: boolean }>({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState<{ [key: string]: boolean }>({});

  // Load data from Firestore when component mounts
  useEffect(() => {
    const loadWordCards = async () => {
      try {
        const q = query(wordAiCollection, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const loadedData: WordResponse[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Ensure all required fields are present
          if (data.words && data.meanings && data.topic && data.language && data.timestamp) {
            loadedData.push({
              words: data.words,
              meanings: data.meanings,
              topic: data.topic,
              language: data.language,
              timestamp: data.timestamp,
              examples: data.examples || {}
            });
          }
        });
        
        setWordDataList(loadedData);
      } catch (error) {
        console.error('Error loading word cards:', error);
        alert('載入單字卡時發生錯誤');
      }
    };

    loadWordCards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/word-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, language }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (!data.words || !data.meanings) {
        throw new Error('Invalid response data');
      }

      const newWordData: WordResponse = {
        words: data.words,
        meanings: data.meanings,
        topic,
        language,
        timestamp: Date.now(),
        examples: {}
      };

      // Save to Firestore
      try {
        await addDoc(wordAiCollection, newWordData);
        setWordDataList(prev => [newWordData, ...prev]);
        setTopic('');
      } catch (error) {
        console.error('Error saving to Firestore:', error);
        alert('儲存單字卡時發生錯誤');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('生成單字時發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateExample = async (word: string, meaning: string, language: string, groupIndex: number, wordIndex: number) => {
    const key = `${groupIndex}-${wordIndex}`;
    setLoadingExamples(prev => ({ ...prev, [key]: true }));

    try {
      const response = await fetch('/api/sentence-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, meaning, language }),
      });

      const data = await response.json();
      
      setWordDataList(prev => {
        const newList = [...prev];
        if (!newList[groupIndex].examples) {
          newList[groupIndex].examples = {};
        }
        newList[groupIndex].examples![word] = data;
        return newList;
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingExamples(prev => ({ ...prev, [key]: false }));
    }
  };

  const handlePlayAudio = async (sentence: string, language: string, key: string) => {
    setAudioLoading(prev => ({ ...prev, [key]: true }));
    try {
      const response = await fetch('/api/tts-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: sentence, language }),
      });

      const data = await response.json();
      
      if (data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audio.onended = () => setPlayingAudio(null);
        setPlayingAudio(key);
        audio.play();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setAudioLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const getLanguageName = (lang: string) => {
    const languages: { [key: string]: string } = {
      english: '英文',
      japanese: '日文',
      german: '德語',
      spanish: '西班牙語'
    };
    return languages[lang] || lang;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI 單字聯想
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            透過人工智慧，探索相關單字的無限可能
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                主題名稱
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="請輸入主題名稱"
                required
              />
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                選擇語言
              </label>
              <select
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="english">英文</option>
                <option value="japanese">日文</option>
                <option value="german">德語</option>
                <option value="spanish">西班牙語</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isLoading ? '生成中...' : 'AI聯想相關單字'}
              </button>
            </div>
          </form>

          <div className="mt-8 space-y-8">
            {wordDataList.map((wordData, groupIndex) => (
              <div key={wordData.timestamp} className="bg-blue-50/50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  主題：{wordData.topic} | 語言：{getLanguageName(wordData.language)}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {wordData.words.map((word, index) => (
                    <div key={`${groupIndex}-${index}`} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-indigo-600">{word}</span>
                        <span className="text-gray-500">-</span>
                        <span className="text-gray-700">{wordData.meanings[index]}</span>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() => handleGenerateExample(word, wordData.meanings[index], wordData.language, groupIndex, index)}
                          disabled={loadingExamples[`${groupIndex}-${index}`]}
                          className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline"
                        >
                          {loadingExamples[`${groupIndex}-${index}`] ? '生成中...' : '生成例句'}
                        </button>
                        {wordData.examples?.[word] && (
                          <div className="mt-2 text-sm space-y-2">
                            <div className="bg-indigo-50 p-3 rounded-lg flex justify-between items-center">
                              <p className="text-gray-700 font-medium">{wordData.examples[word].sentence}</p>
                              <button
                                onClick={() => {
                                  const example = wordData.examples?.[word];
                                  if (example) {
                                    handlePlayAudio(
                                      example.sentence,
                                      wordData.language,
                                      `${groupIndex}-${index}`
                                    );
                                  }
                                }}
                                disabled={audioLoading[`${groupIndex}-${index}`]}
                                className={`ml-2 p-2 text-indigo-600 hover:text-indigo-800 focus:outline-none ${
                                  playingAudio === `${groupIndex}-${index}` ? 'text-indigo-800' : ''
                                }`}
                              >
                                {audioLoading[`${groupIndex}-${index}`] ? (
                                  <FontAwesomeIcon icon={faSpinner} spin />
                                ) : (
                                  <FontAwesomeIcon 
                                    icon={faPlay} 
                                    className={playingAudio === `${groupIndex}-${index}` ? 'animate-pulse' : ''}
                                  />
                                )}
                              </button>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-gray-500">{wordData.examples[word].translation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AILagPage;
