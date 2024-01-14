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
      <div className="grid max-w-[1000px] grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-300 rounded-lg dark:bg-#43934b" role="group">
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
      <div class="mb-16 mt-32">
        <label for="message" class="block mb-2 text-4xl font-medium text-gray-900 dark:text-black">Job Description</label>
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
          background-color: #dcdcdc; /* Whitish gray when selected */
          border-radius: 8px;
        }

        .non-selected {
          background-color: #43934b; /* #43934b when not selected */
          border-radius: 8px;
        }
      `}</style>
    </div>

    //   <div className="radio-buttons-bar">
    //     <label
    //       className={`radio-button ${selectedOption === 'Option 1' ? 'active' : ''}`}
    //       onClick={() => handleOptionChange('Option 1')}
    //     >
    //       Option 1
    //     </label>
    //     <label
    //       className={`radio-button ${selectedOption === 'Option 2' ? 'active' : ''}`}
    //       onClick={() => handleOptionChange('Option 2')}
    //     >
    //       Option 2
    //     </label>
    //     <label
    //       className={`radio-button ${selectedOption === 'Option 3' ? 'active' : ''}`}
    //       onClick={() => handleOptionChange('Option 3')}
    //     >
    //       Option 3
    //     </label>
    //   </div>

    //   <div style={{ marginTop: '30px' }}>
    //     <h2>Job Description</h2>
    //     <input
    //       type="text"
    //       style={{ width: '300px', padding: '10px', border: '1px solid #ccc' }}
    //       placeholder="Enter job description"
    //     />
    //   </div>

    //   <div style={{ marginTop: '30px' }}>
    //     <button
    //       style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px' }}
    //       onClick={handleBeginClick}
    //     >
    //       Begin
    //     </button>
    //   </div>
    // </div>
  );
};

export default Landing;

// Add the following CSS styles to your stylesheets or use inline styles in your component

<style jsx>{`
  .radio-buttons-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .radio-button {
    cursor: pointer;
    padding: 10px 20px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .radio-button:hover {
    background-color: #f0f0f0;
  }

  .radio-button.active {
    background-color: #e0e0e0;
  }
`}</style>;
