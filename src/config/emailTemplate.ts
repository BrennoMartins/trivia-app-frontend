type RevealEmailTemplateParams = {
  playerName: string
  result: string
}

export function buildRevealEmailHtml({ playerName, result }: RevealEmailTemplateParams): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #fff7fc; padding: 24px; color: #5f6ea5;">
      <div style="max-width: 560px; margin: 0 auto; background: linear-gradient(145deg, #ecf6ff 0%, #ffe9f4 100%); border: 1px solid #dfe9ff; border-radius: 16px; padding: 24px;">
        <h1 style="margin: 0 0 12px; font-size: 28px; color: #4a5f9e;">Resultado da Revelação</h1>
        <p style="margin: 0 0 10px; font-size: 16px;">Olá, ${playerName}!</p>
        <p style="margin: 0 0 18px; font-size: 16px;">Você concluiu o quiz e chegou ao resultado final.</p>
        <div style="padding: 14px 16px; border-radius: 12px; background: #fce7f3; border: 1px solid #b9d4ff;">
          <p style="margin: 0; font-size: 14px; color: #6f7eb3;">Resultado:</p>
          <p style="margin: 2px 0 0; font-size: 30px; font-weight: 700; color: #f093c6;">${result}</p>
        </div>
      </div>
    </div>
  `
}
