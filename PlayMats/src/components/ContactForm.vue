<template>
  <div class="container">
    <h2>Kontakt</h2>
    <form id="contact_form" @submit.prevent="sendEmail">
      <div>
        <label for="name">Imię</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div>
        <label for="message">Wiadomość</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Wyślij</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import emailjs from '@emailjs/browser';
import  { user_id, service_id, template_id } from 'src/secrets/email.js'

export default defineComponent({
  name: 'ContactForm',
  setup() {

    interface EmailForm {
      name: string,
      email: string,
      message: string
    }

    const form = ref<EmailForm>({
      name: '',
      email: '',
      message: ''
    });

    const resetForm = () => {
      form.value = {
        name: '',
        email: '',
        message: ''
      }
    }

    const initEmailJS = () => {
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

    // send email with emailjs and initEmailJS
    const sendEmail = async () => {
      initEmailJS();

      try {
        const response = await emailjs.send(
          service_id,
          template_id,
          form.value,
        );
        console.log('SUCCESS!', response.status, response.text);
        alert('Wiadomość wysłana pomyślnie!');
        resetForm();
      } catch (error) {
        console.error('FAILED...', error);
        alert('Wystąpił błąd podczas wysyłania wiadomości.');
      }
    };

    return {
      form,
      sendEmail,
      resetForm,
    }
  }
})


</script>



<style scoped>
* {box-sizing: border-box;}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>