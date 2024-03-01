const mailchimp = require("@mailchimp/mailchimp_transactional")(
	"md-4J8ZHs6KJNWocvvTWKWFxg"
  );

async function sendEmail(fromEmail, userEmail, subject, html){
	const message = {
		from_email: fromEmail,
		subject: subject,
		html: html,
		to: [
			{
			email: userEmail,
			type: "to"
			}
		]
	};

	const response = await mailchimp.messages.send({
		message
	});
	console.log("Email status", response);
	return response;
}

module.exports={
	sendEmail
};