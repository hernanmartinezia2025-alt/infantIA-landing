import express from 'express';
import { createServer as createViteServer } from "vite";
import path from "path";
import { config } from 'dotenv';
import { Resend } from 'resend';

config(); // Load .env

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Email HTML builder ───────────────────────────────────────

function buildEmailHtml(data: {
  childName: string;
  childAge: number;
  primaryProfileName: string;
  primaryProfileIcon: string;
  primaryProfileTagline: string;
  primaryProfileDescription: string;
  primaryProfileColor: string;
  secondaryProfileName: string | null;
  secondaryProfileIcon: string | null;
  strengths: string[];
  challenges: string[];
  adaptations: string[];
  scores: Record<string, number>;
  confidence: string;
}): string {
  const dimensionLabels: Record<string, string> = {
    visual: 'Visual', narrativo: 'Narrativo', exploratorio: 'Explorador',
    guiado: 'Guiado', social: 'Social', ritmico: 'Rítmico',
  };

  const scoreBars = Object.entries(data.scores)
    .sort(([, a], [, b]) => b - a)
    .map(([dim, score]) => `
      <tr>
        <td style="padding:4px 8px 4px 0;font-size:13px;color:#475569;width:90px;">${dimensionLabels[dim] ?? dim}</td>
        <td style="padding:4px 0;">
          <div style="background:#e2e8f0;border-radius:99px;height:10px;width:200px;">
            <div style="background:#6366f1;border-radius:99px;height:10px;width:${score * 2}px;"></div>
          </div>
        </td>
        <td style="padding:4px 0 4px 8px;font-size:13px;color:#6366f1;font-weight:700;">${score}%</td>
      </tr>`).join('');

  const listItems = (items: string[]) =>
    items.map(i => `<li style="margin-bottom:6px;color:#475569;font-size:14px;">${i}</li>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Perfil de aprendizaje de ${data.childName}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px 40px 32px;text-align:center;">
            <div style="font-size:56px;margin-bottom:12px;">${data.primaryProfileIcon}</div>
            <p style="color:#c7d2fe;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Perfil de aprendizaje de</p>
            <h1 style="color:#ffffff;font-size:32px;font-weight:900;margin:0 0 8px;">${data.childName}</h1>
            <h2 style="color:#c7d2fe;font-size:18px;font-weight:400;margin:0;">${data.primaryProfileName}</h2>
          </td>
        </tr>

        <!-- Profile description -->
        <tr>
          <td style="padding:32px 40px 0;">
            <div style="background:linear-gradient(135deg,${data.primaryProfileColor}22,${data.primaryProfileColor}11);border-left:4px solid ${data.primaryProfileColor};border-radius:12px;padding:20px 24px;">
              <p style="font-style:italic;color:#1e293b;font-size:15px;font-weight:600;margin:0 0 8px;">"${data.primaryProfileTagline}"</p>
              <p style="color:#475569;font-size:14px;line-height:1.7;margin:0;">${data.primaryProfileDescription}</p>
            </div>
            ${data.secondaryProfileName ? `
            <p style="font-size:13px;color:#94a3b8;margin:16px 0 0;">
              Perfil secundario: <strong style="color:#64748b;">${data.secondaryProfileIcon} ${data.secondaryProfileName}</strong>
            </p>` : ''}
          </td>
        </tr>

        <!-- Scores -->
        <tr>
          <td style="padding:32px 40px 0;">
            <h3 style="color:#1e293b;font-size:16px;font-weight:800;margin:0 0 16px;">📊 Mapa de dimensiones</h3>
            <table cellpadding="0" cellspacing="0">${scoreBars}</table>
          </td>
        </tr>

        <!-- Strengths -->
        <tr>
          <td style="padding:24px 40px 0;">
            <div style="background:#f0fdf4;border-radius:12px;padding:20px 24px;">
              <h4 style="color:#15803d;font-size:14px;font-weight:800;margin:0 0 12px;">💪 Fortalezas</h4>
              <ul style="margin:0;padding-left:20px;">${listItems(data.strengths)}</ul>
            </div>
          </td>
        </tr>

        <!-- Challenges -->
        <tr>
          <td style="padding:16px 40px 0;">
            <div style="background:#fffbeb;border-radius:12px;padding:20px 24px;">
              <h4 style="color:#92400e;font-size:14px;font-weight:800;margin:0 0 12px;">🧩 Desafíos a tener en cuenta</h4>
              <ul style="margin:0;padding-left:20px;">${listItems(data.challenges)}</ul>
            </div>
          </td>
        </tr>

        <!-- Adaptations -->
        <tr>
          <td style="padding:16px 40px 0;">
            <div style="background:#eef2ff;border-radius:12px;padding:20px 24px;">
              <h4 style="color:#3730a3;font-size:14px;font-weight:800;margin:0 0 12px;">🚀 Cómo InfantIA adapta el aprendizaje</h4>
              <ul style="margin:0;padding-left:20px;">${listItems(data.adaptations)}</ul>
            </div>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 40px 40px;text-align:center;">
            <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:16px;padding:28px;">
              <p style="color:#ffffff;font-size:16px;font-weight:700;margin:0 0 20px;line-height:1.5;">
                Cuando InfantIA abra sus puertas, el recorrido de ${data.childName} estará pensado exactamente para su forma de aprender.
              </p>
              <a href="https://infantia.app" style="background:#fbbf24;color:#78350f;font-weight:900;padding:14px 32px;border-radius:99px;text-decoration:none;font-size:15px;">¡Quiero acceso anticipado!</a>
            </div>
            <p style="color:#94a3b8;font-size:11px;margin:24px 0 0;line-height:1.6;">
              Este informe ofrece una orientación inicial sobre las preferencias de aprendizaje observadas. No constituye un diagnóstico psicológico ni pedagógico formal.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Express Server ───────────────────────────────────────────

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Backend is running!" });
  });

  // Send quiz report via email
  app.post("/api/send-report", async (req, res) => {
    const {
      email, childName, childAge,
      primaryProfileName, primaryProfileIcon, primaryProfileTagline, primaryProfileDescription, primaryProfileColor,
      secondaryProfileName, secondaryProfileIcon,
      strengths, challenges, adaptations,
      scores, confidence,
    } = req.body;

    if (!email || !childName) {
      res.status(400).json({ error: "email and childName are required" });
      return;
    }

    try {
      const html = buildEmailHtml({
        childName, childAge,
        primaryProfileName, primaryProfileIcon, primaryProfileTagline, primaryProfileDescription, primaryProfileColor,
        secondaryProfileName: secondaryProfileName || null,
        secondaryProfileIcon: secondaryProfileIcon || null,
        strengths, challenges, adaptations,
        scores, confidence,
      });

      const { data, error } = await resend.emails.send({
        from: 'InfantIA <noreply@infantia.kids>',
        to: email,
        subject: `🧠 El perfil de aprendizaje de ${childName} está listo`,
        html,
      });

      if (error) {
        console.error('Resend error:', error);
        res.status(500).json({ error: error.message });
        return;
      }

      console.log(`✉️  Email sent to ${email} — id: ${data?.id}`);
      res.json({ success: true, id: data?.id });
    } catch (err: any) {
      console.error('Email send failed:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();