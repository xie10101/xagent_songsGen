// 加载环境变量
import { env } from "./config.ts";
const { OPENAI_API_KEY, OPENAI_API_BASE, MAX_TOKEN } = env;


// 导入 OpenAI SDK
import OpenAI from "openai";

// 初始化客户端（全局只需要初始化一次）
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_API_BASE,
});
/**
 *   尝试使用不同的大模型   
 */
// 最简单的对话调用 = Agent 的核心基础
async function simpleChat() {
  const stream = await openai.chat.completions.create({
    model: "kimi-k2.5", // 便宜又好用，入门首选
    messages: [
      // 系统提示词 = Agent 的“角色设定”
      { role: "system", content: "你是一个乐于助人的智能助手 Agent" },
      // 用户输入
      { role: "user", content: "你好，请简单介绍自己" },
    ],
      max_tokens: Number(MAX_TOKEN)|| 1024, 
      stream: true,
  });

  // 输出结果
  // console.log("🤖 Agent 回答：", completion?.choices?.[0]?.message?.content || "无回复");
// 像水流一样处理每一个数据片段 (Chunk)
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content); // 在终端实时输出
  }
}

/**
 *  方法参数介绍 
 * .chat.completions.create() 
 *   - model: 大模型名称
 *   - messages: 对话消息数组，包含系统提示词、用户输入
 *   - temperature: 控制回复的随机性，默认值为 0.7
 */


// 运行
// simpleChat();

console.log(MAX_TOKEN);
