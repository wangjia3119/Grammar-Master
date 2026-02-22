import { Type } from "@google/genai";

export enum Difficulty {
  JUNIOR = "初级",
  INTERMEDIATE = "中级",
  ADVANCED = "高级",
}

export enum GrammarCategory {
  NON_FINITE = "非谓语动词",
  ATTRIBUTIVE_CLAUSE = "定语从句",
  ADVERBIAL_CLAUSE = "状语从句",
  NOUN_CLAUSE = "名词性从句",
  CONJUNCTION = "连词/介词",
  ABSOLUTE_CONSTRUCTION = "独立主格",
}

export interface Option {
  id: string;
  text: string;
}

export interface Blank {
  id: number;
  correctAnswer: string;
  options: string[];
}

export interface Question {
  id: number;
  sentence: string; // Use placeholders like [0], [1] for blanks
  blanks: Blank[];
  explanation: {
    correctRule: string;
    example: string;
    commonMistake: string;
  };
  difficulty: Difficulty;
  category: GrammarCategory;
}

export const QUESTION_BANK: Question[] = [
  {
    id: 1,
    sentence: "I think that English is [0] than Chinese.",
    blanks: [
      {
        id: 0,
        correctAnswer: "more difficult",
        options: ["difficult", "more difficult", "most difficult", "difficultly"],
      },
    ],
    explanation: {
      correctRule: "形容词比较级。than 是比较级的标志词，difficult 是多音节词，比较级需在前面加 more。",
      example: "This book is more interesting than that one.",
      commonMistake: "误用 difficultest。多音节词不能直接加 -er 或 -est。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 2,
    sentence: "Our teacher told us [0] in the river. It's dangerous.",
    blanks: [
      {
        id: 0,
        correctAnswer: "not to swim",
        options: ["to swim", "not swim", "not to swim", "don't swim"],
      },
    ],
    explanation: {
      correctRule: "tell sb. not to do sth. 告诉某人不要做某事。不定式的否定形式是在 to 前加 not。",
      example: "My mother told me not to play with fire.",
      commonMistake: "误用 to not swim 或 don't swim。注意不定式的固定否定结构。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.NON_FINITE,
  },
  {
    id: 3,
    sentence: "I wonder [0] he will come to the party tomorrow.",
    blanks: [
      {
        id: 0,
        correctAnswer: "if",
        options: ["that", "if", "what", "who"],
      },
    ],
    explanation: {
      correctRule: "if 引导的宾语从句，表示‘是否’。wonder（想知道）后面通常接表示不确定意义的连词。",
      example: "I want to know if you are free today.",
      commonMistake: "误用 that。that 引导宾语从句时表示确定的事实，不含‘是否’之意。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.NOUN_CLAUSE,
  },
  {
    id: 4,
    sentence: "He was so tired that he couldn't stop [0].",
    blanks: [
      {
        id: 0,
        correctAnswer: "yawning",
        options: ["to yawn", "yawn", "yawning", "yawned"],
      },
    ],
    explanation: {
      correctRule: "stop doing sth. 停止正在做的事情。stop to do sth. 则是停下来去做另一件事。",
      example: "Please stop talking and listen to me.",
      commonMistake: "混淆 stop to do 和 stop doing 的含义。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.NON_FINITE,
  },
  {
    id: 5,
    sentence: "The movie is [0] interesting that I want to see it again.",
    blanks: [
      {
        id: 0,
        correctAnswer: "so",
        options: ["such", "so", "too", "very"],
      },
    ],
    explanation: {
      correctRule: "so...that... 引导结果状语从句，so 后面接形容词或副词。such 后面接名词。",
      example: "He is so tall that he can reach the apple.",
      commonMistake: "误用 such。记住：so + adj./adv. + that；such + (a/an) + adj. + n. + that。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.ADVERBIAL_CLAUSE,
  },
  {
    id: 6,
    sentence: "Could you tell me [0]?",
    blanks: [
      {
        id: 0,
        correctAnswer: "where the library is",
        options: ["where is the library", "where the library is", "where the library was", "the library is where"],
      },
    ],
    explanation: {
      correctRule: "宾语从句的语序。宾语从句必须使用陈述语序（主语+谓语），不能使用疑问语序。",
      example: "Do you know what time it is?",
      commonMistake: "误用疑问语序 where is the library。这是初二学生最容易犯的错误之一。",
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarCategory.NOUN_CLAUSE,
  }
];
