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
  },
  {
    id: 7,
    sentence: "My mother is busy [0] dinner in the kitchen now.",
    blanks: [
      {
        id: 0,
        correctAnswer: "cooking",
        options: ["cook", "to cook", "cooking", "cooked"],
      },
    ],
    explanation: {
      correctRule: "be busy doing sth. 忙于做某事。这里 doing 是动名词作宾语。",
      example: "He is busy doing his homework.",
      commonMistake: "误用 to cook。注意 be busy 后面接 v-ing 形式。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.NON_FINITE,
  },
  {
    id: 8,
    sentence: "Are you interested [0] stamps?",
    blanks: [
      {
        id: 0,
        correctAnswer: "in collecting",
        options: ["to collect", "in collecting", "at collecting", "on collecting"],
      },
    ],
    explanation: {
      correctRule: "be interested in doing sth. 对做某事感兴趣。in 是介词，后面接动名词形式。",
      example: "She is interested in playing the piano.",
      commonMistake: "误用 to collect 或其它介词。记住固定搭配 be interested in。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 9,
    sentence: "We are all proud [0] our great country.",
    blanks: [
      {
        id: 0,
        correctAnswer: "of",
        options: ["at", "of", "with", "in"],
      },
    ],
    explanation: {
      correctRule: "be proud of... 以...为荣。这是固定搭配。",
      example: "Parents are usually proud of their children.",
      commonMistake: "误用 with 或 in。注意 be proud of 和 take pride in 的区别。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 10,
    sentence: "Whether we will go for a picnic [0] the weather.",
    blanks: [
      {
        id: 0,
        correctAnswer: "depends on",
        options: ["depends on", "depend on", "is depending on", "depends in"],
      },
    ],
    explanation: {
      correctRule: "depend on 依靠，取决于。主语是 Whether 引导的从句，谓语动词用单数形式。",
      example: "The price depends on the quality.",
      commonMistake: "误用复数形式 depend on。从句作主语，谓语动词看作单数。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 11,
    sentence: "We [0] at the party last night.",
    blanks: [
      {
        id: 0,
        correctAnswer: "enjoyed ourselves",
        options: ["enjoyed us", "enjoyed ourselves", "enjoyed ourself", "enjoyed ourselves'"],
      },
    ],
    explanation: {
      correctRule: "enjoy oneself 玩得开心。反身代词要与主语 We 保持一致，用 ourselves。",
      example: "Did you enjoy yourself at the concert?",
      commonMistake: "误用 enjoyed us。enjoy 后面接反身代词表示‘玩得开心’。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 12,
    sentence: "You [0] go to see a doctor at once.",
    blanks: [
      {
        id: 0,
        correctAnswer: "had better",
        options: ["had better to", "had better", "would better", "had best to"],
      },
    ],
    explanation: {
      correctRule: "had better do sth. 最好做某事。had better 后面直接接动词原形。",
      example: "You had better stay at home today.",
      commonMistake: "误用 had better to do。记住 had better 后面不带 to。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 13,
    sentence: "I'm looking forward [0] from you soon.",
    blanks: [
      {
        id: 0,
        correctAnswer: "to hearing",
        options: ["to hear", "to hearing", "for hearing", "at hearing"],
      },
    ],
    explanation: {
      correctRule: "look forward to doing sth. 期待做某事。这里的 to 是介词，后面必须接动名词。",
      example: "We are looking forward to visiting the Great Wall.",
      commonMistake: "误用 to hear。这是学生最容易混淆的‘to’（不定式符号 vs 介词）考点之一。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.NON_FINITE,
  },
  {
    id: 14,
    sentence: "Don't worry. Everyone [0] sometimes.",
    blanks: [
      {
        id: 0,
        correctAnswer: "makes mistakes",
        options: ["make mistake", "makes mistake", "make mistakes", "makes mistakes"],
      },
    ],
    explanation: {
      correctRule: "make a mistake / make mistakes 犯错误。Everyone 是不定代词，谓语动词用单数形式。",
      example: "It's easy to make mistakes when you are tired.",
      commonMistake: "误用复数谓语 make。Everyone, someone 等代词作主语时谓语用单数。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.CONJUNCTION,
  },
  {
    id: 15,
    sentence: "I prefer [0] at home to [1] out on such a rainy day.",
    blanks: [
      {
        id: 0,
        correctAnswer: "staying",
        options: ["stay", "to stay", "staying", "stayed"],
      },
      {
        id: 1,
        correctAnswer: "going",
        options: ["go", "to go", "going", "gone"],
      },
    ],
    explanation: {
      correctRule: "prefer doing A to doing B 宁愿做A而不愿做B。to 是介词，两边都用动名词形式。",
      example: "I prefer swimming to skating.",
      commonMistake: "误用 prefer to do... to do...。注意 prefer... to... 结构中 A 和 B 的形式一致性。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.NON_FINITE,
  },
  {
    id: 16,
    sentence: "The box is [0] heavy for the little girl [1] carry.",
    blanks: [
      {
        id: 0,
        correctAnswer: "too",
        options: ["so", "too", "very", "quite"],
      },
      {
        id: 1,
        correctAnswer: "to",
        options: ["that", "for", "to", "and"],
      },
    ],
    explanation: {
      correctRule: "too... to... 太...而不能...。这是一个表示否定意义的固定结构。",
      example: "He is too young to go to school.",
      commonMistake: "误用 so... that... 但没加否定词。too... to... 自带否定意义。",
    },
    difficulty: Difficulty.JUNIOR,
    category: GrammarCategory.ADVERBIAL_CLAUSE,
  }
];
