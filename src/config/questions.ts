export type Question = {
  id: string
  prompt: string
  options: string[]
  correctOptionIndex: number
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Qual é o maior oceano do planeta Terra?',
    options: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Ártico', 'Oceano Pacífico'],
    correctOptionIndex: 3,
  },
  {
    id: 'q2',
    prompt: 'Qual planeta é conhecido como Planeta Vermelho?',
    options: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
    correctOptionIndex: 1,
  },
  {
    id: 'q3',
    prompt: 'Qual é a capital da Austrália?',
    options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
    correctOptionIndex: 1,
  },
  {
    id: 'q4',
    prompt: 'Em que continente fica o Egito?',
    options: ['Ásia', 'Europa', 'África', 'Oceania'],
    correctOptionIndex: 2,
  },
  {
    id: 'q5',
    prompt: 'Quantos lados tem um hexágono?',
    options: ['5', '6', '7', '8'],
    correctOptionIndex: 1,
  },
  {
    id: 'q6',
    prompt: 'Quem pintou a Mona Lisa?',
    options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Michelangelo'],
    correctOptionIndex: 2,
  },
  {
    id: 'q7',
    prompt: 'Qual é o menor país do mundo?',
    options: ['Mônaco', 'Vaticano', 'San Marino', 'Liechtenstein'],
    correctOptionIndex: 1,
  },
  {
    id: 'q8',
    prompt: 'Qual gás as plantas absorvem da atmosfera para a fotossíntese?',
    options: ['Oxigênio', 'Nitrogênio', 'Hidrogênio', 'Dióxido de carbono'],
    correctOptionIndex: 3,
  },
  {
    id: 'q9',
    prompt: 'Qual país é famoso por ter inventado a pizza moderna?',
    options: ['França', 'Itália', 'Espanha', 'Grécia'],
    correctOptionIndex: 1,
  },
  {
    id: 'q10',
    prompt: 'Qual é o maior mamífero do mundo?',
    options: ['Elefante africano', 'Baleia-azul', 'Girafa', 'Orca'],
    correctOptionIndex: 1,
  },
  {
    id: 'q11',
    prompt: 'Qual é o idioma mais falado no mundo em número de nativos?',
    options: ['Inglês', 'Espanhol', 'Hindi', 'Mandarim'],
    correctOptionIndex: 3,
  },
  {
    id: 'q12',
    prompt: 'Qual é o rio mais extenso do mundo (de acordo com medições mais aceitas atualmente)?',
    options: ['Rio Nilo', 'Rio Amazonas', 'Rio Yangtzé', 'Rio Mississippi'],
    correctOptionIndex: 1,
  },
  {
    id: 'q13',
    prompt: 'Qual país sediou a Copa do Mundo de 2014?',
    options: ['Alemanha', 'África do Sul', 'Brasil', 'Rússia'],
    correctOptionIndex: 2,
  },
  {
    id: 'q14',
    prompt: 'Qual elemento químico tem o símbolo O?',
    options: ['Ouro', 'Osmônio', 'Oxigênio', 'Óxido'],
    correctOptionIndex: 2,
  },
  {
    id: 'q15',
    prompt: 'Qual é a moeda oficial do Japão?',
    options: ['Won', 'Yuan', 'Iene', 'Dólar'],
    correctOptionIndex: 2,
  },
  {
    id: 'q16',
    prompt: 'Qual deserto é o maior do mundo em área quente?',
    options: ['Saara', 'Kalahari', 'Gobi', 'Atacama'],
    correctOptionIndex: 0,
  },
  {
    id: 'q17',
    prompt: 'Qual é o planeta mais próximo do Sol?',
    options: ['Vênus', 'Marte', 'Mercúrio', 'Júpiter'],
    correctOptionIndex: 2,
  },
  {
    id: 'q18',
    prompt: 'Qual é a capital do Canadá?',
    options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    correctOptionIndex: 1,
  },
  {
    id: 'q19',
    prompt: 'Em que país ficam as pirâmides de Gizé?',
    options: ['México', 'Egito', 'Peru', 'Turquia'],
    correctOptionIndex: 1,
  },
  {
    id: 'q20',
    prompt: 'Qual é o maior órgão do corpo humano?',
    options: ['Fígado', 'Pulmão', 'Cérebro', 'Pele'],
    correctOptionIndex: 3,
  },
  {
    id: 'q21',
    prompt: 'Qual é o resultado de 12 x 8?',
    options: ['88', '92', '96', '98'],
    correctOptionIndex: 2,
  },
  {
    id: 'q22',
    prompt: 'Qual é a língua oficial do Brasil?',
    options: ['Espanhol', 'Português', 'Inglês', 'Francês'],
    correctOptionIndex: 1,
  },
  {
    id: 'q23',
    prompt: 'De qual país o K-POP se originou?',
    options: ['Japão', 'China', 'Coreia do Sul', 'Tailândia'],
    correctOptionIndex: 2,
  },
  {
    id: 'q24',
    prompt: 'Qual é o nome do fandom oficial do BTS?',
    options: ['Blink', 'ARMY', 'Once', 'Carat'],
    correctOptionIndex: 1,
  },
  {
    id: 'q25',
    prompt: 'Quantas integrantes tem o grupo BLACKPINK?',
    options: ['3', '4', '5', '6'],
    correctOptionIndex: 1,
  },
  {
    id: 'q26',
    prompt: 'Qual empresa é conhecida por gerenciar o BTS atualmente?',
    options: ['SM Entertainment', 'YG Entertainment', 'JYP Entertainment', 'HYBE'],
    correctOptionIndex: 3,
  },
  {
    id: 'q27',
    prompt: 'Qual destes grupos é da 2ª geração do K-POP?',
    options: ['NewJeans', 'IVE', 'Girls’ Generation (SNSD)', 'LE SSERAFIM'],
    correctOptionIndex: 2,
  },
  {
    id: 'q28',
    prompt: 'Qual é o nome do fandom oficial do TWICE?',
    options: ['Orbit', 'Reveluv', 'Insomnia', 'Once'],
    correctOptionIndex: 3,
  },
  {
    id: 'q29',
    prompt: 'Quantos integrantes tem o grupo SEVENTEEN?',
    options: ['13', '11', '17', '9'],
    correctOptionIndex: 0,
  },
  {
    id: 'q30',
    prompt: 'Em apresentações de K-POP, como geralmente é chamado o bastão de luz dos fãs?',
    options: ['Glow baton', 'Lightstick', 'Fanlamp', 'Neon stick'],
    correctOptionIndex: 1,
  },
  {
    id: 'q0',
    prompt: 'Quando o Marrone ficou sabendo sobre o bebe, o que ele disse?',
    options: ['Au', 'Auau', 'Auauau', 'Auuuuuuuu'],
    correctOptionIndex: 5,
  },  
]