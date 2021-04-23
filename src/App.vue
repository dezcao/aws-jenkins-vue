<template>
  <div id="app">
		<header class="ino-gradient" style="height: 50px;">
			<b-row>
				<b-col cols="3" class="text-left">
					<b-button squared v-show="!navShow" variant="info" v-b-toggle.sidebar-1 style="height: 50px;"><b-icon-list></b-icon-list></b-button>
				</b-col>
				<b-col cols="6">
					<div v-show="navShow" style="max-height:48px; max-width:250px; object-fit:contain; margin: 0px auto; padding-top: 0px;">
						<b-img :src="logo_url" fluid style="display:inline-block; width:100%; height: 100%;"></b-img>
					</div>
				</b-col>
				<b-sidebar id="sidebar-1" title="Jeju ICC" shadow>
					<div class="px-3 py-2" style="background-color: #e1e9eb"><navi></navi></div>
				</b-sidebar>
				<b-col cols="3" class="text-right"><b-button @click="myLink" squared variant="info" style="height: 50px;"><b-icon-link45deg></b-icon-link45deg> <span v-show="navShow">사이트바로가기</span></b-button></b-col>
			</b-row>
		</header>
		<main ref="inoResizer">
			<nav v-show="navShow" style="background-color: #e1e9eb">
				<navi></navi>
				<b-row class="text-center mt-3 p-1">
					<b-col>
					</b-col>
				</b-row>
			</nav>
			<article>
				<router-view></router-view>
			</article>
		</main>

		<b-modal v-model="link_modal" hide-footer title="사이트 바로가기">
			<b-card>
				<b-form-group label="이동하실 사이트 주소를 입력해 주세요." label-variant="success">
					<b-form-input v-model="site_url" @keyup.enter="goCMS" size="sm"></b-form-input>
				</b-form-group>
				<b-card-text>
					<b-button size="sm" variant="primary">
						저장하기
					</b-button>
					<b-button size="sm" variant="success" @click="goCMS">
						이동하기
					</b-button>
				</b-card-text>
		   </b-card>
	   </b-modal>
	</div>
</template>

<script>
  import navi from './components/navi.vue'
  export default {
    components: {
      navi: navi,
    },
    data: function () {
      return {
        api_url: null,
        event_id: 0,
        navShow: true,
        logo_url: '',
        link_modal: false,
        site_url: ''
      }
    },
    created: function () {
      window.addEventListener("resize", this.inowingResizeListener);
      EventBus.$on('change_logo', (payload)=>{
        this.logo_url = payload;
      });
    },
    mounted: async function () {
      this.api_url = this.$store.getters.api_url;
      this.event_id = this.$store.getters.event_id;
      let rs = await this.getData();
      // if (rs.data.code == 401) {
      //   let targetUrl = `${window.location.origin}/cms`
      //   window.location.href = targetUrl;
      //   return;
      // }
    },
    methods: {
      inowingResizeListener: function (e) {
        this.navShow = this.$refs.inoResizer.clientWidth > 800 ? true : false;
      },
      getLogo: async function() {
        let rs = await this.$http.get(`${this.api_url}/event/main_page?event_id=${this.$store.getters.event_id}`);
        this.logo_url = rs.data.result.logo;
      },
      getData: async function () {
        let rs = await this.$http.get(`${this.api_url}/event/main_page?event_id=${this.event_id}`);
        console.log('vue_main ', rs);
        
        this.site_url = rs.data.result.link;
        return rs;
      },
      myLink: function () {
        this.link_modal = true;
      },
      saveLink: async function () {
        let url = `${this.api_url}/event/${this.event_id}`;
        let formData = new FormData();
          formData.append('link', this.site_url);
        let rs = await this.$http.post(url, formData, {
          Headers: {
            'Content-Type': 'application/json'
          }
        });
        return rs;
      },
      goCMS: async function () {
        let res = await this.saveLink();
        this.getData();
        if (this.site_url.includes('http')) {
          window.location.href = this.site_url;
        } else {
          window.location.href = 'http://'+this.site_url;
        }
      }
    }
  };
</script>
