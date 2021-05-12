<template>
    <div>
        <h2>Achievement Settings<span>研究成果、出版物の編集</span></h2>

          <mdb-container class="mt-5">
            <mdb-row>
                <mdb-col col="sm">
                    <h3 class="mb-2">新規作成</h3>

                    <!-- 日付 -->
                    <div class="form-group">
                        <label for="name-form">日付<span class="ml-1 red-text">※必須</span></label>
                        <input type="text" id="name-form" class="form-control" v-model="newDate">
                    </div>

                    <div class="d-flex flex-row-reverse">
                        <mdb-btn class="z-depth-0 mr-4" :disabled="achievementBtnPush" @click="createNewdate" color="success">{{ achievementBtn }}</mdb-btn>
                    </div>
                </mdb-col>
                <mdb-col col="sm">
                    <h3 class="mb-2">一覧</h3>

                    <mdb-list-group>

                        <mdb-list-group-item v-for="(date, index) in dates" :key="index">
                            <router-link :to="{name:'editAchievementDetail',params:{id:index}}">{{index}}年</router-link>
                            <mdb-btn class="z-depth-0" @click="removeModal=index, modal=true" outline="danger">削除</mdb-btn></mdb-list-group-item>
                    </mdb-list-group>
                </mdb-col>

            </mdb-row>
        </mdb-container>

        
        <!-- <ul>
            <li v-for="(date, index) in dates" :key="index">
                <router-link :to="{name:'editAchievementDetail',params:{id:index}}">{{index}}</router-link>
                <button @click="removeNewdate(index)">削除</button></li>
                
        </ul><br> -->

        

        <div>
            <mdb-modal :show="modal" @close="modal = false">
            <mdb-modal-header>
                <mdb-modal-title>警告</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>本当に削除しますか？</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn class="z-depth-0" color="secondary" @click.native="modal = false">削除しない</mdb-btn>
                <mdb-btn class="z-depth-0" color="danger" @click="removeNewdate()">削除</mdb-btn>
            </mdb-modal-footer>
            </mdb-modal>
        </div>

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
import firebase from 'firebase';
import { mdbBtn,mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,mdbListGroup, mdbListGroupItem, mdbContainer,
      mdbRow,
      mdbCol } from 'mdbvue';

  export default{
    name: 'editachievement',
    created(){

    },
    props:{
        dates:Object,
    },
    components: {
      mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,mdbListGroup, mdbListGroupItem, mdbContainer,
      mdbRow,
      mdbCol
    },
    data(){
        return{
            content:'',
            newDate:'',
            modal:false,
            removeModal:'',
            formModal:false,
            formModalMessage:"",
            achievementBtn:"送信",
            achievementBtnPush:false,


        }
    },
    methods:{
        createNewdate(){
            if(this.newDate.length>0){
                const newDate = this.newDate
                this.achievementBtn="送信中…"
                this.achievementBtnPush=true;
                firebase.database().ref(`achievements/${newDate}`).set('').then(()=>{
                    this.achievementBtn="送信"
                    this.achievementBtnPush=false;
                    this.formModalMessage="送信完了しました。"
                    this.formModal=true;
                    this.newDate="";
                })
            }else{
                this.formModalMessage="時期は必須項目です。\n正しい形式で入力してください。"
                this.formModal=true;
            }
            
        },
        removeNewdate(){
            firebase.database().ref(`achievements/${this.removeModal}`).remove();
            this.modal=false
        },
    }
  }
</script>