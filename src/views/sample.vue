<template>
  <div id="app">
    <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="htmlForEditor"> </vue-editor>
  </div>
</template>

<script>
    import {VueEditor} from "vue2-editor";
    import firebase from 'firebase';
  export default{
    name: 'sample',
    components: { VueEditor },
    data(){
        return{
            htmlForEditor: "<h1>Some initial content</h1>"
        }
    },
    methods: {
        handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        console.log('画像添付')

        var formData = new FormData();
        formData.append("image", file);

        firebase.storage().ref(file.name).put(file)
        .then((snapshot)=>{
            console.log(snapshot)
            firebase.storage().ref(file.name).getDownloadURL()
            .then((url)=>{
                Editor.insertEmbed(cursorLocation, 'image', url)
                resetUploader()
            })
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
  }
</script>