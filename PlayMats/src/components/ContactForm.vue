<template>
  <div id="contact-form" class="container">
    <h2>Kontakt</h2>
    <form id="contact_form" @submit.prevent="sendEmailLocaly">
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
import  { user_id, service_id, template_id } from 'src/secrets/email.js'
import { sendEmail, resetForm } from 'src/utils/emailjs'
import { EmailForm } from 'src/utils/models'

export default defineComponent({
  name: 'ContactForm',
  setup() {

    const form = ref<EmailForm>({
      name: '',
      email: '',
      message: ''
    });


    // send email with emailjs and initEmailJS
    const sendEmailLocaly = async () => {
      const response:boolean | null=  await sendEmail(
        user_id,
        service_id,
        template_id,
        form.value
      );

      if (response) {
        form.value = resetForm('email') as EmailForm;
      }
    }

    return {
      form,
      sendEmailLocaly,
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
  width: 55%;
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