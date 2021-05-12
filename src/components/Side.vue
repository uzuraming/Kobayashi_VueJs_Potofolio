<template>
    <div>
        <section  class="pl-4 mb-5 mt-3">
            <h6 class="h6 "><mdb-icon class="mr-1" icon="list" />目次</h6>
            <mdb-navbar color="ml-0 white" class="lighten-5 shadow-none py-4">
                <mdb-navbar-nav nav vertical>
                  <mdb-nav-item anchorClass="dark-grey-text" class="text-decoration-none border-bottom border-light grey-text" to="/member" :class="{active: this.$route.path === '/member'}">メンバー｜Member<mdb-icon icon="angle-double-right" class="gray-text ml-1" /></mdb-nav-item>
                  <mdb-nav-item anchorClass="dark-grey-text" class="text-decoration-none border-bottom border-light grey-text" to="/acsess" :class="{active: this.$route.path === '/acsess'}">アクセス｜Acsess<mdb-icon icon="angle-double-right" class="gray-text ml-1" /></mdb-nav-item>
                  <mdb-nav-item anchorClass="dark-grey-text" class="border-bottom border-light grey-text" to="/study" :class="{active: this.$route.path === '/study'}">研究内容｜Study<mdb-icon icon="angle-double-right" class="gray-text ml-1" /></mdb-nav-item>
                  <mdb-nav-item anchorClass="dark-grey-text" class="text-decoration-none grey-text" to="/achievement" :class="{active: this.$route.path === '/achievement'}">研究実績｜Achievement<mdb-icon icon="angle-double-right" class="gray-text ml-1" /></mdb-nav-item>
                </mdb-navbar-nav>
            </mdb-navbar>
            <h6 class="h6"><mdb-icon class="mr-1" icon="map-marker-alt" />所在地</h6>
               <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16858886.629529595!2d0!3d-75.05434995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4b9967b3390754b%3A0x6e52be1f740f2075!2z5Y2X5qW15aSn6Zm4!5e0!3m2!1sja!2sjp!4v1620823057022!5m2!1sja!2sjp"  height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
             <h6 class="mt-3 mx-3" ><mdb-icon class="mr-1" icon="map-marker-alt" />住所</h6>
            <p class="ml-4">{{acsessData.adress}}</p>
            <h6 class="mt-3 mx-3" ><mdb-icon class="mr-1" icon="phone" />電話番号</h6>
            <p class="ml-4">{{acsessData.tel}}</p>
            <h6 class="mt-3 mx-3" ><mdb-icon class="mr-6" icon="envelope" />メールアドレス</h6>
            <p class="ml-4">{{acsessData.email}}</p>
        </section>
        
        
    </div>
</template>

<script>
    import { mdbNavbar, mdbNavbarNav, mdbNavItem, mdbIcon } from 'mdbvue';
    export default{
        name:'side',
        props:{
            acsessData:Object,
        },
        components: {
            mdbNavbar,
            mdbNavbarNav,
            mdbNavItem,
            mdbIcon
        }


    }
</script>

<style>
    
</style>