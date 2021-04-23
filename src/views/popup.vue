<template>
<section>
    <b-row>
        <b-col>
            <b-button variant="primary" size="sm" @click="openModal">
                <b-icon-plus></b-icon-plus>팝업 추가
            </b-button>
        </b-col>
    </b-row>

    <b-row class="mt-1">
        <b-col>
            <b-table small :fields="fields" :items="items" bordered head-variant="light">
                <!-- A virtual column -->
                <template #cell(id)="data">
                    <div class="text-center">
                        {{data.item.id}}
                    </div>
                </template>
                <template #cell(is_visible)="data">
                    <div class="text-center">
                        {{data.item.is_visible ? 'ON' : 'OFF'}}
                    </div>
                </template>

                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="openModal($event.target, row.item)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteData($event.target, row.item)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

    <!-- 팝업 -->

    <b-modal v-model="modal1" hide-footer title="팝업 추가">
        <b-card :border-variant="border_class">
            <b-form-group label="노출여부">
                <b-form-checkbox 
                    v-model="is_visible" 
                    :options="options"
                    switch>
                    <strong>{{is_visible ? '노출' : '비노출'}}</strong>
                </b-form-checkbox>
            </b-form-group>
            <b-form-group label="제목">
                <b-form-input type="text" size="sm" v-model="form.name">
                </b-form-input>
            </b-form-group>
            <b-card>
                <template #header>
                    <span>팝업 날짜</span>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group label="시작일">
                            <b-input-group>
                                <b-form-input
                                    v-model="form.start_date"
                                    type="text" size="sm" disabled
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker
                                    button-only
                                    right
                                    locale="kr"
                                    size="sm"
                                    v-model="form.start_date"
                                    ></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="종료일">
                            <b-input-group>
                                <b-form-input
                                    v-model="form.end_date"
                                    type="text" size="sm" disabled
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker
                                    button-only
                                    right
                                    locale="kr"
                                    size="sm"
                                    v-model="form.end_date"
                                    ></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
            <b-card class="mt-1">
                <template #header>
                    <span>팝업 위치</span>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group label="X">
                            <b-form-input type="number" size="sm" v-model="form.location_x">
                                </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Y">
                            <b-form-input type="number" size="sm" v-model="form.location_y">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
            <b-card class="mt-1">
                <template #header>
                    <span>팝업 크기</span>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group label="Width">
                            <b-form-input type="number" size="sm" v-model="form.width"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Height">
                            <b-form-input type="number" size="sm" v-model="form.height"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

			<b-card no-body class="mt-1">
                <b-tabs card>
                    <b-tab title="국문" active>
						<b-form-group label="링크">
                            <b-form-input type="text" size="sm" v-model="form.link"></b-form-input>
                        </b-form-group>
						<b-form-group label="이미지">
                            <b-card-text align="center" class="ino-850-450-wrap">
								<div>
									<b-img :src="form.photo_1||photo_prev" fluid></b-img>
								</div>
							</b-card-text>
                            <b-form-file v-model="photo_1" @change="onFileChange($event, 'photo_1', form)" class="mt-1 mb-1" size="sm"></b-form-file>
                            <b-button @click="photo_1 = null; form.photo_1 = null; photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                        </b-form-group>
					</b-tab>
                    <b-tab title="영문">
						<b-form-group label="링크">
                            <b-form-input type="text" size="sm" v-model="form.link_en"></b-form-input>
                        </b-form-group>
						<b-form-group label="이미지">
                            <b-card-text align="center" class="ino-850-450-wrap">
								<div>
									<b-img :src="form.photo_1_en||photo_prev" fluid></b-img>
								</div>
							</b-card-text>
                            <b-form-file v-model="photo_1_en" @change="onFileChange($event, 'photo_1_en', form)" class="mt-1 mb-1" size="sm"></b-form-file>
                            <b-button @click="photo_1_en = null; form.photo_1_en = null; photo_1_en_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                        </b-form-group>
					</b-tab>
				</b-tabs>
			</b-card>

        </b-card>
        <b-button class="mt-2 inoBtn-150" variant="primary" v-show="border_class == 'primary'" @click="storeData">저장</b-button>
        <b-button class="mt-2 inoBtn-150" variant="success" v-show="border_class == 'success'" @click="updateData">수정</b-button>
        <b-button class="mt-2 inoBtn-150" variant="danger" @click="modal1=false" size="sm">취소</b-button>
    </b-modal>
</section>
</template>

<script>
export default {
    name: 'popup',
    data: function () {
        return {
            api_url: '',
            event_id: '',
            modal1: false,
            fields: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'name',
                    label: '제목'
                },
                {
                    key: 'link',
                    label: '링크'
                },
                {
                    key: 'is_visible',
                    label: '활성화 상태'
                },
                {
                    key: 'manageBtn',
                    label: '관리항목'
                },
            ],
            items: [],
            border_class: 'primary',
            
            form: {
                photo_1: '' // image url
            },
            is_visible: true,
            options: [
                { text: '노출', value: true },
                { text: '비노출', value: false }
            ],


            photo_1: null, // real file data
            photo_1_del: false, // file delete status

            photo_1_en: null, // real file data
            photo_1_en_del: false, // file delete status
            
            // https://www.fillmurray.com/640/360
            photo_prev: './static/images/no_image.jpg', // preview image url

        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.getList();
        });
    },
    methods: {
        getList: async function () {
            let url = `${this.api_url}/popup?event_id=${this.event_id}`;
            let rs = await axios.get(url);
            this.items = rs.data.result;
        },
        openModal(target, item) {
            if (item) {
                this.border_class = 'success'; // update modal
                this.form = {...item};
                this.is_visible = item.is_visible ? true : false;
            } else {
                this.border_class = 'primary'; // new modal
                this.form = {};
                this.is_visible = false;
            }
            this.photo_1 = null; // real file
            this.photo_1_del = false;
            this.photo_1_en = null; // real file
            this.photo_1_en_del = false;
            this.modal1 = true;
        },
        sendForm: async function (url) {
            let formData = new FormData();
                formData.append('event_id', this.event_id);
                formData.append('is_visible', this.is_visible ? 1 : 0);
                formData.append('name', this.form.name);
                formData.append('start_date', this.form.start_date);
                formData.append('end_date', this.form.end_date);
                formData.append('location_x', this.form.location_x);
                formData.append('location_y', this.form.location_y);
                formData.append('width', this.form.width);
                formData.append('height', this.form.height);
                !this.photo_1 && this.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', this.photo_1);
                !this.photo_1_en && this.photo_1_en_del ? formData.append('photo_1_en_del', 'Y') : formData.append('photo_1_en', this.photo_1_en);
                formData.append('link', this.form.link);
                formData.append('link_en', this.form.link_en);
            try {
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.getList();
                this.modal1 = false;
                this.$showMsgBoxTwo(rs.status);
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        },
        storeData: async function () {
            await this.sendForm(`${this.api_url}/popup`);
        },
        updateData: async function () {
            await this.sendForm(`${this.api_url}/popup/${this.form.id}`);
        },
        deleteData: async function (target, item) {
            try {
                if (confirm('삭제 하시겠습니까?')) {
                    let rs = await axios.delete(`${this.api_url}/popup/${item.id}`);
                    this.getList();
                    this.$showMsgBoxTwo(rs.status);
                }
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        }
    }
}
</script>
