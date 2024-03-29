import sgMail from "@sendgrid/mail";

import type {
  ContactMessagePayload,
  StrapiContactMessageResponse,
} from "./types";

export const postContactMessage = async (
  data: ContactMessagePayload
): Promise<StrapiContactMessageResponse> => {
  const response = await fetch(
    `${process.env.STRAPI_BASEURL}/api/contact-messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

export const getContactPage = async () => {
  return await fetch(
    `${process.env.STRAPI_BASEURL}/api/contact?populate=deep`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// create assesment is modified from https://cloud.google.com/recaptcha-enterprise/docs/create-assessment#rest-api with node js error handling
export const createAssessment = async (token: string) => {
  // build the assesment request - hardcoded is fine for now
  const expectedAction = "contact";
  const projectID = "alchemist-1671430214352";
  const siteKey = "6LeL9o0jAAAAANddsjQmD7-Xls1boV7i1DumFVfE";
  const apiKey = process.env.CAPTCHA_API_KEY;
  const requestBody = {
    event: {
      token,
      siteKey,
      expectedAction,
    },
  };

  // fetch the assessment
  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  const responseBody = await response.json();

  // Check if the token is valid.
  if (!responseBody.tokenProperties?.valid) {
    console.log(
      "The CreateAssessment call failed because the token was: " +
        responseBody.tokenProperties?.invalidReason
    );

    return false;
  }

  // Check if the expected action was executed.
  if (responseBody.event.expectedAction === expectedAction) {
    // Get the risk score and the reason(s).
    // For more information on interpreting the assessment,
    // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    console.log("The reCAPTCHA score is: " + responseBody.riskAnalysis?.score);

    responseBody.riskAnalysis?.reasons?.forEach((reason: string) => {
      console.log(reason);
    });
    return responseBody.riskAnalysis?.score || false;
  }

  console.log(
    "The action attribute in your reCAPTCHA tag " +
      "does not match the action you are expecting to score"
  );
  return false;
};

// sendConfirmationEmail sends a confirmation email to the user using sendgrid
export const sendConfirmationEmail = async (
  emailTo: string,
  subject: string,
  htmlContent: string
) => {
  const fromEmail = process.env.FROM_EMAIL;
  console.log(fromEmail);
  if (!fromEmail) {
    return new Error("Error sending email - FROM_EMAIL not set");
  }

  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendGridApiKey) {
    return new Error("Error sending email - SENDGRID_API_KEY not set");
  }

  const emailBody = {
    to: emailTo,
    from: fromEmail,
    subject,
    html: htmlContent,
  };

  try {
    sgMail.setApiKey(sendGridApiKey);
    const response = await sgMail.send(emailBody);
    if (response[0].statusCode !== 202) {
      return new Error(`Error sending email - ${response[0].body}`);
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Error("Error sending email");
  }
};
