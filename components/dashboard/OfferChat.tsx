'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string
  offer_id: string
  sender_id: string
  content: string
  attachment_url: string | null
  attachment_type: string | null
  created_at: string
  profiles?: { full_name: string | null }
}

interface OfferChatProps {
  offerId: string
  currentUserId: string
  currentUserName: string
}

const RULES = [
  'Mantén un trato respetuoso en todo momento.',
  'No compartas datos bancarios ni contraseñas por el chat.',
  'Los acuerdos alcanzados aquí quedan registrados en Ampara.',
  'Ante cualquier conflicto, Ampara mediará con el historial del chat.',
]

export function OfferChat({ offerId, currentUserId }: OfferChatProps) {
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [showRules, setShowRules] = useState(true)
  const [uploading, setUploading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const lastIdRef = useRef<string | null>(null)

  async function fetchMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*, profiles(full_name)')
      .eq('offer_id', offerId)
      .order('created_at', { ascending: true })

    if (data) {
      setMessages(data as Message[])
      if (data.length > 0) lastIdRef.current = data[data.length - 1].id
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
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
    await fetchMessages()
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo no puede superar 10 MB.')
      return
    }

    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${offerId}/${currentUserId}-${Date.now()}.${ext}`

    const { data: uploadData, error } = await supabase.storage
      .from('chat-attachments')
      .upload(path, file, { upsert: false })

    if (error) {
      alert('Error al subir el archivo. Inténtalo de nuevo.')
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('chat-attachments')
      .getPublicUrl(uploadData.path)

    const isImage = file.type.startsWith('image/')

    await supabase.from('messages').insert({
      offer_id:        offerId,
      sender_id:       currentUserId,
      content:         file.name,
      attachment_url:  urlData.publicUrl,
      attachment_type: isImage ? 'image' : 'file',
    })

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
    await fetchMessages()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Rules banner */}
      {showRules && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex gap-3 shrink-0">
          <div className="flex-1">
            <div className="text-xs font-semibold text-amber-800 mb-1">Normas del chat</div>
            <ul className="text-xs text-amber-700 space-y-0.5">
              {RULES.map((r, i) => <li key={i}>· {r}</li>)}
            </ul>
          </div>
          <button
            onClick={() => setShowRules(false)}
            className="text-amber-400 hover:text-amber-700 self-start shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-center text-neutral-400 text-sm mt-8">
            Aún no hay mensajes. ¡Empieza la conversación!
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

                {msg.attachment_url ? (
                  msg.attachment_type === 'image' ? (
                    <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={msg.attachment_url}
                        alt={msg.content}
                        className="rounded-lg max-w-[200px] max-h-[200px] object-cover cursor-pointer hover:opacity-90"
                      />
                    </a>
                  ) : (
                    <a
                      href={msg.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 underline text-sm ${isMe ? 'text-white' : 'text-primary-700'}`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {msg.content}
                    </a>
                  )
                ) : (
                  <span>{msg.content}</span>
                )}

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
      <form onSubmit={handleSend} className="border-t border-neutral-200 p-3 flex gap-2 items-center">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          className="hidden"
          onChange={handleFile}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-400 flex items-center justify-center hover:bg-neutral-50 transition-colors disabled:opacity-50 shrink-0"
          title="Adjuntar archivo"
        >
          {uploading ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          )}
        </button>

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
          className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center hover:bg-primary-900 transition-colors disabled:opacity-50 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}
