import nodemailer from "nodemailer";
import { Employee } from '../entities/Employee'

export async function sendHolidayStatusUpdate(to: Employee, mailer: any, from: Employee, isApproved: boolean, comment: string) {
      let msg = "<h3> Hello " + to.firstName + ' ' + to.lastName + "<h3>"

			let approved = "<p> Your holiday request has been approved <p>" 
			let denied = "<p> Your holiday request has been denied <p>" 
			denied = denied + "<p> Reason: " + comment + "</p>"
			

      //@ts-ignore
      let info = await mailer.sendMail({
        from: '"' + from.firstName + ' ' + from.lastName + '" <' + from.email +  '>',
        to: to.email,
        subject: "Holiday status update", 
        text: "Holiday status update", 
				html: (isApproved) ? msg + approved : msg + denied,
      });

      console.log("Message sent: " + info.messageId);
      console.log(nodemailer.getTestMessageUrl(info));
}

export async function sendVerificationMail(to: string, mailer: any) {
      let msg =
        "<h3> Hello " +
        to.split("@")[0] +
        "<h3>" +
        '<a href="http://localhost:3000/verify/' +
        to +
        '">' +
        "Confirm Account" +
        "</a>";

      //@ts-ignore
      let info = await mailer.sendMail({
        from: '"Barry Littel 👻" <barry85@ethereal.email>', // sender address
        to: to,
        subject: "Confirm your account ✔", // Subject line
        text: "Confirm your account", // plain text body
        html: msg,
      });

      console.log("Message sent: " + info.messageId);
      console.log(nodemailer.getTestMessageUrl(info));
}

export async function sendEmail(to: string, html: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "mds43vi6nviwucqv@ethereal.email", // generated ethereal user
      pass: "xJsQzVAuFYKqx5xUR9", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "Change password", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
