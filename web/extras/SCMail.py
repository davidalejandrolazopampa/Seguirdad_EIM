import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class SCMail:
    def __init__(self, receipt, pinstr):
        self.subject = "App <falta nombre> - PIN"
        self.content = "<p> Este es un <PIN> de seguridad super seguro</p>"
        self.receipt = receipt
        self.content = self.content.replace("<PIN>", pinstr)

    def send_email(self):
        message = Mail(
            from_email="raul.mosquera@utec.edu.pe",
            to_emails=self.receipt,
            subject=self.subject,
            html_content=self.content
        )
        #API_KEY = "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"
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))

            response = sg.send(message)
            if response.status_code == 202:
                print("Everything's Ok, mail sent to ", self.receipt)
                return "202"
            else:
                print(response.status_code)
                print(response.body)
                print(response.headers)
                return "403"

        except Exception as e:
            print(e.body)
            return "403"
