<template>
  <div id="home">
    <nav-bar>
        <h2 slot="center">{{message}}</h2>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    components: { NavBar},
    data(){
      return {
        message:'hello'
      }
    }

  }
</script>

<style>

</style>