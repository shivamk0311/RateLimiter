import { useState } from 'react'
import { useEffect } from 'react';
import client from './api/client.js';

function App() {

  const [data,setData] = useState(null);
  const [error,setError] = useState("");
  const StatCard = ({ label, value, color, small }) => (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">{label}</p>
      <p className={`font-mono ${small ? 'text-sm' : 'text-2xl font-bold'} ${color}`}>
        {value}
      </p>
    </div>
  );

  const checkRateLimit = async () => {
    try{
      setError("");

      const response = await client.get("/rate-limit/check",{
        headers: {
          "x-api-key": "user123",
        }
      });
      setData(response.data);
      
    }catch(err){
      if(err.response){
        setData(err.response.data);
        setError(`Request failed with status: ${err.response.status}`);
      }else{
        setError("Failed to connect to backend.")
      }

    }
  }


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
          <h1 className="text-4xl font-semibold tracking-tight text-center my-6">
            Rate Limiter Dashboard
          </h1>
          <div className='flex flex-col items-center gap-6'>
            <button onClick={checkRateLimit} 
              className='px-8 py-3 font-semibold bg-green-800 rounded-full hover:bg-green-700 transition-all shadow-lg shadow-emerald-900/20 active:scale-95'>
              Send Request
            </button>

            {error && <p className='text-red-400 animate-none font-medium'>{error}</p>}

            {data && (
              <div className='w-full space-y-6'>
                <div className={`p-4 text-center rounded-xl font-bold text-lg border ${data.allowed ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                  {data.allowed ? "REQUEST ALLOWED" : "LIMIT EXCEEDED"}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Usage</span>
                    <span>{data.currCount} / {data.limit}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${data.remaining < 2 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${(data.currCount / data.limit) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Remaining" value={data.remaining} color="text-emerald-400" />
                  <StatCard label="Resets In" value={`${data.resetInSeconds}s`} color="text-amber-400" />
                  <StatCard label="API Key" value={data.apikey} color="text-slate-300" small />
                  <StatCard label="Limit" value={data.limit} color="text-slate-300" />
                </div>
              </div>
            )}
          </div>
          

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
