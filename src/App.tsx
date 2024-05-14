import React, { useState } from 'react';
import logo from './assets/logo.png'
import search_icon from './assets/search_icon.png'

function App() {
  return (
    <div>
      <header className="p-5 bg-gradient-to-r from-cyan-300/25 to-blue-300/25">
        <div className="flex flex-row items-center px-1">
          <div>
            <img className="flex-initial h-5" src={logo} alt="logo" />
          </div>
          <div className="flex-grow flex justify-center items-center">
            <div className="flex flex-row items-center bg-white rounded-lg w-96">
              <div className="border rounded-l-lg h-full">
                <img className="h-5" src={search_icon} alt="search_icon" />
              </div>
              <div className="p-2 border w-full">
                <input className="bg-transparent w-full focus:border-0 focus:outline-0 " type="search" placeholder="Search..." />
              </div>
            </div>
          </div>
          <button className="p-2 border rounded-lg bg-">contact</button>
        </div>
      </header>

      <div className="w-screen h-px bg-zinc-200"></div>
    
      <div className="flex flex-row">
        <div className="flex-initial w-56">
          Here
        </div>
      </div>
    </div>
  )
}

export default App
