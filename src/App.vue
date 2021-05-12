<template>
  <div id="app">
    <globalHeader/>
    <transition>
      <router-view class="main-contents mt-5"
        @moreView="moreView"
        @lessView="lessView"
        :acsessData='acsessData'
        :loadTeacherData='loadTeacherData'
        :loadDoctorData='loadDoctorData'
        :loadM2Data='loadM2Data'
        :loadM1Data='loadM1Data'
        :loadB4Data='loadB4Data'
        :loadB3Data='loadB3Data'
        :loadB2Data='loadB2Data'
        :studyContents='studyContents'
        :mainStudyContents='mainStudyContents'
        :newsData='newsData'
        :dates='dates'
        :linkData='linkData'
        :homeData='homeData'
        :eyeCatchData='eyeCatchData'
        :readNewsNumber='readNewsNumber'
        :loadHome='loadHome'/>
      </transition>
     <globalFooter :linkData='linkData'/> 
     
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

#app {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Helvetica Neue", HelveticaNeue, YuGothic, "Yu Gothic Medium", "Yu Gothic", Verdana, Meiryo, sans-serif;
  color: #2c3e50;
  font-size:1rem;

  p {
  white-space: pre-wrap;
}
h1{
  font-size:23px;
  font-size:1.8rem;
}


  h2 {
  font-size: 20px;
  font-size: 1.6rem;
  position: relative;
  padding: 1rem;
  text-align: center;
}

strong{
  font-weight:900;
}
h2 span {
  font-size: 12px;
  font-size: 0.8rem;
  display: block;
}

h2:before {
  position: absolute;
  bottom: -6px;
  left: calc(50% - 30px);
  width: 60px;
  height: 5px;
  content: '';
  border-radius: 3px;
  background: #fa4141;
}
h2:first-letter {
  font-size: 2rem;
  color: #fa4141;
}

// h3 {
//   padding: 0.25em 0.5em;/*上下 左右の余白*/
//   color: #494949;/*文字色*/
//   font-size:1.2rem;
//   background: transparent;/*背景透明に*/
//   border-left: solid 5px gray;/*左線*/
// }
h3 {
  border-bottom: solid 5px #eeeeee;
  position: relative;
  font-size:1.4rem;
}

h3:after {
  position: absolute;
  content: " ";
  display: block;
  border-bottom: solid 5px #f44336;
  bottom: -5px;
  width: 20%;
}

p{
  margin:0 1rem 0
}

}

.v-enter {
  opacity: 0;
}

/* 表示アニメーション後のスタイル */
.v-enter-to {
  opacity: 1;
}

/* 表示アニメーション動作中のスタイル */
.v-enter-active {
  transition: all 1000ms;
}


 



</style>

<script>
  import globalHeader from './components/GlobalHeader'
  import globalFooter from './components/GlobalFooter'
  import firebase from 'firebase'

  export default{
    data(){
      return{
        acsessData:'', //acsessのデータ
        loadTeacherData:{}, //以下memberのデータ
        loadDoctorData:{},
        loadM2Data:{},
        loadM1Data:{},
        loadB4Data:{},
        loadB3Data:{},
        loadB2Data:{},
        studyContents:{},
        mainStudyContents:"",
        dates:{

        },
        newsData:{},
        readNewsNumber:4,
        linkData:{},
        homeData:"",
        eyeCatchData:{},
        loadHome:true,

        
      }
    },
    components:{
      globalHeader,
      globalFooter,
    },
    watch:{
      homeData:function () {
        this.loadHome=false;
        setTimeout(() => {
          this.load = false;
        }, 1000);
     
        
      }
    },
    created(){
      // acsessデータ読み込み
      firebase.database()
      .ref('acsess').on('value', this.acsessAdded)

      // メンバーデータ読み込み
      firebase.database().ref('members/teacher').on('value', this.TeacherAdded)
      firebase.database().ref('members/doctor').on('value', this.DoctorAdded)
      firebase.database().ref('members/M2').on('value', this.M2Added)
      firebase.database().ref('members/M1').on('value', this.M1Added)
      firebase.database().ref('members/B4').on('value', this.B4Added)
      firebase.database().ref('members/B3').on('value', this.B3Added)
      firebase.database().ref('members/B2').on('value', this.B2Added)

      // studyでーた読み込み
      firebase.database().ref('study').on('value', this.updateStudy)

      // studyの本文読み取り
      firebase.database().ref('mainStudy').on('value', this.getMainStudy)


      // アチーブメントデータ読み込み
      firebase.database().ref('achievements').on('value', this.getAchievementDate)

      // Homeのニュースデータ読み込み
      firebase.database().ref('news').orderByChild('created_At').limitToLast(this.readNewsNumber).on('value', this.getNews);

      firebase.database().ref('link').on('value', this.getLink)

      firebase.database().ref('home').on('value', this.getHome)

      firebase.database().ref('eyeCatch').on('value', this.getEyeCatch)



      


    },
    methods:{
      // acsessデータが変更したときに発火してacsessAddedを発火
      acsessAdded(snap) {
      const acsessData = snap
      this.acsessData = acsessData.val()
    
      },
      // memberデータが変更したときに発火してmemberAddedを発火

      TeacherAdded(snap) {
            const memberData = snap
      
            this.loadTeacherData = memberData.val()
        },
        DoctorAdded(snap) {
            const memberData = snap
            this.loadDoctorData = memberData.val()
        },
        M2Added(snap) {
            const memberData = snap
            this.loadM2Data = memberData.val()
        },
        M1Added(snap) {
            const memberData = snap
            this.loadM1Data = memberData.val()
        },
        B4Added(snap) {
            const memberData = snap
            this.loadB4Data = memberData.val()
        },
        B3Added(snap) {
            const memberData = snap
            this.loadB3Data = memberData.val()
        },
        B2Added(snap) {
            const memberData = snap
            this.loadB2Data = memberData.val()
        },
        // studyが変更したときに発火して更新
        updateStudy(snap){
          this.studyContents=snap.val()
        },
        getMainStudy(snap){
          this.mainStudyContents=snap.val();
        },
        // achievementが変更した時に発火して更新
        getAchievementDate(snap){
          const achievementDate = snap.val()

          this.dates = achievementDate
     
        },
        getNews(snap){
          const newsData = snap.val(); 
          this.newsData = newsData
     
        },
        moreView(){
          this.readNewsNumber = this.readNewsNumber + 4;
          firebase.database().ref('news').orderByChild('createdAt').limitToLast(this.readNewsNumber).once('value').then(this.getNews)
        },
        lessView(){
          this.readNewsNumber = 4;
          firebase.database().ref('news').orderByChild('createdAt').limitToLast(this.readNewsNumber).once('value').then(this.getNews)
        },
        getLink(snap){
          const linkData = snap.val();
          this.linkData = linkData
          
        },
        getHome(snap){
          const homeData= snap.val();
          this.homeData= homeData
        },
        getEyeCatch(snap){
          const eyeCatchData= snap.val();
          this.eyeCatchData= eyeCatchData
        }
    }
  }
</script>

<style>


 .main-contents{
  width:100%;
  margin:auto;
}



.ql-align-center{
  text-align:center !important
}
.ql-align-right{
  text-align:right !important
}
.ql-align-left{
  text-align:left !important
}

@media screen and (max-width:480px) {

  .main-contents{
    width:100%;
    margin:auto;

  }
  img{
  width:100%;
  margin:auto;

}
}

@media screen and (min-width:480px) and ( max-width:800px) {
  .main-contents{
    width:100%;
    margin:auto;

  }
}

@media screen and (min-width:1280px) {
  .main-contents{
    width:100%;
    margin:auto;
  }
/* img{
  width:50%;
  margin:0 auto;
} */
}
.custom-file-input:lang(ja) ~ .custom-file-label::after {
  content: '参照';
}

</style>