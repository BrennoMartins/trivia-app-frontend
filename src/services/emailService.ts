import emailjs from '@emailjs/browser'
import { buildRevealEmailHtml } from '../config/emailTemplate'

type SendRevealEmailParams = {
  toEmail: string
  playerName: string
  result: string
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function sendRevealEmail({ toEmail, playerName, result }: SendRevealEmailParams) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Configuração de email ausente. Defina as variáveis VITE_EMAILJS_* no .env')
  }

  const messageHtml = buildRevealEmailHtml({ playerName, result })

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: toEmail,
      player_name: playerName,
      reveal_result: result,
      subject: 'Resultado da Revelação',
      message_html: messageHtml,
    },
    {
      publicKey,
    },
  )
}
