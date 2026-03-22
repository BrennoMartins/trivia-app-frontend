import { type FormEvent, useEffect, useMemo, useState } from 'react'
import './App.css'
import { MOTIVATIONAL_MESSAGES } from './config/motivationalMessages'
import { QUESTIONS, type Question } from './config/questions'
import { sendRevealEmail } from './services/emailService'

const QUESTIONS_PER_ROUND = 10
const JOKER_QUESTION_ID = 'q0'
const FIRST_ROUND_NORMAL_QUESTIONS = QUESTIONS_PER_ROUND - 1
const REVEAL_RESULT = 'Menina'

const JOKER_QUESTION = QUESTIONS.find((question) => question.id === JOKER_QUESTION_ID)
const BASE_QUESTIONS = QUESTIONS.filter((question) => question.id !== JOKER_QUESTION_ID)

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const temp = copy[index]
    copy[index] = copy[randomIndex]
    copy[randomIndex] = temp
  }

  return copy
}

function getRandomQuestions(includeJokerAtEnd: boolean): Question[] {
  if (includeJokerAtEnd && JOKER_QUESTION) {
    const normalQuestions = shuffle(BASE_QUESTIONS).slice(0, FIRST_ROUND_NORMAL_QUESTIONS)
    return [...normalQuestions, JOKER_QUESTION]
  }

  return shuffle(BASE_QUESTIONS).slice(0, QUESTIONS_PER_ROUND)
}

function getRandomMotivationalMessage(): string {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
  return MOTIVATIONAL_MESSAGES[randomIndex]
}

function App() {
  const [playerName, setPlayerName] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [hasUsedJoker, setHasUsedJoker] = useState(false)
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false)
  const [failureMessage, setFailureMessage] = useState(MOTIVATIONAL_MESSAGES[0])
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([])
  const [timerSeconds, setTimerSeconds] = useState(3600)
  const [isAnswerFeedbackModalOpen, setIsAnswerFeedbackModalOpen] = useState(false)
  const [answerFeedbackSeconds, setAnswerFeedbackSeconds] = useState(5)
  const [pendingAnswer, setPendingAnswer] = useState<{ isCorrect: boolean; isJokerAttempt: boolean; isLastQuestion: boolean } | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const currentQuestion = useMemo(
    () => roundQuestions[currentQuestionIndex],
    [roundQuestions, currentQuestionIndex],
  )
  const isFirstAttemptFinalQuestion =
    Boolean(JOKER_QUESTION) && !hasUsedJoker && currentQuestionIndex === QUESTIONS_PER_ROUND - 1
  const displayedQuestion = isFirstAttemptFinalQuestion ? JOKER_QUESTION : currentQuestion

  const canStart = playerName.trim().length > 0
  const hasMinimumQuestions = BASE_QUESTIONS.length >= QUESTIONS_PER_ROUND

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  useEffect(() => {
    if (!hasWon) {
      setTimerSeconds(3600)
      return
    }

    const interval = setInterval(() => {
      setTimerSeconds((previous) => {
        if (previous <= 1) {
          return 0
        }
        return previous - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hasWon])

  useEffect(() => {
    if (!isAnswerFeedbackModalOpen) {
      setAnswerFeedbackSeconds(5)
      return
    }

    const interval = setInterval(() => {
      setAnswerFeedbackSeconds((previous) => {
        if (previous <= 1) {
          return 0
        }
        return previous - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isAnswerFeedbackModalOpen])

  useEffect(() => {
    if (answerFeedbackSeconds === 0 && isAnswerFeedbackModalOpen && pendingAnswer) {
      setIsAnswerFeedbackModalOpen(false)
      processPendingAnswer()
    }
  }, [answerFeedbackSeconds, isAnswerFeedbackModalOpen, pendingAnswer])

  function startGame() {
    if (!canStart || !hasMinimumQuestions) {
      return
    }

    setRoundQuestions(getRandomQuestions(true))
    setCurrentQuestionIndex(0)
    setHasWon(false)
    setHasUsedJoker(false)
    setIsFailureModalOpen(false)
    setEmail('')
    setEmailError('')
    setEmailSent(false)
    setGameStarted(true)
  }

  function restartRound() {
    setRoundQuestions(getRandomQuestions(false))
    setCurrentQuestionIndex(0)
    setHasWon(false)
  }

  function startNewRound() {
    restartRound()
    setHasWon(false)
    setEmail('')
    setEmailError('')
    setEmailSent(false)
  }

  function openFailureModal() {
    setFailureMessage(getRandomMotivationalMessage())
    setIsFailureModalOpen(true)
  }

  function closeFailureModalAndRestart() {
    setIsFailureModalOpen(false)
    restartRound()
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!isValidEmail) {
      setEmailError('Digite um email válido para receber o resultado.')
      return
    }

    setEmailError('')
    setIsSendingEmail(true)

    try {
      await sendRevealEmail({
        toEmail: trimmedEmail,
        playerName: playerName.trim(),
        result: REVEAL_RESULT,
      })
      setEmailSent(true)
    } catch {
      setEmailError('Não foi possível enviar agora. Tente novamente em instantes.')
    } finally {
      setIsSendingEmail(false)
    }
  }

  function processPendingAnswer() {
    if (!pendingAnswer) return

    const { isCorrect, isJokerAttempt, isLastQuestion } = pendingAnswer

    if (isJokerAttempt || !isCorrect) {
      openFailureModal()
      setPendingAnswer(null)
      return
    }

    if (isLastQuestion) {
      setHasWon(true)
      setPendingAnswer(null)
      return
    }

    setIsSuccessModalOpen(true)
    setPendingAnswer(null)
  }

  function continueToNextQuestion() {
    setIsSuccessModalOpen(false)
    setCurrentQuestionIndex((previous) => previous + 1)
  }

  function handleAnswer(optionIndex: number) {
    if (!displayedQuestion) {
      return
    }

    const isJokerAttempt = isFirstAttemptFinalQuestion
    const isCorrect = optionIndex === displayedQuestion.correctOptionIndex
    const isLastQuestion = currentQuestionIndex === QUESTIONS_PER_ROUND - 1

    if (isJokerAttempt) {
      setHasUsedJoker(true)
    }

    setPendingAnswer({ isCorrect, isJokerAttempt, isLastQuestion })
    setIsAnswerFeedbackModalOpen(true)
  }

  return (
    <main className="quiz-page">
      <section className="quiz-card">
        <h1>Responda e descubra se é Menino ou Menina</h1>

        {!hasMinimumQuestions && (
          <p className="status error">
            Adicione pelo menos {QUESTIONS_PER_ROUND} perguntas em{' '}
            <strong>src/config/questions.ts</strong>.
          </p>
        )}

        {!gameStarted && hasMinimumQuestions && (
          <form
            className="name-form"
            onSubmit={(event) => {
              event.preventDefault()
              startGame()
            }}
          >
            <label htmlFor="player-name">Seu nome</label>
            <input
              id="player-name"
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Digite seu nome"
              autoComplete="name"
            />
            <button type="submit" disabled={!canStart}>
              Começar quiz
            </button>
          </form>
        )}

        {gameStarted && !hasWon && displayedQuestion && (
          <div className="question-box">
            <p className="status">
              Jogador: <strong>{playerName.trim()}</strong>
            </p>
            <p className="status">
              Pergunta {currentQuestionIndex + 1} de {QUESTIONS_PER_ROUND}
            </p>
            <h2>{displayedQuestion.prompt}</h2>

            <div className="options-grid">
              {displayedQuestion.options.map((option, index) => (
                <button
                  type="button"
                  key={`${displayedQuestion.id}-${option}`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameStarted && hasWon && !emailSent && timerSeconds > 0 && (
          <div className="result-box">
            <h2>Parabéns, {playerName.trim()}!</h2>
            <p>Você acertou as 10 perguntas seguidas.</p>
            <div className="timer-section">
              <p>Preparando sua revelação...</p>
              <div className="timer-display">
                <span className="timer-number">{formatTime(timerSeconds)}</span>
              </div>
            </div>
          </div>
        )}

        {gameStarted && hasWon && !emailSent && timerSeconds === 0 && (
          <div className="result-box">
            <h2>Parabéns, {playerName.trim()}!</h2>
            <p>Você acertou as 10 perguntas seguidas.</p>
            <p>Digite seu email para receber o resultado final.</p>

            <form className="email-form" onSubmit={handleEmailSubmit}>
              <label htmlFor="result-email">Seu email</label>
              <input
                id="result-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nome@exemplo.com"
                autoComplete="email"
              />
              {emailError && <p className="status error">{emailError}</p>}
              <button type="submit" disabled={isSendingEmail}>
                {isSendingEmail ? 'Enviando...' : 'Receber resultado por email'}
              </button>
            </form>
          </div>
        )}

        {gameStarted && hasWon && emailSent && (
          <div className="result-box">
            <h2>Email enviado com sucesso!</h2>
            <p>Enviamos o resultado da revelação para {email.trim()}.</p>
            <button type="button" onClick={startNewRound}>
              Jogar novamente
            </button>
          </div>
        )}

        {gameStarted && (
          <p className="help-text">
            Errou uma resposta? O quiz reinicia da pergunta 1 com novas perguntas aleatórias.
          </p>
        )}
      </section>

      {isAnswerFeedbackModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card feedback-modal">
            <p className="feedback-message">Sua resposta está sendo analisada...</p>
            <div className="feedback-timer">
              <span className="feedback-timer-number">{answerFeedbackSeconds}</span>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="modal-card">
            <h2 id="success-title">Acertou! 🎉</h2>
            <p>Você respondeu corretamente!</p>
            <button type="button" onClick={continueToNextQuestion}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {isFailureModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="failure-title">
          <div className="modal-card">
            <h2 id="failure-title">Não foi dessa vez</h2>
            <p>{failureMessage}</p>
            <button type="button" onClick={closeFailureModalAndRestart}>
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
