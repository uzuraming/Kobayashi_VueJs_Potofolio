<template>
    <div>
        <mdb-container>
        <h2>Achievement<span>研究成果、出版物等</span></h2>
        <ul class="mt-5 nav justify-content-center grey lighten-4 py-4">
            <li class="nav-item" v-for="(date, index) in reverseItems" :key="index">
                <a class="nav-link" href="javascript:void(0)" @click="selectView(index)">{{index}}</a>
                </li>
        </ul><br>
        

        <h3>{{ viewDate }}</h3>
        <div v-html="view"></div>
        </mdb-container>

    </div>
</template>

<script>
    import {mdbContainer} from 'mdbvue';
  export default{
    name: 'Achievement',


    data(){
        return{
            view:'',
            viewDate:'',


        }
    },
    components:{
        mdbContainer
    },
    computed:{
      reverseItems() {
        const datas = this.dates;
        const sorted = {}
        var array = [];
        for (let key in datas) {
        //指定された名前のプロパティがオブジェクトにあるかどうかチェック
            //if条件がtrueならば，配列の最後にキーを追加する
            array.push(key);
        }
     
        array.sort()
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
    props:{
        dates:Object,
    },
    methods:{

        selectView(index){
            const key = index
            this.viewDate = index
            this.view = this.dates[key]


        }
    },
    created(){
        const datas = this.dates;
        var array = [];
        for (let key in datas) {
        //指定された名前のプロパティがオブジェクトにあるかどうかチェック
            //if条件がtrueならば，配列の最後にキーを追加する
            array.push(key);
        }
        array.sort()
        array.reverse();
      
        const first = array[0]
   
        this.viewDate = first
        this.view=this.dates[first]
    },
    watch:{
        dates:function () {
        const datas = this.dates;
        var array = [];
        for (let key in datas) {
        //指定された名前のプロパティがオブジェクトにあるかどうかチェック
            //if条件がtrueならば，配列の最後にキーを追加する
            array.push(key);
        }
       
        array.sort()
        array.reverse();
   
        const first = array[0]
   
        this.viewDate = first
        this.view=this.dates[first]

            
        }
    }
  }
</script>