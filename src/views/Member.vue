<template>
    <div>
        <mdb-container>
        <h2>Member<span>メンバー</span></h2>

        <div class="my-3">
            <h3>教職員｜Staff</h3>
        </div>
        
            <mdb-tbl sm class="border border-light" striped >
                <mdb-tbl-head color="elegant-color" class="text-white">
                    <tr>
                    <th>役職</th>
                    <th>名前</th>
                    <th>メールアドレス</th>
                    </tr>
                </mdb-tbl-head>
                <mdb-tbl-body>

                    <tr v-for="(loadMember, index) in loadTeacherData" :key="index">
                        <th>{{loadMember.status}}</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'teacher'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>

                    
                </mdb-tbl-body>
            </mdb-tbl>
        
        <div class="mb-3 mt-5">
            <h3>学生｜Student</h3>
        </div>

        <mdb-tbl class="border border-light" sm striped>
            <mdb-tbl-head >
                    <tr>
                    <th>役職</th>
                    <th>名前</th>
                    <th>メールアドレス</th>
                    </tr>
                </mdb-tbl-head>
                <mdb-tbl-body>

                    <tr v-for="(loadMember, index) in loadDoctorData" :key="index">
                        <th>博士課程</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'doctor'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>
                    <tr v-for="(loadMember, index) in loadM2Data" :key="index">
                        <th>修士課程2年</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'M2'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>
                    <tr v-for="(loadMember, index) in loadM1Data" :key="index">
                        <th>修士課程1年</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'M1'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>
                    <tr v-for="(loadMember, index) in loadB4Data" :key="index">
                        <th>学部4年</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'B4'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>
                    <tr v-for="(loadMember, index) in loadB3Data" :key="index">
                        <th>学部3年</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'B3'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>
                    <tr v-for="(loadMember, index) in loadB2Data" :key="index">
                        <th>学部2年</th>
                        <td><router-link class="link-style-btn text-primary" :to="{name:'memberDetail',params:{id:index,grade:'B2'}}">{{loadMember.name}}</router-link></td>
                        <td>{{loadMember.email}}</td>
                    </tr>
                </mdb-tbl-body>
            </mdb-tbl>

    </mdb-container>

    </div>
</template>

<script>
  import { mdbTbl, mdbTblHead, mdbTblBody, mdbContainer } from 'mdbvue';
  export default{
    data(){
        return{
            grade:'teacher',
            name:'',
            remarks:'',
        }
    },
    components: {
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbContainer
    },
    props:{
        loadTeacherData:Object,
        loadDoctorData:Object,
        loadM2Data:Object,
        loadM1Data:Object,
        loadB4Data:Object,
        loadB3Data:Object,
        loadB2Data:Object,
    },
    name: 'member',
        
}


</script>

<style>

.link-style-btn{
  cursor: pointer;
  border: none;
  background: none;
}
.link-style-btn:hover{
  text-decoration: underline;

}

</style>