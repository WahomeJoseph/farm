import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_KEY,
    baseURL: process.env.BOT_URL
})

export async function POST(req, res) {
    try {
        const { messages } = await req.json()

        const farmContext = `
    I'm Egan, an AI farm assistant for Wahome Premium Pigs.
    Our Farm is Located in Narumoru, Nyeri County Kenya.
    The farm offers a variety of services including:
    - Pig Farming
    - Pig Breeding
    - Facilitating pig sales
    - Facilitating farm visits
    For any queries, you can reach out to me.
    `

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: farmContext },
                ...messages,
            ],
        })

        const reply = response.choices[0].message.content
        return NextResponse.json(
            { reply },
            { status: 200 }
        )
    } catch (error) {
        console.error("Chat submission failure:", error.message);
        return NextResponse.json(
            { error: "Error occurred. Try again!", details: error.message },
            { status: 500 }
        )
    }
}