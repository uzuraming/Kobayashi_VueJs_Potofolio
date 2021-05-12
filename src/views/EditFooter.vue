<template>
    <div>
        <mdb-container>
            <h2 class="mb-5">Footer Settings<span>フッターの編集</span></h2>
            <mdb-row>
                <mdb-col>
                    <h3>新規作成</h3>
                    <!-- <label for='link'>リンク先</label><input id='link' v-model='link'><br>
                    <label for='url'>URL</label><input id='url' v-model='url'><br> -->
                        
                    
                  
                    <div class="form-group">
                        <label for="link">リンク先の名前</label>
                        <input type="text" id="link" v-model='link' class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="URL">リンク先のURL</label>
                        <input type="text" id="URL" v-model='url' class="form-control">
                    </div>
                    
                    <div class="d-flex flex-row-reverse">
                        <!-- <mdb-btn class="z-depth-0 mr-4" :disabled="memberBtnPush" @click="createMember()" color="success">{{ memberBtn }}</mdb-btn> -->
                        <mdb-btn :disabled="linkBtnPush" class="z-depth-0 mr-4" color="success" @click='createLink'>{{ linkBtn }}</mdb-btn>
                    </div>

                </mdb-col>
                <mdb-col>
                    <h3>リンク一覧</h3>
                    <!-- <mdb-list-group>
                        <mdb-list-group-item v-for="(link,index) in linkData" :key="index">
                        名前：{{link.link}}URL：<a :href="link.URL">{{link.URL}}</a><button @click="removeLink(index)">削除</button></mdb-list-group-item>
                    </mdb-list-group> -->
                    <mdb-tbl>
                        <mdb-tbl-head>
                            <tr>
                                <th>Link名</th>
                                <th>URL</th>
                                <th></th>

                            </tr>
                        </mdb-tbl-head>
                        <mdb-tbl-body>
                            <tr  v-for="(link,index) in linkData" :key="index">
                                <td>{{link.link}}</td>
                                <td><a :href="link.URL">{{link.URL}}</a></td>
                                <td><mdb-btn  class="shadow-none" outline="danger" @click="deleteLink(index)">削除</mdb-btn></td>
                            </tr>
                        </mdb-tbl-body>
                    </mdb-tbl>


                </mdb-col>
            </mdb-row>

        </mdb-container>
        <!-- お知らせモーダル -->
        <div>
            <mdb-modal :show="formModal" @close="formModal = false">
            <mdb-modal-header>
                <mdb-modal-title>メッセージ</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body style="white-space:pre-wrap; word-wrap:break-word;">{{formModalMessage}}</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn class="z-depth-0" color="success" @click.native="formModal = false">OK</mdb-btn>
            </mdb-modal-footer>
            </mdb-modal>
        </div>

        <!-- news削除時の確認モーダル -->
        <div>
            <mdb-modal :show="deleteModal" @close="deleteModal = false">
            <mdb-modal-header>
                <mdb-modal-title>警告</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>本当に削除しますか？</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn class="z-depth-0" color="secondary" @click.native="deleteModal = false">削除しない</mdb-btn>
                <mdb-btn class="z-depth-0" color="danger" @click="removeLink()">削除</mdb-btn>
            </mdb-modal-footer>
            </mdb-modal>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import { mdbContainer, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbBtn, mdbModal,
       mdbModalHeader, 
       mdbModalTitle, 
       mdbModalBody, 
       mdbModalFooter, } from "mdbvue";
    export default{
        data(){
            return{
                link:'',
                url:'',
                linkBtn:'送信',
                linkBtnPush:false,
                formModal:false,
                formModalMessage:"",
                deleteModal:false,
                deleteLinkSelect:''

            }
        },
        name:'editFooter',
        props:{
            linkData:Object,
        },
        components:{
            mdbContainer, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbBtn,mdbModal,
       mdbModalHeader, 
       mdbModalTitle, 
       mdbModalBody, 
       mdbModalFooter,
        },
        methods:{
            createLink(){
                if(this.link && this.url){
                    this.linkBtnPush=true;
                    this.linkBtn="送信中…";
                    firebase.database().ref('link').push({
                        link:this.link,
                        URL:this.url,
                    }).then(()=>{
                        this.linkBtnPush=false;
                        this.linkBtn="送信";
                        this.formModalMessage="送信完了しました。";
                        this.formModal=true;

                    })
                }else{
                    this.formModalMessage="リンクあるいはURLが空欄です。";
                    this.formModal=true;

                }
                
            },
            removeLink(){
                firebase.database().ref(`link/${this.deleteLinkSelect}`).remove()
                .then(()=>{
                     this.deleteModal=false;
                })
            },
            deleteLink(index){
                this.deleteLinkSelect=index;
                this.deleteModal=true;
            }
        }


    }
</script>