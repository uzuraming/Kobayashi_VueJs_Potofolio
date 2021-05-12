<template>
    <div>
       <mdb-container>
        <h2>Acsess Settings<span>アクセスの編集</span></h2>


        <div class="form-group">
            <label for="adress-form">住所<span class="ml-1 red-text">※必須</span></label>
            <textarea type="text" id="adress-form" class="form-control" v-model='adress'></textarea>
        </div>

        <div class="form-group">
            <label for="tel-form">電話番号<span class="ml-1 red-text">※必須</span></label>
            <input type="text" id="tel-form" class="form-control" v-model='tel' >
        </div>

        <div class="form-group">
            <label for="acsess-mail-form">メールアドレス<span class="ml-1 red-text">※必須</span></label>
            <input type="email" id="acsess-mail-form" class="form-control" v-model='email'>
        </div>
        <!-- <button @click='createAcsessData'>送信</button> -->

        <div class="d-flex flex-row-reverse">
            <mdb-btn class="z-depth-0 mr-4" @click='createAcsessData' color="success">送信</mdb-btn>
        </div>
        </mdb-container>

        
    <!-- お知らせモーダル -->
        <div>
            <mdb-modal :show="formModal" @close="formModal = false">
            <mdb-modal-header>
                <mdb-modal-title>メッセージ</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body style="white-space:pre-wrap; word-wrap:break-word;">{{formModalMessage}}</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn class="z-depth-0" color="success" @click.native="formModal = false">OK</mdb-btn>
            </mdb-modal-footer>
            </mdb-modal>
        </div>

    </div>


</template>

<script>
    import firebase from 'firebase'
    import { mdbBtn, mdbModal,
       mdbModalHeader, 
       mdbModalTitle, 
       mdbModalBody, 
       mdbModalFooter,
       mdbContainer  } from 'mdbvue';
  export default{
    name: 'editAcsess',
    data(){
      return{
          adress:'',
          tel:'',
          email:'',
          formModal:false,
          formModalMessage:"",

        }
    },
    components: {
      mdbBtn,
      mdbModal,
      mdbModalHeader, 
      mdbModalTitle, 
      mdbModalBody, 
      mdbModalFooter, 
      mdbContainer
    },
    props:{
        acsessData:Object,
    },
    methods:{
        createAcsessData(){
            const mailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
            const telReg = /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/
            if(this.adress.length>0 && mailReg.test(this.email) && telReg.test(this.tel)){
              firebase.database().
              ref('acsess').set({
                  adress:this.adress,
                  tel:this.tel,
                  email:this.email,

            }).then(()=>{
              this.$router.push('/acsess')
            })
            }else{
              this.formModalMessage="住所、電話番号、メールアドレス共に必須項目です。\n正しい形式で入力してください。"
                this.formModal=true;

            }
            
        }
    },
    watch:{
        acsessData:function () {
        
          this.adress = this.acsessData.adress
          this.tel = this.acsessData.tel
          this.email = this.acsessData.email
        }
    },
    created(){
        this.adress = this.acsessData.adress
          this.tel = this.acsessData.tel
          this.email = this.acsessData.email
    }
  }

</script>