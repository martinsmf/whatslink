<template>
  <div class="dashboard">
    <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Seu gerenciador digital de contatos</h4>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <b-button
              label="+"
              type="is-success"
              @click="showContactAddModal = true"
              data-qa-selector="add_contact"
            />
          </div>

          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  v-model="searchInput"
                  class="input"
                  type="text"
                  placeholder="Número do Whats"
                />
              </p>
              <p class="control">
                <button
                  class="button is-primary"
                  data-qa-selector="search"
                  @click="search"
                >
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div id="loader" v-if="isLoading === true">
        <img src="../assets/loading.gif" alt="Loader" />
      </div>

      <article class="message is-danger" v-if="contactList.length === 0">
        <div class="message-body">
          Contato não encontrado :(
        </div>
      </article>

      <div class="contact-list columns is-multiline" v-if="isLoading === false">
        <div
          class="column is-4"
          v-for="contact in contactList"
          :key="contact._id"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/whatsapp.svg" alt="Logo WhatsApp" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ contact.name }}</p>
                  <p class="subtitle is-6">{{ contact.number }}</p>
                </div>
              </div>

              <div class="content">
                {{ contact.description }}
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Conversar</a>
              <a href="#" class="card-footer-item" @click="remove(contact._id)"
                >Apagar</a
              >
            </footer>
          </div>
        </div>
      </div>

      <b-modal
        v-model="showContactAddModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal
      >
        <form action="">
          <div class="modal-card" style="width: 450px">
            <header class="modal-card-head">
              <p class="modal-card-title">Novo Contato</p>
              <button
                type="button"
                class="delete"
                @click="showContactAddModal = false"
              />
            </header>
            <section class="modal-card-body">
              <div class="field input-name">
                <input
                  v-model="form.name"
                  type="text"
                  class="input is-primary"
                  placeholder="Nome completo"
                />
                <small class="has-text-danger" v-if="erroName === true"
                  >Nome é obrigatório</small
                >
              </div>

              <div class="field input-number">
                <input
                  v-model="form.number"
                  type="text"
                  class="input is-primary"
                  placeholder="WhatsApp"
                />
                <small class="has-text-danger" v-if="erroNumber === true"
                  >WhatsApp é obrigatório</small
                >
              </div>

              <div class="field text-description">
                <textarea
                  v-model="form.description"
                  type="text"
                  class="textarea is-primary"
                  placeholder="Assunto"
                />
                <small class="has-text-danger" v-if="erroDescription === true"
                  >Assunto é obrigatório</small
                >
              </div>
            </section>
            <footer class="modal-card-foot">
              <b-button
                label="Cadastrar"
                class="is-success"
                type="button"
                @click="create"
                data-qa-selector="save-contact"
              />
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "dashboard",
  data() {
    return {
      isLoading: false,
      contactList: [],
      showContactAddModal: false,
      erroName: false,
      erroNumber: false,
      erroDescription: false,
      searchInput: "",
      form: {
        name: "",
        number: "",
        description: ""
      }
    };
  },
  methods: {
    search() {
      this.isLoading = true;
      if (this.searchInput != "") {
        this.contactList = this.contactList.filter(
          contact =>
            contact.number === this.searchInput ||
            contact.name === this.searchInput
        );
        this.isLoading = false;
      } else {
        this.list();
      }
      console.log(this.contactList);
    },
    create() {
      this.erroName = false;
      this.erroNumber = false;
      this.erroDescription = false;

      if (this.form.name === "") {
        this.erroName = true;
      }

      if (this.form.number === "") {
        this.erroNumber = true;
      }

      if (this.form.description === "") {
        this.erroDescription = true;
      }

      if (
        this.erroName === false &&
        this.erroNumber === false &&
        this.erroDescription === false
      ) {
        try {
          window.axios.post("/contacts", this.form).then(async res => {
            await res.data;
            this.showContactAddModal = false;
            this.list();
          });
        } catch (erro) {
          console.log(erro);
        }
      }
    },
    remove(contactId) {
      this.isLoading = true;
      window.axios.delete(`/contacts/${contactId}`).then(async res => {
        await res.data;
        this.isLoading = false;
        this.list();
      });
    },
    list() {
      this.isLoading = true;
      window.axios.get("/contacts").then(async res => {
        this.contactList = await res.data;
        this.isLoading = false;
      });
    }
  },
  mounted() {
    this.list();
  }
};
</script>
