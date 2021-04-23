<template>
<section>
    <b-row>
        <b-col>
            <b-button  href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button variant="dark" size="sm" @click="PCPreview = !PCPreview">PC버전 보기</b-button>
            <b-modal v-model="PCPreview" hide-footer ref="pc-modal" size="xl">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" :src="`${page_url}/jeju/overview.html?menu_id=${menu_id}`" allowfullscreen></iframe>
                </div>
                <b-button class="mt-3" variant="outline-danger" block @click="$refs['pc-modal'].hide()">Close Me</b-button>
            </b-modal>

            <b-button variant="dark" @click="MobilePreview = !MobilePreview" size="sm">Mobile버전 보기</b-button>
            <b-modal v-model="MobilePreview" hide-footer ref="mobile-modal" class="modal-dialog modal-30size" role="document">
                <div class="embed-responsive embed-responsive-16by9 modal-content modal-30size" style="min-height:600px;">
                    <iframe class="embed-responsive-item" :src="`${page_url}/jeju/overview.html?menu_id=${menu_id}`" allowfullscreen></iframe>
                </div>
                <b-button class="mt-3" variant="outline-danger" block @click="$refs['mobile-modal'].hide()">Close Me</b-button>
            </b-modal>
        </b-col>
    </b-row>
    <b-card no-body header="포스터" class="mt-1">
        <b-card-text class="text-right pt-1 pr-1 m-0">
            <b-button variant="outline-primary" size="sm" @click="addNewPoster"><b-icon-plus></b-icon-plus> 이미지 추가</b-button>
        </b-card-text>
        <b-card-text class="p-1 m-0">
            <b-table :fields="photoFields" :items="photo" bordered head-variant="light" small class="m-0">
                <template #cell(id)="row">
                    <div class="text-center">
                        {{row.item.id}}
                    </div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">
                        {{row.item.order}}
                    </div>
                </template>

                <!-- 관리항목 -->
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="isNew=false; updatePhoto(row.item, row.index, $event.target)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deletePhoto(row.item, row.index, $event.target)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-card-text>
    </b-card>
    <!-- 배너 이미지 팝업 -->
    <b-modal v-model="photoModal" hide-footer ref="photo-modal" title="배너 추가">
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">순서</label></b-col>
            <b-col sm="8">
                <b-form-input type="number" size="sm" v-model="photoParams.order"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">배너명</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="photoParams.title"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col>
                <b-card no-body>

                    <b-tabs card>
                        <b-tab title="국문" active>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;">이동할 웹주소</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="photoParams.link" placeholder="반드시 http:// 를 입력해주세요.">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col>
                                    <b-card sub-title="배너이미지(1000px*1406px)" class="mb-3">
                                        <b-card-text align="center" class="ino-1000-1400-wrap">
                                            <div>
                                                <b-img :src="photoPreview||photoPreview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="photoParams.photo_1" @change="onFileChange($event, 'photoPreview')" class="mt-1 mb-1" size="sm">
                                        </b-form-file>
                                        <b-button @click="photoParams.photo_1 = null; photoPreview = photoPreview_default;" size="sm" variant="danger">이미지 삭제</b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab title="영문">
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;">이동할 웹주소</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="photoParams.link_en" placeholder="반드시 http:// 를 입력해주세요.">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col>
                                    <b-card  class="mb-3">
                                        <b-card-text align="center" class="ino-1000-1400-wrap">
                                            <div>
                                                <b-img :src="photoPreview_en||photoPreview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="photoParams.photo_1_en" @change="onFileChange($event, 'photoPreview_en')" class="mt-1 mb-1" size="sm">
                                        </b-form-file>
                                        <b-button @click="photoParams.photo_1_en = null; photoPreview_en = photoPreview_default;" size="sm"  variant="danger">이미지 삭제</b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <b-button class="mt-2 inoBtn-150" variant="primary" @click="insertPhoto" size="sm">저장</b-button>
        <b-button class="mt-2 inoBtn-150" variant="danger" @click="$refs['photo-modal'].hide()" size="sm">취소</b-button>
    </b-modal>
    
    <!-- .. -->
    <!-- .. -->
    <!-- .. -->
    <b-card no-body header="영상" class="mt-3">
        <b-card-text class="text-right pt-1 pr-1 m-0">
            <b-button variant="outline-primary" size="sm" @click="addNewVideo">
                <b-icon-plus></b-icon-plus> 영상 추가
            </b-button>
        </b-card-text>
        <b-card-text class="p-1 m-0">
            <b-table :fields="videoFields" :items="video" bordered head-variant="light" small class="m-0">
                <template #cell(id)="row">
                    <div class="text-center">
                        {{row.item.id}}
                    </div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">
                        {{row.item.order}}
                    </div>
                </template>

                <!-- 관리항목 -->
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="isNew=false; updateVideo(row.item, row.index, $event.target)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteVideo(row.item, row.index, $event.target)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-card-text>
    </b-card>
     <!-- 영상 팝업 -->
    <b-modal v-model="videoModal" hide-footer ref="video-modal" title="영상 추가">
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">순서</label></b-col>
            <b-col sm="8">
                <b-form-input type="number" size="sm" v-model="videoParams.order"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">배너명</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="videoParams.title"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="국문" active>
                            <b-row class="p-1">
                                <b-col>
                                    <b-card class="mb-3">
                                        <b-card-text align="center" class="ino-800-450-wrap">
                                            <div>
                                                <b-img :src="videoPreview||thumbPreview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="videoParams.photo_1" @change="onFileChange($event, 'videoPreview')" class="mb-1 mt-1" size="sm">
                                        </b-form-file>
                                        <b-button @click="videoParams.photo_1 = null; videoPreview = thumbPreview_default;" size="sm" variant="danger">이미지 삭제</b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">영상 링크(Youtube)</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="videoParams.video_link"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;">영상 파일</label></b-col>
                                <b-col sm="8">
                                    <b-form-file v-model="videoParams.file" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="videoParams.file = null" size="sm" variant="danger">영상 삭제</b-button>
                                </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab title="영문">
                            <b-row class="p-1">
                                <b-col>
                                    <b-card class="mb-3">
                                        <b-card-text align="center" class="ino-800-450-wrap">
                                            <div>
                                                <b-img :src="videoPreview_en||thumbPreview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="videoParams.photo_1_en" @change="onFileChange($event, 'videoPreview_en')" class="mb-1 mt-1" size="sm">
                                        </b-form-file>
                                        <b-button @click="videoParams.photo_1_en = null; videoPreview_en = thumbPreview_default;" size="sm" variant="danger">이미지 삭제</b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">영상 링크(Youtube)</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="videoParams.video_link_en"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;">영상 파일</label></b-col>
                                <b-col sm="8">
                                    <b-form-file v-model="videoParams.file_en" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="videoParams.file_en = null" size="sm" variant="danger">영상 삭제</b-button>
                                </b-col>
                            </b-row>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <b-button class="mt-2 inoBtn-150" variant="primary" @click="insertVideo" size="sm">저장</b-button>
        <b-button class="mt-2 inoBtn-150" variant="danger" @click="$refs['video-modal'].hide()" size="sm">취소</b-button>
    </b-modal>


    <b-card no-body header="바로가기" class="mt-3">
        <b-card-text class="text-right pt-1 pr-1 m-0">
            <b-button variant="outline-primary" size="sm" @click="addNewQuickLink">
                <b-icon-plus></b-icon-plus>바로가기 추가
            </b-button>
        </b-card-text>
        <b-card-text class="p-1 m-0">
            <b-table :fields="linkFields" :items="link" bordered head-variant="light" small class="m-0">
                <template #cell(id)="row">
                    <div class="text-center">
                        {{row.item.id}}
                    </div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">
                        {{row.item.order}}
                    </div>
                </template>
                <template #cell(photo_1)="row">
                    <b-img :src="row.item.photo_1||$store.getters.dummy_image_url(['626x352'])" :id="'tooltip_image_'+row.item.id" fluid style="width:25px; height:25px;"></b-img>
                    <b-tooltip :target="'tooltip_image_'+row.item.id" title="Online!">
                        <b-img :src="row.item.photo_1||$store.getters.dummy_image_url(['626x352'])" fluid ></b-img>
                    </b-tooltip>
                </template>

                <!-- 관리항목 -->
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="isNew=false; updateLink(row.item, row.index, $event.target)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteLink(row.item, row.index, $event.target)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-card-text>
    </b-card>
    
    <!-- 바로가기 팝업 -->
    <b-modal v-model="linkModal" hide-footer ref="link-modal" title="바로가기 추가">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="국문" active>
                    <b-row class="p-1">
                        <b-col sm="4">
                            <label style="font-size: 10pt;">제목</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input type="text" size="sm" v-model="linkParams.title"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1">
                        <b-col sm="4">
                            <label style="font-size: 10pt;">순서</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input type="number" size="sm" v-model="linkParams.order"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1">
                        <b-col sm="4">
                            <label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">링크</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input type="text" size="sm" v-model="linkParams.link"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1">
                        <b-col>
                            <b-card sub-title="썸네일 이미지(450px*260px)">
                                <b-card-text align="center" class="ino-450-260-wrap">
                                    <div>
                                        <b-img :src="linkPreview||$store.getters.dummy_image_url(['450x260'])" fluid></b-img>
                                    </div>
                                </b-card-text>
                                <b-form-file v-model="linkParams.photo_1" @change="onFileChange($event, 'linkPreview')" class="mb-1 mt-1" size="sm">
                                </b-form-file>
                                <b-button @click="linkParams.photo_1 = null; linkPreview = null;" size="sm" variant="danger">이미지 삭제</b-button>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="영문">
                    <b-row class="p-1">
                        <b-col sm="4">
                            <label style="font-size: 10pt;">제목</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input type="text" size="sm" v-model="linkParams.title_en"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1">
                        <b-col sm="4">
                            <label style="font-size: 10pt;">순서</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input type="number" size="sm" v-model="linkParams.order"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1">
                        <b-col sm="4">
                            <label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">링크</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input type="text" size="sm" v-model="linkParams.link_en"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1">
                        <b-col>
                            <b-card sub-title="썸네일 이미지(450px*260px)">
                                <b-card-text align="center" class="ino-450-260-wrap">
                                    <div>
                                        <b-img :src="linkPreview_en||$store.getters.dummy_image_url(['450x260'])" fluid></b-img>
                                    </div>
                                </b-card-text>
                                <b-form-file v-model="linkParams.photo_1_en" @change="onFileChange($event, 'linkPreview_en')" class="mb-1 mt-1" size="sm">
                                </b-form-file>
                                <b-button @click="linkParams.photo_1_en = null; linkPreview_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
        </b-card>
        <b-button class="mt-2 inoBtn-150" variant="primary" @click="insertLink" size="sm">저장</b-button>
        <b-button class="mt-2 inoBtn-150" variant="danger" @click="$refs['link-modal'].hide()" size="sm">취소</b-button>
    </b-modal>
        
</section>
</template>

<script>
export default {
    name: "overview",
    data: function () {
        return {
            PCPreview: false,
            MobilePreview: false,
            photoModal: false,
            videoModal: false,
            linkModal: false,
            photoFields: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: 'link',
                    label: '링크'
                },
                {
                    key: 'manageBtn',
                    label: '관리'
                }
            ],
            videoFields: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: 'video_link',
                    label: '영상링크'
                },
                {
                    key: 'file',
                    label: '업로드 영상'
                },
                {
                    key: 'manageBtn',
                    label: '관리'
                }
            ],
            linkFields: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: 'title',
                    label: '제목'
                },
                {
                    key: 'photo_1',
                    label: '이미지'
                },
                {
                    key: 'link',
                    label: '이미지 링크'
                },
                {
                    key: 'manageBtn',
                    label: '관리'
                }
            ],
            photo: [{
                "id": 1,
                "menu_id": 1,
                "type": 0,
                "order": 0,
                "title": "",
                "photo_1": "",
                "photo_1_en": "",
                "file": "",
                "file_en": "",
                "link": "",
                "link_en": "",
                "video_link": "",
                "video_link_en": ""
            }],
            video: [{
                "id": 1,
                "menu_id": 1,
                "type": 0,
                "order": 0,
                "title": "",
                "photo_1": "",
                "photo_1_en": "",
                "file": "",
                "file_en": "",
                "link": "",
                "link_en": "",
                "video_link": "",
                "video_link_en": ""
            }],
            link: [{
                "id": 1,
                "type": 2,
                "order": 0,
                "title": "",
                "title_en": "",
                "photo_1": "",
                "photo_1_en": "",
                "link": "",
                "link_en": ""
            }],
            photoParams: {
                "type": 0,
                "order": 0,
                "title": "",
                "link": "",
                "link_en": "",
                "photo_1": null,
                "photo_1_en": null
            },
            photoParams_default: {
                "type": 0,
                "order": 0,
                "title": "",
                "link": "",
                "link_en": "",
                "photo_1": null,
                "photo_1_en": null
            },
            photoPreview_default: this.$store.getters.dummy_image_url(['1000x1406']),
            thumbPreview_default: this.$store.getters.dummy_image_url(['800x450']),

            photoPreview: null,
            photoPreview_en: null,
            videoPreview: null,
            videoPreview_en: null,

            linkPreview: null, // 현행 프리뷰
            linkPreview_en: null, // 현행 프리뷰 en
            linkPreview_default: this.$store.getters.dummy_image_url(['626x352']), // DB 저장값 프리뷰
            linkPreview_en_default: this.$store.getters.dummy_image_url(['626x352']), // DB 저장값 프리뷰 en

            videoParams: {
                "type": 1,
                "order": 0,
                "title": "",
                "photo_1": null,
                "photo_1_en": null,
                "video_link": "",
                "video_link_en": "",
                "file": null,
                "file_en": null
            },
            videoParams_default: {
                "type": 1,
                "order": 0,
                "title": "",
                "photo_1": null,
                "photo_1_en": null,
                "video_link": "",
                "video_link_en": "",
                "file": null,
                "file_en": null
            },

            linkParams: {
                "id": 1,
                "type": 2,
                "order": 0,
                "title": "",
                "title_en": "",
                "photo_1": null,
                "photo_1_en": null,
                "link": "",
                "link_en": ""
            },
            linkParams_default: {
                "id": 1,
                "type": 2,
                "order": 0,
                "title": "",
                "title_en": "",
                "photo_1": null,
                "photo_1_en": null,
                "link": "",
                "link_en": ""
            },

            menu_id: null,
            isNew: false,
            selectedItem: null,

            api_url: '',
            page_url: ''

        };
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log(this.$route.query.menu_id, this.$route.params);
            this.menu_id = this.$route.query.menu_id;
            this.api_url = this.$store.getters.api_url;
            this.page_url = this.$store.getters.page_url;
            this.getList();
        });
    },
    methods: {
        addNewPoster: async function () {
            this.isNew=true;
            this.photoParams = {...this.photoParams_default};
            this.photoPreview = null;
            this.photoPreview_en = null;
            this.photoModal = true;
        },
        addNewVideo: async function () {
            this.isNew=true;
            this.videoParams = {...this.videoParams_default};
            this.videoPreview = null;
            this.videoPreview_en = null;
            this.videoModal = true;
        },
        
        getList: async function () {
            let url = `${this.api_url}/overview?menu_id=${this.menu_id}`;
            let res = await axios.get(url);
            this.photo = res.data.result.photo;
            this.video = res.data.result.video;
            this.link = res.data.result.link;
            // this.link = [
            //     {
            //         id: 1, order: 0, title: "바로가기1", title_en: "quick 1", 
            //         photo_1: "https://picsum.photos/200/300",
            //         link: "https://picsum.photos/200/300",
            //         photo_1_en: "https://picsum.photos/200/300",
            //         link_en: "https://picsum.photos/200/300",
            //     },
            //     {
            //         id: 2, order: 1, title: "바로가기2", title_en: "quick 1", 
            //         photo_1: "https://picsum.photos/300/300",
            //         link: "https://picsum.photos/200/300",
            //         photo_1_en: "https://picsum.photos/200/300",
            //         link_en: "https://picsum.photos/200/300",
            //     }
            // ]
            
        },
        insertPhoto: async function () {
            let url = ``;
            if (this.isNew) {
                url = `${this.api_url}/overview`;
            } else {
                url = `${this.api_url}/overview/${this.selectedItem.id}`;
            }

            console.log(this.photoParams);
            var formData = new FormData();
            formData.append('menu_id', this.menu_id);
            for (key in this.photoParams) {
                if (key == 'photo_1' && !this.photoParams['photo_1']) {
                    formData.append('photo_1_del', 'Y');
                } else if (key == 'photo_1_en' && !this.photoParams['photo_1_en']) {
                    formData.append('photo_1_en_del', 'Y');
                } else {
                    formData.append(key, this.photoParams[key]);
                }
                console.log(key, typeof this.photoParams[key]);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log('photo done ', rs);

            this.getList();
            this.$refs['photo-modal'].hide();

        },
        
        updatePhoto: async function (item, index, target) {
            console.log(item);

            this.photoParams.order = item.order;
            this.photoParams.title = item.title;
            this.photoParams.link = item.link;
            this.photoParams.link_en = item.link_en;
            this.photoPreview = item.photo_1; // 프리뷰
            this.photoPreview_en = item.photo_1_en; // 프리뷰

            this.photoModal = true;
            this.selectedItem = item;
        },
        deletePhoto: async function (item, index, target) {
            console.log(item);
            if (confirm('삭제하시겠습니까?')) {
                await axios.delete(`${this.api_url}/overview/${item.id}`);
                this.getList();
            }
        },

        insertVideo: async function () {
            let url = `${this.api_url}/overview`

            if (this.isNew) {
                url = `${this.api_url}/overview`;
            } else {
                url = `${this.api_url}/overview/${this.selectedItem.id}`;
            }


            console.log(this.videoParams);
            var formData = new FormData();
            formData.append('menu_id', this.menu_id);
            for (key in this.videoParams) {

                // if (key == 'photo_1' && !this.videoParams['photo_1']) {
                //     formData.append('photo_1_del', 'Y');
                // } else if (key == 'photo_1_en' && !this.videoParams['photo_1_en']) {
                //     formData.append('photo_1_en_del', 'Y');
                // } else if (key == 'file' && !this.videoParams['file']) {
                //     formData.append('file_del', 'Y');
                // } else if (key == 'file_en' && !this.videoParams['file_en']) {
                //     formData.append('file_en_del', 'Y');
                // } else {
                // }
                    formData.append(key, this.videoParams[key]);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log('insert video ', rs);
            console.log(this.videoParams);
            this.getList();
            this.$refs['video-modal'].hide()
        },
        updateVideo: async function (item, index, target) {
            console.log(item);
            this.videoParams.order = item.order;
            this.videoParams.title = item.title;
            this.videoParams.video_link = item.video_link;
            this.videoParams.video_link_en = item.video_link_en;

            this.videoPreview = item.photo_1; // 프리뷰
            this.videoPreview_en = item.photo_1_en; // 프리뷰

            this.videoModal = true;
            this.selectedItem = item;
        },
        deleteVideo: async function (item, index, target) {
            if (confirm('삭제하시겠습니까?')) {
                await axios.delete(`${this.api_url}/overview/${item.id}`);
                this.getList();
            }
        },

        // link........................
        addNewQuickLink: async function () {
            // 모달 오픈전에 값 초기화
            this.isNew = true; // 중요!
            this.linkParams = {...this.linkParams_default};
            this.linkPreview = null;
            this.linkPreview_en = null;
            this.linkPreview_default = null;
            this.linkPreview_default_en = null;
            this.selectedItem = null;
            this.linkModal = true;
        },
        updateLink: async function (item, index, target) {
            // 모달 오픈전 값 바인딩
            console.log(item);
            this.isNew = false; // 중요!
            this.linkParams.id = item.id;
            this.linkParams.type = 2;
            this.linkParams.order = item.order;
            this.linkParams.title = item.title;
            this.linkParams.title_en = item.title_en;
            this.linkParams.link = item.link;
            this.linkParams.link_en = item.link_en;

            this.linkPreview = item.photo_1 ? item.photo_1 : null;
            this.linkPreview_en = item.photo_1_en ? item.photo_1_en : null;
            this.linkPreview_default = item.photo_1 ? item.photo_1 : null;
            this.linkPreview_en_default = item.photo_1_en ? item.photo_1_en : null;

            this.selectedItem = item;
            this.linkModal = true;
        },
        insertLink: async function () {
            let url = ``;
            if (this.isNew) {
                url = `${this.api_url}/overview`; // insert
            } else {
                url = `${this.api_url}/overview/${this.selectedItem.id}`; // update
            }

            var formData = new FormData();
                formData.append('menu_id', this.menu_id);
                formData.append('type', 2);

            if (this.isNew) {
                // insert data setting
                for (key in this.linkParams) {
                    if (this.linkParams[key]) {
                        formData.append(key, this.linkParams[key]);
                    }
                }
            } else {
                // 일단, 이미지가 아닌 컬럼은 다 꽂음.
                for (key in this.linkParams) {
                    if (key != 'photo_1' && key != 'photo_1_en') {
                        formData.append(key, this.linkParams[key]);
                    }
                }

                // update image data setting
                // x:linkPreview_default(from DB) - o:linkPreview -> o (add new file)
                // x:linkPreview_default(from DB) - x:linkPreview -> nothing 
                // o:linkPreview_default(from DB) - x:linkPreview -> del y (delete exist file)
                // o:linkPreview_default(from DB) - o:linkPreview -> after compare : o (add new file), x
                console.log(this.linkPreview_default," vs ", this.linkPreview);

                if (!this.linkPreview_default && this.linkPreview) { // x - o
                    formData.append('photo_1', this.linkParams.photo_1);
                }
                if (this.linkPreview_default && !this.linkPreview) { // o - x
                    formData.append('photo_1_del', 'Y');
                }
                if (this.linkPreview_default != this.linkPreview) { // compare after
                    formData.append('photo_1', this.linkParams.photo_1);
                }

                if (!this.linkPreview_en_default && this.linkPreview_en) {
                    formData.append('photo_1_en', this.linkParams.photo_1_en);
                }
                if (this.linkPreview_en_default && this.linkPreview_en) {
                    formData.append('photo_1_en_del', 'Y');
                }
                if (this.linkPreview_en_default != this.linkPreview_en) { // compare after
                    formData.append('photo_1', this.linkParams.photo_1_en);
                }

            }

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            this.$showMsgBoxTwo(rs.status);
            this.getList();
            this.linkModal = false;
            // this.$refs['link-modal'].hide();
        },
        
        deleteLink: async function (item, index, target) {
            if (confirm('삭제하시겠습니까?')) {
                let rs = await axios.delete(`${this.api_url}/overview/${item.id}`);
                this.$showMsgBoxTwo(rs.status, "delete");
                this.getList();
            }
        }
    },
};
</script>
