<template>
    <div>
        <h2>Member Settings<span>メンバーの編集</span></h2>
        <mdb-container>
            <mdb-row>
                <mdb-col col="sm">
                    <div class="my-3">
                        <h3>新規作成</h3>
                    </div>
                    <div class="mb-2 p-2 border border-light">
                        <label for="grade-form">学年・役職</label>
                        <select id="grade-form" v-model="grade" class="browser-default custom-select mb-4">
                            <option value="teacher">教職員</option>
                            <option  value="doctor">Doctor</option>
                            <option value="M2">M2</option>
                            <option  value="M1">M1</option>
                            <option value="B4">B4</option>
                            <option value="B3">B3</option>
                            <option value="B2">B2</option>
                        </select>
                        <!-- <input type="file" @change="onFileChange"><br> -->
                        <div class="mb-4 input-group">
                            <div class="custom-file">
                                <input accept="image/*" @change="onFileChange" type="file" class="custom-file-input" id="member-inputfile" aria-describedby="inputGroupFileAddon01">
                                <label class="custom-file-label" for="inputGroupFile01">ファイル選択</label>
                            </div>
                            
                        </div>
                        <!-- ここに添付した画像が表示される -->
                        <div class="position-relative" v-if="uploadedImage">
                            <img :src="uploadedImage.result" style="width:100%;"  />
                            <mdb-btn  class="z-depth-2 position-absolute remove-carousel" @click="removeUploadedImg()" color="danger">削除</mdb-btn>
                        
                        </div>
                        <!-- 選択が教職員だった場合に表示する役職欄 -->
                        <div class="form-group">
                            <div v-if='grade==="teacher"'>
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
                            <mdb-btn class="z-depth-0 mr-4" :disabled="memberBtnPush" @click="createMember()" color="success">{{ memberBtn }}</mdb-btn>
                        </div>

                    </div>

                </mdb-col>
                <mdb-col col="sm">
                    <!-- メンバー一覧 -->
                    
                    <div class="my-3">
                        <h3>メンバー一覧</h3>
                    </div>

                    <div class="my-3">
                        <h3>Teacher</h3>
                    </div>

                    <mdb-list-group>

                        <mdb-list-group-item v-for="(loadMember,index) in loadTeacherData" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'teacher'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeTeacherMember(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>
                        </mdb-list-group>

                    <div class="my-3">
                        <h3>Doctor</h3>
                    </div>
                        <mdb-list-group-item v-for="(loadMember,index) in loadDoctorData" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'doctor'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeDoctorMember(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>

                    <div class="my-3">
                        <h3>M2</h3>
                    </div>
                        <mdb-list-group-item v-for="(loadMember,index) in loadM2Data" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'M2'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeM2Member(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>

                    <div class="my-3">
                        <h3>M1</h3>
                    </div>
                        <mdb-list-group-item v-for="(loadMember,index) in loadM1Data" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'M1'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeM1Member(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>

                    <div class="my-3">
                        <h3>B4</h3>
                    </div>
                        <mdb-list-group-item v-for="(loadMember,index) in loadB4Data" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'B4'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeB4Member(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>
            
                    <div class="my-3">
                        <h3>B3</h3>
                    </div>
                        <mdb-list-group-item v-for="(loadMember,index) in loadB3Data" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'B3'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeB3Member(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>
            
                    <div class="my-3">
                        <h3>B2</h3>
                    </div>
                        <mdb-list-group-item v-for="(loadMember,index) in loadB2Data" :key='index'>
                            <router-link :to="{name:'editMemberDetail',params:{id:index,grade:'B2'}}">{{loadMember.name}}</router-link>
                            <mdb-btn class="z-depth-0" @click="removeB2Member(index)" outline="danger">削除</mdb-btn></mdb-list-group-item>
                </mdb-col>
            </mdb-row>
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
import {  mdbBtn,mdbListGroup, mdbListGroupItem, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbRow, mdbCol} from 'mdbvue';
  export default{
    data(){
        return{
            grade:'teacher', // 学年 役職選択のフォーム
            name:'', // 名前
            status:'', // 役職
            email:'', // メールアドレス
            achievement:'', // 研究内容
            remarks:'', // 自己紹介
            uploadedImage:'', // 表示する画像
            inputImg:"", // 入力した画像
            filePath:"", // アップロードする画像
            formModal:false, // モーダルのオンオフ
            formModalMessage:"", // モーダルのメッセージ内容
            memberBtn:"送信", // ボタンの文字
            memberBtnPush:false, // ボタンを押したか否か

        }
    },
    props:{
        loadTeacherData:Object,
        loadDoctorData:Object,
        loadM2Data:Object,
        loadM1Data:Object,
        loadB4Data:Object,
        loadB3Data:Object,
        loadB2Data:Object,
    },
    name: 'editMember',
    components:{
        mdbBtn,mdbListGroup, mdbListGroupItem, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbContainer, mdbRow, mdbCol
    },
    methods:{
        // メンバーを追加する
        createMember () {
            const status =()=>{
                if(this.grade==='teacher'){
                    return this.status
                }else{
                    return null
                }
            };
            const name=this.name
            const email=this.email
            const grade=this.grade
            const achievement=this.achievement
            const remarks=this.remarks

            const files = this.inputImg;
            console.log(files)
            // メールアドレスの正規表現
            const mailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
            if(name.length<16 && name.length>0 && mailReg.test(email)){
                if(files.length === 0){
                this.memberBtn="送信中…"
                this.memberBtnPush=true;
                firebase.database().ref(`members/${grade}`).push({
                    name:name,
                    status:status(),
                    email:email,
                    achievement:achievement,
                    remarks:remarks,
                    filePath:null,
                }).then(()=>{
                    this.memberBtn="送信"
                    this.memberBtnPush=false;
                    this.formModalMessage="送信完了しました。"
                    this.formModal=true;
                    document.getElementById("member-inputfile").value = '';
                })
                }else if(files[0].type != 'image/jpeg' && files[0].type != 'image/gif' && files[0].type != 'image/png' && files[0].type != 'application/pdf'){
                    this.formModalMessage="画像を添付してください。"
                    this.formModal=true;
                }else if(files[0].size > 3000000){
                    this.formModalMessage="画像ファイルファイルが大きすぎます。\n3MB未満でお願いします。"
                    this.formModal=true;

                }else{
                    this.memberBtn="送信中…"
                    this.memberBtnPush=true;
                    const file = files[0]
                    firebase.storage().ref(`member/${file.name}`).put(file)
                    .then((snapshot)=>{
                    
                        firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL()
                        .then((url)=>{
                        this.filePath = url
                      
                        firebase.database().ref(`members/${grade}`).push({
                            name:name,
                            status:status(),
                            email:email,
                            achievement:achievement,
                            remarks:remarks,
                            filePath:this.filePath,
                        }).then(()=>{
                            this.memberBtn="送信";
                            this.memberBtnPush=false;
                            this.name="";
                            this.email="";
                            this.achievement="";
                            this.remarks="";
                            this.uploadedImage="";
                            this.inputImg="";
                            this.formModalMessage="送信完了しました。"
                            this.formModal=true;
                            document.getElementById("member-inputfile").value = '';
                        })
                        })
                    })
                }

            }else{
                this.formModalMessage="氏名とメールアドレスは必須項目です。\n正しい形式で入力してください。"
                this.formModal=true;

            }
   
        },
        removeUploadedImg(){
            this.uploadedImage="";
            this.inputImg="";
            document.getElementById("member-inputfile").value = '';

        },
        removeTeacherMember(index){
            firebase.database().ref(`members/teacher/${index}`).remove()
        },
        removeDoctorMember(index){
            firebase.database().ref(`members/doctor/${index}`).remove()
        },
        removeM2Member(index){
            firebase.database().ref(`members/M2/${index}`).remove()
        },
        removeM1Member(index){
            firebase.database().ref(`members/M1/${index}`).remove()
        },
        removeB4Member(index){
            firebase.database().ref(`members/B4/${index}`).remove()
        },
        removeB3Member(index){
            firebase.database().ref(`members/B3/${index}`).remove()
        },
        removeB2Member(index){
            firebase.database().ref(`members/B2/${index}`).remove()
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
        }
    },
        
}


</script>