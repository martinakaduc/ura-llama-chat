import { LLM_SUMMERIZATION } from "$env/static/private";
import { generateFromDefaultEndpoint } from "$lib/server/generateFromDefaultEndpoint";
import type { Message } from "$lib/types/Message";

export async function summarize(prompt: string) {
	if (!LLM_SUMMERIZATION) {
		return prompt.split(/\s+/g).slice(0, 5).join(" ");
	}

	const messages: Array<Omit<Message, "id">> = [
		{ from: "user", content: " Ai là tổng thống của Gabon?" },
		{ from: "assistant", content: "🇬🇦 Tổng thống của Gabon" },
		{ from: "user", content: "Who is Julien Chaumond?" },
		{ from: "assistant", content: "🧑 Julien Chaumond" },
		{ from: "user", content: "1+1 = mấy ?" },
		{ from: "assistant", content: "🔢 Phép tính toán đơn giản" },
		{ from: "user", content: "tin tức mới nhất" },
		{ from: "assistant", content: "📰 Tin tức mới nhất" },
		{ from: "user", content: "Cách làm một cái bánh phô mai tuyệt vời?" },
		{ from: "assistant", content: "🍰 Bánh phô mai" },
		{ from: "user", content: "Bộ phim bạn yêu thích là gì? Hãy đưa ra câu trả lời ngắn" },
		{ from: "assistant", content: "🎥 Bộ phim yêu thích" },
		{ from: "user", content: "Giải thích khải niệm trí tuệ nhân tạo?" },
		{ from: "assistant", content: "🤖 Định nghĩa trí tuệ nhân tạo" },
		{ from: "user", content: prompt },
	];

	return await generateFromDefaultEndpoint({
		messages,
		preprompt: `Bạn là một AI tóm tắt văn bản. Bạn không bao giờ trả lời trực tiếp, thay vì đó chỉ đưa ra một câu tóm tắt ngắn từ yêu cầu của người dùng. Luôn luôn bắt đầu bằng một biểu tượng cảm xúc và một câu tóm tắt ngắn.`,
	})
		.then((summary) => {
			// add an emoji if none is found in the first three characters
			if (!/\p{Emoji}/u.test(summary.slice(0, 3))) {
				return "💬 " + summary;
			}
			return summary;
		})
		.catch((e) => {
			console.error(e);
			return null;
		});
}
