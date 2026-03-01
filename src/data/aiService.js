const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export async function getAIResponse(contact, messages, userMessage) {
    const aiMessages = messages
        .filter(m => m.text)
        .map(m => ({
            role: m.send_by_me ? 'user' : 'assistant',
            content: m.text
        }))

    aiMessages.push({ role: 'user', content: userMessage })

    const response = await fetch('/api/anthropic/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            system: `Sos ${contact.name}, un contacto de WhatsApp. 
Respondé de forma corta y casual como en un chat real.
Usá el estilo de ${contact.name} — si es Yoda hablá como Yoda, si es Cartman sé sarcástico, etc.
Máximo 2-3 oraciones por respuesta.`,
            messages: aiMessages
        })
    })

    const data = await response.json()
    return data.content[0].text
}