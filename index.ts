// 加载环境变量
import "dotenv/config";
// 导入 OpenAI SDK
import OpenAI from "openai";

// 初始化客户端（全局只需要初始化一次）
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});
/**
 *   尝试使用不同的大模型 
 *   
 */

// 最简单的对话调用 = Agent 的核心基础
async function simpleChat() {
  const completion = await openai.chat.completions.create({
    model: "kimi-k2.5", // 便宜又好用，入门首选
    messages: [
      // 系统提示词 = Agent 的“角色设定”
      { role: "system", content: "你是一个乐于助人的智能助手 Agent" },
      // 用户输入
      { role: "user", content: "你好，请简单介绍自己" },
    ],
  });

  // 输出结果
  console.log("🤖 Agent 回答：", completion?.choices?.[0]?.message?.content || "无回复");
}

/**
 *  方法参数介绍 
 * .chat.completions.create() 
 *   - model: 大模型名称
 *   - messages: 对话消息数组，包含系统提示词、用户输入
 *   - temperature: 控制回复的随机性，默认值为 0.7
 */


// 运行
simpleChat();