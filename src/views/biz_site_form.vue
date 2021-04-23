<template>
<section>
    <b-row>
        <b-col>
            <h6><strong>6.Bizmatching > 사이트 구성 > 폼</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-card class="mt-1">
        <b-form-group label-cols-sm="3" label-cols-lg="2" content-cols-sm content-cols-lg="7" label="탭명" label-for="input-tabname">
            <b-form-input v-model="form.tab_name" id="input-tabname" size="sm"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label-cols-lg="2" content-cols-sm content-cols-lg="7" label="순서" label-for="input-order">
            <b-form-input v-model="form.order" type="number" id="input-order" size="sm"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label-cols-lg="2" content-cols-sm content-cols-lg="7" label="메뉴 타입">
            <b-form-radio-group v-model="form.type" :options="options" button-variant="outline-primary" size="sm" buttons></b-form-radio-group>
        </b-form-group>

        <div v-show="form.type == 0">
            <b-form-group label-cols-sm="3" label-cols-lg="2" content-cols-sm content-cols-lg="7" label="컨텐츠 입력" label-for="input-contents">
            </b-form-group>
            <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="form.contents" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
            <div class="content ql-editor" v-html="form.contents"></div>
        </div>
        <div v-show="form.type == 1">
            <b-form-group label-cols-sm="3" label-cols-lg="2" content-cols-sm content-cols-lg="7" label="링크 입력" label-for="input-link">
                <b-form-input v-model="form.link" id="input-link" size="sm"></b-form-input>
            </b-form-group>
        </div>
    </b-card>

    <b-row class="mt-2">
        <b-col>
            <b-button v-show="!id" href="#" variant="primary" size="sm" @click="storeData" class="inoBtn-150">저장</b-button>
            <b-button v-show="id" href="#" variant="info" size="sm" @click="updateData" class="inoBtn-150">수정</b-button>
        </b-col>
    </b-row>

</section>
</template>

<script>
export default {
    name: 'biz_site_form',
    data: function () {
        return {
            api_url: '',
            event_id: 0,
            id: 0,
            form: {
                id: null,
                tab_name: 'tabname',
                order: 1,
                type: 0,
                contents: '',
                link: '',
            },
            options: [{
                    text: 'HTML',
                    value: 0
                },
                {
                    text: '링크',
                    value: 1
                }
            ],
            // 퀼 에디터 옵션
            editorOption: {
                theme: "snow",
            }
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.id = this.$route.query.id;
            await this.getData();
        })
    },
    methods: {
        getData: async function () {
            if (!this.id) {
                return;
            }
            let url = `${this.api_url}/bizmatching_menu/${this.id}`;
            let rs = await axios.get(url);
            this.form = rs.data.result;
        },
        storeData: async function () {
            let url = `${this.api_url}/bizmatching_menu`;
            let formData = new FormData();
                formData.append('event_id', this.event_id);
                formData.append('tab_name', this.form.tab_name);
                formData.append('order', this.form.order);
                formData.append('type', this.form.type);
            if (this.form.type == 0) {
                formData.append('contents', this.form.contents);
            } else {
                formData.append('link', this.form.link);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).catch(error => {
                console.error(error);
            });

            this.$router.go(-1);
        },
        updateData: async function () {
            let url = `${this.api_url}/bizmatching_menu/${this.id}`;
            let formData = new FormData();
                formData.append('tab_name', this.form.tab_name);
                formData.append('order', this.form.order);
                formData.append('type', this.form.type);
            if (this.form.type == 0) {
                formData.append('contents', this.form.contents);
            } else {
                formData.append('link', this.form.link);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).catch(error => {
                console.error(error);
            });

            this.$router.go(-1);
        },

        onEditorBlur(quill) {
            console.log("editor blur!", quill);
        },
        onEditorFocus(quill) {
            console.log("editor focus!", quill);
        },
        onEditorReady(quill) {
            // console.log("editor ready!", quill);
        },

    }
}
</script>
