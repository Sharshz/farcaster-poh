'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion } from 'motion/react';
import { User, Edit3, Save, ArrowLeft, Camera, Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const [isReady, setIsReady] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreparingEdit, setIsPreparingEdit] = useState(false);
  const [profile, setProfile] = useState({
    displayName: '',
    username: '',
    bio: 'PoH Verified Human 🛡️',
    pfpUrl: ''
  });

  useEffect(() => {
    const init = async () => {
      try {
        const ctx = await sdk.context;
        setContext(ctx);
        if (ctx?.user) {
          setProfile({
            displayName: ctx.user.displayName || 'Human User',
            username: ctx.user.username || 'anon',
            bio: 'PoH Verified Human 🛡️',
            pfpUrl: ctx.user.pfpUrl || ''
          });
        }
      } catch (error) {
        console.error('Profile load error:', error);
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleEdit = async () => {
    setIsPreparingEdit(true);
    // Simulate prep time for the form (e.g. fetching additional metadata)
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsEditing(true);
    setIsPreparingEdit(false);
  };

  if (!isReady) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#09090b] text-[#f4f4f5] font-sans">
      {/* Background Glows */}
      <div className="accent-glow top-[-100px] left-[-100px]" />
      <div className="accent-glow bottom-[-100px] right-[-100px]" />

      <div className="max-w-xl mx-auto p-4 md:p-10 relative z-10">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-[10px] font-bold uppercase tracking-[0.2em] group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Verify
        </Link>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass-card overflow-hidden"
        >
          {/* Cover Area */}
          <div className="h-32 bg-gradient-to-br from-violet-600/20 to-zinc-900 border-b border-zinc-800/50" />
          
          <div className="px-8 pb-8 -mt-12">
            <div className="flex justify-between items-end mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-zinc-950 border-4 border-[#09090b] overflow-hidden shadow-2xl relative group/pfp">
                  {profile.pfpUrl ? (
                    <img 
                      src={profile.pfpUrl} 
                      alt={profile.username} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover/pfp:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                      <User className="text-zinc-700 w-10 h-10" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover/pfp:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                      <input type="file" className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {!isEditing && (
                <button 
                  onClick={handleEdit}
                  disabled={isPreparingEdit}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {isPreparingEdit ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Edit3 className="w-3 h-3" />
                  )}
                  {isPreparingEdit ? 'Preparing...' : 'Edit Profile'}
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Display Name</label>
                    <input 
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-zinc-700"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">@</span>
                      <input 
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-zinc-700 font-mono"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Profile Picture URL</label>
                  <input 
                    type="text"
                    value={profile.pfpUrl}
                    onChange={(e) => setProfile({...profile, pfpUrl: e.target.value})}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-zinc-700"
                    placeholder="https://..."
                  />
                  <p className="text-[9px] text-zinc-600 mt-1 uppercase tracking-tighter">Enter a URL for your profile image (JPG, PNG, WebP)</p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Profile Bio</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-zinc-700 resize-none leading-relaxed"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-violet-600 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-3 h-3" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-1">{profile.displayName}</h2>
                  <p className="text-violet-400 font-mono text-xs tracking-tight text-opacity-80">@{profile.username}</p>
                </div>

                <div className="space-y-6">
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                    {profile.bio}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <div className="px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center gap-2">
                      <Shield className="w-3 h-3 text-violet-500" />
                      <span className="text-[9px] font-bold text-violet-400 uppercase tracking-[0.1em]">Verified Level 1</span>
                    </div>
                    <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2">
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.1em]">FID</span>
                      <span className="text-[9px] font-mono text-zinc-400">{context?.user?.fid || '2405'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="glass-card p-6 group hover:border-violet-500/30 transition-all cursor-pointer">
            <h4 className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Verification Score</h4>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">92<span className="text-zinc-700 text-lg">.4</span></div>
              <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-violet-500" />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 flex items-center justify-center hover:bg-zinc-900/50 transition-all cursor-pointer border-dashed">
            <div className="text-center">
              <div className="p-2 bg-zinc-900 rounded-xl mb-2 inline-block">
                <Shield className="w-4 h-4 text-zinc-700" />
              </div>
              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Linked Protocols</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
