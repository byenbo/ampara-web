'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string
  offer_id: string
  sender_id: string
  content: string
  created_at: string
  profiles?: { full_name: string | null }
}

interface OfferChatProps {
  offerId: string
  currentUserId: string
  currentUserName: string
}

export function OfferChat({ offerId, currentUserId, currentUserName }: OfferChatProps) {
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cargar mensajes existentes
    supabase
      .from('messages')
      .select('*, profiles(full_name)')
      .eq('offer_id', offerId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as Message[])
      })

    // Suscribirse a nuevos mensajes en tiempo real
    const channel = supabase
      .channel(`offer-chat-${offerId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `offer_id=eq.${offerId}` },
        async (payload) => {
          const { data } = await supabase
            .from('messages')
            .select('*, profiles(full_name)')
            .eq('id', payload.new.id)
            .single()
          if (data) setMessages((prev) => [...prev, data as Message])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [offerId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setSending(true)
    setInput('')
    await supabase.from('messages').insert({
      offer_id:  offerId,
      sender_id: currentUserId,
      content:   text,
    })
    setSending(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-center text-neutral-400 text-sm mt-8">
            Aún no hay mensajes. ¡Saluda al otro participante!
          </p>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isMe
                    ? 'bg-primary-700 text-white rounded-br-sm'
                    : 'bg-neutral-100 text-neutral-800 rounded-bl-sm'
                }`}
              >
                {!isMe && (
                  <div className="font-semibold text-xs text-primary-600 mb-1">
                    {msg.profiles?.full_name ?? 'Usuario'}
                  </div>
                )}
                {msg.content}
                <div className={`text-xs mt-1 ${isMe ? 'text-primary-200' : 'text-neutral-400'}`}>
                  {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-neutral-200 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center hover:bg-primary-900 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}
