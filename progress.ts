import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI();

// 定义一个工具：查询天气
const tools = [
  {
    type: "function",
    function: {
      name: "getWeather",
      description: "获取某个城市的天气",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "城市名称" },
        },
        required: ["city"],
      },
    },
  },
];

// 模拟工具函数
function getWeather(city: string) {
  return `${city} 当前天气：晴天，25℃`;
}

// Agent 主逻辑
async function agentRun() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "北京今天天气怎么样？" }],
    tools: tools, // 给 Agent 挂载工具
  });

  const result = response.choices[0].message;
  console.log("Agent 思考结果：", result);

  // 如果 AI 判断需要调用工具 → 自动执行
  if (result.tool_calls) {
    const city = result.tool_calls[0].function.arguments;
    const weather = getWeather(JSON.parse(city).city);
    console.log("☀️ 工具返回：", weather);
  }
}

agentRun();