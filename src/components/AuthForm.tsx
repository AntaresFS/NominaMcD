import { useState } from 'react';
import { supabase } from './lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [category, setCategory] = useState<'aprendiz'|'equipo'>('aprendiz');
  const [contractHours, setContractHours] = useState(20);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const { data: _data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) console.error(error);
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-sm mx-auto space-y-4">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded"/>
      <div className="flex">
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña" className="flex-1 border p-2 rounded"/>
        <button type="button" onClick={()=>setShowPassword(s=>!s)} className="ml-2">{showPassword ? '🙈' : '👁️'}</button>
      </div>
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>
        <span>Recordarme</span>
      </label>
      <select value={category} onChange={(e)=>setCategory(e.target.value as 'aprendiz'|'equipo')} className="w-full border p-2 rounded">
        <option value="aprendiz">Aprendiz</option>
        <option value="equipo">Personal de equipo</option>
      </select>
      <input type="number" value={contractHours} onChange={(e)=>setContractHours(parseFloat(e.target.value))} placeholder="Horas semanales" className="w-full border p-2 rounded"/>
      <div className="flex space-x-2">
        <button onClick={handleSignIn} disabled={loading} className="flex-1 bg-blue-500 text-white p-2 rounded">Login</button>
        <button onClick={handleSignUp} disabled={loading} className="flex-1 bg-green-500 text-white p-2 rounded">Registro</button>
      </div>
    </div>
  );
}
