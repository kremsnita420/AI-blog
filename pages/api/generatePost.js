import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openAi = new OpenAIApi(config);
    const topic = 'Top 10 tips for dog owners';
    const keywords = 'first-time dog owners, common dog health issues, best dog breeds';

    const response = await openAi.createCompletion({
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 3600,
        prompt: `
            Write a long and detailed SEO-friendly blog post about ${topic}, 
            that targets following coma-separated keyword:${keywords}. 
            The content should be formatted in SEO-friendly HTML. 
            The response must also include appropriate HTML title and meta description content. 
            The return format must be stringified JSON format in the following format:
            {
                "postContent": post content here,
                "title": title goes gere,
                "metaDescription": meta description goes here
            }
        `,
    })

    console.log('response: ', response)
    res.status(200).json({ post: JSON.parse(response.data.choices[0]?.text.split('\n').join('')) })
}
