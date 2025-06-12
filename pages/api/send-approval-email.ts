// pages/api/send-approval-email.ts
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

        <p>Thank you for applying on <strong>VaultMeet</strong> and completing your payment.</p>

        <p>We’ve received your application and our team is currently reviewing your submission to ensure everything meets our matching criteria.</p>

        <p><strong>What happens next:</strong></p>
        <ul>
          <li>Your profile will be reviewed within 24–48 hours.</li>
          <li>Once approved, we’ll match you with a verified candidate (Seeker/Sponsor).</li>
          <li>You’ll receive an invitation via email to schedule your confidential session using your provided Gmail.</li>
        </ul>

        <p>You’re one step closer to finding the right connection!</p>

        <p>If you have any questions or need support, feel free to reply to this email or contact our support team at <a href="mailto:vaultmeet@gmail.com">vaultmeet@gmail.com</a>.</p>

        <p>Warm regards, <br/><strong>VaultMeet Team</strong></p>

        <p style="font-size: 14px; color: #777;">
          <a href="https://vaultmeet.netlify.app/" target="_blank">https://vaultmeet.netlify.app/</a><br/>
          Confidential. Secure. Curated Connections.
        </p>
      </div>
    `

    const mailOptions = {
      from: `"VaultMeet" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'We’ve Received Your Application – VaultMeet',
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true, info })
  } catch (error: any) {
    console.error('Email sending failed:', error)
    return res.status(500).json({ success: false, error: error.message || 'Unknown error' })
  }
}
