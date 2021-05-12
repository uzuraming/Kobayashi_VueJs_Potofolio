<template>
    <div>


            <mdb-navbar  class="header shadow-none fixed-top" expand="large" dark color="elegant-color">
              <mdb-navbar-brand to="/">
                Sample Site
              </mdb-navbar-brand> 
              <mdb-navbar-toggler>
                <mdb-navbar-nav>
                  <mdb-nav-item  to="/" :class="{active: this.$route.path === '/'}"><mdb-icon class="mr-1" icon="home" />Home</mdb-nav-item>
                  <mdb-nav-item to="/member" :class="{active: ~this.$route.path.indexOf('/member')}"><mdb-icon class="mr-1" icon="users" />Member</mdb-nav-item>
                  <mdb-nav-item to="/acsess" :class="{active: this.$route.path === '/acsess'}"><mdb-icon class="mr-1" icon="map-marked-alt" />Acsess</mdb-nav-item>
                  <mdb-nav-item to="/study" :class="{active: ~this.$route.path.indexOf('/study')}"><mdb-icon class="mr-1" icon="pen" />Study</mdb-nav-item>
                  <mdb-nav-item to="/achievement" :class="{active: this.$route.path === '/achievement'}"><mdb-icon class="mr-1" icon="book" />Achievement</mdb-nav-item>
                                    <mdb-nav-item v-if="!authenticatedUser" to="/login" :class="{active: this.$route.path === '/login'}"><mdb-icon class="mr-1" icon="sign-in-alt" />login</mdb-nav-item>

                  <mdb-dropdown v-if="authenticatedUser" tag="li" class="nav-item">
                    <mdb-dropdown-toggle tag="a" navLink color="red" slot="toggle" waves-fixed>
                      <mdb-icon icon="cog" />
                    </mdb-dropdown-toggle>
                    <mdb-dropdown-menu>
                       <mdb-dropdown-item to="/edithome" :class="{active: this.$route.path === '/edithome'}">Home Settings</mdb-dropdown-item>
                       <mdb-dropdown-item to="/editmember" :class="{active: ~this.$route.path.indexOf('/editmember')}">Member Settings</mdb-dropdown-item>
                       <mdb-dropdown-item to="/editacsess" :class="{active: this.$route.path === '/editacsess'}">Acsess Setttings</mdb-dropdown-item>
                       <mdb-dropdown-item to="/editstudy" :class="{active: ~this.$route.path.indexOf('/editstudy')}">Study Settings</mdb-dropdown-item>
                       <mdb-dropdown-item to="/editachievement" :class="{active: ~this.$route.path.indexOf('/editachievement')}">Achievement Settings</mdb-dropdown-item>
                        <mdb-dropdown-item to="/editfooter" :class="{active: this.$route.path === '/editfooter'}">Footer Settings</mdb-dropdown-item>
                       <mdb-dropdown-item @click="logOut">Logout</mdb-dropdown-item>
                    </mdb-dropdown-menu>
                  </mdb-dropdown>
                </mdb-navbar-nav>
              </mdb-navbar-toggler>
            </mdb-navbar>







    </div>
</template>

<script>
import firebase from 'firebase';
import { mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbIcon } from 'mdbvue';
  export default{
    name: 'globalHeader',
    data(){
      return {
        authenticatedUser: ''
      }
    },
    methods:{
      logOut(){
        firebase.auth().signOut();
      }
    },
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbIcon,
      mdbDropdown,
      mdbDropdownToggle,
      mdbDropdownMenu,
      mdbDropdownItem
    },
    mounted(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.authenticatedUser = true;
      } else {
    
        this.authenticatedUser = false;
      }
    });     
  }
  }
</script>

<style scoped>
.header{

}
  
</style>