<template>
  <div id="app">
    <Row type="flex">
      <i-col span="5" class="layout-menu-left">
        <Menu :active-name="active" theme="dark" width="auto" :open-names="['1','2','3']" @on-select="clickMenu">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              chart图
            </template>
            <Menu-item name="1-1">折线图</Menu-item>
            <Menu-item name="1-2">柱状图</Menu-item>
            <Menu-item name="1-3">排序</Menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              gl图
            </template>
            <Menu-item name="2-1">柱状图</Menu-item>
            <Menu-item name="2-2">面积图</Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              D3
            </template>
            <Menu-item name="3-1">柱状图</Menu-item>
            <Menu-item name="3-2">折线图</Menu-item>
            <Menu-item name="3-3">测试</Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>内容</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2011-{{new Date().getFullYear()}} &copy; TalkingData
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>

  import {Row, Menu, Submenu, MenuItem, Icon, Breadcrumb, BreadcrumbItem, Col} from 'iview'
  //  import Vue from 'vue'
  //  Vue.component('Button', Button)

  export default {
    name: 'App',
    components: {
      Row, iCol: Col, Menu, Submenu, MenuItem, Icon, Breadcrumb, BreadcrumbItem
    },
    data() {
      return {
        active: '1-1'
      }
    },
    mounted() {
      this.active = this.$route.name
      console.log(this.$route)
    },
    methods: {
      clickMenu(name) {
        this.$router.push('/' + name)
        console.log(name)
      }
    }
  }
</script>

<style>
  html, body, #app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: calc(100vh - 111px);
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
</style>
