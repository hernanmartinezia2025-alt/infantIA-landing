import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 relative z-10">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <span className="text-2xl font-black text-white tracking-tight">Infantia</span>
            <span className="text-sm font-black flex ml-0.5 mt-3">
              <span className="text-blue-400">K</span>
              <span className="text-red-400">I</span>
              <span className="text-green-400">D</span>
              <span className="text-yellow-400">S</span>
            </span>
          </div>
          <p className="max-w-sm text-lg font-medium mb-8">
            Transformando la educación infantil a través de inteligencia artificial segura, adaptativa y muy divertida.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-500 hover:text-white transition-all hover:scale-110" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all hover:scale-110" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all hover:scale-110" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Enlaces</h4>
          <ul className="space-y-4 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
          <ul className="space-y-4 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos de uso</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Seguridad Infantil</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center font-medium">
        &copy; {new Date().getFullYear()} InfantIA. Todos los derechos reservados.
      </div>
    </footer>
  );
}
