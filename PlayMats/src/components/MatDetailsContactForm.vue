<template>
  <div id="contact-details-form" >
    <form id="contact-form" @submit.prevent="sendEmailLocaly">
      <div class="text-h4">
        {{ mat?.name }}
      </div>
      <div>
        <q-select
          v-model="form.size"
          :options="mat?.availableSizes"
          label="Rozmiar"
          emit-value
          required
          clearable
        />
      </div>

      <div>
        <q-select
          v-model="form.matherial"
          :options="matherial"
          label="Materiał"
          emit-value
          required
          clearable
        />
      </div>

      <div>
          <label for="quantity">Ilość</label>
          <input type="number" id="quantity" v-model="form.quantity" required>
        </div>

      <q-checkbox
        v-model="form.doubleSided"
        label="Dwustronna"
        required
        class="flex flex-start q-ml-none q-pl-none"
      />

      <div v-if="form.doubleSided">
        <label for="doubleSidedDescription">Opisz co ma być na drugiej stronie / podaj drugą matę</label>
        <input type="text" id="doubleSidedDescription" v-model="form.doubleSidedDescription">
      </div>

      <div>
        <label for="message">Dodatkowe informację</label>
        <textarea id="message" v-model="form.message"></textarea>
      </div>
      <div>
        <label for="firstName">Imię</label>
        <input type="text" id="firstName" v-model="form.firstName" required>
      </div>
      <div>
        <label for="lastName">Nazwisko</label>
        <input type="text" id="lastName" v-model="form.lastName" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div>
        <label for="phone">Telefon
          <small>Format (123456789)</small>
        </label>
        <input type="tel" id="phone" v-model="form.phone" pattern="[0-9]{9,13}" required>
      </div>
      <button type="submit">Wyślij</button>
    </form>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'src/utils/import'
import { Mat, EmailFormMat } from 'src/utils/models'
import  { user_id, service_id, matDetailsContactFormId } from 'src/secrets/email.js'
import { sendEmail, resetForm, validateMatForm } from 'src/utils/emailjs'


export default defineComponent ({
  name: 'DetailContactForm',
  props: {
    mat: {
      type: Object as () => Mat | null,
      required: true,
    }
  },
  setup(props) {

    const matherial = [
      'Guma',
      'Tkanina',
      'Plexa',
      'Gruby plastik',
      'Inne'
    ]

    const form = ref<EmailFormMat>({
      matName: props.mat?.name || '',
      matId: props.mat?.id || 0,
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
    });

    const sendEmailLocaly = async () => {

      console.log(form.value);

      if (!validateMatForm(form.value)) {
        return;
      }
      const response:boolean | null=  await sendEmail(
        user_id,
        service_id,
        matDetailsContactFormId,
        form.value
      );

      if (response) {
        form.value = resetForm('mat') as EmailFormMat;
      }
    }

    return {
      form,
      matherial,
      sendEmailLocaly
    }
  }

})

</script>


<style lang="scss" scoped>

* {box-sizing: border-box;}

#contact-details-form {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 40%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  #contact-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: left;
  }
}

label {
  float: left;
}

input[type=text], [type=email], [type=number], [type=tel], textarea {
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

.q-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

</style>