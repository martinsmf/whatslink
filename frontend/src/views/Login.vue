<template>
  <div class="container">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-6 custom-center">
            <img src="../assets/logo.svg" alt="" />
            <h1 class="title is-4">
              Seu gerenciador de contatos rápidos
            </h1>
            <div class="card login">
              <div class="card-content">
                <form action="">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        name="email"
                        class="input"
                        type="email"
                        placeholder="Seu email"
                        v-model="form.email"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        name="password"
                        class="input"
                        type="password"
                        placeholder="Sua senha"
                        v-model="form.password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>

                  <article v-if="alertError" class="message is-danger">
                    <div class="message-body">
                      {{ alertError }}
                    </div>
                  </article>

                  <div class="field">
                    <p class="control">
                      <button
                        id="signIn"
                        type="button"
                        class="button is-success"
                        @click="login()"
                      >
                        Entrar
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="column is-6">
            <img src="../assets/landing.svg" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertError: "",
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.form.email === "") {
        this.alertError = "Oops. Por favor informe seu email";
        return null;
      }
      if (this.form.password === "") {
        this.alertError = "Oops. Por favor informe sua senha";
        return null;
      }

      window.axios
        .post("/session", this.form)
        .then(async res => {
          const resp = await res.data;
          localStorage.setItem("user_token", resp.user_token);
          this.$router.push("/dashboard");
        })
        .catch(error => {
          this.alertError = "Email e/ou senha incorreto";
        });
      // console.log(this.form);
    }
  }
};
</script>


<style scoped>
.login {
  width: 400px;
  border-radius: 10px;
}

.custom-center {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
</style>