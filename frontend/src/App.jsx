import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import client from './api/client.js';

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    client
      .get("/health")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Failed to connect backend."))

  },[]);


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
          <h1 className="text-4xl font-bold tracking-tight text-center">
            Rate Limiter Dashboard
          </h1>
          <p className="mt-4 text-lg text-slate-300 text-center">{message}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Requests</p>
              <p className="mt-2 text-2xl font-semibold">0</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Blocked</p>
              <p className="mt-2 text-2xl font-semibold">0</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Active Policies</p>
              <p className="mt-2 text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
