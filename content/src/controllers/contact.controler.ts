import { transporter } from "../config/transporter.js";
import { contactService } from "../services/contact.service.js";


export const contactController = async (req: any, res: any) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const contactMessage = contactService(name, email, subject, message);

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Nouveau message de contact</h2>
          <p><strong>De:</strong> ${name} (${email})</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 10px;">
            ${message}
          </div>
          <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #94a3b8;">
            Ce message a également été enregistré dans votre tableau de bord admin.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Erreur lors de l'envoi de l'email: " + error.message);
      } else {
        res.status(201).json({ message: "Message de contact envoyé avec succès" });
      }
    });
    return res.status(201).json(contactMessage);
  } catch (error) {
    console.error("Erreur lors de la création du message de contact:", error);
    return res.status(500).json({ error: "Une erreur est survenue lors de l'envoi du message" });
  }
};