"use client";
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Menu, Popover } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function CurrentPairView({params}) {
    const [utterance, setUtterance] = useState(typeof window !== 'undefined' && 'speechSynthesis' in window ? new window.SpeechSynthesisUtterance() : null);

    const [analysisData, setAnalysisData] = useState({'confidence': 0.50, 'grammar': 0.70, 'clarity': 0.50, 'passion': 0.80, 'vocabulary': 0.80});
    const [textAnalysis, setTextAnalysis] = useState("Pros:  - You demonstrated relevant skills in Python, Java, and SQL through your experience in developing a threat detection system using machine learning algorithms. - Your ability to lead technical initiatives is evident in your role in leading the development of the project. - You managed to overcome challenges relating to refining the model and integrating it into existing systems, which is a valuable demonstration of your problem-solving skills. - Your project resulted in a high level of accuracy, highlighting your technical expertise and effective collaboration with your team.  Cons:  - While you mentioned the importance of refining the model to reduce false positives, you could have elaborated on the steps you took to improve the model's accuracy.");
    const [recommendation, setRecommendation] = useState("Advice: When answering questions about your projects, it's important to provide clear details about the challenges you faced and how you overcame them. Additionally, focusing on the results and outcomes of your work can help highlight your contributions and the impact of your efforts. Remember to speak confidently and clearly throughout your answer to help convey your skills and experiences effectively.   ");
    const router = useRouter();
    const apiUrl = '';
    const criteria = {
      labels: ['Confidence', 'Grammar', 'Clarity', 'Passion', 'Vocabulary'],
      datasets: [
        {
            label: 'Criteria',
            data: [
              analysisData['confidence'] * 100 || 0,
              analysisData['grammar'] * 100 || 0,
              analysisData['clarity'] * 100 || 0,
              analysisData['passion'] * 100 || 0,
              analysisData['vocabulary'] * 100 || 0
            ],
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }
      ]
    }

    const options = {
      scale: {
        ticks: {beginAtZero: true}
      }
    }


    useEffect(() => {
      utterance.text = textAnalysis+recommendation;
      speechSynthesis.speak(utterance);
    }, [textAnalysis,recommendation]);

    return (
        <>
            <div className="min-h-full bg-gray-50">
                <Popover as="header" className="bg-[#0b9541] pb-24">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                                    {/* Logo */}
                                    <div className="absolute left-0 flex-shrink-0 lg:static flex">
                                        <button
                                            className="flex gap-2"
                                            onClick={() => {
                                                router.push("/dashboard");
                                            }}
                                        >
                                            <div className="text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24" className="inline pb-1">
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M20 11H7.414l2.293-2.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L7.414 13H20a1 1 0 0 0 0-2z"/>
                                            </svg>

                                            Back</div>
                                        </button>
                                    </div>

                                    {/* Right section on desktop */}
                                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-14 w-14 rounded-full" alt="" src="/profile.png"/>
                                                </Menu.Button>
                                            </div>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                                    <div className="grid grid-cols-3 items-center gap-8">
                                        <div className="col-span-2">
                                            <nav className="flex space-x-4"></nav>
                                        </div>
                                        <div>
                                            <div className="mx-auto w-full max-w-md"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Popover>

                <main className="-mt-24 pb-8">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="sr-only">Page title</h1>
                        {/* Main 3 column grid */}
                        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                            {/* Left column */}
                            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                                <section aria-labelledby="section-1-title">
                                    <div className="overflow-hidden rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            <div className="relative h-[75vh] w-full text-black overflow-scroll no-scrollbar">
                                                <div className="sticky top-0 border-b-2 border-gray-100 bg-white px-2 py-3 sm:px-6">
                                                    <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                                        <div className="ml-4 mt-4">
                                                            {textAnalysis ? (
                                                                <h1 className="text-lg font-medium leading-6 text-gray-900">
                                                                    Analysis 
                                                                </h1>
                                                                
                                                            ) : (
                                                                <div className="bg-gray-200 w-[80%] animate-pulse h-[5vh] rounded-2xl">
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                              {/* General info card */}
                                              {textAnalysis ? (
                                                <div className="mt-4 space-y-4">
                                                  <div className="flex justify-between">
                                                      <p className="text-left"><span className="font-bold">Feedback</span></p>
                                                      <p className="text-right">{textAnalysis}</p>
                                                  </div>
                                                  <hr className="my-4 border-t border-gray-300" />
                                                  <div className="flex justify-between">
                                                      <p className="text-left"><span className="font-bold">Recommendation</span></p>
                                                      <p className="text-right">{recommendation}%</p>
                                                  </div>
                                                </div>
                                              ) : (
                                                  <div className="bg-gray-200 w-[80%] animate-pulse h-[5vh] rounded-2xl"></div>
                                              )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right column */}
                            <div className="grid grid-cols-1 gap-4">
                              <section aria-labelledby="section-2-title">
                                  <div className="overflow-hidden rounded-lg bg-white shadow">
                                      <div className="p-6">
                                          <div className="ml-4 mt-4">
                                              <h1 className="text-lg font-medium leading-6 text-gray-900">
                                                  Statistics
                                              </h1>
                                          </div>
                                          <hr className="my-2 border-t border-gray-300" />
                                          <div className="h-[85vh] overflow-scroll no-scrollbar">
                                              {/* Bar graph */}
                                              {/* <Bar data={barChartData} height={300} /> */}
                                              <Radar data={criteria} options={options} />
                                          </div>
                                      </div>
                                  </div>
                              </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}