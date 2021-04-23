<template>
<section>
    <b-row>
        <b-col>
<!-- 
            <b-button variant="dark" size="sm" @click="PCPreview = !PCPreview">PC버전 보기</b-button>
            <b-modal v-model="PCPreview" hide-footer ref="pc-modal" size="xl">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" :src="`${page_url}/jeju/overview.html`" allowfullscreen></iframe>
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
             -->

            <b-button variant="dark" size="sm" @click="PCPreview = !PCPreview">PC버전 보기</b-button>
            <b-modal v-model="PCPreview" size="lg" hide-footer ref="pc-modal" title="PC 미리보기">
                <pc :url="{logo, url2, url3, url6, url7, url8}"></pc>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal('pc-modal')">Close Me</b-button>
            </b-modal>

            <b-button variant="dark" size="sm" @click="MobilePreview = !MobilePreview">Mobile버전 보기</b-button>
            <b-modal v-model="MobilePreview" hide-footer ref="mobile-modal">
                <mo :url="{logo, url2, url6, url7, url8}"></mo>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal('mobile-modal')">Close Me</b-button>
            </b-modal>
            
        </b-col>
    </b-row>
    
    <b-row class="mt-1">
        <b-col>
            <b-card no-body>
                <b-tabs content-class="mt-1" card>
                    <b-tab title="국문" active>
                        <b-row>
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>로고</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col md="6" sm="12">
                                            <b-card>
                                                <b-img :src="logo||prev_480_60" fluid style="border: 1px solid silver;"></b-img>
                                                <b-card-text class="text-left mt-1">
                                                    <b-icon-info-square></b-icon-info-square><span class="p-1 text-secondary">가로 480px 세로 60px (8:1) 이미지 업로드를 권장합니다.</span>
                                                </b-card-text>
                                                <b-card-text>
                                                    <b-row>
                                                        <b-col md="9" class="pr-0">
                                                            <b-form-file v-model="file1" ref="file-input" @change="onFileChange($event, 'logo')" size="sm"></b-form-file>
                                                        </b-col>
                                                        <b-col md="3" class="text-right">
                                                            <b-button @click="file1 = null; logo = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-text>
                                            </b-card>
                                        </b-col>
                                        <b-col md="6" sm="12">
                                            <b-card>
                                            </b-card>
                                        </b-col>
                                    </b-row>

                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>상단 좌측 파일 (최대 2개)</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col>
                                            <b-card>
                                                <strong>버튼 이미지 #1</strong><br>
                                                <b-img :src="url2||prev_240_48" fluid style="max-width:240px; height:48px; border: 1px solid silver;"></b-img>
                                                <b-card-text class="mt-1">
                                                    <b-row>
                                                        <b-col md="9" class="pr-0">
                                                            <b-form-file v-model="file2" ref="file-input" @change="onFileChange($event, 'url2')" class="mb-2" size="sm"></b-form-file>
                                                        </b-col>
                                                        <b-col md="3" class="text-right">
                                                            <b-button @click="file2 = null; url2 = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-text>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card>
                                                <strong>버튼 이미지 #2</strong><br>
                                                <b-img :src="url3||prev_240_48" fluid style="max-width:250px; height:48px; border: 1px solid silver;"></b-img>
                                                <b-card-text class="mt-1">
                                                    <b-row>
                                                        <b-col md="9" class="pr-0">
                                                            <b-form-file v-model="file3" ref="file-input" @change="onFileChange($event, 'url3')" class="mb-2" size="sm"></b-form-file>
                                                        </b-col>
                                                        <b-col md="3" class="text-right">
                                                            <b-button @click="file3 = null; url3 = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-text>
                                            </b-card>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mt-3">
                                        <b-col>
                                            <b-card>
                                                <strong>파일 업로드 #1</strong>
                                                <b-row>
                                                    <b-col md="9" class="pr-0">
                                                        <b-form-file v-model="file4" class="mb-2" size="sm"></b-form-file>
                                                    </b-col>
                                                    <b-col md="3" class="text-right">
                                                        <b-button @click="file4 = null;" size="sm" variant="danger">파일 삭제</b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card>
                                                <strong>파일 업로드 #2</strong>
                                                <b-row>
                                                    <b-col md="9" class="pr-0">
                                                        <b-form-file v-model="file5" class="mb-2" size="sm"></b-form-file>
                                                    </b-col>
                                                    <b-col md="3" class="text-right">
                                                        <b-button @click="file5 = null;" size="sm" variant="danger">파일 삭제</b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>상단우측 SNS 배너</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col class="pr-5">
                                            <b-row>
                                                <b-col>
                                                    <b-form-checkbox v-model="is_visible_sns_banner_1" name="check-button" switch>
                                                        <strong>이미지 #1</strong>
                                                    </b-form-checkbox>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="7" align="center">
                                                    <b-card>
                                                        <b-img :src="url6||prev_150_150" fluid alt="Responsive image" style="max-width:50px;"></b-img>
                                                    </b-card>
                                                </b-col>
                                                <b-col>
                                                    <b-form-file v-model="file6" ref="file-input" placeholder="No file" @change="onFileChange($event, 'url6')" class="mb-2" size="sm">
                                                    </b-form-file>
                                                    <b-button @click="file6 = null; url6 = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <strong>링크 #1</strong>
                                                    <b-form-input size="sm" v-model="link1" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col class="pr-5">
                                            <b-row>
                                                <b-col>
                                                    <b-form-checkbox v-model="is_visible_sns_banner_2" name="check-button" switch>
                                                        <strong>이미지 #2</strong>
                                                    </b-form-checkbox>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="7" align="center">
                                                    <b-card>
                                                        <b-img :src="url7||prev_150_150" fluid alt="Responsive image" style="max-width:50px;"></b-img>
                                                    </b-card>
                                                </b-col>
                                                <b-col>
                                                    <b-form-file v-model="file7" ref="file-input" placeholder="No file" @change="onFileChange($event, 'url7')" class="mb-2" size="sm">
                                                    </b-form-file>
                                                    <b-button @click="file7 = null; url7 = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <strong>링크 #2</strong>
                                                    <b-form-input size="sm" v-model="link2" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col class="pr-5">
                                            <b-row>
                                                <b-col>
                                                    <b-row>
                                                        <b-col>
                                                            <b-form-checkbox v-model="is_visible_sns_banner_3" name="check-button" switch>
                                                                <strong>이미지 #3</strong>
                                                            </b-form-checkbox>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="7" align="center">
                                                            <b-card>
                                                                <b-img :src="url8||prev_150_150" fluid alt="Responsive image" style="max-width:50px;"></b-img>
                                                            </b-card>
                                                        </b-col>
                                                        <b-col>
                                                            <b-form-file v-model="file8" ref="file-input" placeholder="No file" @change="onFileChange($event, 'url8')" class="mb-2" size="sm">
                                                            </b-form-file>
                                                            <b-button @click="file8 = null; url8 = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <strong>링크 #3</strong>
                                                    <b-form-input size="sm" v-model="link3" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col>
                                <b-form-checkbox v-model="is_visible_familysite" name="check-button" switch>
                                    <strong>Family Site</strong>
                                </b-form-checkbox>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>회원가입/약관</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col>
                                            <strong>이용약관/제목</strong>
                                            <b-form-input size="sm" v-model="ensureTitle"></b-form-input>
                                        </b-col>
                                        <b-col>
                                            <strong>개인정보 처리 방침/제목</strong>
                                            <b-form-input size="sm" v-model="privacyTitle"></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mt-3">
                                        <b-col>
                                            <strong>이용약관/내용</strong>
                                            <b-form-textarea id="textarea" v-model="ensureContent" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                                        </b-col>
                                        <b-col>
                                            <strong>개인정보 처리 방침/내용</strong>
                                            <b-form-textarea id="textarea" v-model="privacyContent" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                                        </b-col>
                                    </b-row>

                                </b-card>
                            </b-col>
                        </b-row>

                    </b-tab>
                    <b-tab title="영문">
                        <b-row>
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>로고</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col>
                                            <b-card>
                                                <b-img :src="logo_en||prev_480_60" fluid style="max-width:480px; border: 1px solid silver"></b-img>
                                                <b-card-text class="text-left mt-1">
                                                    <b-icon-info-square></b-icon-info-square><span class="p-1 text-secondary">가로 480px 세로 60px (8:1) 이미지 업로드를 권장합니다.</span>
                                                </b-card-text>
                                                <b-card-text>
                                                    <b-row>
                                                        <b-col md="9" class="pr-0">
                                                            <b-form-file v-model="file1_en" ref="file-input" @change="onFileChange($event, 'logo_en')" size="sm"></b-form-file>
                                                        </b-col>
                                                        <b-col md="3" class="text-right">
                                                            <b-button @click="file1_en = null; logo_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-text>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card>
                                            </b-card>
                                        </b-col>
                                    </b-row>

                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>상단 좌측 파일 (최대 2개)</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col>
                                            <b-card>
                                                <strong>버튼 이미지 #1</strong><br>
                                                <b-img :src="url2_en||prev_240_48" fluid style="max-width:240px; height:48px; border: 1px solid silver;"></b-img>
                                                <b-card-text class="mt-1">
                                                    <b-row>
                                                        <b-col md="9" class="pr-0">
                                                            <b-form-file v-model="file2_en" ref="file-input" @change="onFileChange($event, 'url2_en')" class="mb-2" size="sm"></b-form-file>
                                                        </b-col>
                                                        <b-col md="3" class="text-right">
                                                            <b-button @click="file2_en = null; url2_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-text>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card>
                                                <strong>버튼 이미지 #2</strong><br>
                                                <b-img :src="url3_en||prev_240_48" fluid style="max-width:250px; height:48px; border: 1px solid silver;"></b-img>
                                                <b-card-text class="mt-1">
                                                    <b-row>
                                                        <b-col md="9" class="pr-0">
                                                            <b-form-file v-model="file3_en" ref="file-input" @change="onFileChange($event, 'url3_en')" class="mb-2" size="sm"></b-form-file>
                                                        </b-col>
                                                        <b-col md="3" class="text-right">
                                                            <b-button @click="file3_en = null; url3_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-card-text>
                                            </b-card>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mt-3">
                                        <b-col>
                                            <b-card>
                                                <strong>파일 업로드 #1</strong>
                                                <b-row>
                                                    <b-col md="9" class="pr-0">
                                                        <b-form-file v-model="file4_en" class="mb-2" size="sm"></b-form-file>
                                                    </b-col>
                                                    <b-col md="3" class="text-right">
                                                        <b-button @click="file4_en = null;" size="sm" variant="danger">파일 삭제</b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card>
                                                <strong>파일 업로드 #2</strong>
                                                <b-row>
                                                    <b-col md="9" class="pr-0">
                                                        <b-form-file v-model="file5_en" class="mb-2" size="sm"></b-form-file>
                                                    </b-col>
                                                    <b-col md="3" class="text-right">
                                                        <b-button @click="file5_en = null;" size="sm" variant="danger">파일 삭제</b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>상단우측 SNS 배너</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col class="pr-5">
                                            <b-row>
                                                <b-col>
                                                    <b-form-checkbox v-model="is_visible_sns_banner_1_en" name="check-button" switch>
                                                        <strong>이미지 #1</strong>
                                                    </b-form-checkbox>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="7" align="center">
                                                    <b-card>
                                                        <b-img :src="url6_en||prev_150_150" fluid alt="Responsive image" style="max-width:50px;"></b-img>
                                                    </b-card>
                                                </b-col>
                                                <b-col>
                                                    <b-form-file v-model="file6_en" ref="file-input" placeholder="No file" @change="onFileChange($event, 'url6_en')" class="mb-2" size="sm">
                                                    </b-form-file>
                                                    <b-button @click="file6_en = null; url6_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <strong>링크 #1</strong>
                                                    <b-form-input size="sm" v-model="link1_en" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col class="pr-5">
                                            <b-row>
                                                <b-col>
                                                    <b-form-checkbox v-model="is_visible_sns_banner_2_en" name="check-button" switch>
                                                        <strong>이미지 #2</strong>
                                                    </b-form-checkbox>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="7" align="center">
                                                    <b-card>
                                                        <b-img :src="url7_en||prev_150_150" fluid alt="Responsive image" style="max-width:50px;"></b-img>
                                                    </b-card>
                                                </b-col>
                                                <b-col>
                                                    <b-form-file v-model="file7_en" ref="file-input" placeholder="No file" @change="onFileChange($event, 'url7_en')" class="mb-2" size="sm">
                                                    </b-form-file>
                                                    <b-button @click="file7_en = null; url7_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <strong>링크 #2</strong>
                                                    <b-form-input size="sm" v-model="link2_en" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col class="pr-5">
                                            <b-row>
                                                <b-col>
                                                    <b-row>
                                                        <b-col>
                                                            <b-form-checkbox v-model="is_visible_sns_banner_3_en" name="check-button" switch>
                                                                <strong>이미지 #3</strong>
                                                            </b-form-checkbox>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="7" align="center">
                                                            <b-card>
                                                                <b-img :src="url8_en||prev_150_150" fluid alt="Responsive image" style="max-width:50px;"></b-img>
                                                            </b-card>
                                                        </b-col>
                                                        <b-col>
                                                            <b-form-file v-model="file8_en" ref="file-input" placeholder="No file" @change="onFileChange($event, 'url8_en')" class="mb-2" size="sm">
                                                            </b-form-file>
                                                            <b-button @click="file8_en = null; url8_en = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <strong>링크 #3</strong>
                                                    <b-form-input size="sm" v-model="link3_en" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>
                        <!-- 영문은 없네??
                        <b-row class="mt-3">
                            <b-col>
                                <b-form-checkbox v-model="is_visible_familysite_en" name="check-button" switch>
                                    <strong>Family Site</strong>
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
                         -->

                        <b-row class="mt-3">
                            <b-col>
                                <b-card>
                                    <template #header>
                                        <h6><strong>회원가입/약관</strong></h6>
                                    </template>
                                    <b-row>
                                        <b-col>
                                            <strong>이용약관/제목</strong>
                                            <b-form-input size="sm" v-model="ensureTitle_en"></b-form-input>
                                        </b-col>
                                        <b-col>
                                            <strong>개인정보 처리 방침/제목</strong>
                                            <b-form-input size="sm" v-model="privacyTitle_en"></b-form-input>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mt-3">
                                        <b-col>
                                            <strong>이용약관/내용</strong>
                                            <b-form-textarea id="textarea" v-model="ensureContent_en" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                                        </b-col>
                                        <b-col>
                                            <strong>개인정보 처리 방침/내용</strong>
                                            <b-form-textarea id="textarea" v-model="privacyContent_en" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                                        </b-col>
                                    </b-row>

                                </b-card>
                            </b-col>
                        </b-row>

                    </b-tab>

                </b-tabs>
            </b-card>
        </b-col>
    </b-row>
    <br>

    <!-- 로그인/회원가입 -->
    <b-row>
        <b-col>
            <b-form-checkbox v-model="is_login" name="check-button" switch>
                <strong>로그인/회원가입</strong>
            </b-form-checkbox>
        </b-col>
    </b-row>
    <br>

    <!-- 홈페이지 언어설정 -->
    <b-row>
        <b-col>
            <b-card>
                <template #header>
                    <h6><strong>홈페이지 언어 (사용하실 홈페이지 언어 종류를 선택하세요.)</strong></h6>
                </template>
                <b-form-checkbox v-model="is_language" name="check-button" switch>
                    <strong>언어선택 노출여부</strong>
                </b-form-checkbox>
                <b-form-select v-model="language" :options="options" size="sm" class="mt-3" style="max-width: 200px;"></b-form-select>
            </b-card>
        </b-col>
    </b-row>
    <br>
    <b-row>
        <b-col>
            <b-button variant="primary" size="sm" @click="save" class="inoBtn-150">저장</b-button>
            <b-button variant="danger" size="sm" @click="getData" class="inoBtn-150">취소</b-button>
        </b-col>
    </b-row>

</section>
</template>

<script>
import pc from './pc_preview.vue'
import mo from './mobile_preview.vue'
export default {
    name: "siteInfo",
    components: {
        pc: pc,
        mo: mo
    },
    data: function () {
        return {
            event_id: null,
            api_url: null,
            PCPreview: false,
            MobilePreview: false,

            prev_250_50: this.$store.getters.dummy_image_url(['250x250']),
            prev_150_150: this.$store.getters.dummy_image_url(['150x150']),
            prev_480_60: this.$store.getters.dummy_image_url(['480x60']),
            prev_240_48: this.$store.getters.dummy_image_url(['240x48']),
            

            file1: null,
            file1_en: null,
            logo: "",
            logo_en: "",
            file2: null,
            file2_en: null,
            url2: "",
            url2_en: "",
            file3: null,
            file3_en: null,
            url3: "",
            url3_en: "",

            file4: null,
            file4_en: null,
            file5: null,
            file5_en: null,

            file6: null,
            url6: "",
            file7: null,
            url7: "",
            file8: null,
            url8: "",

            file6_en: null,
            url6_en: "",
            file7_en: null,
            url7_en: "",
            file8_en: null,
            url8_en: "",

            link1: null,
            link2: null,
            link3: null,

            link1_en: null,
            link2_en: null,
            link3_en: null,

            is_visible_sns_banner_1: true,
            is_visible_sns_banner_2: true,
            is_visible_sns_banner_3: true,

            is_visible_sns_banner_1_en: true,
            is_visible_sns_banner_2_en: true,
            is_visible_sns_banner_3_en: true,

            ensureTitle: null,
            ensureContent: null,
            privacyTitle: null,
            privacyContent: null,

            ensureTitle_en: null,
            ensureContent_en: null,
            privacyTitle_en: null,
            privacyContent_en: null,

            is_visible_familysite: true,
            is_visible_familysite_en: true,
            is_login: true,
            is_language: true,
            language: 0,
            options: [{
                    value: 2,
                    text: "한국어 & 영어"
                },
                {
                    value: 0,
                    text: "한국어"
                },
                {
                    value: 1,
                    text: "영어"
                },
            ],
            boxTwo: '',
            page_url: ''
        };
    },
    mounted() {
        this.$nextTick(function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            console.log(this.event_id, ' - ', this.api_url);
            this.page_url = this.$store.getters.page_url;
            this.getData();
        })
    },
    methods: {
        getData: async function () {
            let url = `${this.api_url}/event/main_page?event_id=${this.event_id}`;

            let res = (await this.$http.get(url)).data.result;
            EventBus.$emit('change_logo', res.logo);
            // console.log(res);

            this.logo = res.logo;
            this.logo_en = res.logo_en;

            this.url2 = res.file_button_1;
            this.url3 = res.file_button_2;
            this.url6 = res.sns_banner_1;
            this.url7 = res.sns_banner_2;
            this.url8 = res.sns_banner_3;

            this.url2_en = res.file_button_1_en;
            this.url3_en = res.file_button_2_en;
            this.url6_en = res.sns_banner_1_en;
            this.url7_en = res.sns_banner_2_en;
            this.url8_en = res.sns_banner_3_en;

            this.link1 = res.sns_banner_link_1;
            this.link2 = res.sns_banner_link_2;
            this.link3 = res.sns_banner_link_3;

            this.link1_en = res.sns_banner_link_1_en;
            this.link2_en = res.sns_banner_link_2_en;
            this.link3_en = res.sns_banner_link_3_en;

            this.ensureTitle = res.terms_title;
            this.ensureContent = res.terms;

            this.ensureTitle_en = res.terms_title_en;
            this.ensureContent_en = res.terms_en;

            this.privacyTitle = res.privacy_terms_title;
            this.privacyContent = res.privacy_terms;

            this.privacyTitle_en = res.privacy_terms_title_en;
            this.privacyContent_en = res.privacy_terms_en;

            this.is_visible_sns_banner_1 = res.is_visible_sns_banner_1 ? true : false;
            this.is_visible_sns_banner_2 = res.is_visible_sns_banner_2 ? true : false;
            this.is_visible_sns_banner_3 = res.is_visible_sns_banner_3 ? true : false;
            this.is_visible_familysite = res.is_visible_familysite ? true : false;

            this.is_visible_sns_banner_1_en = res.is_visible_sns_banner_1_en ? true : false;
            this.is_visible_sns_banner_2_en = res.is_visible_sns_banner_2_en ? true : false;
            this.is_visible_sns_banner_3_en = res.is_visible_sns_banner_3_en ? true : false;
            this.is_visible_familysite_en = res.is_visible_familysite_en ? true : false;

            this.is_login = res.is_login ? true : false;
            this.is_language = res.is_language ? true : false;
            this.language = res.language;

        },
        onFileChange(e, url) {
            const file = e.target.files[0];
            this[url] = URL.createObjectURL(file);
        },
        hideModal(id) {
            this.$refs[id].hide();
        },
        save: async function () {
            let url = `${this.api_url}/event/${this.event_id}`;
            var formData = new FormData();
            // 로고, 사이트명
            formData.append("logo", this.file1); // 로고 파일
            formData.append("logo_en", this.file1_en); // 로고 파일

            // 상단 좌측 고정
            formData.append("file_button_1", this.file2); // 파일 버튼 이미지 #1
            formData.append("file_button_2", this.file3); // 파일 버튼 이미지 #2
            formData.append("file_1", this.file4); // 파일 업로드 #1
            formData.append("file_2", this.file5); // 파일 업로드 #2

            formData.append("file_button_1_en", this.file2_en); // 파일 버튼 이미지 #1
            formData.append("file_button_2_en", this.file3_en); // 파일 버튼 이미지 #2
            formData.append("file_1_en", this.file4_en); // 파일 업로드 #1
            formData.append("file_2_en", this.file5_en); // 파일 업로드 #2

            // 상단우측 SNS
            formData.append("is_visible_sns_banner_1", this.is_visible_sns_banner_1 ? 1 : 0); // 상단우측 SNS  배너 이미지 보기 안보기
            formData.append("is_visible_sns_banner_2", this.is_visible_sns_banner_2 ? 1 : 0); // 상단우측sns배너 보이기1, 0 - hide, 1 - show
            formData.append("is_visible_sns_banner_3", this.is_visible_sns_banner_3 ? 1 : 0);
            formData.append("sns_banner_1", this.file6); // 상단우측 SNS  배너 이미지 file 시리즈
            formData.append("sns_banner_2", this.file7);
            formData.append("sns_banner_3", this.file8);
            formData.append("sns_banner_link_1", this.link1); // 상단우측 SNS  배너 링크들
            formData.append("sns_banner_link_2", this.link2);
            formData.append("sns_banner_link_3", this.link3);

            formData.append("is_visible_sns_banner_1_en", this.is_visible_sns_banner_1_en ? 1 : 0); // 상단우측 SNS  배너 이미지 보기 안보기
            formData.append("is_visible_sns_banner_2_en", this.is_visible_sns_banner_2_en ? 1 : 0); // 상단우측sns배너 보이기1, 0 - hide, 1 - show
            formData.append("is_visible_sns_banner_3_en", this.is_visible_sns_banner_3_en ? 1 : 0);
            formData.append("sns_banner_1_en", this.file6_en); // 상단우측 SNS  배너 이미지 file 시리즈
            formData.append("sns_banner_2_en", this.file7_en);
            formData.append("sns_banner_3_en", this.file8_en);
            formData.append("sns_banner_link_1_en", this.link1_en); // 상단우측 SNS  배너 링크들
            formData.append("sns_banner_link_2_en", this.link2_en);
            formData.append("sns_banner_link_3_en", this.link3_en);

            // 약관
            formData.append("terms_title", this.ensureTitle); // 이용약관 제목
            formData.append("terms", this.ensureContent); // 이용약관
            formData.append("privacy_terms_title", this.privacyTitle); // 개인정보 처리 방침 제목
            formData.append("privacy_terms", this.privacyContent); // 개인정보 처리 방침

            formData.append("terms_title_en", this.ensureTitle_en); // 이용약관 제목
            formData.append("terms_en", this.ensureContent_en); // 이용약관
            formData.append("privacy_terms_title_en", this.privacyTitle_en); // 개인정보 처리 방침 제목
            formData.append("privacy_terms_en", this.privacyContent_en); // 개인정보 처리 방침

            // 패밀리 사이트 노출 여부
            formData.append("is_visible_familysite", this.is_visible_familysite ? 1 : 0);
            // formData.append("is_visible_familysite_en", this.is_visible_familysite_en ? 1 : 0);

            // 로그인 여부
            formData.append("is_login", this.is_login ? 1 : 0); // 로그인, 회원가입 - 0 - not use, 1 - use

            // 홈페이지 언어
            formData.append("is_language", this.is_language ? 1 : 0); // 언어선택 노출여부

            // console.log(this.language, ' send value language');
            formData.append("language", this.language); // 타입 language : 0 - kr, 1 - en, 2 - kr & en
            // console.log(formData);
            let response = await this.$http.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response.status);
            this.getData();
            this.$showMsgBoxTwo(response.status);
        },
    },
};
</script>
