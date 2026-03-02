
import { useState, useRef, useEffect } from 'react'
import { getAIResponse } from '../../data/aiService'
import './chat.css'

const messagesCache = {}

export default function Chat({ contact }) {
   
    if (!messagesCache[contact.id]) {
        messagesCache[contact.id] = contact.messages
    }

    const [messages, setMessages] = useState(messagesCache[contact.id])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)

    
    useEffect(() => {
        if (!messagesCache[contact.id]) {
            messagesCache[contact.id] = contact.messages
        }
        setMessages(messagesCache[contact.id])
        setText('')
        setLoading(false)
    }, [contact.id])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        if (!text.trim() || loading) return

        const userMsg = {
            id: Date.now(),
            text: text.trim(),
            send_by_me: true,
            created_at: new Date().toISOString(),
        }

     
        messagesCache[contact.id] = [...messagesCache[contact.id], userMsg]
        setMessages([...messagesCache[contact.id]])
        setText('')
        setLoading(true)

        try {
            const aiText = await getAIResponse(contact, messagesCache[contact.id], userMsg.text)
            const aiMsg = {
                id: Date.now() + 1,
                text: aiText,
                send_by_me: false,
                created_at: new Date().toISOString(),
            }
            messagesCache[contact.id] = [...messagesCache[contact.id], aiMsg]
            setMessages([...messagesCache[contact.id]])
        } catch {
            const errMsg = {
                id: Date.now() + 1,
                text: '...',
                send_by_me: false,
                created_at: new Date().toISOString(),
            }
            messagesCache[contact.id] = [...messagesCache[contact.id], errMsg]
            setMessages([...messagesCache[contact.id]])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const formatTime = (iso) => {
        try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        catch { return '' }
    }

    return (
        <div className='chat_wrapper'>
            <div className='chat_contact'>
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.send_by_me ? 'sent' : 'received'}`}>
                        <p>{msg.text}</p>
                        <span className='message_time'>{formatTime(msg.created_at)}</span>
                    </div>
                ))}

                {loading && (
                    <div className='message received'>
                        <div className='typing_indicator'>
                            <span /><span /><span />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <form onSubmit={e => { e.preventDefault(); handleSend() }}>
                <textarea
                    placeholder='Escribe un mensaje...'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    disabled={loading}
                />
                <button type='submit' disabled={loading}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </form>
        </div>
    )
}