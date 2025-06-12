import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  const { to, name } = req.body

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    })

    const html = `
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
    `

    const mailOptions = {
      from: `"VaultMeet" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Update on Your VaultMeet Application',
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true, info })
  } catch (error: any) {
    console.error('Email sending failed:', error)
    return res.status(500).json({ success: false, error: error?.message || 'Unknown error' })
  }
}
