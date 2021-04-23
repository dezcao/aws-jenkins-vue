<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 컨텐츠 (관리) > {{$route.query.id ? company.name + ' 수정' : '리스트 추가'}}</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <hr>
    <b-row>
        <b-col>
            <b-form>
                <b-form-group label="대분류 :">
                    <b-form-select v-model="category.selected_top" :options="category.topcategory" size="sm" @change="getSubcategory"></b-form-select>
                </b-form-group>
            </b-form>
        </b-col>
        <b-col>
            <b-form>
                <b-form-group label="소분류 :">
                    <b-form-select v-model="category.selected_sub" :options="category.subcategory" size="sm"></b-form-select>
                </b-form-group>
            </b-form>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-form>
                <b-form-group label="기업 선택 :">
                    <b-form-select v-model="company_index" :options="company_list" size="sm" @change="company = company_list[company_index]"></b-form-select>
                </b-form-group>
            </b-form>
        </b-col>
        <b-col>
            <b-form>
                <b-form-group label="기업노출/미노출 :">
                    <b-form-checkbox v-model="is_top" name="check-button" switch></b-form-checkbox>
                </b-form-group>
            </b-form>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="국문" active>
                        <b-row class="mb-3">
                            <b-col>
                                <b-card>
                                    <b-row>
                                        <b-col>
                                            <b-row>
                                                <b-col class="text-center">
                                                    <b-card>
                                                        <b-card-text align="center" class="ino-400-320-wrap">
                                                            <div>
                                                                <b-img :src="logo_preview_local||logo_preview_default" fluid></b-img>
                                                            </div>
                                                        </b-card-text>
                                                    </b-card>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="3">
                                                    <label style="padding-top:6px;" for="inline-form-custom-select-pref">
                                                <h6>업체 로고 #1</h6>
                                            </label>
                                                </b-col>
                                                <b-col>
                                                    <b-form inline class="mt-1">
                                                        <label class="mr-sm-2">:</label>
                                                        <b-form-file v-model="logo_file" @change="onFileChange($event, 'logo_preview_local')" size="sm" class="mr-1"
                                                                    style="width:250px;">
                                                        </b-form-file>
                                                        <b-button @click="logo_file = null; logo_preview_local = null; logo_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                                    </b-form>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-3">
                                        <b-col cols="3">
                                            <label style="padding-top:6px;" for="inline-form-custom-select-pref">
                                                <h6>카탈로그#1</h6>
                                            </label>
                                        </b-col>
                                        <b-col>
                                            <b-form inline>
                                                <label class="mr-sm-2">:</label>
                                                <b-form-file v-model="file" :placeholder="file_src" size="sm" style="width:250px;" class="mr-1"></b-form-file>
                                                <b-button @click="file = null; file_src='No file';" size="sm" variant="danger">파일 삭제</b-button>
                                            </b-form>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-3">
                                        <b-col cols="3" class="">
                                            <label style="padding-top:6px;" for="inline-form-custom-select-pref">
                                                <h6>방문자</h6>
                                            </label>
                                        </b-col>
                                        <b-col>
                                            <b-form inline>
                                                <label class="mr-sm-2">:</label>
                                                <b-form-radio-group size="sm" v-model="is_show_visitor" :options="is_show_visitor_options" buttons button-variant="outline-primary"></b-form-radio-group>
                                            </b-form>
                                        </b-col>
                                    </b-row>
                                </b-card>
                                
                            </b-col>
                            <b-col>
                                <b-card>
                                    <b-row>
                                        <b-col>
                                            <h6>기업개요</h6>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <b-table-simple small bordered head-variant="light">
                                                <b-tbody>
                                                    <b-tr variant="secondary">
                                                        <b-th style="width: 150px;">업체명</b-th>
                                                        <b-td>
                                                            {{company.name}}
                                                        </b-td>
                                                    </b-tr>
                                                    <b-tr>
                                                        <b-th>대표자</b-th>
                                                        <b-td>{{company.representation_name}}</b-td>
                                                    </b-tr>
                                                    <b-tr variant="secondary">
                                                        <b-th>소재지</b-th>
                                                        <b-td>{{company.address}}</b-td>
                                                    </b-tr>
                                                    <b-tr>
                                                        <b-th>연락처</b-th>
                                                        <b-td>{{company.representation_phone}}</b-td>
                                                    </b-tr>
                                                    <b-tr variant="secondary">
                                                        <b-th>이메일</b-th>
                                                        <b-td>{{company.email}}</b-td>
                                                    </b-tr>
                                                    <b-tr>
                                                        <b-th>홈페이지</b-th>
                                                        <b-td>{{company.homepage}}</b-td>
                                                    </b-tr>
                                                    <b-tr variant="secondary">
                                                        <b-th>직원수</b-th>
                                                        <b-td>{{company.employees_count}}</b-td>
                                                    </b-tr>
                                                    <b-tr>
                                                        <b-th>국가</b-th>
                                                        <b-td>{{company.country}}</b-td>
                                                    </b-tr>
                                                    <b-tr variant="secondary">
                                                        <b-th>업태</b-th>
                                                        <b-td>{{company.condition}}</b-td>
                                                    </b-tr>
                                                    <b-tr>
                                                        <b-th>업종</b-th>
                                                        <b-td>{{company.sectors}}</b-td>
                                                    </b-tr>
                                                    <b-tr variant="secondary">
                                                        <b-th>개요</b-th>
                                                        <b-td>{{company.introduce}}</b-td>
                                                    </b-tr>
                                                </b-tbody>
                                            </b-table-simple>
                                        </b-col>
                                    </b-row>
                                </b-card>
                                
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col>
                                <h6>기업 요약 (한글환산 : {{summary_bytes}} / 45 자) </h6>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-textarea v-model="summary" rows="3" max-rows="6"></b-form-textarea>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col>
                                <h6>기업 소개글 ( HTML Tag 포함 : {{desc_byte}} / 1,000 byte)</h6>
                                <quill-editor ref="quillEditor1" class="editor" :options="editorOption" v-model="desc" @change="showStrByteLength($event, 'ko')" />
                                <br>
                                <div class="content ql-editor" v-html="desc"></div>
                            </b-col>
                        </b-row>
                    </b-tab>

                    <b-tab title="영문">

                    </b-tab>
                </b-tabs>
            </b-card>

        </b-col>
    </b-row>
    
    <b-row class="mt-3">
        <b-col>
            <b-card>
                <span>기업소개자료 </span>
                <b-button href="#" variant="primary" size="sm" @click="introductionNewFn">
                    <b-icon-plus></b-icon-plus>추가
                </b-button>
                <b-table class="mt-1" :fields="introduction_fields" :items="introduction" small responsive="sm" bordered head-variant="light" sticky-header>
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
                    <template #cell(library_type)="row">
                        <div class="text-center">
                            {{row.item.library_type == 0 ? 'photo' : row.item.library_type == 1 ? 'youtube' : 'video' }}
                        </div>
                    </template>
                    <template #cell(manageBtn)="row">
                        <div class="text-center">
                            <b-button size="sm" variant="outline-success" @click="introductionUpdateFn(row.item, $event, row.index)">
                                <b-icon-pencil-square></b-icon-pencil-square>수정
                            </b-button>
                            <b-button size="sm" variant="outline-danger" @click="introductionDeleteFn(row.item, $event, row.index)">
                                <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                            </b-button>
                        </div>
                    </template>
                </b-table>

                <b-modal v-model="introduction_modal" hide-footer title="기업소개자료" size="xl">
                    <b-row>
                        <b-col>
                            <b-form-group label="순서" label-for="input-sm1" label-cols="4" label-cols-lg="2" label-size="sm">
                                <b-form-input id="input-sm1" v-model="selected_item.order" size="sm" type="number"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="타입" label-cols="4" label-cols-lg="2" label-size="sm">
                                <b-form-select v-model="selected_item.library_type" :options="library_type_options" size="sm"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="노출" label-cols="4" label-cols-lg="2" label-size="sm">
                                <b-form-select v-model="selected_item.lang_type" :options="lang_type_options" size="sm"></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col class="pr-0">
                            <b-form inline>
                                <b-form-group label="타이틀" label-size="sm" class="mr-3">
                                </b-form-group>
                                <b-form-input id="input-sm2" v-model="selected_item.title" size="sm" style="width: 1049px;"></b-form-input>
                            </b-form>
                        </b-col>
                    </b-row>
                    <b-row v-show="selected_item.library_type == 0">
                        <b-col>
                            <div>
                                <b-row>
                                    <b-col class="p-1 ml-2">
                                        <b-card no-body style="padding:0 max-width:182px;">
<!-- 
                                            <div class="text-center">
                                                <b-img :src="photo_1_prev||selected_item.photo_1.url||photo_prev_default" fluid
                                                    style="max-width:180px; height:180px; border: 1px solid silver"
                                                ></b-img>
                                            </div>
                                             -->
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_1_prev||selected_item.photo_1.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_1.file" @change="imagePrev($event, 'photo_1')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_1 = {file: null, url: null, del: true, message: null}; photo_1_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_1.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_2_prev||selected_item.photo_2.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_2.file" @change="imagePrev($event, 'photo_2')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_2 = {file: null, url: null, del: true, message: null}; photo_2_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_2.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_3_prev||selected_item.photo_3.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_3.file" @change="imagePrev($event, 'photo_3')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_3 = {file: null, url: null, del: true, message: null}; photo_3_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_3.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_4_prev||selected_item.photo_4.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_4.file" @change="imagePrev($event, 'photo_4')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_4 = {file: null, url: null, del: true, message: null}; photo_4_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_4.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_5_prev||selected_item.photo_5.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_5.file" @change="imagePrev($event, 'photo_5')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_5 = {file: null, url: null, del: true, message: null}; photo_5_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_5.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col class="p-1 ml-2">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_6_prev||selected_item.photo_6.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_6.file" @change="imagePrev($event, 'photo_6')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_6 = {file: null, url: null, del: true, message: null}; photo_6_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_6.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_7_prev||selected_item.photo_7.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_7.file" @change="imagePrev($event, 'photo_7')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_7 = {file: null, url: null, del: true, message: null}; photo_7_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_7.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_8_prev||selected_item.photo_8.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_8.file" @change="imagePrev($event, 'photo_8')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_8 = {file: null, url: null, del: true, message: null}; photo_8_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_8.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_9_prev||selected_item.photo_9.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_9.file" @change="imagePrev($event, 'photo_9')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_9 = {file: null, url: null, del: true, message: null}; photo_9_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_9.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                    <b-col class="p-1">
                                        <b-card no-body style="padding:0 max-width:182px;" >
                                            <b-card-text class="ino-180-180-wrap">
                                                <div>
                                                    <b-img :src="photo_10_prev||selected_item.photo_10.url||photo_prev_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                            <b-form inline class="p-1">
                                                <b-form-file v-model="selected_item.photo_10.file" @change="imagePrev($event, 'photo_10')" size="sm" style="max-width:80%;">
                                                </b-form-file>
                                                <b-button @click="selected_item.photo_10 = {file: null, url: null, del: true, message: null}; photo_10_prev=null;" size="sm" variant="danger">
                                                    <b-icon-trash></b-icon-trash>
                                                </b-button>
                                            </b-form>
                                            <b-form-textarea v-model="selected_item.photo_10.message" rows="3" max-rows="6">
                                            </b-form-textarea>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>

                    <b-row v-show="selected_item.library_type == 1">
                        <!-- Youtube : 썸네일파일이 image_prev -->
                        <b-col>
                            <span style="font-size:10pt;">youtube 썸네일 이미지</span>
                            <b-card align="center">
                                <b-card-text class="ino-180-180-wrap">
                                    <div>
                                        <b-img :src="thumb_prev||thumb_prev_default" fluid></b-img>
                                    </div>
                                </b-card-text>
                                <b-form inline class="mt-1">
                                    <b-form-file v-model="selected_item.image_prev" ref="file-input" @change="onFileChange($event, 'thumb_prev')" size="sm" style="width:300px;" class="mr-1">
                                    </b-form-file>
                                    <b-button @click="selected_item.image_prev = null; thumb_prev = null; selected_item.thumb_prev_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                </b-form>
                            </b-card>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col sm="4"><label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">영상 링크(Youtube)</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="selected_item.link"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="4"><label style="font-size: 10pt;">링크 메시지</label></b-col>
                                <b-col sm="8">
                                    <b-form-textarea v-model="selected_item.link_message" rows="3" max-rows="6"></b-form-textarea>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row v-show="selected_item.library_type == 2">
                        <!-- video -->
                        <b-col>
                            <span style="font-size:10pt;">썸네일 이미지</span>
                            <b-card align="center">
                                <!-- <b-img :src="thumb_prev||thumb_prev_default" fluid alt="Responsive image" style="max-width:250px;"></b-img> -->
                                <b-card-text class="ino-180-180-wrap">
                                    <div>
                                        <b-img :src="thumb_prev||thumb_prev_default" fluid></b-img>
                                    </div>
                                </b-card-text>
                                <b-form inline class="mt-1">
                                    <b-form-file v-model="selected_item.image_prev" ref="file-input" @change="onFileChange($event, 'thumb_prev')" size="sm" style="width:300px;" class="mr-1">
                                    </b-form-file>
                                    <b-button @click="selected_item.image_prev = null; thumb_prev = null; selected_item.thumb_prev_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                </b-form>
                            </b-card>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col sm="4"><label style="font-size: 10pt;">영상 파일</label></b-col>
                                <b-col sm="8">
                                    <b-form-file v-model="selected_item.file" size="sm" :placeholder="movie_file_src" style="width: 260px;" class="mr-1">
                                    </b-form-file>
                                    <b-button @click="selected_item.file = null; selected_item.movie_file_del = true; movie_file_src='';" size="sm" variant="danger">영상 삭제</b-button>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="4"><label style="font-size: 10pt;">링크 메시지</label></b-col>
                                <b-col sm="8">
                                    <b-form-textarea v-model="selected_item.link_message" rows="3" max-rows="6"></b-form-textarea>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>

                    <b-row class="mt-3">
                        <b-col>
                            <b-button size="sm" variant="outline-primary" @click="addItemFn" v-show="isNew">완료</b-button>
                            <b-button size="sm" variant="outline-success" @click="updateItemFn" v-show="!isNew">수정</b-button>
                            <b-button size="sm" variant="outline-danger" @click="introduction_modal = false;">취소</b-button>
                        </b-col>
                    </b-row>
                </b-modal>
            </b-card>
        </b-col>
    </b-row>

    <b-row class="mt-3">
        <b-col>
            <b-button href="#" variant="primary" size="sm" @click="storeData">저장하기</b-button>
            <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    

</section>
</template>

<script>
export default {
    name: 'exhibition_form',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,

            // category
            category: {
                topcategory: [],
                top_id_key_store: {}, // for the menu search
                selected_top: '',
                subcategory: [],
                sub_id_key_store: {},
                selected_sub: ''
            },

            // 기업 추천
            is_top: true, // 0 : 비활성, 1: 활성

            // 탭별구분
            logo_preview_default: this.$store.getters.dummy_image_url(['400x320']),

            logo_file: null, // 기업로고 (한글) - 업로드할 파일 저장할 변수
            logo_preview_local: null, // 기업로고 (한글) - 사용자PC 프리뷰
            logo_preview_data: null, // 기업로고 (한글) - DB저장된 image url
            logo_del: false,

            logo_en_file: null, // 기업로고 (영문) - 업로드할 파일 저장할 변수
            logo_en_preview_local: null,
            logo_en_preview_data: null,
            logo_en_del: false,

            file: null, // 카탈로그
            file_src: 'No file', // 카탈로그 소스 경로
            file_en: null,
            file_en_src: 'No file',

            is_show_visitor: 0,
            is_show_visitor_options: [{
                    text: '노출',
                    value: 1
                },
                {
                    text: '미노출',
                    value: 0
                }
            ],

            is_show_visitor_en: 0,
            is_show_visitor_en_options: [{
                    text: '노출',
                    value: 1
                },
                {
                    text: '미노출',
                    value: 0
                }
            ],

            company_index: 0,
            company_list: [],
            // 기업개요
            company: {},

            // 기업소개자료
            introduction_fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: 'library_type',
                    label: '라이브러리 타입'
                },
                {
                    key: 'title',
                    label: '타이틀'
                },
                {
                    key: 'link',
                    label: '링크'
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                }
            ],

            selected: {
                order: 0,
                library_type: 0,
                lang_type: 2
            },
            library_type: 0, //  0 - photo, 1 - youtube link, 2 - file
            library_type_options: [{
                    value: 0,
                    text: '이미지'
                },
                {
                    value: 1,
                    text: 'YouTube'
                },
                {
                    value: 2,
                    text: 'Video'
                }
            ],
            lang_type_options: [{
                    value: 0,
                    text: '국문'
                },
                {
                    value: 1,
                    text: '영문'
                },
                {
                    value: 2,
                    text: '국문 및 영문'
                }
            ],

            introduction: [],

            // 퀼 에디터 옵션
            desc: ' ',
            desc_en: ' ',
            summary: '',
            summary_en: '',
            desc_byte: 0,
            desc_en_byte: 0,
            editorOption: {
                theme: "snow",
            },

            // 모달...
            isNew: true,
            selected_index: 0,
            selected_item: {
                "id": 1,
                "lang_type": 0, // 0- 국문, 1 - 영문
                "exhibition_id": 1,
                "type": 0,
                "library_type": 0, // library_type : 0 - photo, 1 - youtube link, 2 - file
                "title": "기업소개 포토",
                "order": 0,
                "link": "",
                "image_prev": "",
                "photo_1": {
                    url: this.$store.getters.dummy_image_url(['180x180']),
                    message: "",
                    file: null,
                    del: false
                },
                "photo_2": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_3": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_4": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_5": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_6": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_7": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_8": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_9": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "photo_10": {
                    url: "",
                    message: "",
                    file: null,
                    del: false
                },
                "file": null
            },
            photo_1_prev: '',
            photo_2_prev: '',
            photo_3_prev: '',
            photo_4_prev: '',
            photo_5_prev: '',
            photo_6_prev: '',
            photo_7_prev: '',
            photo_8_prev: '',
            photo_9_prev: '',
            photo_10_prev: '',
            photo_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            thumb_prev: '',
            movie_file_src: '',
            thumb_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            e_library_delete_ids: [],
            introduction_modal: false
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.menu_id = this.$route.query.menu_id;
            this.api_url = this.$store.getters.api_url;
            await this.getTopCategory();
            await this.getData();
            await this.getCompany();
            // this.desc_byte = this.strByteLength(this.company.introduce);
            // this.desc_en_byte = this.strByteLength(this.company.introduce);
        })
    },
    computed: {
        summary_bytes: function () {
                let str = Math.ceil(this.strByteLength(this.summary)/3);
            return str;
        }
    },

    methods: {
        getTopCategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류
            let url = `${this.api_url}/menucategory/topcategory?menu_id=${this.menu_id}`;

            let response = await axios.get(url);
            let temArr = response.data.result;
            let top = {};
            temArr.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.category.top_id_key_store = top;
            this.category.topcategory = temArr;
            this.getSubcategory();
        },
        getSubcategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류의 소분류
            this.category.selected_sub = '';
            let url = `${this.api_url}/menucategory/subcategory?menu_id=${this.menu_id}&category_id=${this.category.selected_top}`;
            let response = await axios.get(url);
            let temArr = response.data.result;
            let sub = {};
            temArr.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                sub[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.category.sub_id_key_store = sub;
            this.category.subcategory = temArr;
        },
        getData: async function () {
            // 신규 폼이면 바로 나간다.
            if (!this.$route.query.id) return;

            // 수정 폼이면 값을 바인딩한다.
            let url = `${this.api_url}/exhibition/${this.$route.query.id}?type=0`;
            // let url = `${this.api_url}/exhibition/1?type=0`;
            let response = await axios.get(url);
            let rs = response.data.result;
            console.log('exhibition form data ', rs);

            this.is_top = rs.is_top == 0 ? false : true; // 기업추천 0 비활성
            this.logo_preview_data = rs.logo;
            this.logo_preview_data_en = rs.logo_en;
            this.logo_preview_local = rs.logo;
            this.logo_preview_local_en = rs.logo_en;

            this.company = rs.company; // 기업개요

            if (rs.file) {
                this.file_src = rs.file.replace('/data/uploaded/', '');
            }
            if (rs.file_en) {
                this.file_en_src = rs.file_en.replace('/data/uploaded/', '');
            }
            // this.file = rs.file ? rs.file : null; // 카탈로그 파일
            // this.file_en = rs.file_en ? rs.file_en : null; // 카탈로그 파일

            this.is_show_visitor = rs.is_show_visitor; // 방문자 노출
            console.log('정보 ', rs);

            this.introduction = rs.introduction; // 기업소개 자료
            this.introduction_en = rs.introduction_en;

            this.desc = rs.desc; // 기업소개글
            this.desc_en = rs.desc_en;

            this.summary = rs.summary;
            this.summary_en = rs.summary_en;

            // 탑 셀렉트
            this.category.selected_top = rs.top_category_id
            // 서브검색
            this.getSubcategory();
            this.category.selected_sub = rs.sub_category_id;

        },
        getCompany: async function () {

            if (!this.$route.query.id) {
                let url = `${this.$store.getters.api_url}/company/list?menu_id=${this.menu_id}`;
                // ${this.api_url}/company/list?menu_id=11
                let res = await axios.get(url);
                this.company_list = res.data.result;
            } else {
                // 수정 폼이면 수정할 수 없다.
                this.company_list = [this.company];
            }

            // let tempArr = res.data.result;
            // let top = {};
            this.company_list.forEach((element, index) => {
                element.text = element.name;
                element.value = index;
                // top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });
            console.log('못나가 컴퍼니 ', this.company_list);
            // this.company_index = 0;
            this.company = this.company_list[0];

        },
        storeData: async function () {
            let url = `${this.$store.getters.api_url}/exhibition`;
            if (this.$route.query.id) {
                url = `${this.$store.getters.api_url}/exhibition/${this.$route.query.id}`;
            }
            
            let param = {
                menu_id: this.menu_id,
                category_id: this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top,
                company_id: this.company.id,
                desc: this.desc,
                desc_en: this.desc_en,
                is_top: this.is_top ? 1 : 0,
                is_show_visitor: this.is_show_visitor,
                summary: this.summary,
                summary_en: this.summary_en
            }

            let formData = new FormData();
            Object.entries(param).forEach((element, index) => {
                element[1] + '' ? formData.append(element[0], element[1]) : '';
            });

            if (!this.file && this.file_src == 'No file') {
                formData.append('file_del', 'Y');
            }
            if (this.file) {
                formData.append('file', this.file);
            }
            if (!this.file_en && this.file_en_src == 'No file') {
                formData.append('file_en_del', 'Y');
            }
            if (this.file_en) {
                formData.append('file_en', this.file_en);
            }

            !this.logo_file && this.logo_del ? formData.append('logo_del', 'Y') : formData.append('logo', this.logo_file);
            !this.logo_en_file && this.logo_en_del ? formData.append('logo_en_del', 'Y') : formData.append('logo_en', this.logo_en_file);

            // // 상단 데이터 저장
            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(rs);

            //---------------------------------------------------------------------------------///
            //---------------------------------------------------------------------------------///
            //---------------------------------------------------------------------------------///


            // 기업소개자료 입력
            let intro_store_url = `${this.api_url}/e_library`;
            if (!this.$route.query.id) { // query.id = exhibition_id
                let exhibition_id = rs.data.result.id;
                for (let item of this.introduction) {
                    await this.postIntroduction(item, intro_store_url, exhibition_id);
                }
            }
            // 기업소개자료 수정하는 경우
            if (this.$route.query.id) {
                for (let item of this.introduction) {
                    if (item.id) { // 소개자료 수정한 경우
                        await this.postIntroduction(item, `${this.api_url}/e_library/${item.id}`);
                    } else { // 소개자료가 더 추가된 경우
                        await this.postIntroduction(item, intro_store_url, this.$route.query.id);
                    }
                }
                for (let id of this.e_library_delete_ids) {
                    // 소개자료가 지워진 경우
                    let delete_url = `${this.api_url}/e_library/${id}`;
                    await axios.delete(delete_url);
                }
            }
            //---------------------------------------------------------------------------------///
            //---------------------------------------------------------------------------------///
            //---------------------------------------------------------------------------------///
            function callback () {
                this.$router.go(-1);
            }
            this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
            

        },
        postIntroduction: async function (item, url, exhibition_id) {
            let formData2 = new FormData();
            if (exhibition_id) {
                formData2.append('exhibition_id', exhibition_id);
            }
            formData2.append('type', 0); // 기업소개자료
            formData2.append('library_type', item.library_type);
            formData2.append('lang_type', item.lang_type);
            formData2.append('title', item.title);
            formData2.append('order', item.order);

            switch (item.library_type) {
                case 0:
                    // photo_1~10
                    console.log('photo_2 del ? ', item.pohto_2);
                    // photo_1_del~10_del ....   photo_1_del 조작이 필요하다.
                    !item.photo_1.file && item.photo_1.del ? formData2.append('photo_1_del', 'Y') : formData2.append('photo_1', item.photo_1.file);
                    !item.photo_2.file && item.photo_2.del ? formData2.append('photo_2_del', 'Y') : formData2.append('photo_2', item.photo_2.file);
                    !item.photo_3.file && item.photo_3.del ? formData2.append('photo_3_del', 'Y') : formData2.append('photo_3', item.photo_3.file);
                    !item.photo_4.file && item.photo_4.del ? formData2.append('photo_4_del', 'Y') : formData2.append('photo_4', item.photo_4.file);
                    !item.photo_5.file && item.photo_5.del ? formData2.append('photo_5_del', 'Y') : formData2.append('photo_5', item.photo_5.file);
                    !item.photo_6.file && item.photo_6.del ? formData2.append('photo_6_del', 'Y') : formData2.append('photo_6', item.photo_6.file);
                    !item.photo_7.file && item.photo_7.del ? formData2.append('photo_7_del', 'Y') : formData2.append('photo_7', item.photo_7.file);
                    !item.photo_8.file && item.photo_8.del ? formData2.append('photo_8_del', 'Y') : formData2.append('photo_8', item.photo_8.file);
                    !item.photo_9.file && item.photo_9.del ? formData2.append('photo_9_del', 'Y') : formData2.append('photo_9', item.photo_9.file);
                    !item.photo_10.file && item.photo_10.del ? formData2.append('photo_10_del', 'Y') : formData2.append('photo_10', item.photo_10.file);

                    formData2.append('photo_1_message', item.photo_1.message);
                    formData2.append('photo_2_message', item.photo_2.message);
                    formData2.append('photo_3_message', item.photo_3.message);
                    formData2.append('photo_4_message', item.photo_4.message);
                    formData2.append('photo_5_message', item.photo_5.message);
                    formData2.append('photo_6_message', item.photo_6.message);
                    formData2.append('photo_7_message', item.photo_7.message);
                    formData2.append('photo_8_message', item.photo_8.message);
                    formData2.append('photo_9_message', item.photo_9.message);
                    formData2.append('photo_10_message', item.photo_10.message);
                    break;
                case 1:
                    // youtube link
                    // link_del ? 
                    // ***** image_prev_del 안되고 있다... ****
                    // ***** image_prev_del 안되고 있다... ****
                    // ***** image_prev_del 안되고 있다... ****
                    console.log(item.image_prev);
                    !item.thumb_prev && item.thumb_prev_del ? formData2.append('image_prev_del', 'Y') : formData2.append('image_prev', item.image_prev); // 유튜브 썸네일 프리뷰 파일
                    formData2.append('link', item.link);
                    formData2.append('link_message', item.link_message);
                    break;
                default:
                    // 2 영상파일
                    // file_del ?
                    // formData2.append('file', item.file);
                    !item.thumb_prev && item.thumb_prev_del ? formData2.append('image_prev_del', 'Y') : formData2.append('image_prev', item.image_prev); // 영상 썸네일 프리뷰 파일
                    console.log(url, 'file ? ', item.file);

                    !item.file && item.movie_file_del ? console.log('파일 지운다') : console.log('파일 저장한다'); // 영상 파일
                    !item.file && item.movie_file_del ? formData2.append('file_del', 'Y') : formData2.append('file', item.file); // 영상 파일
                    formData2.append('link_message', item.link_message); // 영상 메시지
                    // file -- 영상파일인 경우 library_type = 2
                    break;
            }

            let rs = await axios.post(url, formData2, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return rs;
        },
        introductionNewFn: function (item, event, index) {
            // 기업소개자료 신규 추가
            this.selected_item = {
                order: 0,
                library_type: 0,
                lang_type: 2
            };
            for (var i = 1; i < 11; i++) {
                this.selected_item[`photo_${i}`] = {
                    url: this.$store.getters.dummy_image_url(['180x180']),
                    message: "",
                    file: null,
                    del: false
                };
            }
            // this.$store.commit('selected_item', this.selected_item); // 기본폼 구성하여 선택 아이템으로 중앙 저장소에 저장

            this.isNew = true; // 모달에서 완료버튼이 보이도록 만든다. 
            this.photo_1_prev = null;
            this.photo_2_prev = null;
            this.photo_3_prev = null;
            this.photo_4_prev = null;
            this.photo_5_prev = null;
            this.photo_6_prev = null;
            this.photo_7_prev = null;
            this.photo_8_prev = null;
            this.photo_9_prev = null;
            this.photo_10_prev = null;

            this.thumb_prev = null; // 저장값 받아둘곳
            this.selected_item.thumb_prev_del = false; // 썸네일 이미지 지울까요
            this.selected_item.movie_file_del = false; // 첨부 영상 파일 지울까요
            this.movie_file_src = '';
            // console.log(this.selected_item);
            this.introduction_modal = true; // 모달을 연다.
        },
        addItemFn: function () {
            // ---> 모달에서 신규생성 기업소개자료에 대해 완료버튼을 누른다.
            this.introduction.push({
                ...this.selected_item
            }); // 기업소개 목록에 추가하고
            this.introduction_modal = false; // 모달 닫는다.
        },
        introductionUpdateFn: async function (item, event, index) {
            // 기업소개자료 수정하기 세팅
            this.isNew = false; // 이제 모달에서 수정 버튼으로 보이도록 값을 바꾼다.
            this.selected_index = index; // 선택한 인덱스 저장해둔다. 바꿀자리 찾기 위해서...
            this.selected_item = {...item};

            this.thumb_prev = item.image_prev; // youtube, movie 썸네일 같이쓴다
            this.selected_item.image_prev = null;
            this.selected_item.file = null;
            this.movie_file_src = item.file;

            this.selected_item.thumb_prev_del = false; // 썸네일 이미지 지울까요
            this.selected_item.movie_file_del = false; // 첨부 영상 파일 지울까요


            console.log(item.image_prev);

            this.photo_1_prev = item.photo_1.url;
            this.photo_2_prev = item.photo_2.url;
            this.photo_3_prev = item.photo_3.url;
            this.photo_4_prev = item.photo_4.url;
            this.photo_5_prev = item.photo_5.url;
            this.photo_6_prev = item.photo_6.url;
            this.photo_7_prev = item.photo_7.url;
            this.photo_8_prev = item.photo_8.url;
            this.photo_9_prev = item.photo_9.url;
            this.photo_10_prev = item.photo_10.url;
            
            // this.$store.commit('selected_item', this.selected_item); // 수정할 아이템을 스토어에 등록해둔다.
            this.introduction_modal = true; // 모달을 연다.
        },
        updateItemFn: function () {
            // 기업소개자료 모달의 수정버튼을 누른다.
            this.introduction[this.selected_index] = {
                ...this.selected_item
            }; // 목록에서 수정된 아이템을 바꿔준다.
            this.introduction_modal = false; // 모달을 닫는다.
        },

        introductionDeleteFn: async function (item, event, index) {
            this.introduction.splice(index, 1);
            if (item.id) {
                this.e_library_delete_ids.push(item.id);
            }
        },

        strByteLength: function (s, b, i, c) {
            // console.log(this.strByteLength("a한글b") + " Bytes");
            if (!s) return 0;
            for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
            return b
        },

        imagePrev: function (e, key) {

            const file = e.target.files[0];
            let file_url = URL.createObjectURL(file);
            this.selected_item[key].url = file_url;
            this[key + "_prev"] = file_url;
            // item.photo_1.url = file_url;
            // this.photo_1_prev = file_url; // 개별컴포넌트에 변경되는 url 받아줄 변수가 있어야함.
            console.log('imagePrev')

        },
        content1Delete: function (item, index) {
            this.contents1_arr.splice(index, 1);
        },
        showStrByteLength(quill, type) {
            // console.log(quill, type);
            type == 'ko' ? this.desc_byte = this.strByteLength(quill.html) : this.desc_en_byte = this.strByteLength(quill.html);
        },
        cutSummary() {
            // console.log(quill, type);
            let bytes = this.strByteLength(this.summary);
            console.log(bytes, ' summay bytes');
        },
        onEditorReady(quill, type) {

            console.log(quill.getContents(), type);
            // type == 'ko' ? this.desc_byte = this.strByteLength(quill.html) : this.desc_en_byte = this.strByteLength(quill.html);
        },
    }
}
</script>
