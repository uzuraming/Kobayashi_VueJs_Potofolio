<template>
    <div>
        


        <mdb-container>
         <h2 >Member<span>メンバー</span></h2>
         
      
        
        
        <mdb-row class="mt-4">
          <mdb-col v-if="uploadedImage" sm="4">
            
            <div class="imgBox" v-if="uploadedImage">
                <transition v-if="!load">
                    
                        <img class="p-2 border border-light memberImg" :src="uploadedImage" style="width:100%;" />
                    
                </transition>
                <transition v-if="load">
                    <div class="memberImg loading d-flex align-self-center justify-content-center">
                        <vue-loading  type="bubbles" color="#333" :size="{ width: '50px', height: '50px' }"></vue-loading>
                    </div>
                </transition>
            </div>
          </mdb-col>
          <mdb-col v-if="!uploadedImage" sm="2">

          </mdb-col>
          <mdb-col sm="8">
            <h3 class="mb-5 mt-3" >{{ name }}</h3>
            <div class="mb-3" v-if='this.$route.params.grade==="teacher"'>
                <h6 class="h6 mx-2">役職</h6>
                <p class="border-bottom border-light">{{ status }}</p>
            </div>
            <div class=" mb-3"  v-if='this.$route.params.grade!=="teacher"'>
                <h6 class="h6 mx-2">学年</h6>
  
                <div v-if='this.$route.params.grade==="doctor"'>
                    <p class="border-bottom border-light">博士課程</p>
                </div>
                <div v-if='this.$route.params.grade==="M2"'>
                    <p class="border-bottom border-light">修士課程2年</p>
                </div>
                <div v-if='this.$route.params.grade==="M1"'>
                    <p class="border-bottom border-light">修士課程1年</p>
                </div>
                <div v-if='this.$route.params.grade==="B4"'>
                    <p class="border-bottom border-light">学部4年</p>
                </div>
                <div v-if='this.$route.params.grade==="B3"'>
                    <p class="border-bottom border-light">学部3年</p>
                </div>
                <div v-if='this.$route.params.grade==="B2"'>
                    <p class="border-bottom border-light">学部2年</p>
                </div>
        
            </div>
            
            <h6 class="h6  mx-2">メールアドレス</h6>
            <p class=" border-bottom border-light mb-3">{{ email }}</p>
            <div  v-if="this.achievement" class="mb-3 ">
                <h6 class="h6 mx-2 ">研究内容・研究業績</h6>
                <p class="border-bottom border-light">{{achievement}}</p>
            </div>
            <div class="" v-if="this.remarks">
                <h6 class="h6 mx-2">自己紹介</h6>
                <p>{{remarks}}</p>    
            </div>
            <div class="mt-5 d-flex flex-row-reverse">
                <!-- <mdb-btn class="shadow-none"  @click="backMember()" color="blue-grey">back</mdb-btn> -->
                <router-link class="mr-4 font-weight-bold" to="/member">Back >></router-link>
            </div>
            
            
            
          </mdb-col>
          <mdb-col v-if="!uploadedImage" sm="2">

          </mdb-col>

        </mdb-row>
        

      </mdb-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import { VueLoading } from 'vue-loading-template';
import {
      mdbContainer,
      mdbRow,
      mdbCol,
       
} from 'mdbvue';
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
            load:true,
        }
    },
    components: {
            VueLoading,
            mdbContainer,
            mdbRow,
            mdbCol,
             
    },
    mounted() {
            setTimeout(() => {
            this.load = false;
            }, 1000);
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
    },
    created(){
        const memberId = this.$route.params.id
  
        const grade = this.$route.params.grade
        firebase.database().ref(`members/${grade}/${memberId}`).on('value', this.importMemberData)



    }
  }
</script>

<style scoped>
    h6{
        text-decoration: underline;
        weight:900;
    }
    .imgBox{
        width: 100%;
        position: relative;
    }
    .imgBox::before{
        content:'';
        display: block;
        padding-top: 100%; /* 高さ÷横幅×100 */
    }
    .memberImg{
        position: absolute;
        object-fit: contain;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        

    }


</style>