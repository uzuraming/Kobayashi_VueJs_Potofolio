<template>
    <div>
    <mdb-container >
        <h2 class="mb-5">Member Settings<span>メンバーの編集</span></h2>

        <!-- <input type="file" @change="onFileChange"><br>
        <img :src="uploadedImage" style="width:100%;" /> -->

        <div class="input-group mb-2">
            <div class="custom-file">
            <input type="file" @change="onFileChange" class="custom-file-input" id="member-detail-inputfile" aria-describedby="inputGroupFileAddon01">
            <label class="custom-file-label" for="inputGroupFile01">ファイル選択</label>
            </div>
        </div>

        <div class="position-relative" v-if="uploadedImage">
            <img :src="uploadedImage" style="width:100%;"  />
            <mdb-btn  class="z-depth-2 position-absolute remove-carousel" @click="removeUploadedImg()" color="danger">削除</mdb-btn>
        </div>

         <!-- 選択が教職員だった場合に表示する役職欄 -->
            <div class="form-group">
                <div v-if="this.$route.params.grade==='teacher'">
                    <label for="status-form">役職</label>
                    <input type="text" id="status-form" class="form-control" v-model="status">
                </div>
            </div>
            <!-- 名前 -->
            <div class="form-group">
                <label for="name-form">名前<span class="ml-1 red-text">※必須</span></label>
                <input type="text" id="name-form" class="form-control" v-model="name">
            </div>
            <!-- メールアドレス -->
            <div class="form-group">
                <label for="email-form">E-Mail<span class="ml-1 red-text">※必須</span></label>
                <input type="email" id="email-form" class="form-control" v-model="email">
            </div>
            <!-- 研究内容 -->
            <div class="form-group">
                <label for="achievement-form">研究内容・実績等</label>
                <textarea rows="3" type="text" id="achievement-form" class="form-control" v-model="achievement"></textarea>
            </div>
            <!-- 自己紹介 -->
            <div class="form-group">
                <label for="remark-form">自己紹介</label>
                <textarea rows="3" type="text" id="remark-form" class="form-control" v-model="remarks"></textarea>
            </div>





        <div class="d-flex flex-row-reverse">
           
            <mdb-btn class="z-depth-0" :disabled="editMemberDetailBtnPush"  @click="updateMemberData()" color="success">{{ editMemberDetailBtn }}</mdb-btn>
             <mdb-btn class="z-depth-0" @click="backMember()" color="secondary">戻る</mdb-btn>
        </div>
        </mdb-container >

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
import { mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,mdbContainer } from 'mdbvue';
  export default{
    data(){
        return{
            name:'',
            status:'',
            email:'',
            achievement:'',
            remarks:'',
            uploadedImage:'',
            inputImg:"",
            filePath:"",
            editMemberDetailBtn:"適用",
            editMemberDetailBtnPush:false,
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
    name: 'editMemberDetail',
    methods:{
        importMemberData(snap) {

            const memberData = snap.val()
            if(!memberData){
                this.$router.push({path:'/not_found'})
            }
        
            this.name=memberData.name;
            this.status=memberData.status;
            this.email=memberData.email;
            this.achievement=memberData.achievement;
            this.remarks=memberData.remarks;
            this.uploadedImage=memberData.filePath;

            
        },
        updateMemberData(){
            
            const files = this.inputImg;
            const memberId = this.$route.params.id
            const grade = this.$route.params.grade
            const status =()=>{
                        if(this.$route.params.grade==='teacher'){
                            return this.status
                        }else{
                            return null
                        }
                    };
            const mailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
                if(this.name.length<20 && this.name.length>0 && mailReg.test(this.email)){

                    if(files.length === 0 && !this.uploadedImage){
                     
                        this.editMemberDetailBtn="送信中…";
                        this.editMemberDetailBtnPush=true;
                        firebase.database().ref(`members/${grade}/${memberId}`).set({
                            name:this.name,
                            status:status(),
                            email:this.email,
                            achievement:this.achievement,
                            remarks:this.remarks,
                            filePath:null,
                        }).then(()=>{
                            this.$router.push('/editmember')
                        })
                    }else if(files.length === 0){
                      
                        this.editMemberDetailBtn="送信中…";
                        this.editMemberDetailBtnPush=true;
                        firebase.database().ref(`members/${grade}/${memberId}`).set({
                        name:this.name,
                        status:status(),
                        email:this.email,
                        achievement:this.achievement,
                        remarks:this.remarks,
                        filePath:this.uploadedImage,
                        }).then(()=>{
                            this.editMemberDetailBtn="送信";
                            this.editMemberDetailBtnPush=false;
                            this.$router.push('/editmember')
                    })

                    }else if(files[0].type != 'image/jpeg' && files[0].type != 'image/gif' && files[0].type != 'image/png' && files[0].type != 'application/pdf'){
                        this.formModalMessage="画像を添付してください。"
                        this.formModal=true;
                    }else if(files[0].size > 3000000){
                        this.formModalMessage="画像ファイルファイルが大きすぎます。\n3MB未満でお願いします。"
                        this.formModal=true;

                    }
                    else{
                        this.editMemberDetailBtn="送信中…";
                        this.editMemberDetailBtnPush=true;
                        const file = files[0]

                        firebase.storage().ref(`member/${file.name}`).put(file)
                                .then((snapshot)=>{
                                 
                                    firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL()
                                    .then((url)=>{
                                    this.filePath = url
                                  
                                    firebase.database().ref(`members/${grade}/${memberId}`).set({
                                        name:this.name,
                                        status:status(),
                                        email:this.email,
                                        achievement:this.achievement,
                                        remarks:this.remarks,
                                        filePath:this.filePath,
                        }).then(()=>{
                            this.editMemberDetailBtn="送信";
                            this.editMemberDetailBtnPush=false;
                            this.$router.push('/editmember')
                        })
                        })
                    })
                }

            }else{
                this.formModalMessage="氏名とメールアドレスは必須項目です。\n正しい形式で入力してください。"
                this.formModal=true;

            }
            
        },
        // メンバー編集に戻る関数
        backMember(){
            this.$router.push('/editmember')
        },
        // 添付画像を削除したときの処理
        removeUploadedImg(){
            this.uploadedImage="";
            this.inputImg="";
            document.getElementById("member-detail-inputfile").value = '';

        },
        // 画像添付したときに発火する関数
        onFileChange(e) {
           
            let files = e.target.files || e.dataTransfer.files;
            this.inputImg = files
            this.createImage(files[0]);
        },
            // アップロードした画像を表示
        createImage(file) {
     
            let reader = new FileReader();
            reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },
    created(){
        const memberId = this.$route.params.id
        const grade = this.$route.params.grade
        firebase.database().ref(`members/${grade}/${memberId}`).on('value', this.importMemberData)


    }
  }
</script>