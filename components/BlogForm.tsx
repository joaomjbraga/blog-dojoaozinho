'use client';
import { useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

export default function BlogForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const response = await fetch('https://formspree.io/f/mpwdeqyk', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setStatus('Mensagem enviada com sucesso!');
      } else {
        setStatus('Ocorreu um erro ao enviar a mensagem.');
      }
    } catch (error) {
      setStatus('Ocorreu um erro ao enviar a mensagem.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto mt-12 p-6 bg-card dark:bg-card rounded-2xl shadow-lg border border-border space-y-6 transition-all duration-300"
    >
      <div>
        <label
          htmlFor="name"
          className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"
        >
          <User size={16} className="text-primary" />
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full px-4 py-3 rounded-lg bg-background dark:bg-background border border-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
          placeholder="Digite seu nome"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"
        >
          <Mail size={16} className="text-primary" />
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-background dark:bg-background border border-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
          placeholder="Digite seu email"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"
        >
          <MessageSquare size={16} className="text-primary" />
          Mensagem
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg bg-background dark:bg-background border border-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm resize-none"
          placeholder="Escreva sua mensagem..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
      >
        <Send size={16} />
        Enviar
      </button>

      {status && (
        <p
          className={`text-center text-sm font-medium animate-fade-in ${
            status.includes('erro') ? 'text-destructive' : 'text-primary'
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}