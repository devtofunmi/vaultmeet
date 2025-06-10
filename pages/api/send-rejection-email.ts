import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { to, name } = await req.json()

  try {
    const data = await resend.emails.send({
      from: 'VaultMeet <vaultmeet@gmail.com>',
      to,
      subject: 'Update on Your VaultMeet Application',
      html: `
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <p>Hi <strong>${name}</strong>,</p>

    <p>Thank you for your interest in <strong>VaultMeet</strong> and for submitting your application.</p>

    <p>After a thorough review by our team, we’ve found that the payment proof submitted with your application could not be verified as valid.</p>

    <p>We take the integrity of our platform seriously and ensure every submission meets our verification standards. Unfortunately, based on our checks, your payment documentation did not meet the required authenticity criteria.</p>

    <p>If you believe this was a mistake or would like to submit a valid proof of payment for reconsideration, you’re welcome to reply to this email or contact our team directly at <a href="mailto:vaultmeet@gmail.com">vaultmeet@gmail.com</a>.</p>

    <p>We appreciate your understanding and encourage transparency and honesty in all applications.</p>

    <p>Warm regards,<br/><strong>VaultMeet Team</strong></p>

    <p style="font-size: 14px; color: #777;">
      <a href="https://vaultmeet.netlify.app/" target="_blank">https://vaultmeet.netlify.app/</a><br/>
      Confidential. Secure. Curated Connections.
    </p>
  </div>
`,

    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error })
  }
}
