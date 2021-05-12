<template>
    <div>
        <mdb-container>
        <h2 class="mb-5">Study Settings<span>研究内容の編集</span></h2>
        <div>
            <vue-editor id="editor2" useCustomImageHandler @image-added="handleImageAdded" v-model="Content2"> </vue-editor><br>
            <div class="d-flex flex-row-reverse">
                <mdb-btn class="z-depth-0 mr-4" @click="createMainStudy()" :disabled="mainStudyBtnPush" color="success">{{ mainStudyBtn }}</mdb-btn>
            </div>

        </div>
        </mdb-container>
        

        <mdb-container>
            <mdb-row>
                <mdb-col col="sm">
                    <div class="mt-5">
                        <h3>新規作成</h3>
                    </div>


                    <div class="mb-2 p-2 border border-light">

                        
                        <!-- タイトル -->
                        <div class="form-group">
                            <label for="study-title-form">タイトル<span class="ml-1 red-text">※必須</span></label>
                            <input type="text" id="study-title-form" class="form-control" v-model="title">
                        </div>

                        <!-- 画像 -->
                        <div class="input-group mb-2">
                            <div class="custom-file">
                            <input type="file" accept="image/*" @change="onFileChange" class="custom-file-input" id="study-inputfile" aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">ファイルの選択</label>
                            </div>
                        </div>


                        <div class="position-relative mb-2" v-if="uploadedImage">
                            <img :src="uploadedImage.result" style="width:100%;"  />
                            <mdb-btn  class="z-depth-2 position-absolute remove-carousel" @click="removeUploadedImg()" color="danger">削除</mdb-btn>
                        </div>

                        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="Content"> </vue-editor><br>
                        <div class="d-flex flex-row-reverse">
                            <mdb-btn class="z-depth-0 mr-4" @click="createStudy()" :disabled="studyBtnPush" color="success">{{ studyBtn }}</mdb-btn>
                        </div>
                        <!-- <mdb-btn class="z-depth-0" @click="createStudy()" color="success">作成！</mdb-btn> -->
                        
                    </div>
                </mdb-col>
                <mdb-col col="sm">
                    <div class="mt-5">
                        <h3>既存のデータ</h3>
                    </div>
                    
                    <!-- <ul>
                        <li v-for="(studyContent,index) in studyContents" :key='index'>
                            <router-link :to="{name:'editStudyDetail',params:{id:index}}">{{studyContent.title}}</router-link>
                            <mdb-btn @click="removeModal=index, modal=true" color="danger">削除</mdb-btn></li>
                            
                    </ul> -->

                    <mdb-list-group>

                        <mdb-list-group-item v-for="(studyContent,index) in studyContents" :key='index'>
                            <router-link :to="{name:'editStudyDetail',params:{id:index}}">{{studyContent.title}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeModal=index, modal=true" outline="danger">削除</mdb-btn></mdb-list-group-item>
                    </mdb-list-group>
                </mdb-col>

            </mdb-row>
        </mdb-container>


        

        <!-- モーダル -->
        <div>
            <mdb-modal :show="modal" @close="modal = false">
            <mdb-modal-header>
                <mdb-modal-title>警告</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>本当に削除しますか？</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn class="z-depth-0" color="secondary" @click.native="modal = false">削除しない</mdb-btn>
                <mdb-btn class="z-depth-0" color="danger" @click="removeStudy()">削除</mdb-btn>
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
    import { VueEditor } from "vue2-editor";
    import firebase from 'firebase';
    import { mdbBtn, 
            mdbModal, 
            mdbModalHeader, 
            mdbModalTitle, 
            mdbModalBody, 
            mdbModalFooter,
            mdbListGroup, 
            mdbListGroupItem, 
            mdbContainer,
            mdbRow,
            mdbCol
    } from 'mdbvue';
    export default{
        data(){
            return{
                file:"",
                title:"",
                Content:"",
                Content2:"",
                filePath:"",
                uploadedImage:"",
                inputImg:"",
                removeModal:"",
                modal:false,
                formModal:false,
                formModalMessage:"",
                studyBtn:"送信",
                studyBtnPush:false,
                mainStudyBtn:"送信",
                mainStudyBtnPush:false,

            }
        },
        // ページを開いたときに、本文のデータをエディタに反映
        created(){
            this.Content2 = this.mainStudyContents
        },
        // 変更したときに、本文のデータをエディタに反映
        watch:{
            mainStudyContents:function () {
                console.log('someObj changed')
                this.Content2 = this.mainStudyContents
            }
        },
        components: {
            VueEditor,

            mdbBtn, 
            mdbModal, 
            mdbModalHeader, 
            mdbModalTitle, 
            mdbModalBody, 
            mdbModalFooter,
            mdbListGroup, 
            mdbListGroupItem, 
            mdbContainer,
            mdbRow,
            mdbCol
        },
        props:{
            studyContents:Object,
            mainStudyContents:String,
        },
        name: 'editStudy',
        methods:{
            createMainStudy(){
                this.mainStudyBtn="送信中…"
                this.mainStudyBtnPush=true;

                firebase.database().ref('mainStudy').set(this.Content2)
                .then(()=>{
                    this.mainStudyBtn="送信"
                    this.mainStudyBtnPush=false;
                    this.formModalMessage="送信完了しました。"
                    this.formModal=true;
                })

            },
            createStudy(){
                const files = this.inputImg;
              

                if(this.title.length>0){

                    if(files.length === 0){
                    this.studyBtn="送信中…"
                    this.studyBtnPush=true;
                    firebase.database().ref('study').push({
                        filePath:null,
                        title:this.title,
                        content:this.Content}).then(()=>{
                            this.studyBtn="送信"
                            this.studyBtnPush=false;
                            this.file="";
                            this.title="";
                            this.Content="";
                            this.filePath="";
                            this.uploadedImage="";
                            this.inputImg="";
                            this.formModalMessage="送信完了しました。"
                            this.formModal=true;
                            document.getElementById("study-inputfile").value = '';
                           

                        })

                    }else if(files[0].type != 'image/jpeg' && files[0].type != 'image/gif' && files[0].type != 'image/png' && files[0].type != 'application/pdf'){
                        this.formModalMessage="画像を添付してください。"
                        this.formModal=true;
                    }else if(files[0].size > 3000000){
                        this.formModalMessage="画像ファイルファイルが大きすぎます。\n3MB未満でお願いします。"
                        this.formModal=true;

                    }else{
                        this.studyBtn="送信中…"
                        this.studyBtnPush=true;
                        const file = files[0]
                        firebase.storage().ref(`study/${file.name}`).put(file)
                        .then((snapshot)=>{
                        
                            firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL()
                            .then((url)=>{
                            this.filePath = url
                     
                            firebase.database().ref('study').push({
                                filePath:this.filePath,
                                title:this.title,
                                content:this.Content}).then(()=>{
                                    this.studyBtn="送信"
                                    this.studyBtnPush=false;
                                    this.file="";
                                    this.title="";
                                    this.Content="";
                                    this.filePath="";
                                    this.uploadedImage="";
                                    this.inputImg="";
                                    this.formModalMessage="送信完了しました。"
                                    this.formModal=true;
                                    document.getElementById("study-inputfile").value = '';
                                })
                            })
                        })

                    }

                }else{
                    this.formModalMessage="タイトルは必須項目です。\n正しい形式で入力してください。"
                    this.formModal=true;

                }
                
                

                
            },
            // 添付した画像の削除
            removeUploadedImg(){
                this.uploadedImage="";
                this.inputImg="";
                document.getElementById("study-inputfile").value = '';
            },
            removeStudy(){
                
                firebase.database().ref(`study/${this.removeModal}`).remove();
                this.modal=false
                
            },
            onFileChange(e) {
          
                let files = e.target.files || e.dataTransfer.files;
        
                if(files[0]){
                    this.inputImg = files
                    this.createImage(files[0]);
                }
                
                
            },
            // アップロードした画像を表示
            createImage(file) {
            
                let reader = new FileReader();
                reader.onload = (e) => {
                this.uploadedImage = e.target;
                };
            reader.readAsDataURL(file);
            },
            handleImageAdded(file, Editor, cursorLocation, resetUploader) {
             

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
                .catch((err) => {// eslint-disable-line
                     this.$router.push({path:'/error'})
                })
            }
        },
    }
</script>

<style>
    .createBtn{
        text-align:right;
    }
</style>