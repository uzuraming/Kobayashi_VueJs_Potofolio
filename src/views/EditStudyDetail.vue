<template>
    <div>
        <mdb-container>
        <h2>Study Settings<span>研究内容の編集</span></h2>
        <div class="mb-3 mt-5">
            <h3 class="mt-5">研究内容の詳細画面</h3>
        </div>
        <!-- タイトル -->
        <div class="form-group">
            <label for="study-title-form">タイトル</label>
            <input type="text" id="study-title-form" class="form-control" v-model="title">
        </div>


        <div class="input-group mb-2">
            <div class="custom-file">
            <input @change="onFileChange" type="file" class="custom-file-input" id="study-detail-inputfile" aria-describedby="inputGroupFileAddon01">
            <label class="custom-file-label" for="inputGroupFile01">ファイル選択</label>
            </div>
        </div>

        <div class="mb-3 position-relative" v-if="uploadedImage">
            <img :src="uploadedImage" style="width:100%;"  />
            <mdb-btn  class="z-depth-2 position-absolute remove-carousel" @click="removeUploadedImg()" color="danger">削除</mdb-btn>
        </div>
        <vue-editor v-model="Content" id="editor" useCustomImageHandler @image-added="handleImageAdded"> </vue-editor>
        <div class="d-flex flex-row-reverse">
            <mdb-btn class="z-depth-0" :disabled="studyDetailBtnPush" color="success" @click="updateStudy()">{{ studyDetailBtn }}</mdb-btn>
            <mdb-btn class="z-depth-0"  color="secondary" @click="backStudy">戻る</mdb-btn>
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
    import firebase from 'firebase';
    import {VueEditor} from "vue2-editor";
    import { mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer } from 'mdbvue';
    export default{
        data(){
            return{
                file:"",
                title:"",
                Content:"",
                filePath:"",
                uploadedImage:"",
                inputImg:"",
                formModal:false,
                formModalMessage:"",
                studyDetailBtn:"送信",
                studyDetailBtnPush:false,

            }
        },
        components: {
            VueEditor,
            mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer
        },
        props:{
            studyContents:Object,
        },
        name: 'editStudyDetail',
        methods:{
            backStudy(){
                this.$router.push('/editstudy')
            },
            updateStudy(){
                const files = this.inputImg;
                const key = this.$route.params['id']
                if(this.title.length>0){

                    if(files.length === 0 && !this.uploadedImage){
                        this.studyDetailBtn="送信中…"
                        this.studyDetailBtnPush=true;
                        firebase.database().ref(`study/${key}`).set({
                        filePath:null,
                        title:this.title,
                        content:this.Content,
                    }).then(()=>{
                            this.studyDetailBtn="送信"
                            this.studyDetailBtnPush=false;
                            this.$router.push('/editstudy')
                        })

                    }
                    else if (files.length === 0){
                        this.studyDetailBtn="送信中…"
                        this.studyDetailBtnPush=true;
                        firebase.database().ref(`study/${key}`).set({
                            filePath:this.uploadedImage,
                            title:this.title,
                            content:this.Content,
                        }).then(()=>{
                            this.studyDetailBtn="送信"
                            this.studyDetailBtnPush=false;
                            this.$router.push('/editstudy')
                        })
                    }else if(files[0].type != 'image/jpeg' && files[0].type != 'image/gif' && files[0].type != 'image/png' && files[0].type != 'application/pdf'){
                        this.formModalMessage="画像を添付してください。"
                        this.formModal=true;
                    }else if(files[0].size > 3000000){
                        this.formModalMessage="画像ファイルファイルが大きすぎます。\n3MB未満でお願いします。"
                        this.formModal=true;

                    }
                    else{
                        this.studyDetailBtn="送信中…"
                        this.studyDetailBtnPush=true;
                     
                        const file = files[0]
                        firebase.storage().ref(`study/${file.name}`).put(file)
                        .then((snapshot)=>{
                      
                            firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL()
                            .then((url)=>{
                            this.filePath = url
                      
                            firebase.database().ref(`study/${key}`).set({
                                filePath:this.filePath,
                                title:this.title,
                                content:this.Content}).then(()=>{
                                    this.studyDetailBtn="送信"
                                    this.studyDetailBtnPush=false;
                                    this.$router.push('/editstudy')
                                })
                            })
                        })
                    }

                }else{
                    this.formModalMessage="タイトルは必須項目です。\n正しい形式で入力してください。"
                    this.formModal=true;
                }
                
                

                
            },
            onFileChange(e) {
            
                let files = e.target.files || e.dataTransfer.files;
                this.inputImg = files
                this.createImage(files[0]);
            },
            // 添付した画像を削除
            removeUploadedImg(){
                this.uploadedImage="";
                this.inputImg="";
                document.getElementById("study-detail-inputfile").value = '';
            },
            // アップロードした画像を表示
            createImage(file) {
            
                let reader = new FileReader();
                reader.onload = (e) => {
                this.uploadedImage = e.target.result;
            };
            reader.readAsDataURL(file);
            },
                    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)


        var formData = new FormData();
        formData.append("image", file);

        firebase.storage().ref(file.name).put(file)
        .then((snapshot)=>{ // eslint-disable-line
     
            firebase.storage().ref(file.name).getDownloadURL()
            .then((url)=>{
                Editor.insertEmbed(cursorLocation, 'image', url)
                resetUploader()
            })
        })
        .catch((err) => { // eslint-disable-line
             this.$router.push({path:'/error'})
        })
    }
        },
      watch:{
        studyContents:function () {
    
          this.Content = this.studyContent
          this.title=this.studyContents[this.$route.params['id']].title
          this.Content=this.studyContents[this.$route.params['id']].content
          this.uploadedImage=this.studyContents[this.$route.params['id']].filePath
        }
        },
        created(){
      
   
            this.title=this.studyContents[this.$route.params['id']].title
            this.Content=this.studyContents[this.$route.params['id']].content
            this.uploadedImage=this.studyContents[this.$route.params['id']].filePath
            if(!this.studyContents[this.$route.params['id']]){
                this.$router.push({path:'/not_found'})
            }
        }
    }
</script>

