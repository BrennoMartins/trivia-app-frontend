export type Question = {
  id: string
  prompt: string
  options: string[]
  correctOptionIndex: number
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Qual planeta é conhecido como Planeta Vermelho?',
    options: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
    correctOptionIndex: 1,
  },
  {
    id: 'q2',
    prompt: 'Qual é o maior mamífero do mundo?',
    options: ['Elefante africano', 'Tubarão-baleia', 'Baleia-azul', 'Girafa'],
    correctOptionIndex: 2,
  },
  {
    id: 'q3',
    prompt: 'Quantos continentes existem no planeta Terra?',
    options: ['5', '6', '7', '8'],
    correctOptionIndex: 2,
  },
  {
    id: 'q4',
    prompt: 'Quantos gols Rogerio Ceni fez em sua Carreira?',
    options: ['131', '105', '115', '127'],
    correctOptionIndex: 0,
  },
  {
    id: 'q5',
    prompt: 'Um paciente apresenta uma frequência respiratória de 28 incursões respiratórias por minuto (irpm). Qual é o termo técnico correto para descrever?',
    options: ['Eupneia', 'Bradipneia', 'Taquipneia', 'Apneia'],
    correctOptionIndex: 2,
  },
  {
    id: 'q6',
    prompt: 'Em um prontuário de enfermagem, o que significa a sigla PA?',
    options: ['Pressão arterial', 'Pulso arterial', 'Procedimento ambulatorial', 'Padrão alimentar'],
    correctOptionIndex: 0,
  },
  {
    id: 'q7',
    prompt: 'Qual gás as plantas absorvem da atmosfera durante a fotossíntese?',
    options: ['Oxigênio', 'Nitrogênio', 'Hidrogênio', 'Dióxido de carbono'],
    correctOptionIndex: 3,
  },
  {
    id: 'q8',
    prompt: 'Qual é o menor país do mundo em território?',
    options: ['Mônaco', 'Vaticano', 'San Marino', 'Liechtenstein'],
    correctOptionIndex: 1,
  },
  {
    id: 'q9',
    prompt: 'Qual é o oceano que banha a costa leste do Brasil?',
    options: ['Oceano Pacífico', 'Oceano Índico', 'Oceano Atlântico', 'Oceano Ártico'],
    correctOptionIndex: 2,
  },
  {
    id: 'q10',
    prompt: 'Em que ano ocorreu a Proclamação da República no Brasil?',
    options: ['1822', '1889', '1930', '1964'],
    correctOptionIndex: 1,
  },
  {
    id: 'q11',
    prompt: 'Qual bioma é caracterizado por apresentar árvores com raízes aéreas (pneumatóforos) e ser considerado um berçário da vida marinha?',
    options: ['Mata de Araucária', 'Manguezal', 'Caatinga', 'Pantanal'],
    correctOptionIndex: 1,
  },
  {
    id: 'q12',
    prompt: 'Nome da maior cachoeira do mundo em queda livre?',
    options: ['Cataratas do Iguaçu', 'Angel Falls', 'Cachoeira do El Dorado', 'Salto del Laja'],
    correctOptionIndex: 1,
  },
  {
    id: 'q13',
    prompt: 'Intelli é a camisa que visto com amor, Intelli Intelli Intelli a força do...?',
    options: ['Amor', 'Torcedor', 'Interior', 'Jogador'],
    correctOptionIndex: 2,
  },
  {
    id: 'q14',
    prompt: 'Qual componente é responsável por recarregar a bateria enquanto o motor está ligado?',
    options: ['Radiador', 'Alternador', 'Catalisador', 'Amortecedor'],
    correctOptionIndex: 1,
  },
  {
    id: 'q15',
    prompt: 'Qual a marca de carro mais vendida no mundo?',
    options: [
      'Ford',
      'Toyota',
      'Honda',
      'Volkswagen',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'q16',
    prompt: 'Quem marcou o quinto gol da Alemanha no 7x1?',
    options: ['Müller', 'Klose', 'Khedira', 'Schürrle'],
    correctOptionIndex: 2,
  },
  {
    id: 'q17',
    prompt: 'Qual clube conquistou a Copa Libertadores de 2019?',
    options: ['Palmeiras', 'Flamengo', 'River Plate', 'Gremio'],
    correctOptionIndex: 1,
  },
  {
    id: 'q18',
    prompt: 'Qual é o nome oficial do estádio conhecido popularmente como Maracanã?',
    options: [
      'Estádio Governador Magalhães Pinto',
      'Estádio Mauricio Leite de Morais',
      'Estádio Jornalista Mário Filho',
      'Estádio Doctor Oswaldo Teixeira Duarte',
    ],
    correctOptionIndex: 2,
  },
  {
    id: 'q19',
    prompt: 'Qual foi o primeiro destino que Brenno e Rosana Lis viajaram juntos',
    options: [
      'Arraial do Cabo',
      'Paris',
      'Liverpool',
      'Rotterdam',
    ],
    correctOptionIndex: 2,
  },
  {
    id: 'q20',
    prompt: 'Em que ano mudamos para Santo André?',
    options: ['2020', '2021', '2022', '2023'],
    correctOptionIndex: 1,
  },
  {
    id: 'q21',
    prompt: 'Qual a profissão do Brenno?',
    options: [
      'Arquiteto de Software',
      'Engenheiro de Dados',
      'Engenheiro de Software',
      'Analista de Cibersegurança',
    ],
    correctOptionIndex: 2,
  },
  {
    id: 'q22',
    prompt: 'Qual é a capital do Canadá?',
    options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    correctOptionIndex: 1,
  },
  {
    id: 'q23',
    prompt: 'Qual é a capital da Austrália?',
    options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
    correctOptionIndex: 1,
  },
  {
    id: 'q24',
    prompt: 'Qual é a capital da Suíça?',
    options: ['Zurique', 'Genebra', 'Berna', 'Basileia'],
    correctOptionIndex: 2,
  },
  {
    id: 'q25',
    prompt: 'Como chama o mercadinho da Dona Madalena?',
    options: [
      'Madalena Ovos',
      'Aroma & Sabor',
      'Mercadinho da Mada',
      'Madalena Ovos & Pimentas ',
    ],
    correctOptionIndex: 1,
  },
  {
    id: 'q26',
    prompt: 'O que significa Guarulhos em sua origem no tupi?',
    options: ['Barrigudos', 'Terra do Garu', 'Arvore Sapucaia', 'Mangaba'],
    correctOptionIndex: 0,
  },
  {
    id: 'q27',
    prompt: 'Qual é o gentílico de quem nasce em Orlândia?',
    options: ['Orlandino', 'Orlandense', 'Orlandiano', 'Orlandinoense'],
    correctOptionIndex: 0,
  },
  {
    id: 'q28',
    prompt: 'Qual é o maior oceano do planeta Terra?',
    options: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Ártico', 'Oceano Pacífico'],
    correctOptionIndex: 3,
  },
  {
    id: 'q29',
    prompt: 'Quantos planetas existem no Sistema Solar?',
    options: ['7', '8', '9', '10'],
    correctOptionIndex: 1,
  },
  {
    id: 'q30',
    prompt: 'Qual é o metal líquido em temperatura ambiente?',
    options: ['Ferro', 'Mercúrio', 'Alumínio', 'Cobre'],
    correctOptionIndex: 1,
  },
  {
    id: 'q0',
    prompt: 'Quando o Marrone ficou sabendo sobre o bebe, o que ele disse?',
    options: ['Au', 'Auau', 'Auauau', 'Auuuuuuuu'],
    correctOptionIndex: 5,
  },  
]