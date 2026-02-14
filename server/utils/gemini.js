import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const getGeminiReview = async (userData) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct a prompt based on your User Schema fields
    const prompt = `
        You are an expert dating profile consultant. Review the following user profile data 
        and provide a detailed, witty, and helpful review. 
        Focus on their bio and preferences. 
        Mention what is great and what could be improved to get more matches.

        User Bio: ${userData.bio}
        Preferences: ${JSON.stringify(userData.preferences)}
        Gender/Interests: ${userData.gender} looking for ${userData.interestedIn}

        Format the response in 3 short paragraphs with emojis.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};