<template>
  <div>
    <h2>Home Settings<span>ホームの編集</span></h2>

    <!-- 画像か本文か更新履歴かを選ぶタブ -->
    <mdb-navbar color="white" class="z-depth-0 lighten-4 py-4">
      <mdb-navbar-nav nav center class="" >
        <mdb-nav-item class="m-1 p-1" href="#" @click.stop.prevent="selectTab('eyeCatch')" :class="{'shadow-sm rounded elegant-color active-font':activeTab==='eyeCatch'}">画像</mdb-nav-item>
        <mdb-nav-item class="m-1 p-1" href="#" @click.stop.prevent="selectTab('main')" :class="{'shadow-sm rounded elegant-color active-font ':activeTab==='main'}">本文</mdb-nav-item>
        <mdb-nav-item class="m-1 p-1" href="#" @click.stop.prevent="selectTab('news')" :class="{'shadow-sm rounded elegant-color active-font ':activeTab==='news'}">新着記事</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar>
      
      
    <!-- 画像編集 -->
      <mdb-container v-if="activeTab==='eyeCatch'">
      <mdb-row>
        <mdb-col col="sm">
          <div class="my-3">
            <h3>新規作成</h3>
          </div>
          <!-- 画像新規作成フォーム -->
          <div class="p-2 border border-light">

            <div class="input-group">
              <div class="custom-file">
                <input type="file" accept="image/*" @change="onFileChange" class="custom-file-input" id="home-inputfile" data-browse="参照" aria-describedby="inputGroupFileAddon01">
                <label class="custom-file-label" for="inputGroupFile01">ファイル選択</label>
              </div>
            </div>

            <!-- ここに添付した画像が表示される -->
            <div class="position-relative" v-if="uploadedImage">
              <img :src="uploadedImage" style="width:100%;"  />
              <mdb-btn  class="z-depth-2 position-absolute remove-carousel" @click="removeUploadedImg()" color="danger">削除</mdb-btn>
              
            </div>


            <div class="d-flex flex-row-reverse">
                <mdb-btn :disable="eyeCatchBtnPush" class="z-depth-0 mr-4" @click="updateEyeCatchData" color="success">{{ eyeCatchBtn }}</mdb-btn>
                
            </div>

          </div>
        </mdb-col>
        <mdb-col col="sm">
          <div class="my-3">
            <h3>画像一覧</h3>
          </div>

          <!-- 画像の一覧 -->

          <mdb-list-group>
            <mdb-list-group-item class="position-relative" v-for="(data,index) in eyeCatchData" :key="index">
                  <img :src="data.src" style="width:100%;" /><br>
                  <mdb-btn  class="z-depth-2 position-absolute remove-carousel" @click="removeCarouselModal=index, carouselModal=true" color="danger">削除</mdb-btn></mdb-list-group-item>
          </mdb-list-group>
        </mdb-col>

      </mdb-row>
    </mdb-container>
    <!-- <div v-if="activeTab==='eyeCatch'">
      
      





      

      
    </div> -->
    <mdb-container>
    <!-- 本文の編集 -->
    <div v-if="activeTab==='main'">
      <div class="my-3">
        <h3>本文の編集</h3>
      </div>

      <!-- エディタ -->
      <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="homeEditor"> </vue-editor>

      <div class="d-flex flex-row-reverse">
          <mdb-btn class="z-depth-0 mr-4" @click="createHome" color="success">作成！</mdb-btn>
      </div>
    </div>
    </mdb-container>


      <mdb-container v-if="activeTab==='news'">
        <mdb-row>
          <mdb-col col="sm">
            <div class="my-3">
              <h3>新規作成</h3>
            </div>

            <!-- 更新履歴のフォーム -->
            <div class="mb-2 p-2 border border-light">
              <div class="form-group">
                <label for="news-category">カテゴリ</label>
                <select id="news-category" v-model='homeCategory' class="browser-default custom-select mb-2">
                  <option value="study">研究内容</option>
                  <option value="achievement">研究業績</option>
                  <option value="member">メンバー</option>
                  <option value="acsess">アクセス</option>
                </select>
                <label for="news-title">タイトル <span class="ml-1 red-text">※必須</span></label>
                <input type="text" id="news-title" class="form-control mb-1" v-model="homeTitle">
                <label for="news-date">日付 <span class="ml-1 red-text">※必須</span></label>
                <Datepicker class="mb-1" id="news-date" name="home-date" @closed="pickerClosed()" v-model="homeDate" :bootstrap-styling="true" placeholder="日付を入力してください" :language="ja" :format="customFormatter(homeDate)"></Datepicker>

                <label for="news-content">内容 <span class="ml-1 red-text">※必須</span></label>
                <textarea type="text" id="news-content" class="form-control" v-model="homeContent"></textarea>
              </div>


              <div class="d-flex flex-row-reverse">
                  <mdb-btn :disable="newsBtnPush" class="z-depth-0 mr-4" @click="createNews()" color="success">{{newsBtn}}</mdb-btn>
              </div>

            </div>
          </mdb-col>
          <mdb-col col="sm">
            <!-- 更新履歴の一覧 -->
            <div class="my-3">
              <h3>更新履歴一覧</h3>
            </div>
            <!-- <mdb-list-group>
              <mdb-list-group-item v-for="(data,index) in reverseItems" :key="index">
                <div>
                  <span>{{data.homeDate}}</span><span class="ml-1">{{data.content}}</span>
                </div>
                <mdb-btn class="z-depth-0" @click="removeModal=index, newsModal=true" outline="danger">削除</mdb-btn></mdb-list-group-item>
            </mdb-list-group> -->
            <mdb-card class="shadow-none border w-100 border-light" v-for="(data,index) in reverseItems" :key="index" style="width: 18rem;">
              <mdb-card-body>
               
                <mdb-card-title>
                   <span>
                    <mdb-icon v-if="data.category==='achievement'" icon="book" />
                    <mdb-icon v-if="data.category==='member'" icon="users" />
                    <mdb-icon v-if="data.category==='study'" icon="pen" />
                    <mdb-icon v-if="data.category==='acsess'" icon="map-marked-alt" />
                  </span>
                  {{data.homeTitle}}
                </mdb-card-title>
                <mdb-card-title tag="h6" sub class="mb-2 text-muted"> <mdb-icon class="mr-1" icon="calendar-alt" />{{data.homeDate}}</mdb-card-title>
                <mdb-card-text>
                  <p style="white-space: pre-wrap;">{{ data.content }}</p>
                </mdb-card-text>
                <div class="d-flex flex-row-reverse">
                    <mdb-btn class="z-depth-0" @click="removeModal=index, newsModal=true" outline="danger">削除</mdb-btn>
                </div>
                
              </mdb-card-body>


            </mdb-card>
            <div class="d-flex flex-row-reverse">
                <mdb-btn :disable="eyeCatchBtnPush" class="z-depth-0 mr-4" @click="moreView" color="success">MORE</mdb-btn>
                
            </div>
          </mdb-col>

        </mdb-row>
      </mdb-container>



    <!-- news削除時の確認モーダル -->
    <div>
        <mdb-modal :show="newsModal" @close="newsModal = false">
        <mdb-modal-header>
            <mdb-modal-title>警告</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>本当に削除しますか？</mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn class="z-depth-0" color="secondary" @click.native="newsModal = false">削除しない</mdb-btn>
            <mdb-btn class="z-depth-0" color="danger" @click="removeNewsdata()">削除</mdb-btn>
        </mdb-modal-footer>
        </mdb-modal>
    </div>
    <!-- カルーセル画像削除時の確認モーダル -->
    <div>
        <mdb-modal :show="carouselModal" @close="carouselModal = false">
        <mdb-modal-header>
            <mdb-modal-title>警告</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>本当に削除しますか？</mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn class="z-depth-0" color="secondary" @click.native="carouselModal = false">削除しない</mdb-btn>
            <mdb-btn class="z-depth-0" color="danger" @click="removeCarouseldata()">削除</mdb-btn>
        </mdb-modal-footer>
        </mdb-modal>
    </div>

    <!-- お知らせモーダル -->
    <div>
        <mdb-modal :show="formModal" @close="formModal = false">
        <mdb-modal-header>
            <mdb-modal-title>メッセージ</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>{{formModalMessage}}</mdb-modal-body>
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
import {mdbBtn, 
        mdbListGroup,
        mdbListGroupItem, 
        mdbModal, 
        mdbModalHeader, 
        mdbModalTitle, 
        mdbModalBody, 
        mdbModalFooter,
        mdbNavbar,
        mdbNavbarNav,
        mdbNavItem, 
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbCardTitle,
        mdbCardText,
        mdbIcon
      } from 'mdbvue';

  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';
  import {ja} from 'vuejs-datepicker/dist/locale'

  export default{
    name: 'editHome',
    components: { VueEditor,
      mdbBtn, 
      mdbListGroupItem,
      mdbListGroup,
      mdbModal, 
      mdbModalHeader, 
      mdbModalTitle, 
      mdbModalBody, 
      mdbModalFooter, 
      mdbNavbar,
      mdbNavbarNav,
      mdbNavItem,
      mdbContainer,
      mdbRow,
      mdbCol,
      Datepicker,
      mdbCard,
      mdbCardBody,
      mdbCardTitle,
      mdbCardText,
      mdbIcon
    },
    data(){
      return{
        ja:ja,
        homeCategory:'study', // ニュースのカテゴリを選ぶ
        homeContent:'', // ニュースの内容を選ぶ
        homeDate:'',
        homeTitle:'', //ニュースのタイトル
        homeEditor:'', // 本文のエディタがここに反映
        uploadedImage:'', // アップロードした画像で表示する画像のデータ
        inputImg:"", // アップロードした画像の情報
        filePath:"", // アップロードした画像の情報
        removeModal:"", // 更新履歴の削除ボタンを押したとき、ここに削除するデータのidが記録
        removeCarouselModal:"", // 画像の削除ボタンを押したとき、ここに削除するデータのidが記録
        newsModal:false, // 画像削除モーダルのオンオフ
        carouselModal:false, // ニュース削除モーダルのオンオフ
        formModal:false, // メッセージモーダルのオンオフ
        formModalMessage:"", // メッセージモーダルの内容
        newsBtn:"送信", // メッセージモーダルの内容
        newsBtnPush:false, // 更新履歴ボタンを押したか否か
        eyeCatchBtn:"送信",
        eyeCatchBtnPush:false, // 画像更新ボタンを押したか否か
        activeTab:"eyeCatch" // どのタブが有効か？

      }
    },
    // app.vue からデータを受け取る
    props:{
      newsData:Object,
      homeData:String,
      eyeCatchData:Object,
    },
    // firebase から受け取ったデータはcreated_atの順番が古いものが頭になるので逆にする
    computed:{
      reverseItems() {
        const datas = this.newsData;
        const sorted = {};
        var array = [];
        for (let key in datas) {
        //指定された名前のプロパティがオブジェクトにあるかどうかチェック
          if (datas.hasOwnProperty(key)) {
            //if条件がtrueならば，配列の最後にキーを追加する
            array.push(key);
        }}
        array.reverse();
        for (var i = 0; i < array.length; i++) {
            /*戻り値用のオブジェクトに
            新オブジェクト[配列内のキー] ＝ 引数のオブジェクト[配列内のキー]を入れる．
            配列はソート済みなので，ソートされたオブジェクトが出来上がる*/
            sorted[array[i]] = datas[array[i]];
        }
        //戻り値にソート済みのオブジェクトを指定
        return sorted;

      }
    },
    // ページを開いたときに、本文のデータをエディタに反映
    created(){
      this.homeEditor = this.homeData;
    },
    // 変更したときに、本文のデータをエディタに反映
    watch:{
      homeData:function () {
       
        this.homeEditor = this.homeData;
      }
    },
    methods:{
      // 更新履歴作成関数
      createNews(){
        const homeCategory = this.homeCategory;
        const homeContent = this.homeContent;
        const homeDate = this.homeDate;
        const homeTitle =this.homeTitle;
        const createdAt=firebase.database.ServerValue.TIMESTAMP

      

        // 更新履歴の内容が0以上16字未満だった場合
        if(homeContent.length<100 && homeContent.length>0 && homeDate && homeTitle.length<20 && homeTitle.length>0){

          // ボタンの見た目を変更
          this.newsBtnPush=true
          this.newsBtn = "送信中…"

          // 内容をfirebaseに更新
          firebase.database().ref('news').push({
            content:homeContent,
            category:homeCategory,
            homeDate:homeDate,
            homeTitle:homeTitle,
            created_at:createdAt,
          }).then(()=>{

            // 出来たらボタンを元に戻してフォームを空にし、完了を知らせる
            this.newsBtn = "送信"
            this.newsBtnPush=false;
            this.homeContent = "";
            this.homeCategory = "study";
            this.homeDate="";
            this.formModalMessage="更新履歴を送信しました。";
            this.formModal=true;

          })
        // それ以外だった場合
        }else{
          // 警告モーダルを出す
          this.formModalMessage="更新履歴の内容は1～100文字でお願いします。\nタイトルを1～15文字でお願いします。\n日付を入力してください。"
          this.formModal=true;
        }
        
      },
      pickerClosed() {
        if(this.homeDate){
  
          this.homeDate = moment(this.homeDate).format('YYYY/MM/DD');
        }
      },
      customFormatter(date) {
        return moment(date).format('YYYY/MM/DD');
      },
      // 本文をアップロードする関数
      createHome(){
        firebase.database().ref('home').set(this.homeEditor)
      },
      removeUploadedImg(){
        this.uploadedImage="";
        this.inputImg="";
        document.getElementById("home-inputfile").value = '';

      },
      // 画像をアップロードする関数
      updateEyeCatchData(){
        const files = this.inputImg;
        const file = files[0]


        // 添付されていない場合
        if(!file){
          this.formModalMessage="画像を添付してください。"
          this.formModal=true;
        // 画像以外が添付されている場合
        }else if(file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'image/png' && file.type != 'application/pdf'){
          this.formModalMessage="画像ファイル以外を添付しています。\njpg、.gif、.png、.pdfを添付してください。"
          this.formModal=true;
        // 大きすぎる画像が添付されている場合
        }else if(file.size > 3000000){
          this.formModalMessage="画像ファイルファイルが大きすぎます。\n3MB未満でお願いします。"
          this.formModal=true;
        // 正しい画像が添付されている場合
        }else{
          this.eyeCatchBtnPush=true
          this.eyeCatchBtn="送信中…"
          firebase.storage().ref(`eyeCatch/${file.name}`).put(file)
          .then((snapshot)=>{
      
            firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL()
            .then((url)=>{
              this.filePath = url
           
              firebase.database().ref('eyeCatch').push({
                img: true,
                src:this.filePath,
                mask: "black-light",
                alt: "",
              }).then(()=>{
                this.inputImg="";
                this.uploadedImage="";
                this.eyeCatchBtn="送信";
                this.eyeCatchBtnPush=false;
                document.getElementById("home-inputfile").value = '';
                this.formModalMessage="画像送信完了しました。"
                this.formModal=true;
                
              })
            })
          })

        }
        
        
  
      },
      // タブをクリックしたときの関数
      selectTab(tab){
        this.activeTab=tab;
      },
      // 更新履歴をさらに4件呼び出す
      moreView(){
        this.$emit('moreView');
      },
      // 更新履歴を削除する関数
      removeNewsdata(){
        firebase.database().ref(`news/${this.removeModal}`).remove()
        this.newsModal=false
      },
      // 画像を削除する関数
      removeCarouseldata(){
     
        firebase.database().ref(`eyeCatch/${this.removeCarouselModal}`).remove()
        this.carouselModal=false
      },
      // ファイルが添付された時に発動する関数
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
          this.uploadedImage = e.target.result;
          };
          reader.readAsDataURL(file);
      },
      // エディタ内で画像を添付したときに発火する関数
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {

    

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
.remove-carousel{
  bottom:2rem;
  right:2rem
}

.active-font .nav-link {
  color:white;
} 
</style>