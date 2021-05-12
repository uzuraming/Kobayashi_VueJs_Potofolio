<template>
    <div>
        


          <mdb-footer color="elegant-color" class="font-small pt-4 mt-4">
            <mdb-container class="text-left">
            <mdb-row>
                
                <mdb-col sm="6">
                    <h5 class="title">Links</h5>
                    <ul class="site-map">
                        <li class="mb-1" v-for="(link,index) in linkData" :key="index">
                       <a :href="link.URL"><mdb-icon class="mr-1" icon="external-link-alt" />{{link.link}}</a></li>
                    </ul>
                </mdb-col>
                <mdb-col sm="6">
                    <h5 class="title">Site Map</h5>
                    <ul class="site-map">
                        <li style="cursor: pointer;" class="mb-1" @click="siteMap('/')" >Home</li>
                        <li style="cursor: pointer;" class="mb-1" @click="siteMap('/member')" >Member</li>
                        <li style="cursor: pointer;" class="mb-1" @click="siteMap('/acsess')" >Acsess</li>
                        <li style="cursor: pointer;" class="mb-1" @click="siteMap('/study')" >study</li>
                        <li style="cursor: pointer;" class="mb-1" @click="siteMap('/achievement')" >Achievement</li>
                    </ul>
                </mdb-col>
            </mdb-row>
            </mdb-container>
            <div class="footer-copyright text-center py-3">
            <mdb-container fluid>
                &copy; 2020 Copyright: <a href="https://www.MDBootstrap.com"> Kobayashi </a>
            </mdb-container>
            </div>
        </mdb-footer>
    </div>
</template>

<script>
    import { mdbFooter, mdbContainer, mdbRow, mdbCol, mdbIcon } from 'mdbvue';
    export default{
        name:'globalFooter',
        props:{
            linkData:Object,
        },
        components: {
            mdbFooter,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbIcon
        },
        methods:{
            siteMap(page){
                this.$router.push(page);
                
            }
        }


    }
</script>

<style>
    .site-map{
        list-style:none;
    }
</style>