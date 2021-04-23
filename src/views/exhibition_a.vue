<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>Exhibition_a</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>

    <b-row class="mb-3">
        <b-col>
            <b-card title="관리하기" no-body>
                <b-card-text>
                    <b-tabs card>
                        <b-tab title="국문" active>
                            <b-row class="mb-3">
                                <b-col cols="4">
                                    <b-card>
                                        <b-card-text>
                                            <strong>이미지 #1</strong>
                                        </b-card-text>
                                        <b-card-text align="center" class="ino-1000-300-wrap">
                                            <div>
                                                <b-img :src="photo_1_preview_local||photo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="file1" @change="onFileChange($event, 'photo_1_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="file1 = null; photo_1_preview_local = null;" size="sm" class="mr-2" variant="danger">이미지 삭제</b-button>
                                            <b-form-checkbox v-model="is_visible_photo_1" name="check-button" switch>
                                                <strong>이미지 ON/OFF</strong>
                                            </b-form-checkbox>
                                        </b-form>
                                        <b-form-group label="링크 #1:" class="">
                                            <b-form-input v-model="exibition_a.link_1" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                        </b-form-group>
                                    </b-card>
                                </b-col>
                                <b-col cols="4">
                                    <b-card>
                                        <b-card-text>
                                            <strong>이미지 #2</strong>
                                        </b-card-text>
                                        <b-card-text align="center" class="ino-1000-300-wrap">
                                            <div>
                                                <b-img :src="photo_2_preview_local||photo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="file2" @change="onFileChange($event, 'photo_2_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="file2 = null; photo_2_preview_local = null;" size="sm" class="mr-2" variant="danger">이미지 삭제</b-button>
                                            <b-form-checkbox v-model="is_visible_photo_2" name="check-button" switch>
                                                <strong>이미지 ON/OFF</strong>
                                            </b-form-checkbox>
                                        </b-form>
                                        <b-form-group label="링크 #2:" class="">
                                            <b-form-input v-model="exibition_a.link_2" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                        </b-form-group>
                                    </b-card>
                                </b-col>

                                <b-col cols="4">
                                    <b-card>
                                        <b-card-text>
                                            <strong>이미지 #3</strong>
                                        </b-card-text>
                                        <b-card-text align="center" class="ino-1000-300-wrap">
                                            <div>
                                                <b-img :src="photo_3_preview_local||photo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="file3" @change="onFileChange($event, 'photo_3_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="file3 = null; photo_3_preview_local = null;" size="sm" class="mr-2" variant="danger">이미지 삭제</b-button>
                                            <b-form-checkbox v-model="is_visible_photo_3" name="check-button" switch>
                                                <strong>이미지 ON/OFF</strong>
                                            </b-form-checkbox>
                                        </b-form>
                                        <b-form-group label="링크 #3:" class="">
                                            <b-form-input v-model="exibition_a.link_3" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                        </b-form-group>
                                    </b-card>
                                </b-col>
                            </b-row>

                            <b-row class="mb-3">
                                <b-col>
                                    <b-form-group label="카테고리#1 이름">
                                        <b-form-input v-model="exibition_a.name_1" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col>
                                    <h6>로고 이미지</h6>
                                    <b-card class="mb-3">
                                        <b-card-text align="center" class="ino-1000-1400-wrap">
                                            <div>
                                                <b-img :src="logo_file_preview_local||logo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="logo_file" @change="onFileChange($event, 'logo_file_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="logo_file = null; logo_file_preview_local = null;" size="sm" class="mr-2" variant="danger">이미지 삭제</b-button>
                                        </b-form>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col>
                                    <b-row>
                                        <b-col class="pt-0 pb-0 mt-0 mb-0" cols="9">
                                            <label>카테고리 #1 컨텐츠</label>
                                        </b-col>
                                        <b-col class="pt-0 pb-0 mt-0 mb-0">
                                            <b-button href="#" variant="outline-primary" block size="sm" @click="content1Add(false)">
                                                <b-icon-plus></b-icon-plus>컨텐츠 추가
                                            </b-button>
                                        </b-col>
                                    </b-row>

                                    <!-- 컨텐츠 추가 삭제 -->
                                    <b-list-group class="mt-1" ref="add_row">
                                        <b-list-group-item v-for="(item, index) in contents1_arr" v-bind:key="index">
                                            <b-row>
                                                <b-col cols="2">
                                                    <b-form-input v-model="item.title" type="text"></b-form-input>
                                                </b-col>
                                                <b-col cols="8">
                                                    <b-form-textarea v-model="item.value" placeholder="Enter something..." rows="2" max-rows="2"></b-form-textarea>
                                                </b-col>
                                                <b-col cols="2">
                                                    <b-button variant="warning" @click="content1Delete(index, false)">
                                                        <b-icon-trash-fill></b-icon-trash-fill> 삭제
                                                    </b-button>
                                                </b-col>
                                            </b-row>
                                        </b-list-group-item>
                                    </b-list-group>
                                    
                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col>
                                    <b-form-group label="카테고리#2 이름">
                                        <b-form-input v-model="exibition_a.name_2" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group label="카테고리#3 이름">
                                        <b-form-input v-model="exibition_a.name_3" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab title="영문">
                            <b-row class="mb-3">
                                <b-col cols="4">
                                    <b-card>
                                        <b-card-text>
                                            <strong>이미지 #1</strong>
                                        </b-card-text>
                                        <b-card-text align="center" class="ino-1000-300-wrap">
                                            <div>
                                                <b-img :src="photo_1_en_preview_local||photo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="file1_en" @change="onFileChange($event, 'photo_1_en_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="file1_en = null; photo_1_en_preview_local = null;" size="sm" class="mr-2">이미지 삭제</b-button>
                                            <b-form-checkbox v-model="is_visible_photo_1_en" name="check-button" switch>
                                                <strong>이미지 ON/OFF</strong>
                                            </b-form-checkbox>
                                        </b-form>
                                        <b-form-group label="링크 #1:" class="">
                                            <b-form-input v-model="exibition_a.link_1_en" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                        </b-form-group>
                                    </b-card>
                                </b-col>
                                <b-col cols="4">
                                    <b-card>
                                        <b-card-text>
                                            <strong>이미지 #2</strong>
                                        </b-card-text>
                                        <b-card-text align="center" class="ino-1000-300-wrap">
                                            <div>
                                                <b-img :src="photo_2_en_preview_local||photo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="file2_en" @change="onFileChange($event, 'photo_2_en_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="file2_en = null; photo_2_en_preview_local = null;" size="sm" class="mr-2">이미지 삭제</b-button>
                                            <b-form-checkbox v-model="is_visible_photo_2_en" name="check-button" switch>
                                                <strong>이미지 ON/OFF</strong>
                                            </b-form-checkbox>
                                        </b-form>
                                        <b-form-group label="링크 #2:" class="">
                                            <b-form-input v-model="exibition_a.link_2_en" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                        </b-form-group>
                                    </b-card>
                                </b-col>

                                <b-col cols="4">
                                    <b-card>
                                        <b-card-text>
                                            <strong>이미지 #3</strong>
                                        </b-card-text>
                                        <b-card-text align="center" class="ino-1000-300-wrap">
                                            <div>
                                                <b-img :src="photo_3_en_preview_local||photo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="file3_en" @change="onFileChange($event, 'photo_3_en_preview_local')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="file3_en = null; photo_3_en_preview_local = null;" size="sm" class="mr-2">이미지 삭제</b-button>
                                            <b-form-checkbox v-model="is_visible_photo_3_en" name="check-button" switch>
                                                <strong>이미지 ON/OFF</strong>
                                            </b-form-checkbox>
                                        </b-form>
                                        <b-form-group label="링크 #3:" class="">
                                            <b-form-input v-model="exibition_a.link_3_en" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                        </b-form-group>
                                    </b-card>
                                </b-col>
                            </b-row>

                            <b-row class="mb-3">
                                <b-col>
                                    <b-form-group label="카테고리#1 이름">
                                        <b-form-input v-model="exibition_a.name_1_en" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col>
                                    <h6>로고 이미지</h6>
                                    <b-card class="mb-3">
                                        <b-card-text align="center" class="ino-1000-1400-wrap">
                                            <div>
                                                <b-img :src="logo_file_en_preview_local||logo_preview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="logo_file_en" @change="onFileChange($event, 'logo_file_en_preview')" class="mt-1 mb-2" size="sm">
                                        </b-form-file>
                                        <b-form inline class="mb-2">
                                            <b-button @click="logo_file_en = null; logo_file_en_preview_local = null;" size="sm" class="mr-2">이미지 삭제</b-button>
                                        </b-form>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col>
                                    <b-row>
                                        <b-col class="pt-0 pb-0 mt-0 mb-0" cols="9">
                                            <label>카테고리 #1 컨텐츠</label>
                                        </b-col>
                                        <b-col class="pt-0 pb-0 mt-0 mb-0">
                                            <b-button href="#" variant="outline-primary" block size="sm" @click="content1Add(true)">
                                                <b-icon-plus></b-icon-plus>컨텐츠 추가
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                    <!-- arrrr -->
                                    <b-list-group class="mt-1" ref="add_row">
                                        <b-list-group-item v-for="(item, index) in contents1_en_arr" v-bind:key="index">
                                            <b-row>
                                                <b-col cols="2">
                                                    <b-form-input v-model="item.title" type="text"></b-form-input>
                                                </b-col>
                                                <b-col cols="8">
                                                    <b-form-textarea v-model="item.value" placeholder="Enter something..." rows="2" max-rows="2"></b-form-textarea>
                                                </b-col>
                                                <b-col cols="2">
                                                    <b-button variant="warning" @click="content1Delete(index, true)">
                                                        <b-icon-trash-fill></b-icon-trash-fill> 삭제
                                                    </b-button>
                                                </b-col>
                                            </b-row>
                                        </b-list-group-item>
                                    </b-list-group>

                                </b-col>
                            </b-row>
                            <b-row class="mb-3">
                                <b-col>
                                    <b-form-group label="카테고리#2 이름">
                                        <b-form-input v-model="exibition_a.name_2_en" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group label="카테고리#3 이름">
                                        <b-form-input v-model="exibition_a.name_3_en" type="text" placeholder="사이트 링크시 반드시 http:// 형태로 입력하세요."></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-tab>
                    </b-tabs>
                    <b-row>
                        <b-col class="ml-3 mb-3">
                            <b-button href="#" variant="primary" size="sm" @click="save" class="inoBtn-150">저장</b-button>
                            <b-button href="#" variant="danger" size="sm" @click="getList" class="inoBtn-150">취소</b-button>
                        </b-col>
                    </b-row>
                </b-card-text>
            </b-card>
        </b-col>
    </b-row>

    <b-row class="mb-1">
        <b-col cols="9">
            <strong>카테고리 #2 컨텐츠</strong>
        </b-col>
        <b-col cols="3" align="rigtht">
            <b-button variant="outline-primary" block size="sm" @click="newModalAction(false, '카테고리 #2 컨텐츠 추가', '1000x300')">
                <b-icon-plus></b-icon-plus>이미지 추가
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mb-3">
        <b-col>
            <b-table small :fields="photoFields.filter(function(e, index) { return index !== 3 })" :items="exibition_a.content2" responsive="sm" bordered head-variant="light" sticky-header>
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="updateContent23(row.item, row.index, $event.target, false, '카테고리 #2 컨텐츠 수정', '1000x300')">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteContent23(row.item, row.index, $event.target)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

    <b-row class="mb-1">
        <b-col cols="9">
            <strong>카테고리 #3 컨텐츠</strong>
        </b-col>
        <b-col cols="3">
            <b-button variant="outline-primary" block size="sm" @click="newModalAction(true, '카테고리 #3 컨텐츠 추가', '380x240')">
                <b-icon-plus></b-icon-plus>이미지 추가
            </b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-table small :fields="photoFields" :items="exibition_a.content3" responsive="sm" bordered head-variant="light" sticky-header>
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="updateContent23(row.item, row.index, $event.target, true, '카테고리 #3 컨텐츠 수정', '380x240')">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteContent23(row.item, row.index, $event.target, true)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>

        </b-col>
    </b-row>
    <br />

    <!-- 배너 이미지 팝업 -->
    <b-modal v-model="modal1" hide-footer ref="modal1" :title="content_modal_title">
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">순서</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="photoParams.order"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">배너명</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="photoParams.name"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-card no-body>

                
                <b-tabs card>
                    <b-tab title="국문" active>
                        <b-row v-show="content3" class="mt-1">
                            <b-col sm="4"><label style="font-size: 10pt;">이동할 웹주소</label></b-col>
                            <b-col sm="8">
                                <b-form-input type="text" size="sm" v-model="photoParams.link"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col>
                                <b-card sub-title="배너이미지(1000px*300px)">
                                    <b-card-text align="center" style="height:105px;">
                                        <div style="display:inline-block; width:100%; height: 100%; padding: 5px; border:1px solid silver; border-radius: 3px;">
                                            <b-img :src="modal1_photo_1_local||photo_preview_default" fluid
                                                style="height:100%; width:100%; object-fit:contain;"
                                            ></b-img>
                                        </div>
                                    </b-card-text>
                                    <b-form-file v-model="photoParams.photo_1" @change="onFileChange($event, 'modal1_photo_1_local')" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="photoParams.photo_1 = null; modal1_photo_1_local = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row v-show="content3" class="mt-1">
                            <b-col>
                                <b-form-textarea v-model="photoParams.desc" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="영문">
                        <b-row v-show="content3">
                            <b-col sm="4"><label style="font-size: 10pt;">이동할 웹주소</label></b-col>
                            <b-col sm="8">
                                <b-form-input type="text" size="sm" v-model="photoParams.link_en"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-card sub-title="배너이미지(1000px*300px)">
                                    <b-card-text align="center" style="height:105px;">
                                        <div style="display:inline-block; width:100%; height: 100%; padding: 5px; border:1px solid silver; border-radius: 3px;">
                                            <b-img :src="modal1_photo_1_en_local||photo_preview_default" fluid
                                                style="height:100%; width:100%; object-fit:contain;"
                                            ></b-img>
                                        </div>
                                    </b-card-text>
                                    <b-form-file v-model="photoParams.photo_1_en" @change="onFileChange($event, 'modal1_photo_1_en_local')" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="photoParams.photo_1_en = null; modal1_photo_1_en_local = null;" size="sm" variant="danger">이미지 삭제</b-button>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row v-show="content3">
                            <b-col>
                                <b-form-textarea v-model="photoParams.desc_en" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                            </b-col>
                        </b-row>
                    </b-tab>
                </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <b-button class="mt-2" variant="outline-danger" @click="$refs['modal1'].hide()" size="sm">Close</b-button>
        <b-button class="mt-2" variant="outline-primary" @click="insertContent23" size="sm">Save</b-button>
    </b-modal>

</section>
</template>

<script>
export default {
    name: "exhibition_a",
    data: function () {
        return {
            event_id: null,
            menu_id: null,
            photo_preview_default: this.$store.getters.dummy_image_url(['1000x300']), // 이미지 1,2,3 프리뷰 디폴트
            logo_preview_default: this.$store.getters.dummy_image_url(['1000x1406']),

            // 본문 변수 -- start
            file1: null, // 이미지 #1 파일
            photo_1_preview_data: null,
            photo_1_preview_local: null,

            file2: null,
            photo_2_preview_data: null,
            photo_2_preview_local: null,

            file3: null,
            photo_3_preview_data: null,
            photo_3_preview_local: null,

            file1_en: null, // 이미지 #1 파일 영문
            photo_1_en_preview_data: null,
            photo_1_en_preview_local: null,

            file2_en: null,
            photo_2_en_preview_data: null,
            photo_2_en_preview_local: null,

            file3_en: null,
            photo_3_en_preview_data: null,
            photo_3_en_preview_local: null,

            logo_file: null,
            logo_file_preview_data: null,
            logo_file_preview_local: null,

            logo_file_en: null,
            logo_file_en_preview_data: null,
            logo_file_en_preview_local: null,

            is_visible_photo_1: 1,
            is_visible_photo_2: 1,
            is_visible_photo_3: 1,
            is_visible_photo_1_en: 1,
            is_visible_photo_2_en: 1,
            is_visible_photo_3_en: 1,
            // 본문 변수 -- send

            // 모달관련
            modal1: false,
            content3: false,
            content_modal_title: null,
            photoParams: {
                overview_id: null,
                overview_type: 0, // 0 - type_a 컨텐츠2, 1 - type_a 컨텐츠3
                order: 0,
                name: null,
                link: null,
                link_en: null,
                photo_1: null,
                photo_1_en: null,
                desc: null,
                desc_en: null,
            },
            photoParams_reset: {
                overview_id: null,
                overview_type: 0, // 0 - type_a 컨텐츠2, 1 - type_a 컨텐츠3
                order: 0,
                name: null,
                link: null,
                link_en: null,
                photo_1: null,
                photo_1_en: null,
                desc: null,
                desc_en: null,
            },
            modal1_photo_1_data: null,
            modal1_photo_1_local: null,
            modal1_photo_1_en_data: null,
            modal1_photo_1_en_local: null,
            
            photoFields: [{
                    key: "id",
                    label: "번호",
                },
                {
                    key: "order",
                    label: "순서",
                },
                {
                    key: "name",
                    label: "타이틀",
                },
                {
                    key: "link",
                    label: "링크",
                },
                {
                    key: "manageBtn",
                    label: "관리",
                },
            ],
            exibition_a: {},
            contents1_arr: [], //test: [{key: 1, value: 2}]
            contents1_en_arr: [], //test: [{key: 1, value: 2}]

            api_url: ''
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.menu_id = this.$route.query.menu_id;
            this.api_url = this.$store.getters.api_url;
            this.getList();
        });
    },
    methods: {
        getList: async function () {
            this.event_id = this.$store.getters.event_id;
            let url = `${this.api_url}/e_overview?menu_id=${this.menu_id}`;
            let rs = (await axios.get(url)).data.result;
            this.exibition_a = rs[0];
            this.contents1_arr = rs[0].contents ? JSON.parse(rs[0].contents) : [];
            this.contents1_en_arr = rs[0].contents_en ? JSON.parse(rs[0].contents_en) : [];

            this.photo_1_preview_data = this.exibition_a.photo_1; // 변경여부 비교용...
            this.photo_2_preview_data = this.exibition_a.photo_2;
            this.photo_3_preview_data = this.exibition_a.photo_3;

            this.photo_1_preview_local = this.exibition_a.photo_1;
            this.photo_2_preview_local = this.exibition_a.photo_2;
            this.photo_3_preview_local = this.exibition_a.photo_3;

            this.photo_1_en_preview_data = this.exibition_a.photo_1_en; // 변경여부 비교용...
            this.photo_2_en_preview_data = this.exibition_a.photo_2_en;
            this.photo_3_en_preview_data = this.exibition_a.photo_3_en;

            this.photo_1_en_preview_local = this.exibition_a.photo_1_en;
            this.photo_2_en_preview_local = this.exibition_a.photo_2_en;
            this.photo_3_en_preview_local = this.exibition_a.photo_3_en;

            this.logo_file_preview_data = this.exibition_a.logo;
            this.logo_file_preview_local = this.exibition_a.logo;

            this.logo_file_en_preview_data = this.exibition_a.logo_en;
            this.logo_file_en_preview_local = this.exibition_a.logo_en;

            this.is_visible_photo_1 = this.exibition_a.is_visible_photo_1 ? true : false;
            this.is_visible_photo_2 = this.exibition_a.is_visible_photo_2 ? true : false;
            this.is_visible_photo_3 = this.exibition_a.is_visible_photo_3 ? true : false;
            this.is_visible_photo_1_en = this.exibition_a.is_visible_photo_1_en ? true : false;
            this.is_visible_photo_2_en = this.exibition_a.is_visible_photo_2_en ? true : false;
            this.is_visible_photo_3_en = this.exibition_a.is_visible_photo_3_en ? true : false;

            console.log(this.exibition_a);

            this.photoParams_reset.overview_id = this.exibition_a.id;
            this.photoParams.overview_id = this.exibition_a.id;

            // this.contents1_keys = Object.keys(contents1);
            // this.contents1_values = Object.values(contents1);
        },

        save: async function () {
            // store and update 모두처리
            let url = `${this.api_url}/e_overview`;

            var formData = new FormData();
            formData.append("menu_id", this.menu_id);

            this.exibition_a.link_1 = this.exibition_a.link_1 && !this.exibition_a.link_1.includes('http') ? `http://${this.exibition_a.link_1}` : this.exibition_a.link_1;
            this.exibition_a.link_2 = this.exibition_a.link_2 && !this.exibition_a.link_2.includes('http') ? `http://${this.exibition_a.link_2}` : this.exibition_a.link_2;
            this.exibition_a.link_3 = this.exibition_a.link_3 && !this.exibition_a.link_3.includes('http') ? `http://${this.exibition_a.link_3}` : this.exibition_a.link_3;

            this.exibition_a.link_1_en = this.exibition_a.link_1_en && !this.exibition_a.link_1_en.includes('http') ? `http://${this.exibition_a.link_1_en}` : this.exibition_a.link_1_en;
            this.exibition_a.link_2_en = this.exibition_a.link_2_en && !this.exibition_a.link_2_en.includes('http') ? `http://${this.exibition_a.link_2_en}` : this.exibition_a.link_2_en;
            this.exibition_a.link_3_en = this.exibition_a.link_3_en && !this.exibition_a.link_3_en.includes('http') ? `http://${this.exibition_a.link_3_en}` : this.exibition_a.link_3_en;

            
            formData.append("link_1", this.exibition_a.link_1); // 상단 슬라이드 링크
            formData.append("link_2", this.exibition_a.link_2);
            formData.append("link_3", this.exibition_a.link_3);
            formData.append("link_1_en", this.exibition_a.link_1_en);
            formData.append("link_2_en", this.exibition_a.link_2_en);
            formData.append("link_3_en", this.exibition_a.link_3_en);

            formData.append("name_1", this.exibition_a.name_1); // 카테고리 이름
            formData.append("name_2", this.exibition_a.name_2);
            formData.append("name_3", this.exibition_a.name_3);

            formData.append("name_1_en", this.exibition_a.name_1_en);
            formData.append("name_2_en", this.exibition_a.name_2_en);
            formData.append("name_3_en", this.exibition_a.name_3_en);

            // 파일 저장 경우의 수 - 디폴트 값을 또 설정하기 귀찮...
            // x:linkPreview_default(from DB) - o:linkPreview -> o (add new file)
            // x:linkPreview_default(from DB) - x:linkPreview -> nothing 
            // o:linkPreview_default(from DB) - x:linkPreview -> del y (delete exist file)
            // o:linkPreview_default(from DB) - o:linkPreview -> after compare : o (add new file), x
            console.log('1번째 파일은 0.아무것도 안한다. 1.업로드한다 2.지운다 :', this.$fileUploadChecker(this.photo_1_preview_local, this.photo_1_preview_data));
            let fileStatus = 0;

            fileStatus = this.$fileUploadChecker(this.photo_1_preview_local, this.photo_1_preview_data);
            fileStatus == 1 ? formData.append("photo_1", this.file1) : fileStatus == 2 ? formData.append("photo_1_del", 'Y') : '';
            fileStatus = this.$fileUploadChecker(this.photo_2_preview_local, this.photo_2_preview_data);
            fileStatus == 1 ? formData.append("photo_2", this.file2) : fileStatus == 2 ? formData.append("photo_2_del", 'Y') : '';
            fileStatus = this.$fileUploadChecker(this.photo_3_preview_local, this.photo_3_preview_data);
            fileStatus == 1 ? formData.append("photo_3", this.file3) : fileStatus == 2 ? formData.append("photo_3_del", 'Y') : '';

            fileStatus = this.$fileUploadChecker(this.photo_1_en_preview_local, this.photo_1_en_preview_data);
            fileStatus == 1 ? formData.append("photo_1", this.file1_en) : fileStatus == 2 ? formData.append("photo_1_en_del", 'Y') : '';
            fileStatus = this.$fileUploadChecker(this.photo_2_en_preview_local, this.photo_2_en_preview_data);
            fileStatus == 1 ? formData.append("photo_2", this.file2_en) : fileStatus == 2 ? formData.append("photo_2_en_del", 'Y') : '';
            fileStatus = this.$fileUploadChecker(this.photo_3_en_preview_local, this.photo_3_en_preview_data);
            fileStatus == 1 ? formData.append("photo_3", this.file3_en) : fileStatus == 2 ? formData.append("photo_3_en_del", 'Y') : '';

            fileStatus = this.$fileUploadChecker(this.logo_file_preview_local, this.logo_file_preview_data);
            fileStatus == 1 ? formData.append("logo", this.logo_file) : fileStatus == 2 ? formData.append("logo_del", 'Y') : '';
            fileStatus = this.$fileUploadChecker(this.logo_file_en_preview_local, this.logo_file_en_preview_data);
            fileStatus == 1 ? formData.append("logo_en", this.logo_file_en) : fileStatus == 2 ? formData.append("logo_en_del", 'Y') : '';
            console.log(this.contents1_arr);
            console.log(this.contents1_arr);
            console.log(this.contents1_arr);
            formData.append("contents", JSON.stringify(this.contents1_arr)); // 카테고리1 컨텐츠
            formData.append("contents_en", JSON.stringify(this.contents1_en_arr)); // 카테고리1 컨텐츠

            formData.append("is_visible_photo_1", this.is_visible_photo_1 ? 1 : 0);
            formData.append("is_visible_photo_2", this.is_visible_photo_2 ? 1 : 0);
            formData.append("is_visible_photo_3", this.is_visible_photo_3 ? 1 : 0);
            formData.append("is_visible_photo_1_en", this.is_visible_photo_1_en ? 1 : 0);
            formData.append("is_visible_photo_2_en", this.is_visible_photo_2_en ? 1 : 0);
            formData.append("is_visible_photo_3_en", this.is_visible_photo_3_en ? 1 : 0);

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            this.$showMsgBoxTwo(rs.status);
            this.getList();
        },
        insertContent23: async function () {
            console.log(this.content3, this.photoParams);
            let url = `${this.api_url}/overviewcontents`;

            if (this.photoParams.id) {
                console.log(this.photoParams.id);
                url = `${this.api_url}/overviewcontents/${this.photoParams.id}`;
            }
            var formData = new FormData();
            formData.append("overview_id", this.photoParams.overview_id);
            formData.append("overview_type", this.photoParams.overview_type);
            formData.append("order", this.photoParams.order);
            formData.append("name", this.photoParams.name);
            formData.append("link", this.photoParams.link);
            formData.append("link_en", this.photoParams.link_en);
            formData.append("desc", this.photoParams.desc);
            formData.append("desc_en", this.photoParams.desc_en);
            
            let fileStatus = 0;
            fileStatus = this.$fileUploadChecker(this.modal1_photo_1_local, this.modal1_photo_1_data);
            fileStatus == 1 ? formData.append("photo_1", this.photoParams.photo_1) : fileStatus == 2 ? formData.append("photo_1_del", 'Y') : '';
            fileStatus = this.$fileUploadChecker(this.modal1_photo_1_en_local, this.modal1_photo_1_en_data);
            fileStatus == 1 ? formData.append("photo_1_en", this.photoParams.photo_1_en) : fileStatus == 2 ? formData.append("photo_1_del", 'Y') : '';

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            this.getList();
            this.$showMsgBoxTwo(rs.status);
            this.modal1 = false;
        },
        updateContent23: async function (
            item,
            index,
            target,
            isContent3,
            title,
            imageSize
        ) {
            this.photoParams = {
                ...this.photoParams_reset,
            };

            this.content3 = isContent3;
            if (isContent3) {
                this.photoParams.overview_type = 1;
            } else {
                this.photoParams.overview_type = 0;
            }

            this.modal1_photo_1_data = item.photo_1;
            this.modal1_photo_1_local = item.photo_1;

            this.modal1_photo_1_en_data = item.photo_1_en;
            this.modal1_photo_1_en_local = item.photo_1_en;

            this.photoParams = {
                ...item,
            };
            this.photoParams.photo_1 = null; // 파일이 아니라 문자열 경로라서.
            this.photoParams.photo_1_en = null;

            this.content_modal_title = title;
            (this.photoPreview_default = this.$store.getters.dummy_image_url([imageSize])),
            (this.modal1 = true);
        },
        deleteContent23: async function (item, index, target) {
            if (confirm("삭제하시겠습니까?")) {
                let url = `${this.api_url}/overviewcontents/${item.id}`;
                let rs = await axios.delete(url, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                this.$showMsgBoxTwo(rs.status);
                this.getList();
            }
        },
        content1Add: function (type) {
            type
                ?
                this.contents1_en_arr.push({
                    key: "",
                    value: "",
                }) :
                this.contents1_arr.push({
                    key: "",
                    value: "",
                });
        },
        content1Delete: function (index, type) {
            type
                ?
                this.contents1_en_arr.splice(index, 1) :
                this.contents1_arr.splice(index, 1);
        },
        newModalAction(isContent3, title, imageSize) {
            this.content3 = isContent3;
            this.photoParams = {
                ...this.photoParams_reset,
            };

            if (isContent3) {
                this.photoParams.overview_type = 1;
            } else {
                this.photoParams.overview_type = 0;
            }
            this.content_modal_title = title;
            this.modal1_photo_1_local = null;
            this.modal1_photo_1_en_local = null;
            (this.photo_preview_default = this.$store.getters.dummy_image_url([imageSize])),
            (this.modal1 = !this.modal1);
        }
    }
};
</script>
