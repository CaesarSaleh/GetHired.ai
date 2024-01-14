"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Landing = () => {
  return (
    <div className="mydict">
      <div className="flex flex-wrap mt-2 justify-center">
        <label className="relative m-1">
          <input type="radio" name="radio" defaultChecked className="hidden" />
          <span className="block bg-white border border-blue-500 shadow-md transition duration-500 ease-in-out p-2.5 text-blue-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Women</span>
        </label>
        <label className="relative m-1">
          <input type="radio" name="radio" className="hidden" />
          <span className="block bg-white border border-blue-500 shadow-md transition duration-500 ease-in-out p-2.5 text-blue-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Men</span>
        </label>
        <label className="relative m-1">
          <input type="radio" name="radio" className="hidden" />
          <span className="block bg-white border border-blue-500 shadow-md transition duration-500 ease-in-out p-2.5 text-blue-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Divided</span>
        </label>
      </div>
      <div className="mb-4">
        <h3 htmlFor="message" className="text-center text-2xl">Job Description</h3>
        <textarea id="message" rows="4" className="block p-2.5 w-[36rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please provide a description of the job that you're trying to interview for..."></textarea>
      </div>

      <div>
        <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Begin</button>
      </div>
    </div>
  );
};

export default Landing;
