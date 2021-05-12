<template>
    <div>
      <mdb-container>
        <h2>Acsess<span>アクセス</span></h2>
        <mdb-row class="mt-5">
          <mdb-col sm="5">
            <transition>
              <iframe v-if="!load" class="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16858886.629529595!2d0!3d-75.05434995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4b9967b3390754b%3A0x6e52be1f740f2075!2z5Y2X5qW15aSn6Zm4!5e0!3m2!1sja!2sjp!4v1620823057022!5m2!1sja!2sjp"  height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </transition>
            <transition>
              <div class="loading d-flex align-self-center justify-content-center" v-if="load">
                <vue-loading type="bubbles" color="#333" :size="{ width: '50px', height: '50px' }"></vue-loading>
              </div>
              
              
            </transition>
          </mdb-col>
          <mdb-col sm="7">
            <h3 class="mt-3"><mdb-icon class="mr-3" icon="map-marker-alt" />所在地｜Adress</h3>
            <p class="m-3"><mdb-icon icon="angle-double-right" class="gray-text mr-2" />{{acsessData.adress}}</p>
            <h3 class="mt-3"><mdb-icon class="mr-3" icon="phone" />電話番号｜Tel</h3>
            <p class="m-3"><mdb-icon icon="angle-double-right" class="gray-text mr-2" />{{acsessData.tel}}</p>
            <h3 class="mt-3"><mdb-icon class="mr-3" icon="envelope" />メールアドレス｜E-mail</h3>
            <p class="m-3"><mdb-icon icon="angle-double-right" class="gray-text mr-2" />{{acsessData.email}}</p>
          </mdb-col>
        </mdb-row>
<!--         
          <mdb-card class="shadow-none mt-5">
            
            
              


            <mdb-card-body>
              <mdb-card-title>アクセス</mdb-card-title>
              <mdb-card-text>
                <p>住所：{{acsessData.adress}}</p>
              <p>電話番号：{{acsessData.tel}}</p>
              <p>メールアドレス{{acsessData.email}}</p>
              </mdb-card-text>
              
              <mdb-btn color="primary">Button</mdb-btn>
            </mdb-card-body>
          </mdb-card> -->
      </mdb-container>

    </div>


        

</template>

<script>
import {  mdbContainer, mdbRow, mdbCol, mdbIcon } from 'mdbvue';
import { VueLoading } from 'vue-loading-template'
  export default{
    name: 'acsess',
    components: {
      
      VueLoading,
      mdbContainer,
      mdbRow, 
      mdbCol,
      mdbIcon
    },
    data(){
      return{
        load:true
      }
    },
    props:{
        acsessData:Object,
    },
    mounted() {
    setTimeout(() => {
      this.load = false;
    }, 1000);
  },
  }
</script>

<style scoped>
  .loading{
    height:450px;
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
    transition: all 2000ms;
  }

  /* 非表示アニメーション動作前のスタイル */
.v-leave {
  opacity: 1;
}

/* 非表示アニメーション動作後のスタイル */
.v-leave-to {
  opacity: 0;
}

/* 非表示アニメーション動作中のスタイル */
.v-leave-active {
  transition: all 500ms;
}

</style>