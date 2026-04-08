//  提取环境变量的配置文件 
import dotenv from "dotenv";

dotenv.config();
const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${ENV}`, override: true  });
dotenv.config({ path: `.env.local`, override: true });

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

// const { parsed: envs } = result; // 重命名解耦出的 parsed 
/**
 * 该赋值解构  ：
 *  
 */ 
// export  default envs;
//  使用时可以对其再进行解构一层 (可以分析 ) 



//  手动整理 - 预加载 dotenv 依赖 




export const env =  {
  OPENAI_API_KEY:process.env.OPENAI_API_KEY,
  OPENAI_API_BASE:process.env.OPENAI_API_BASE,
  MAX_TOKEN:process.env.MAX_TOKEN,
 }


//  export 导入时需要同名故不能不设置名称 