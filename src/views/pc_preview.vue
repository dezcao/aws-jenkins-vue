<template>
<div class="top_wrap js-top_wrap">
    <div class="top_pc">
        <header class="dis-table pc-w header header-pc" id="header">
            <div class="vm">
                <a href="#" id="is_visible_file_1" style="display: block;">
                    <b-img :src="url.url2" fluid alt="Responsive image"></b-img>
                </a>
                <a href="#" id="is_visible_file_2" style="display: block;">
                    <b-img :src="url.url3" fluid alt="Responsive image"></b-img>
                </a>
            </div>
            <div class="vm">
                <a href="#">
                    <b-img :src="url.logo" fluid></b-img>
                </a>
            </div>
            <div class="vm">
                <select class="language" id="is_language" style="display: inline-block;">
                    <option value="0">한국어</option>
                </select>
                <div class="pc-login_wrap" id="is_login" style="display: block;">
                    <a href="#" class="a"><span>로그인</span></a> |
                    <a href="#" class="a"><span>회원가입</span></a>
                </div>
                <div class="pc-logout_wrap" id="is_logout">
                    <a href="#" class="a"><span>로그아웃</span></a> |
                    <a href="#" class="a"><span>마이페이지</span></a>
                </div>
                <div class="sns_wrap">
                    <a id="is_visible_sns_banner_1" class="is_visible_sns_banner_1_en" href="#" target="_blank" style="display: block;">
                        <span>
                            <b-img :src="url.url6" fluid alt="Responsive image" style="max-width:20px;"></b-img>
                        </span>
                    </a>
                    <a id="is_visible_sns_banner_2" class="is_visible_sns_banner_2_en" href="#" target="_blank" style="display: block;">
                        <span>
                            <b-img :src="url.url7" fluid alt="Responsive image" style="max-width:20px;"></b-img>
                        </span>
                    </a>
                    <a id="is_visible_sns_banner_3" class="is_visible_sns_banner_3_en" href="#" target="_blank" style="display: block;">
                        <span>
                            <b-img :src="url.url8" fluid alt="Responsive image" style="max-width:20px;"></b-img>
                        </span>
                    </a>
                </div>
            </div>
        </header>
    </div>
    <!-- 
    <div class="top_m js-top_m">
        <div class="top_m_bg">
            <header class="dis-table header header-m" id="mo_header">
                <div class="nav_icon js-nav_icon">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="logo_wrap check_hide">
                    <img id="mo_logo" src="http://14.63.172.119/data/uploaded/events-logo-106.jpeg?v=1615699387" alt="">
                </div>
                <div class="m-login_wrap">
                    <a id="mo_is_login" href="#" style="display: table-cell;"><span data-lang="navigation.login">로그인</span></a>
                    <a id="mo_is_join" href="#"><span data-lang="navigation.join">회원가입</span></a>
                </div>
                <div class="m-logout_wrap">
                    <a id="mo_is_logout" href="#"><span data-lang="navigation.login">로그아웃</span></a>
                    <a id="mo_is_mypage" href="#"><span data-lang="navigation.join">마이페이지</span></a>
                </div>
                <nav class="nav nav-m">
                    <div class="nav_cnt">
                        <div class="dis-table nav_title">
                            <span data-lang="navigation.cat">카테고리</span>
                            <div class="txt-r">
                                <select id="mo_is_language">
                                    <option value="0">한국어</option>
                                </select>
                            </div>
                        </div>
                        <div class="nav_content menu_nav">
                        </div>
                    </div>
                    <hr class="hr-nav">
                    <div class="nav_cnt">
                        <div class="dis-table nav_title">
                            <span data-lang="navigation.etc_menu">기타</span>
                            <div class="txt-r sns_wrap">
                                <a id="mo_is_visible_sns_banner_1" href="http://instagram.com/jejueatsuda" target="_blank" style="display: block;">
                                    <span>

<b-img :src="url.url6" fluid alt="Responsive image" style="max-width:20px;"></b-img>

</span>
                                </a>
                                <a id="mo_is_visible_sns_banner_2" href="http://facebook.com" target="_blank" style="display: block;">
                                    <span>

<b-img :src="url.url7" fluid alt="Responsive image" style="max-width:20px;"></b-img>

</span>
                                </a>
                                <a id="mo_is_visible_sns_banner_3" href="http://pf.kakao.com/_EUqUK" style="display: block;">
                                    <span>

<b-img :src="url.url8" fluid alt="Responsive image" style="max-width:20px;"></b-img>

</span>
                                </a>
                            </div>
                        </div>
                        <div class="nav_content">
                            <label class="l_menu"><a id="mo_is_visible_file_1" href="#" style="display: block;"><span>부스배치도</span></a></label>
                            <label class="l_menu"><a id="mo_is_visible_file_2" href="#" style="display: block;"><span>행사브로슈어</span></a></label>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    </div>
	 -->
</div>
<!-- 		<b-card title="PC버전 보기" sub-title="* 국문페이지만 보기가 가능합니다.">

<b-card-text>

<b-row>

<b-col cols="2">

<b-img :src="url.url2" fluid alt="Responsive image" style="margin-bottom:5px;"></b-img>

<b-img :src="url.url3" fluid alt="Responsive image"></b-img>

</b-col>

<b-col cols="7">

<b-img :src="url.url1" fluid alt="Responsive image" style="max-width:250px;"></b-img>

</b-col>

<b-col cols="3">

<b-form-select v-model="selected" :options="['Korea', 'English']" size="sm"></b-form-select>

<p><span style="font-size: 10pt;">로그인 | 회원가입</span></p>

<b-img :src="url.url6" fluid alt="Responsive image" style="max-width:20px;"></b-img>

<b-img :src="url.url7" fluid alt="Responsive image" style="max-width:20px;"></b-img>

<b-img :src="url.url8" fluid alt="Responsive image" style="max-width:20px;"></b-img>

</b-col>

</b-row>

</b-card-text>

</b-card>
   -->
</template>

<script>
export default {
    name: "pc",
    props: ['url'],
    data: function () {
        return {
            selected: 'Korea'
        };
    },
    methods: {

    },
};
</script>

<style scoped>
.top_wrap {
    /* position: fixed; */
    /* left: 0; */
    /* right: 0; */
    /* z-index: 100; */
}

div {
    display: block;
}

body {

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', 'NanumGothic', sans-serif;

}

.top_pc {
    display: block;
    padding-top: 24px;
    background: #fff;
}

.header-pc {
    margin-bottom: 16px;
    max-height: 80px;
}

.pc-w {
    width: 95%;
    max-width: 1200px;
    margin: auto;
}

.dis-table,
.dis-table-row {
    display: table;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
}

.header-pc>*:first-child {
    width: 20%;
}

.header-pc>*:nth-child(2) {
    text-align: center;
}

.header-pc>*:nth-child(2) img {
    max-height: 80px;
}

img {
    max-width: 100%;
    border: none;
}

.header-pc>*:last-child {
    width: 20%;
    text-align: right;
}

.vm {
    vertical-align: middle;
}

select {
    border: 1px solid #ddd;
    border-radius: 0px;
    padding: 4px;
    background: #fff;
}

button,
input,
select,
textarea {
    font-family: 'Roboto', 'NanumGothic', sans-serif;
    outline: none;
}

.pc-login_wrap {
    margin: 8px 0;
    font-size: 0.875rem;
    min-height: 20px;
}

.a {
    text-decoration: none;
    color: #000;
    color: inherit;
}

.txt-c {
    text-align: center;
}

.sns_wrap {
    font-size: 0;
    vertical-align: bottom;
    display: inline-flex;
}

.sns_wrap span {
    width: 20px;
    height: 20px;
}

.sns_wrap span {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 6px;
}

.sns_wrap span img {
    width: 100%;
    max-height: 100%;
}

.dis-table>*,
.dis-table-row>*>* {
    display: table-cell;
}

.dis-table,
.dis-table-row {
    display: table;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
}
</style>
