<template>
    <div >
      <div>

      </div>
      <transition>
      <div style="width: 100vw; height: 100vh; background-size: cover; background-color: white; z-index:5" class="position-fixed loading d-flex align-self-center justify-content-center" v-if="loadHome">
                <vue-loading type="bubbles" color="#333" :size="{ width: '50px', height: '50px' }"></vue-loading>
            </div></transition>
      <transition>
      <div v-if="!loadHome">
 
          <div class="h-50 mt-5 filter" style="position: relative;">
              <hooper :wheelControl='false' :keysControl='false' :shortDrag='false' :auto-play="true" :transition='1000' :play-speed="5000" :infinite-scroll='true' class="hopper mt-5">
              <slide class="slide" v-for="(data, index) in carouselData" :key="index">
                <img class="w-100 filter-img" :src="data.src"> 
                
              
              </slide>
              
            </hooper>
            <div class="animated fadeInUp w-30 h-30 text-white home-text m-sm-5" v-html="homeData"></div>
            <mdb-btn class="animated fadeInUp home-btn z-depth-0" @click="goStudy" outline="white">研究内容はこちらから<mdb-icon icon="angle-double-right" id="animate" class="animated delay-2s fadeIn infinite gray-text ml-1" /></mdb-btn>
            </div>
     
      <mdb-container>
        

        <mdb-row class="mt-3">
          <mdb-col class="px-0 w-100" sm="9">
            
            
            

            

          <h3 class=" mx-2 mt-3"><mdb-icon class="mr-1" icon="rss" />更新履歴｜News</h3>

          <transition-group name="news" apear>
        
          <mdb-card class="news-card  shadow-none mx-4 mb-2 rounded-0 " v-for="(data,index) in reverseItems" :key="index" style="width: 90%;">
            <mdb-card-body class="border-bottom">
              <mdb-card-title tag="h6" sub class="mb-2 text-muted"> <mdb-icon class="mr-1" icon="calendar-alt" />{{data.homeDate}}
                <span class="ml-1"  v-if="data.category === 'study'"><mdb-icon icon="tag"  />Study</span>
                <span class="ml-1"  v-if="data.category === 'achievement'"><mdb-icon icon="tag"  />Achievement</span>
                <span class="ml-1"  v-if="data.category === 'member'"><mdb-icon icon="tag"  />Member</span>
                <span class="ml-1"  v-if="data.category === 'acsess'"><mdb-icon icon="tag"  />Acsess</span>
              </mdb-card-title>
              <mdb-card-title>
          
        
                <div v-if="data.category === 'study'"><router-link to="/study">{{data.homeTitle}}</router-link></div>
                <div v-if="data.category === 'achievement'"><router-link to="/achievement">{{data.homeTitle}}</router-link></div>
                <div v-if="data.category === 'member'"><router-link to="/member">{{data.homeTitle}}</router-link></div>
                <div v-if="data.category === 'acsess'"><router-link to="/acsess">{{data.homeTitle}}</router-link></div>
              </mdb-card-title>
              
              <mdb-card-text class="mx-0 mb-2">
                <p style="white-space: pre-wrap;">{{ data.content }}</p>
              </mdb-card-text>              
            </mdb-card-body>
          </mdb-card>
          </transition-group>


          <!-- <button @click="moreView">MORE</button> -->
          <div class="blue-grey-text d-flex flex-row-reverse mr-5">
              <span style="cursor: pointer" class="px-2 py-1 border border-dark-light" @click="moreView" >
                ▼
            </span>
            <span style="cursor: pointer" class="px-2 mr-2 py-1  border border-dark-light" @click="lessView" v-if="loadBtn>0" >
                ▲
            </span>
          </div>
          
       
          </mdb-col>
          <mdb-col sm="3" class="px-0" ><side :acsessData='acsessData'/></mdb-col>

        </mdb-row>
        </mdb-container>


        <!-- <img :src="eyeCatchData.filePath" style="width:100%;" />
        <p>{{eyeCatchData.eyeCatchCommnet}}<router-link to="/study">研究内容はこちら</router-link>
        <div v-html="homeData"></div> -->


          

  
      </div></transition>
    </div>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import { VueLoading } from 'vue-loading-template'
import 'hooper/dist/hooper.css';
import { mdbBtn,
        mdbCard,
        mdbCardBody,
        mdbCardTitle,
        mdbCardText,
        mdbIcon,
        mdbRow,
        mdbCol,
        mdbContainer,
        animateOnScroll  } from 'mdbvue';
import side from '../components/Side'

  export default{
    name: 'home',
    data(){
      return{
        homeCategory:'study',
        homeContent:'',
        carouselData:"",
        loadBtn:false,
        load:true,
      }
    },
    props:{
      newsData:Object,
      homeData:String,
      eyeCatchData:Object,
      acsessData:Object,
      readNewsNumber:Number,
      loadHome:Boolean,
    },
    components: {
      mdbBtn, 
      mdbCard,
        mdbCardBody,
        mdbCardTitle,
        mdbCardText,
        mdbIcon,
        Hooper,
        Slide,
        side,
        mdbRow,
        mdbCol,
        mdbContainer,
        VueLoading 

    },
    directives: {
      animateOnScroll
    },
    watch: {
      // この関数は question が変わるごとに実行されます。
      eyeCatchData: function () {
        const eyeCatchData = this.eyeCatchData
      this.carouselData=Object.keys(eyeCatchData).map(function (key) {return eyeCatchData[key]})
      this.load=false
      },
      homeData: function(){
        this.load=false
      }
    },
    created(){
      if(this.readNewsNumber>4){
        this.loadBtn=true;

      }
      
    },
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
    methods:{
      moreView(){
        this.loadBtn = true
        this.$emit('moreView');
      },
       lessView(){
         this.loadBtn = false
         this.$emit('lessView');
      },
      goStudy(){
            this.$router.push('/study')
        },
    },
    mounted(){
      const eyeCatchData = this.eyeCatchData
      this.carouselData=Object.keys(eyeCatchData).map(function (key) {return eyeCatchData[key]})
   

    },
    

  }
</script>

<style scoped>




.home-btn {
  position: absolute;/*絶対配置*/
  bottom: 25px;
  right: 50px;
  }


@media screen and (max-width:476px) {
 .home-btn {
  position: absolute;/*絶対配置*/
  bottom: 0;
  right: 0;
  }
}


  img{
    width:100%;
  }

  .filter {
 background: #000;
}
 
.filter-img {
 /* display: block; */
 opacity: .6;
}

.home-text {
  position: absolute;/*絶対配置*/
  top: 1rem;
  left: 1rem;
  }

.h3{

}
.news-card{
  width:100%;
}

a{
  color:#2E2E2E;
  text-decoration: underline;
}

#animate {
  animation-duration: 2s; /* アニメーションの時間 */
  animation-delay: 3s; /* アニメーション開始時間 */
  animation-iteration-count: infinite; /* アニメーションの繰り返し回数 */
}

.news-enter-active {
  transition: all .8s ease;
}


.news-enter {
  transform: translateX(10px);
  opacity: 0;
}





</style>