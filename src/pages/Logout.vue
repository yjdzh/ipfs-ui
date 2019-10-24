<template></template>

<script>
  import api from '../common/api';

  export default {
    name: 'Logout',
    data () {
      return {}
      
    },
    created: function (){
      api.logout(this)
    }
  }
</script>

