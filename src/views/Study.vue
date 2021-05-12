<template>
    <div class="mx-md-5">
        

            

            <mdb-container class="mt-3"> 
                <h2>Study<span>研究紹介</span></h2>
        <!-- <ul> -->
            <!-- <li v-for="(studyContent,index) in studyContents" :key='index'>
                <router-link :to="{name:'studyDetail',params:{id:index}}">{{studyContent.title}}</router-link>
                <br><img v-if="studyContent.filePath" :src='studyContent.filePath' style="width:100%">
                <img v-if="!studyContent.filePath" src='sample_img2.svg' style="width:100%"></li> -->
            <section class="mb-4" v-html="mainStudyContents">

            </section>
                <mdb-row>
                    <mdb-col class="px-1" md="4" col="6" v-for="(studyContent,index) in studyContents" :key='index'>
                        <mdb-card class="rounded-0 border-light-gray mb-2 z-depth-0">
                        <mdb-view class="mdb-view" hover>
                            <div @click="goStudyDetail(index)">
                                
                                <transition v-if="!load">
                                    <mdb-card-image
                                    class="card-img rounded-0"
                                    v-if="studyContent.filePath" :src='studyContent.filePath'
                                    alt="Card image cap"/>
                                    <mdb-card-image
                                        class="card-img rounded-0"
                                        v-if="!studyContent.filePath" src='sample_img2.svg'
                                        alt="Card image cap"/>
                                </transition>

                                <transition v-if="load">
                                    <div class="card-img rounded-0 loading d-flex align-self-center justify-content-center" v-if="load">
                                        <vue-loading  type="bubbles" color="#333" :size="{ width: '50px', height: '50px' }"></vue-loading>
                                    </div>

                                </transition>
                                    
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </div>
                        </mdb-view>
                        <mdb-card-body>
                            <mdb-card-title class="study-card-title">{{studyContent.title}}</mdb-card-title>
                            
                            <div class="d-flex flex-row-reverse">
                                <mdb-btn class="z-depth-0 py-md-2 px-md-3 px-2 py-1" @click="goStudyDetail(index)" outline="elegant">more<mdb-icon class="ml-1" icon="angle-down" /></mdb-btn>
                            </div>
                            
                        </mdb-card-body>
                    </mdb-card>
                    </mdb-col>

                </mdb-row>
            </mdb-container>
        <!-- </ul> -->



    </div>
</template>

<script>
import { mdbIcon, mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle,  mdbBtn, mdbView, mdbMask,mdbContainer, mdbRow, mdbCol } from 'mdbvue';
import { VueLoading } from 'vue-loading-template';
    export default{
        data(){
            return{
                file:"",
                title:"",
                Content:"",
                filePath:"",
                uploadedImage:"",
                inputImg:"",
                load:true

            }
        },
        mounted() {
            setTimeout(() => {
            this.load = false;
            }, 1000);
        },
        props:{
            studyContents:Object,
            mainStudyContents:String,
        },
        name: 'study',
        components: {
			mdbCard,
			mdbCardImage,
			mdbCardBody,
			mdbCardTitle,
			VueLoading,
			mdbBtn,
			mdbView,
            mdbMask,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbIcon
        },
        methods:{
            goStudyDetail(index){
                this.$router.push({ name: 'studyDetail', params:{id:index}})
            }
        }
    }
</script>

<style scoped>
    img{
        width:100%;
            
    }
    .mdb-view{
        width: 100%;
        position: relative;
    

    }
    .mdb-view:before{
        content:'';
        display: block;
        padding-top: 56.25%; /* 高さ÷横幅×100 */
        
    }
    .card-img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        

    
        
    }
    .study-card-title{
        font-size:1rem
    }
    

</style>