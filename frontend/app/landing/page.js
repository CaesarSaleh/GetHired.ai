"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Landing = () => {
  const router = useRouter();

  const [selectedButton, setSelectedButton] = useState('Consulting');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleBeginClick = () => {
    // Add logic for handling the "Begin" button click, e.g., navigate to the next page.
    // Example: router.push('/next-page');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div class="mb-8 mt-8">
        <label for="message" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-black">Choose your industry</label>
      </div>
      <div className="grid max-w-[1000px] grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-200 rounded-lg" role="group">

        <button
          type="button"
          className={`px-8 py-2 text-sm font-medium ${selectedButton === 'Consulting' ? 'selected' : 'non-selected'}`}
          onClick={() => handleButtonClick('Consulting')}
        >
          Consulting
        </button>
        <button
          type="button"
          className={`px-8 py-2 text-sm font-medium ${selectedButton === 'Software' ? 'selected' : 'non-selected'}`}
          onClick={() => handleButtonClick('Software')}
        >
          Software
        </button>
        <button
          type="button"
          className={`px-8 py-2 text-sm font-medium ${selectedButton === 'Finance' ? 'selected' : 'non-selected'}`}
          onClick={() => handleButtonClick('Finance')}
        >
          Finance
        </button>
      </div>
      <div>
      <div class="mb-8 mt-8">
        <label for="message" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-black">Job Description</label>
      </div>
      <div>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 max-w-[1000px] min-w-[1000px] text-sm text-white bg-gray-200 rounded-lg mx-auto"
          placeholder="Paste the job description here"
        ></textarea>
      </div>
      <div>
    <button
      type="button"
      class="mt-8 bg-green-600 px-6 py-2 rounded-lg text-lg font-medium"
    >
      Get Started
    </button>
  </div>
    </div>
      

      <style jsx>{`
        button {
          transition: background-color 0.3s, border-radius 0.3s;
          border-radius: 5px;
        }

        button:hover {
          background-color: #43934b; /* #43934b when not selected */
          border-radius: 8px;
        }

        .selected {
          background-color: #43934b; /* Whitish gray when selected */
          border-radius: 8px;
        }

        .non-selected {
          background-color: #edf2f7; /* #43934b when not selected */
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default Landing;



