<template>
  <div id="contact-details-form" >
    <form id="contact_form" @submit.prevent="sendEmailLocaly">
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
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email">
      </div>
      <div>
        <label for="phone">Telefon</label>
        <input type="text" id="phone" v-model="form.phone">
      </div>
      <button type="submit">Wyślij</button>
    </form>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, computed, useRouter } from 'src/utils/import'
import { Mat } from 'src/utils/models'
import  { user_id, service_id, template_id } from 'src/secrets/email.js'
import { sendEmail, resetForm } from 'src/utils/emailjs'


export default defineComponent ({
  name: 'DetailContactForm',
  props: {
    mat: {
      type: Object as () => Mat | any,
      required: true
    }
  },
  setup(props) {
    interface EmailForm {
      name: string,
      email: string,
      message: string
      size: string
      matherial: string
      doubleSided: boolean
      doubleSidedDescription: string
      quantity: number
    };

    const matherial = [
      'Guma',
      'Tkanina',
      'Plexa',
      'Gruby plastik',
      'Inne'
    ]

    const form = ref<Record<string, unknown>>({
      name: props.mat?.name,
      email: '',
      message: '',
      size: '',
      matherial: '',
      doubleSided: false,
      doubleSidedDescription: '',
      quantity: 1
    });

    const sendEmailLocaly = async () => {
      const response:boolean | null=  await sendEmail(
        user_id,
        service_id,
        template_id,
        form.value
      );

      if (response) {
        const clearedForm = resetForm(form.value);
        form.value = clearedForm
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

  #contact_form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: left;
  }
}

label {
  float: left;
}

input[type=text], [type=email], [type=number], textarea {
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