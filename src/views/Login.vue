<template>
    <div>
      <mdb-container class="mt-3">
      <mdb-card class="mt-5 shadow-none">  
        <mdb-card-body>
          <!-- ログインフォーム -->
            <form>
              <p class="h4 text-center py-4">ログイン</p>
              <div class="form-group">
                <label for="login-email">E-mail</label>
                <input type="email" id="login-email" class="form-control" v-model="username">
                <label for="login-pass">PassWord</label>
                <input type="password" id="login-pass" class="form-control" v-model="password">
              </div>

              <!-- パスワード間違った時のカード -->
              <mdb-card v-if="!isCorrect" color=" red accent-2" class=" text-center z-depth-0">
                <span  @click="isCorrect=true" class="text-right mt-1 mr-2 close-btn text-white">×</span>
                <mdb-card-body >
                  メールアドレスかパスワードが違います。
                </mdb-card-body>
              </mdb-card>

              <!-- ログインボタン -->
              <div class="text-center">
                <mdb-btn @click="signIn" :disabled="loginBtnPush" class="z-depth-0" outline="success">{{ loginBtn }}</mdb-btn>
              </div>
            </form>
          </mdb-card-body>
      </mdb-card>
      </mdb-container>
    </div>
</template>

<script>
import firebase from 'firebase'
  import { mdbBtn,mdbCard, mdbCardBody, mdbContainer} from 'mdbvue';

  export default{
    name: 'login',
    data(){
      return{
        username:'',
        password:'',
        isCorrect:true, //間違っていたらこれがfalseになってカードが出現
        // 以下ログインボタン
        loginBtn:"ログイン", 
        loginBtnPush:false,


      }
    },
    components: {
      mdbBtn,
      mdbCard,
      mdbCardBody,
      mdbContainer
    },
    methods:{
      // ログイン処理の関数
      signIn(){
        // まずボタンをログイン中…に変更して無効化
        this.loginBtn = "ログイン中…";
        this.loginBtnPush = true;

        firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
          user=>{ // eslint-disable-line
            
            // ボタンをログインに変更して有効化
            this.loginBtn = "ログイン";
            this.loginBtnPush = false;

            // homeに遷移
            this.$router.push('/')
          },
          err => {// eslint-disable-line
             this.$router.push({path:'/error'})

            // ボタンをログインに変更して有効化
            this.loginBtn = "ログイン";
            this.loginBtnPush = false;

            // 警告カードを表示
            this.isCorrect = false

          }
        )
      }
    }
  }
</script>

<style>
  /* 警告カードの閉じるボタン */
  .close-btn{
    position:absolute;
    cursor:pointer;
    right:0.3rem;
    top:0.1rem;
  }
</style>
