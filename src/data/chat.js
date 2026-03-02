


export const config = {
    runtime: "nodejs"
};
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { contact, messages, userMessage } = req.body;

        const aiMessages = messages
            .filter(m => m.text)
            .map(m => ({
                role: m.send_by_me ? "user" : "assistant",
                content: m.text
            }));

        aiMessages.push({ role: "user", content: userMessage });

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-haiku-20240307",
                max_tokens: 300,
                system: `Sos ${contact.name}, un contacto de WhatsApp.
Respondé de forma corta y casual como en un chat real.
Usá el estilo de ${contact.name}.
Máximo 2-3 oraciones por respuesta.`,
                messages: aiMessages
            })
        });

        const data = await response.json();

        return res.status(200).json({
            reply: data.content[0].text
        });

    } catch (error) {
        return res.status(500).json({ error: "AI error" });
    }
}