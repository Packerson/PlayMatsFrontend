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
 * @param contactFormId string
 * @param form form
 * @returns boolean
 */

export const sendEmail = async (user_id:string, service_id:string, contactFormId:string, form: Record<string, unknown>) => {

  if (!user_id || !service_id || !contactFormId || !form) {
    return null;
  }
  initEmailJS(user_id);
  let success = false;
  try {
    const response = await emailjs.send(
      service_id,
      contactFormId,
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
  matName: '',
  matId: 0,
  firstName: '',
  lastName: '',
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


/* Validate email
 * @param email string
 */
export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 * Validate contact form
 * @param form EmailForm
 */
export const validateContactForm = (form: EmailForm) => {
  if (!form.email || !form.message) {
    return false;
  }
  return validateEmail(form.email);
}

/**
 * Validate mat form
 * @param form EmailFormMat
 */
export const validateMatForm = (form: EmailFormMat) => {
  if (!form.email || !form.size || !form.matherial || !form.quantity || !form.phone || !form.matId) {
    return false;
  }
  return validateEmail(form.email);
}
