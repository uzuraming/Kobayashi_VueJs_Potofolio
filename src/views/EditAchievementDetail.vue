<template>
    <div>
        <mdb-container>
        <h2>Achievement Settings<span>研究成果、出版物の編集</span></h2>
        
        <div class="text-center my-3">
           <h3 class="mt-5">{{this.$route.params.id}}年の詳細画面</h3>
        </div>
        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="achievementData"> </vue-editor><br>
        <div class="d-flex flex-row-reverse">
            <mdb-btn class="z-depth-0" color="success" @click="updateAchievementData">適用</mdb-btn>
            <mdb-btn class="z-depth-0"  color="secondary" @click="backAchievement">戻る</mdb-btn>
        </div>
        </mdb-container>
    </div>
    
</template>

<script>
  import firebase from 'firebase';
  import {VueEditor} from "vue2-editor";
  import { mdbBtn, mdbContainer } from 'mdbvue';

  export default{
      data(){
          return{
              achievementData:""

          }
      },
      components: { VueEditor, mdbBtn, mdbContainer },
    name: 'editAchievementDetail',
    methods:{
        getAchievementDetail(snap){
            const achievementData = snap.val()
            if(!achievementData){
                this.$router.push({path:'/not_found'})
            }
        

            this.achievementData = achievementData
        },
        updateAchievementData(){
            const achievementDate = this.$route.params.id;
            firebase.database().ref(`achievements/${achievementDate}`).set(this.achievementData)
            this.$router.push('/editachievement')
        },
        backAchievement(){
            this.$router.push('/editachievement')
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
    created(){
        const achievementDate = this.$route.params.id;
        firebase.database().ref(`achievements/${achievementDate}`).on('value', this.getAchievementDetail)

    }
  }
</script>