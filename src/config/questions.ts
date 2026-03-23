export type Question = {
  id: string
  prompt: string
  options: string[]
  correctOptionIndex: number
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Qual é o sobrenome da Rachel?',
    options: ['Green', 'Geller', 'Bing', 'Buffay'],
    correctOptionIndex: 0,
  },
  {
    id: 'q2',
    prompt: 'Qual personagem trabalha como paleontólogo?',
    options: ['Ross', 'Joey', 'Chandler', 'Mike'],
    correctOptionIndex: 0,
  },
  {
    id: 'q3',
    prompt: 'Qual é o nome do café onde o grupo se encontra com frequência?',
    options: ['Central Perk', 'Central Park Café', 'Perk House', 'Coffee & Friends'],
    correctOptionIndex: 1,
  },
  {
    id: 'q4',
    prompt: 'Qual é o nome do macaco de estimação do Ross?',
    options: ['Marcel', 'Milo', 'Marty', 'Max'],
    correctOptionIndex: 0,
  },
  {
    id: 'q5',
    prompt: 'Qual é o trabalho principal da Monica no início da série?',
    options: ['Advogada', 'Chef de cozinha', 'Professora', 'Jornalista'],
    correctOptionIndex: 1,
  },
  {
    id: 'q6',
    prompt: 'Qual personagem diz a famosa frase “How you doin’?”',
    options: ['Chandler', 'Ross', 'Joey', 'Gunther'],
    correctOptionIndex: 2,
  },
  {
    id: 'q7',
    prompt: 'Qual instrumento a Phoebe costuma tocar?',
    options: ['Piano', 'Violão', 'Violino', 'Bateria'],
    correctOptionIndex: 1,
  },
  {
    id: 'q8',
    prompt: 'Qual é o nome da música mais famosa da Phoebe?',
    options: ['Smelly Cat', 'Crazy Cat', 'Lonely Cat', 'Funny Cat'],
    correctOptionIndex: 0,
  },
  {
    id: 'q9',
    prompt: 'Em qual cidade a série FRIENDS se passa?',
    options: ['Los Angeles', 'Chicago', 'Boston', 'Nova York'],
    correctOptionIndex: 2,
  },
  {
    id: 'q10',
    prompt: 'Qual é o sobrenome do Chandler?',
    options: ['Tribbiani', 'Bing', 'Geller', 'Burke'],
    correctOptionIndex: 1,
  },
  {
    id: 'q11',
    prompt: 'Qual é o nome do vizinho apaixonado por Rachel que trabalha no Central Perk?',
    options: ['Paolo', 'Richard', 'Gunther', 'Tag'],
    correctOptionIndex: 2,
  },
  {
    id: 'q12',
    prompt: 'Qual personagem era colega de quarto da Monica no início da série?',
    options: ['Rachel', 'Phoebe', 'Janice', 'Carol'],
    correctOptionIndex: 0,
  },
  {
    id: 'q13',
    prompt: 'Qual personagem é irmão da Monica?',
    options: ['Joey', 'Ross', 'Mike', 'Gunther'],
    correctOptionIndex: 1,
  },
  {
    id: 'q14',
    prompt: 'Qual personagem é conhecida por seu jeito excêntrico e espiritual?',
    options: ['Phoebe', 'Rachel', 'Monica', 'Emily'],
    correctOptionIndex: 3,
  },
  {
    id: 'q15',
    prompt: 'Qual casal principal termina junto no final da série?',
    options: ['Monica e Joey', 'Rachel e Ross', 'Phoebe e Ross', 'Janice e Chandler'],
    correctOptionIndex: 1,
  },
  {
    id: 'q16',
    prompt: 'Qual personagem se casa com Monica?',
    options: ['Ross', 'Chandler', 'Joey', 'Richard'],
    correctOptionIndex: 1,
  },
  {
    id: 'q17',
    prompt: 'Qual personagem frequentemente usa sarcasmo no grupo?',
    options: ['Ross', 'Chandler', 'Joey', 'Mike'],
    correctOptionIndex: 1,
  },
  {
    id: 'q18',
    prompt: 'Qual personagem é ator e divide apartamento com Chandler no início?',
    options: ['Ross', 'Joey', 'Gunther', 'Tag'],
    correctOptionIndex: 1,
  },
  {
    id: 'q19',
    prompt: 'Como se chama o ex-marido da Carol?',
    options: ['Richard', 'Ross', 'Mike', 'Ben'],
    correctOptionIndex: 2,
  },
  {
    id: 'q20',
    prompt: 'Qual é o nome do filho de Ross com Carol?',
    options: ['Ben', 'Jack', 'Emma', 'Noah'],
    correctOptionIndex: 0,
  },
  {
    id: 'q21',
    prompt: 'Qual é o nome da filha de Rachel e Ross?',
    options: ['Amy', 'Emma', 'Ella', 'Erica'],
    correctOptionIndex: 1,
  },
  {
    id: 'q22',
    prompt: 'Qual personagem trabalha com moda?',
    options: ['Rachel', 'Monica', 'Phoebe', 'Janice'],
    correctOptionIndex: 0,
  },
  {
    id: 'q23',
    prompt: 'Qual personagem trabalha em cozinhas e restaurantes ao longo da série?',
    options: ['Rachel', 'Monica', 'Phoebe', 'Emily'],
    correctOptionIndex: 1,
  },
  {
    id: 'q24',
    prompt: 'Qual personagem se casa com Mike Hannigan?',
    options: ['Rachel', 'Monica', 'Phoebe', 'Janice'],
    correctOptionIndex: 2,
  },
  {
    id: 'q25',
    prompt: 'Qual destes personagens NÃO faz parte do grupo principal de seis amigos?',
    options: ['Gunther', 'Ross', 'Joey', 'Phoebe'],
    correctOptionIndex: 0,
  },
  {
    id: 'q26',
    prompt: 'Qual personagem costuma ter relacionamentos com Janice?',
    options: ['Ross', 'Joey', 'Chandler', 'Mike'],
    correctOptionIndex: 2,
  },
  {
    id: 'q27',
    prompt: 'Qual é o nome da irmã da Rachel que aparece na série?',
    options: ['Amy', 'Emily', 'Susan', 'Nora'],
    correctOptionIndex: 0,
  },
  {
    id: 'q28',
    prompt: 'Qual personagem adora sanduíches e fica bravo quando pegam o dele?',
    options: ['Joey', 'Ross', 'Chandler', 'Gunther'],
    correctOptionIndex: 1,
  },
  {
    id: 'q29',
    prompt: 'Qual personagem costuma cantar “Smelly Cat”?',
    options: ['Monica', 'Rachel', 'Phoebe', 'Carol'],
    correctOptionIndex: 2,
  },
  {
    id: 'q30',
    prompt: 'Quantas temporadas tem FRIENDS?',
    options: ['8', '9', '10', '11'],
    correctOptionIndex: 2,
  },
  {
    id: 'q31',
    prompt: 'Qual personagem diz “We were on a break!”?',
    options: ['Ross', 'Joey', 'Chandler', 'Mike'],
    correctOptionIndex: 0,
  },
  {
    id: 'q32',
    prompt: 'Quem mora no apartamento de frente para o da Monica na maior parte da série?',
    options: ['Ross e Gunther', 'Chandler e Joey', 'Phoebe e Rachel', 'Mike e Ross'],
    correctOptionIndex: 1,
  },
]