import { Accounts } from 'meteor/accounts-base';


Accounts.emailTemplates.siteName = 'Freek';
Accounts.emailTemplates.from = 'Freek Accounts <accounts@freek.org>';

Accounts.emailTemplates.resetPassword = {
    subject() {
        return 'Resetea tu contraseña en Freek';
    },
    text(user, url) {
        return `Hola!
Haz clic en el enlace siguiente para resetear tu contraseña en Freek.
${url}
Si tu no has pedido este email, por favor, ignóralo.
Gracias,
Rubén Fernández
`;
    },
//   html(user, url) {
//     return `
//       XXX Generating HTML emails that work across different email clients is a very complicated
//       business that we're not going to solve in this particular example app.
//
//       A good starting point for making an HTML email could be this responsive email boilerplate:
//       https://github.com/leemunroe/responsive-html-email-template
//
//       Note that not all email clients support CSS, so you might need to use a tool to inline
//       all of your CSS into style attributes on the individual elements.
// `
//   }
};
