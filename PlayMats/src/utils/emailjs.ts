import emailjs from '@emailjs/browser';
import { EmailFormMat, EmailForm } from 'src/utils/models';


/**
 * Init EmailJS
 * @param user_id string
 */
export const initEmailJS = (user_id:string) => {
  emailjs.init({
    publicKey: user_id,
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 1,
    },
  });
}


/**
 * Init and send email using EmailJS
 * @param user_id string
 * @param service_id string
 * @param template_id string
 * @param form form
 * @returns boolean
 */

export const sendEmail = async (user_id:string, service_id:string, template_id:string, form: Record<string, unknown>) => {

  if (!user_id || !service_id || !template_id || !form) {
    return null;
  }
  initEmailJS(user_id);
  let success = false;
  try {
    const response = await emailjs.send(
      service_id,
      template_id,
      form,
    );
    console.log('SUCCESS!', response.status, response.text);
    alert('Wiadomość wysłana pomyślnie!');
    success = true;
  } catch (error) {
    console.error('FAILED...', error);
    alert('Wystąpił błąd podczas wysyłania wiadomości.');
  } finally {
    return success;
  }
};


/**
 * Reset form
 * @param formType string
 * @returns form
 */
export const resetForm = (formType:string) => {
  if (formType === 'mat') {
    return emailMatForm;
  } else if (formType === 'email') {
    return emailForm;
  }
}

// Default form values
const emailMatForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
  size: '',
  matherial: '',
  doubleSided: false,
  doubleSidedDescription: '',
  quantity: 1
};

const emailForm = {
  name: '',
  email: '',
  message: ''
};