const API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function getAIResponse(contact, messages, userMessage) {
    const aiMessages = messages
        .filter(m => m.text)
        .map(m => ({
            role: m.send_by_me ? 'user' : 'assistant',
            content: m.text
        }))

    aiMessages.push({ role: 'user', content: userMessage })

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 300,
            messages: [
                {
                    role: 'system',
                    content: `Sos ${contact.name}, un contacto de WhatsApp. 
Respondé de forma corta y casual como en un chat real no tan robotarizado.
Usá el estilo de ${contact.name} — si es Yoda hablá como Yoda, si es Cartman sé sarcástico, etc.
Máximo 2-3 oraciones por respuesta.`
                },
                ...aiMessages
            ]
        })
    })

    const data = await response.json()
    return data.choices[0].message.content
}