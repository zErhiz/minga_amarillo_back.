import { expect } from "chai";
import request from "supertest";
import nodemailer from "nodemailer";
import app from "../app.js";

let transporter;

before(() => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
         auth: {
             user: process.env.MAILING_EMAIL,
             pass: process.env.MAILING_PASSWORD
         }
     })
  });

  describe("Tests para el envío de correo", () => {
    it("Debería enviar un correo exitosamente", (done) => {
      const mailOptions = {
        from: "clifton.lowe67@ethereal.email",
        to: "007.cristian.sandoval@gmail.com",
        subject: "Asunto del correo",
        text: "Contenido del correo",
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo:", error);
          return done(error);
        }
        console.log("Correo enviado:", info.response);
        expect(info.response).to.contain("OK"); // Verifica que la respuesta contenga "OK"
        done(); // Llama a done() para finalizar la prueba
      });
    }).timeout(5000); // Aumenta el tiempo de espera para la prueba, si es necesario
  });