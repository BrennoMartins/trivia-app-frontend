import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ANSWER_FEEDBACK_MESSAGES } from './config/answerFeedbackMessages'
import { MOTIVATIONAL_MESSAGES } from './config/motivationalMessages'
import { QUESTIONS, type Question } from './config/questions'
import logo from './assets/Logo.png'
import successPhoto from './assets/sucess.jpg'
import errorPhoto from './assets/error.jpg'

const QUESTIONS_PER_ROUND = 10
const JOKER_QUESTION_ID = 'q0'
const FIRST_ROUND_NORMAL_QUESTIONS = QUESTIONS_PER_ROUND - 1
const REVEAL_RESULT = 'Menina'
const REVEAL_TIMER_SECONDS = 20
const QUESTION_TIMER_SECONDS = 30
const ANSWER_FEEDBACK_SECONDS = 1
const FINAL_REVEAL_DELAY_MS = 3000

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

function getRandomAnswerFeedbackMessage(): string {
  const randomIndex = Math.floor(Math.random() * ANSWER_FEEDBACK_MESSAGES.length)
  return ANSWER_FEEDBACK_MESSAGES[randomIndex]
}

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [hasUsedJoker, setHasUsedJoker] = useState(false)
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false)
  const [failureMessage, setFailureMessage] = useState(MOTIVATIONAL_MESSAGES[0])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([])
  const [timerSeconds, setTimerSeconds] = useState(REVEAL_TIMER_SECONDS)
  const [questionTimerSeconds, setQuestionTimerSeconds] = useState(QUESTION_TIMER_SECONDS)
  const [isAnswerFeedbackModalOpen, setIsAnswerFeedbackModalOpen] = useState(false)
  const [answerFeedbackSeconds, setAnswerFeedbackSeconds] = useState(ANSWER_FEEDBACK_SECONDS)
  const [answerFeedbackMessage, setAnswerFeedbackMessage] = useState(ANSWER_FEEDBACK_MESSAGES[0])
  const [pendingAnswer, setPendingAnswer] = useState<{ isCorrect: boolean; isJokerAttempt: boolean; isLastQuestion: boolean } | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isTimeExpiredModalOpen, setIsTimeExpiredModalOpen] = useState(false)
  const [isRevealResultVisible, setIsRevealResultVisible] = useState(false)

  const currentQuestion = useMemo(
    () => roundQuestions[currentQuestionIndex],
    [roundQuestions, currentQuestionIndex],
  )
  const isFirstAttemptFinalQuestion =
    Boolean(JOKER_QUESTION) && !hasUsedJoker && currentQuestionIndex === QUESTIONS_PER_ROUND - 1
  const displayedQuestion = isFirstAttemptFinalQuestion ? JOKER_QUESTION : currentQuestion
  const questionProgressPercentage = ((currentQuestionIndex + 1) / QUESTIONS_PER_ROUND) * 100
  const isQuestionTimerCritical = questionTimerSeconds > 0 && questionTimerSeconds <= 10
  const isFinalRevealScreen = gameStarted && hasWon && timerSeconds === 0
  const isQuestionTimerActive =
    gameStarted &&
    !hasWon &&
    Boolean(displayedQuestion) &&
    !isAnswerFeedbackModalOpen &&
    !isSuccessModalOpen &&
    !isFailureModalOpen &&
    !isTimeExpiredModalOpen

  const hasMinimumQuestions = BASE_QUESTIONS.length >= QUESTIONS_PER_ROUND

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  useEffect(() => {
    if (!hasWon) {
      setTimerSeconds(REVEAL_TIMER_SECONDS)
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
      setAnswerFeedbackSeconds(ANSWER_FEEDBACK_SECONDS)
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
    if (!isQuestionTimerActive) {
      return
    }

    const interval = setInterval(() => {
      setQuestionTimerSeconds((previous) => {
        if (previous <= 1) {
          return 0
        }
        return previous - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isQuestionTimerActive])

  useEffect(() => {
    if (questionTimerSeconds === 0 && isQuestionTimerActive) {
      setIsTimeExpiredModalOpen(true)
    }
  }, [questionTimerSeconds, isQuestionTimerActive])

  useEffect(() => {
    if (answerFeedbackSeconds === 0 && isAnswerFeedbackModalOpen && pendingAnswer) {
      setIsAnswerFeedbackModalOpen(false)
      processPendingAnswer()
    }
  }, [answerFeedbackSeconds, isAnswerFeedbackModalOpen, pendingAnswer])

  useEffect(() => {
    if (!isFinalRevealScreen) {
      setIsRevealResultVisible(false)
      return
    }

    const timeout = setTimeout(() => {
      setIsRevealResultVisible(true)
    }, FINAL_REVEAL_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [isFinalRevealScreen])

  function startGame() {
    if (!hasMinimumQuestions) {
      return
    }

    setRoundQuestions(getRandomQuestions(true))
    setCurrentQuestionIndex(0)
    setHasWon(false)
    setHasUsedJoker(false)
    setIsFailureModalOpen(false)
    setIsTimeExpiredModalOpen(false)
    setQuestionTimerSeconds(QUESTION_TIMER_SECONDS)
    setGameStarted(true)
  }

  function restartRound() {
    setRoundQuestions(getRandomQuestions(false))
    setCurrentQuestionIndex(0)
    setHasWon(false)
    setIsTimeExpiredModalOpen(false)
    setQuestionTimerSeconds(QUESTION_TIMER_SECONDS)
  }

  function openFailureModal() {
    setFailureMessage(getRandomMotivationalMessage())
    setIsFailureModalOpen(true)
  }

  function closeFailureModalAndRestart() {
    setIsFailureModalOpen(false)
    restartRound()
  }

  function closeTimeExpiredModalAndRestart() {
    setIsTimeExpiredModalOpen(false)
    restartRound()
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
    setQuestionTimerSeconds(QUESTION_TIMER_SECONDS)
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

    setAnswerFeedbackMessage(getRandomAnswerFeedbackMessage())
    setPendingAnswer({ isCorrect, isJokerAttempt, isLastQuestion })
    setIsAnswerFeedbackModalOpen(true)
  }

  return (
    <main className="quiz-page">
      <section className="quiz-card">
        <img className="quiz-logo" src={logo} alt="Logo do quiz" />
        {!isFinalRevealScreen && <h1>Responda e descubra se é 👶🏻♂️ ou 👶🏻♀️</h1>}

        {!hasMinimumQuestions && (
          <p className="status error">
            Adicione pelo menos {QUESTIONS_PER_ROUND} perguntas em{' '}
            <strong>src/config/questions.ts</strong>.
          </p>
        )}

        {!gameStarted && hasMinimumQuestions && (
          <>
            <div className="rules-box">
              <h2>Regras</h2>
              <ul>
                <li>São {QUESTIONS_PER_ROUND} perguntas para você mandar bem.</li>
                <li>Acertou todas? O sexo do bebê será revelado 🎉</li>
                <li>Errou alguma? Sem crise: volta para a pergunta 1.</li>
                <li>30s por pergunta ⏱️</li>
                <li>A cada rodada, as perguntas mudam para deixar mais divertido.</li>
                <li>Responda com calma e tente ganhar antes do bebê nascer 😊</li>
              </ul>
            </div>
            <button type="button" onClick={startGame}>
              Começar quiz
            </button>
          </>
        )}

        {gameStarted && !hasWon && displayedQuestion && (
          <div className="question-box">
            <p className="status">
              Pergunta {currentQuestionIndex + 1} de {QUESTIONS_PER_ROUND}
            </p>
            <div
              className="question-progress"
              role="progressbar"
              aria-label="Progresso das perguntas"
              aria-valuemin={1}
              aria-valuemax={QUESTIONS_PER_ROUND}
              aria-valuenow={currentQuestionIndex + 1}
            >
              <div
                className="question-progress-bar"
                style={{ width: `${questionProgressPercentage}%` }}
              />
            </div>
            <div className={`question-timer${isQuestionTimerCritical ? ' critical' : ''}`}>
              <span>{isQuestionTimerCritical ? 'Últimos segundos!' : 'Tempo para responder:'}</span>
              <strong>{formatTime(questionTimerSeconds)}</strong>
            </div>
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

        {gameStarted && hasWon && timerSeconds > 0 && (
          <div className="result-box">
            <h2>Parabéns!</h2>
            <p>Você acertou as 10 perguntas seguidas.</p>
            <div className="timer-section">
              <p>Preparando sua revelação...</p>
              <div className="timer-display">
                <span className="timer-number">{formatTime(timerSeconds)}</span>
              </div>
            </div>
          </div>
        )}

        {isFinalRevealScreen && (
          <div className="result-box reveal-result-box">
            <p className={`reveal-kicker${isRevealResultVisible ? ' settled' : ' waiting'}`}>Chegou a hora</p>
            <h2>Resultado da revelação</h2>
            <p className={`reveal-result${isRevealResultVisible ? ' visible' : ''}`}>{REVEAL_RESULT}</p>
          </div>
        )}

      </section>

      {isAnswerFeedbackModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card feedback-modal">
            <p className="feedback-message">{answerFeedbackMessage}</p>
            <div className="feedback-timer">
              <span className="feedback-timer-number">{answerFeedbackSeconds}</span>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="modal-card success-modal">
            <h2 id="success-title">Acertou! 🎉</h2>
            <img className="success-photo" src={successPhoto} alt="Comemoração" />
            <p>Você respondeu corretamente!</p>
            <button type="button" onClick={continueToNextQuestion}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {isFailureModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="failure-title">
          <div className="modal-card error-modal">
            <h2 id="failure-title">Não foi dessa vez</h2>
            <img className="error-photo" src={errorPhoto} alt="Tentativa para a próxima rodada" />
            <p>{failureMessage}</p>
            <button type="button" onClick={closeFailureModalAndRestart}>
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {isTimeExpiredModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="time-expired-title">
          <div className="modal-card error-modal">
            <h2 id="time-expired-title">Tempo esgotado!</h2>
            <img className="error-photo" src={errorPhoto} alt="Tempo expirado" />
            <p>O tempo para responder esta pergunta acabou.</p>
            <p>Você voltará para a primeira pergunta.</p>
            <button type="button" onClick={closeTimeExpiredModalAndRestart}>
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
