<template>
    <div>
      <mdb-container>
        <h2>Study<span>研究紹介</span></h2>
      
        
        
        <mdb-row class="mt-4">
          <mdb-col  v-if="studyContents[this.$route.params['id']].filePath" sm="4">
            <!-- <img class="w-100" :src="studyContents[this.$route.params['id']].filePath"> -->
            <div class="img-box">
              <transition v-if="!load">
                    
                        <img class="p-2 border border-light studyImg" :src="studyContents[this.$route.params['id']].filePath" style="width:100%;">
                    
                </transition>
                <transition v-if="load">
                    <div class="studyImg loading d-flex align-self-center justify-content-center">
                        <vue-loading  type="bubbles" color="#333" :size="{ width: '50px', height: '50px' }"></vue-loading>
                    </div>
                </transition>
            </div>
          </mdb-col>
          <mdb-col v-if="!studyContents[this.$route.params['id']].filePath" sm="2">
       
          </mdb-col>
          <mdb-col sm="8">
            
            <div class="mx-2" v-html="studyContents[this.$route.params['id']].content"></div>
             <div class="mt-5 d-flex flex-row-reverse">
                <router-link class="mr-4 font-weight-bold" to="/study">Back >></router-link>
            </div>
            
          </mdb-col>
          <mdb-col v-if="!studyContents[this.$route.params['id']].filePath" sm="2">
            
          </mdb-col>

        </mdb-row>
        
        
      </mdb-container>
        


    </div>
</template>

<script>
  import {
      mdbContainer,
      mdbRow,
      mdbCol,

    } from 'mdbvue';
    import { VueLoading } from 'vue-loading-template';

  export default{
    name: 'studyDetail',
    data(){
        return{
          load:true

        }
    },
    props:{
        studyContents:Object,
    },
    mounted() {
            setTimeout(() => {
            this.load = false;
            }, 1000);
    },
    created(){
      if(!this.studyContents[this.$route.params['id']]){
        this.$router.push({path:'/not_found'})
      }
    },
    components: {
      mdbContainer,
      mdbRow,
      mdbCol,
       VueLoading,

    }


  }
</script>

<style>
.img-box{
    width: 100%;
    position: relative;
}
.img-box::before{
    content:'';
    display: block;
    padding-top: 100%; /* 高さ÷横幅×100 */
}
.studyImg{
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    

}
</style>