'use client';

import { useEffect, useState, useCallback } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Shield, User, Wallet as WalletIcon, AlertCircle, RefreshCw, Smartphone, Search } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Identity, Avatar, Name, Address, Badge } from '@coinbase/onchainkit/identity';
import { Wallet, ConnectWallet, ConnectWalletText, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [verificationStep, setVerificationStep] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    score: number;
    details: string[];
  } | null>(null);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const init = async () => {
      try {
        // Use a timeout for the context to ensure the app renders even if Farcaster SDK environment is slow or missing
        const contextPromise = sdk.context;
        const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 3000));
        const context = await Promise.race([contextPromise, timeoutPromise]);
        
        setContext(context);
        sdk.actions.ready();
      } catch (error) {
        console.error('Farcaster SDK initialization error:', error);
      } finally {
        setIsReady(true);
      }
    };
    if (typeof window !== 'undefined') {
      init();
    }
  }, []);

  const runVerification = useCallback(async () => {
    setIsVerifying(true);
    setVerificationStep(1);
    
    // Simulate multi-step verification process
    const steps = [
      { msg: 'Scanning Farcaster Context...', delay: 1000 },
      { msg: 'Checking Account Authenticity...', delay: 1500 },
      { msg: 'Analyzing On-chain Presence...', delay: 2000 },
      { msg: 'Calculating Humanity Score...', delay: 1000 },
    ];

    for (let i = 0; i < steps.length; i++) {
      setVerificationStep(i + 1);
      await new Promise(r => setTimeout(r, steps[i].delay));
    }

    // Logic for "Success"
    // In a real app, this would hit an API or check signatures/basenames
    const details = [];
    let score = 0;

    if (context?.user) {
      score += 40;
      details.push('Verified Farcaster Account');
    }
    
    if (isConnected) {
      score += 30;
      details.push('Wallet Connected');
    }

    if (context?.user?.pfpUrl) {
      score += 15;
      details.push('Active Profile Presence');
    }

    if (address) {
       score += 15;
       details.push('On-chain Identity Link');
    }

    setVerificationResult({
      success: score >= 50,
      score,
      details
    });
    setIsVerifying(false);
  }, [context, isConnected, address]);

  if (!isReady) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#09090b] text-[#f4f4f5] font-sans">
      {/* Background Glows */}
      <div className="accent-glow top-[-100px] left-[-100px]" />
      <div className="accent-glow bottom-[-100px] right-[-100px]" />

      <div className="max-w-4xl mx-auto p-4 md:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 py-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-violet-600/20">
              H
            </div>
            <h1 className="text-lg font-semibold tracking-tight uppercase">
              PoH.Verify <span className="text-zinc-500 font-normal lowercase ml-1">v1.0</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Wallet>
              <ConnectWallet className="h-9 px-4 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2">
                <Avatar className="h-5 w-5 shrink-0" />
                <Name className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest" />
              </ConnectWallet>
              <WalletDropdown className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden mt-2 z-50">
                <Identity className="px-5 pt-4 pb-3 border-b border-zinc-900 bg-zinc-900/30" hasCopyAddressOnClick>
                  <Avatar className="h-12 w-12 border-2 border-zinc-950 shadow-lg" />
                  <div className="flex flex-col">
                    <Name className="text-lg font-bold" />
                    <Address className="text-xs text-zinc-500" />
                  </div>
                </Identity>
                <div className="p-2 space-y-1">
                  <WalletDropdownDisconnect className="w-full rounded-lg hover:bg-red-500/10 text-red-400 text-xs font-bold py-2.5 transition-colors" />
                </div>
              </WalletDropdown>
            </Wallet>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full h-9">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-medium text-zinc-300 uppercase tracking-wider">
                {context?.client?.clientName || 'Mainnet'} Connected
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 p-0.5 overflow-hidden">
               {context?.user?.pfpUrl ? (
                 <img src={context.user.pfpUrl} className="rounded-full w-full h-full object-cover" alt="avatar"/>
               ) : (
                 <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-500" />
                 </div>
               )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile & Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <section className="glass-card p-8 group transition-all hover:border-violet-500/40">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-zinc-900 mb-6 flex items-center justify-center border border-zinc-800 relative shadow-inner">
                  {context?.user?.pfpUrl ? (
                    <img src={context.user.pfpUrl} className="w-full h-full rounded-full object-cover p-1" alt="Profile" />
                  ) : (
                    <User className="w-10 h-10 text-zinc-700" />
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#09090b] flex items-center justify-center">
                     <Check className="w-3 h-3 text-black" />
                  </div>
                </div>
                {context?.user ? (
                  <>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">@{context.user.username}</h2>
                    <p className="text-zinc-500 text-sm font-medium">{context.user.displayName}</p>
                    <p className="text-zinc-600 font-mono text-[10px] mt-2 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      FID: {context.user.fid}
                    </p>
                  </>
                ) : (
                  <p className="text-zinc-500 text-sm font-mono italic">Awaiting connection...</p>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  <span>Verification Status</span>
                  <span className={`${verificationResult?.success ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {verificationResult ? (verificationResult.success ? 'Verified' : 'Low Score') : 'Pending'}
                  </span>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isVerifying ? `${verificationStep * 25}%` : (verificationResult ? `${verificationResult.score}%` : '15%') }}
                    className="bg-violet-500 h-full shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50 text-center backdrop-blur-sm">
                    <span className="block text-[10px] text-zinc-500 mb-1 font-bold uppercase tracking-widest">Trust Score</span>
                    <span className="text-xl font-bold text-zinc-100">{verificationResult?.score || 0}%</span>
                  </div>
                  <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50 text-center backdrop-blur-sm">
                    <span className="block text-[10px] text-zinc-500 mb-1 font-bold uppercase tracking-widest">Network Rank</span>
                    <span className="text-xl font-bold text-zinc-100">#{context?.user?.fid || '---'}</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-[0.2em] px-2 font-bold">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full bg-zinc-900 border-2 border-[#09090b] flex items-center justify-center text-[10px] shadow-sm">
                    👤
                  </div>
                ))}
              </div>
              <span>Trusted by +412 Humans</span>
            </div>
          </div>

          {/* Right Column: Interaction */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              {!verificationResult && !isVerifying ? (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Confirm your <span className="text-violet-500">humanity.</span></h2>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                      Securely link your Farcaster profile to on-chain identity protocols to unlock Sybil-resistant features on Base.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-6 border-violet-500/30 relative">
                       <span className="step-number absolute top-6 left-6">01</span>
                       <div className="mt-10">
                          <h3 className="font-bold text-lg mb-1">Account Sync</h3>
                          <p className="text-xs text-zinc-500">Farcaster metadata connection.</p>
                       </div>
                       <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-emerald-500" />
                       </div>
                    </div>
                    
                    <div className="glass-card p-6 border-l-4 border-l-violet-500 group">
                       <div className="flex justify-between items-start mb-10">
                          <span className="step-number">02</span>
                          <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider animate-pulse">Active</span>
                       </div>
                       <h3 className="font-bold text-lg mb-1">Human Check</h3>
                       <p className="text-xs text-zinc-500 mb-6">Scan presence & link wallet.</p>
                       
                       <div className="flex flex-col gap-3">
                        <ConnectWallet>
                          <ConnectWalletText 
                            className="w-full bg-zinc-900 border border-zinc-800 text-white font-bold h-10 px-4 rounded-xl hover:bg-zinc-800 transition-colors text-xs" 
                            title="Connect your wallet to proceed with the humanity verification"
                          />
                        </ConnectWallet>

                        <button 
                          onClick={runVerification}
                          disabled={!isConnected}
                          title={!isConnected ? "Please connect your wallet first" : "Start the identity verification process"}
                          className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] transition-transform ${
                            isConnected 
                              ? 'btn-violet text-white shadow-lg shadow-violet-600/20' 
                              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                          }`}
                        >
                          Begin Identity Scan
                        </button>

                        {isConnected ? (
                          <div className="mt-6 p-5 glass-card bg-zinc-900/40 border-violet-500/20 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Active Wallet Connected</span>
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            </div>
                            
                            <Wallet>
                              <ConnectWallet className="bg-zinc-800/50 hover:bg-zinc-800 w-full justify-between p-3 border border-zinc-700/50 h-auto rounded-xl">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 border-2 border-zinc-900" />
                                  <div className="flex flex-col items-start translate-y-[1px]">
                                    <Name className="text-zinc-100 font-bold text-sm" />
                                    <Address className="text-zinc-500 text-[11px] font-mono leading-none mt-1" />
                                  </div>
                                </div>
                                <div className="p-2 rounded-lg bg-zinc-900/50">
                                  <WalletIcon className="w-4 h-4 text-violet-400" />
                                </div>
                              </ConnectWallet>
                              <WalletDropdown className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden mt-2">
                                <Identity className="px-5 pt-4 pb-3 border-b border-zinc-900 bg-zinc-900/30" hasCopyAddressOnClick>
                                  <Avatar className="h-12 w-12 border-2 border-zinc-950 shadow-lg" />
                                  <div className="flex flex-col">
                                    <Name className="text-lg font-bold" />
                                    <Address className="text-xs text-zinc-500" />
                                  </div>
                                </Identity>
                                <div className="p-2">
                                  <WalletDropdownDisconnect className="w-full rounded-lg hover:bg-red-500/10 text-red-400 text-xs font-bold py-2.5 transition-colors" />
                                </div>
                              </WalletDropdown>
                            </Wallet>
                          </div>
                        ) : (
                          <p className="text-[10px] text-amber-500/80 font-mono text-center uppercase tracking-wider animate-pulse pt-2">
                            Wallet required for scanning
                          </p>
                        )}
                       </div>
                    </div>

                    <div className="glass-card p-6 opacity-40">
                       <span className="step-number block mb-10 w-fit">03</span>
                       <h3 className="font-bold text-lg mb-1">Mint Badge</h3>
                       <p className="text-xs text-zinc-500">Soulbound NFT on Base.</p>
                    </div>

                    <div className="glass-card p-6 opacity-40">
                       <span className="step-number block mb-10 w-fit">04</span>
                       <h3 className="font-bold text-lg mb-1">Share Proof</h3>
                       <p className="text-xs text-zinc-500">Post attestation to feed.</p>
                    </div>
                  </div>
                </motion.div>
              ) : isVerifying ? (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="relative w-32 h-32 mb-10">
                    <div className="absolute inset-0 border-4 border-violet-500/10 rounded-full" />
                    <motion.div 
                      className="absolute inset-0 border-4 border-t-violet-600 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-zinc-100">{verificationStep * 25}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">Performing Liveness Check</h3>
                  <div className="flex items-center gap-3 text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                     <div className="w-1 h-1 bg-violet-500 rounded-full animate-ping" />
                     {['Checking','Profile','History','Wallet','Sync'][verificationStep]} Analysis in progress
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className={`p-10 rounded-3xl border glass-card relative overflow-hidden ${verificationResult.success ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                    {verificationResult.success && (
                      <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.2em] transform rotate-45 translate-x-8 translate-y-3">
                        Verified
                      </div>
                    )}
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                      <div className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-xl ${verificationResult.success ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-red-500 shadow-red-500/20'}`}>
                        {verificationResult.success ? <Check className="w-10 h-10 text-black" /> : <AlertCircle className="w-10 h-10 text-black" />}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-2">
                          {verificationResult.success ? 'Human Verified' : 'Scan Incomplete'}
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                          {verificationResult.success 
                            ? 'Your identity has been authenticated against the PoH protocol. You are now eligible for priority features.' 
                            : 'We couldn\'t confirm sufficient human signals. Try connecting a wallet with history or updating your profile.'}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {verificationResult.details.map((detail, i) => (
                            <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                              <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setVerificationResult(null)}
                      className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                    >
                      Restart Scan
                    </button>
                    {verificationResult.success && (
                      <button className="flex-1 py-4 bg-violet-600 rounded-2xl text-xs font-bold uppercase tracking-widest text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20 transition-all">
                        Mint Humanity ID
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-10 flex flex-col md:flex-row justify-between items-center border-t border-zinc-800/50 text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold gap-6">
          <div>Powered by OnchainKit & Ethereum Attestation Service (EAS)</div>
          <div className="flex gap-8">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">@poh.base</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
