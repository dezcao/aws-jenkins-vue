<template>
<div class="accordion" role="tablist">
    <b-card no-body class="mb-0 p-0">
        <b-card-header class="p-0" role="tab">
            <b-button block squared v-b-toggle.accordion-1 variant="info" size="sm" 
                class="text-left" 
                v-bind:class="[ routePath == '/' || routePath == '/site_info' || routePath == '/familysite' || routePath == '/popup' || routePath == '/banner' || routePath == '/copy' ? active_parent_menu : '' ]">
                <span>1. 기본환경설정</span>
            </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="inowing-accordion" role="tabpanel" v-model="accordion1">
            <b-card-body class="m-0 p-0">
                <router-link to="/site_info">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/' || routePath == '/site_info' ? classObject : '' ]">로고/언어/사이트명 설정</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/familysite">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/familysite' ? classObject : '' ]">familysite 설정</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/popup">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/popup' ? classObject : '' ]">팝업 설정</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/banner">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/banner' ? classObject : '' ]">배너 설정</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/copy">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/copy' ? classObject : '' ]">Copyright 설정</span>
                    </b-card-text>
                </router-link>
            </b-card-body>
        </b-collapse>
    </b-card>
    <b-card no-body class="mb-0 p-0">
        <router-link to="/mainmenu">
            <b-card-header class="p-0" role="tab">
                <b-button block squared v-b-toggle.accordion-2 variant="info" size="sm" class="text-left" v-bind:class="[ routePath.includes('/mainmenu') ? active_parent_menu : '' ]">
                    <span>2. 메뉴 및 컨텐츠관리</span></b-button>
            </b-card-header>
        </router-link>
    </b-card>
    <b-card no-body class="mb-0 p-0">
        <b-card-header class="p-0" role="tab">
            <b-button block squared v-b-toggle.accordion-3 variant="info" size="sm" class="text-left" v-bind:class="[ routePath == '/company/list' || routePath == '/company/regist' || routePath == '/company/admin' || routePath == '/com_request' ? active_parent_menu : '' ]">
                <span>3. 기업관리</span>
            </b-button>
        </b-card-header>
        <b-collapse id="accordion-3" visible accordion="inowing-accordion" role="tabpanel" v-model="accordion3">
            <b-card-body class="m-0 p-0">

                <router-link to="/company/list">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/company/list' || routePath == '/company/admin' ? classObject : '' ]">기업 목록</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/com_request">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/com_request' ? classObject : '' ]">기업 신청 승인</span>
                    </b-card-text>
                </router-link>
            </b-card-body>
        </b-collapse>
    </b-card>
    <b-card no-body class="mb-0 p-0">
        <router-link to="/user_list">
            <b-card-header class="p-0" role="tab">
                <b-button block squared v-b-toggle.accordion-4 variant="info" size="sm" class="text-left" v-bind:class="[ routePath == '/user_list' ? active_parent_menu : '' ]">
                    <span>4. 사용자 관리</span>
                    </b-button>
            </b-card-header>
        </router-link>
    </b-card>
    <b-card no-body class="mb-0 p-0">
        <b-card-header class="p-0" role="tab">
            <b-button block squared v-b-toggle.accordion-5 variant="info" size="sm" class="text-left" v-bind:class="[ routePath == '/vm' || routePath == '/conference_notice' ? active_parent_menu : '' ]">
                <span>5. Conference 관리(VM)</span>
            </b-button>
        </b-card-header>
        <b-collapse id="accordion-5" visible accordion="inowing-accordion" role="tabpanel" v-model="accordion5">
            <router-link to="/vm">
                <b-card-body class="m-0 p-0">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/vm' || routePath == '/conference_notice' ? classObject : '' ]">VM</span>
                    </b-card-text>
                </b-card-body>
            </router-link>
        </b-collapse>
    </b-card>
    <b-card no-body class="mb-0 p-0">
        <b-card-header class="p-0" role="tab">
            <b-button block squared v-b-toggle.accordion-6 variant="info" size="sm" class="text-left" v-bind:class="[ routePath == '/biz/site' || routePath == '/biz/schedule' || routePath == '/biz/link' ? active_parent_menu : '' ]">
                <span>6. Bizmatching 관리</span><br>
                <span style="line-height: 1.2; padding-left: 1em;">(VM-Business)</span>
            </b-button>
        </b-card-header>
         <b-collapse id="accordion-6" visible accordion="inowing-accordion" role="tabpanel" v-model="accordion6">
            <b-card-body class="m-0 p-0">
                <router-link to="/biz/site">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/biz/site' ? classObject : '' ]">사이트 구성</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/biz/schedule">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/biz/schedule' ? classObject : '' ]">일정관리</span>
                    </b-card-text>
                </router-link>
                <hr class="m-0 p-0" />
                <router-link to="/biz/link">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/biz/link' ? classObject : '' ]">바로가기</span>
                    </b-card-text>
                </router-link>
            </b-card-body>
        </b-collapse>
    </b-card>
    <b-card no-body class="mb-0 p-0">
        <b-card-header class="p-0" role="tab">
            <b-button block squared v-b-toggle.accordion-7 variant="info" size="sm" class="text-left" v-bind:class="[ routePath == '/stats_login' || routePath == '/stats_counsel_b' || routePath == '/stats_counsel_s' || routePath == '/stats_vm_b' || routePath == '/stats_vm_s' ? active_parent_menu : '' ]">
                <span>7. 통계</span>
            </b-button>
        </b-card-header>
        <b-collapse id="accordion-7" visible accordion="inowing-accordion" role="tabpanel" v-model="accordion7">
            <b-card-body class="m-0 p-0">
                <router-link to="/stats_login">
                    <b-card-text class="m-0 p-2">
                        <span v-bind:class="[ routePath == '/stats_login' ? classObject : '' ]">로그인</span>
                    </b-card-text>
                </router-link>

                <b-card no-body class="mb-0 p-0">
                    <b-card-header class="p-0" role="tab">
                        <b-button block squared v-b-toggle.accordion-8 variant="warning" size="sm" class="text-left" v-bind:class="[ routePath == '/stats_counsel_b' || routePath == '/stats_counsel_s' ? active_parent_menu : '' ]">
                            <span>VM 상담</span>
                        </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-8" visible accordion="inowing-accordion2" role="tabpanel" v-model="accordion8">
                        <b-card-body class="m-0 p-0">
                            <router-link to="/stats_counsel_b">
                                <b-card-text class="m-0 p-2">
                                    <span v-bind:class="[ routePath == '/stats_counsel_b' ? classObject : '' ]">바이어</span>
                                </b-card-text>
                            </router-link>
                            <hr class="m-0 p-0" />
                            <router-link to="/stats_counsel_s">
                                <b-card-text class="m-0 p-2">
                                    <span v-bind:class="[ routePath == '/stats_counsel_s' ? classObject : '' ]">셀러</span>
                                </b-card-text>
                            </router-link>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body class="mb-0 p-0">
                    <b-card-header class="p-0" role="tab">
                        <b-button block squared v-b-toggle.accordion-9 variant="warning" size="sm" class="text-left" v-bind:class="[ routePath == '/stats_vm_b' || routePath == '/stats_vm_s' ? active_parent_menu : '' ]">
                            <span>VM 실적</span>
                        </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-9" visible accordion="inowing-accordion3" role="tabpanel" v-model="accordion9">
                        <b-card-body class="m-0 p-0">
                            <router-link to="/stats_vm_b">
                                <b-card-text class="m-0 p-2">
                                    <span v-bind:class="[ routePath == '/stats_vm_b' ? classObject : '' ]">바이어</span>
                                </b-card-text>
                            </router-link>
                            <hr class="m-0 p-0" />
                            <router-link to="/stats_vm_s">
                                <b-card-text class="m-0 p-2">
                                    <span v-bind:class="[ routePath == '/stats_vm_s' ? classObject : '' ]">셀러</span>
                                </b-card-text>
                            </router-link>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </b-card-body>
        </b-collapse>

        <b-button variant="outline-danger" @click="logoutFn">Logout</b-button>
    </b-card>
        
    <a href="#" v-show="$store.getters.event_id == 106" @click='goReload(`${window.location.origin}/admin/vue_main.html#/?event_id=105`)'>테스트버전(105) 가기</a>
    <a href="#" v-show="$store.getters.event_id == 105" @click='goReload(`${window.location.origin}/admin/vue_main.html#/?event_id=106`)'>운영버전(106) 가기</a>
</div>
</template>

<script>
export default {
    name: 'navi',
    data: function () {
        return {
            routePath: '/',
            classObject: {
                // https://getbootstrap.com/docs/4.5/utilities/text/
                'text-danger': true,
                'font-weight-bolder': true
            },
            active_parent_menu: {
                'active': true,
                'font-weight-bolder': true,
                'text-align': 'left'
            },
            accordion1: false,
            accordion2: false,
            accordion3: false,
            accordion4: false,
            accordion5: false,
            accordion6: false,
            accordion7: false,
            accordion8: false,
            accordion9: false,
            api_url: ''
        }
    },
    watch: {
        $route: async function (to, from) {
            this.routePath = to.path;
            let aco1 = ['/', '/site_info', '/familysite', '/popup', '/banner', '/copy'];
            let aco3 = ['/company/list', '/com_request', '/company/admin'];
            let aco5 = ['/vm', '/conference_notice'];
            let aco6 = ['/biz/site', '/biz/schedule'];
            let aco7 = ['/stats_login', '/stats_counsel_b', '/stats_counsel_s', '/stats_vm_b', '/stats_vm_s'];
            let aco8 = ['/stats_counsel_b', '/stats_counsel_s'];
            let aco9 = ['/stats_vm_b', '/stats_vm_s'];
            if (aco1.includes(this.routePath)) {
                // console.log('arco1');
                this.accordion1 = true;
            }
            if (aco3.includes(this.routePath)) {
                this.accordion3 = true;
            }
            if (aco5.includes(this.routePath)) {
                this.accordion5 = true;
            }
            if (aco6.includes(this.routePath)) {
                this.accordion6 = true;
            }
            if (aco7.includes(this.routePath)) {
                if ('/stats_login' == this.routePath) {
                    this.accordion8 = false;
                    this.accordion9 = false;
                }
                this.accordion7 = true;
            }
            if (aco8.includes(this.routePath)) {
                this.accordion8 = true;
                this.accordion9 = false;
            }
            if (aco9.includes(this.routePath)) {
                this.accordion8 = false;
                this.accordion9 = true;
            }
            if (this.routePath == '/user_list' || this.routePath == '/mainmenu') {
                this.accordion1 = false;
                this.accordion3 = false;
                this.accordion5 = false;
                this.accordion6 = false;
                this.accordion7 = false;
                this.accordion8 = false;
                this.accordion9 = false;
            }
            if (to.query.event_id) {
                
                if (to.query.event_id != this.$store.getters.event_id) {
                    this.$store.commit('event_id', {event_id: to.query.event_id});
                    // this.$router.go();
                }
                // window.location.href = `http://14.63.172.119/admin/vue_main.html#${from.path}`;
            }
            // console.log(to);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            // this.routePath = this.$route.path;	// 네비게이션의 패스 감지용
            this.api_url = this.$store.getters.api_url;
            this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
                // console.log('collapseId:', collapseId)
                // console.log('isJustShown:', isJustShown)
            }); // 네비게이션 클릭 감지
        })
    },
    methods: {
        visibleHandler: function (isVisible) {
            if (isVisible) {
                // console.log('open');
                // Do something
            } else {
                // console.log('close');
                // Do something else
            }
        },
        goReload: function (url) {
            window.location.href = url;
            this.$router.go(url);
            
        },
        logoutFn: async function () {
            // cookie delete
            document.cookie = 'laravel_session' + '=; expires=Thu, 01 Jan 1970 00:00:10 GMT;';
            let rs = await axios.get(`${this.api_url}/auth/logout`)
            if (rs.status == 200) {
                window.location.href = '';
            } else {
                alert('logout 실패');
            }
        }
    }
}
</script>
<style scoped>
    button {
        height: 50px;
    }
</style>