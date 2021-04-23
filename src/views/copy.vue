<template>
	<section>
<!-- 		
		<b-row>
			<b-col>
				<h6><b>Copyright 영역</b></h6>
			</b-col>
		</b-row>
		 -->
		<b-row>
			<b-col>
				<b-card no-body>
					<b-tabs content-class="" card>
						<b-tab title="국문" active @>
							<b-card-text>
								<quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="copyright" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
								<br>
								<div class="content ql-editor" v-html="copyright"></div>
							</b-card-text>
						</b-tab>
						<b-tab title="영문">
							<b-card-text>
								<quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="copyright_en" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
								<br>
								<div class="content ql-editor" v-html="copyright_en"></div>
							</b-card-text>
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col>
				<b-button href="#" variant="primary" size="sm" @click="storeCopyright" class="inoBtn-150">저장</b-button>
				<b-button href="#" variant="danger" size="sm" @click="getCopyright" class="inoBtn-150">취소</b-button>
			</b-col>
		</b-row>
	</section>
</template>

<script>
export default {
	name: 'copy',
	data: function () {
	return {
			event_id: 0,
			api_url: 0,
			copyright: null,
			copyright_en: null,
            editorOption: {
				modules: {
					
				},
				placeholder: '게시물을 작성해주세요.',
                theme: "snow",
            },
		}
	},
	mounted: function () {
        this.$nextTick(function () {
			this.event_id = this.$store.getters.event_id;
			this.api_url = this.$store.getters.api_url;
            this.getCopyright();
        })
    },
	methods: {
		getCopyright: async function () {
			let res = await axios.get(`${this.api_url}/event/main_page?event_id=${this.event_id}`);
			let data = res.data.result;
			this.copyright = data.copyright;
			this.copyright_en = data.copyright_en;
		},
		storeCopyright: async function () {
			var formData = new FormData();
			formData.append('copyright', this.copyright);
			formData.append('copyright_en', this.copyright_en);
			let rs = await axios.post(`${this.api_url}/event/${this.event_id}`, formData, {
						headers: {
							'Content-Type': 'application/json'
						}
				});
			this.getCopyright();
			this.$showMsgBoxTwo(rs.status);
		},
		onEditorBlur(quill) {
            // console.log("editor blur!", quill);
        },
        onEditorFocus(quill) {
            // console.log("editor focus!", quill);
        },
        onEditorReady(quill) {
            // console.log("editor ready!", quill);
        },
	}
}
</script>
