<template>
	<section>
		<b-row>
			<b-col>
				<b-card>
					<b-card-text>
						<b-card>
							<template #header><h6><strong>우측 사이드 배너(가로 250px X 세로 420px 사이즈를 권장합니다.)</strong></h6></template>
							<b-row>
								<b-col>
									<b-row>
										<b-col>
											<b-card>
												<h6><strong>배너 #1</strong></h6>
												<b-card-text class="ino-250-420-wrap mb-1">
													<div>
														<b-img :src="banner_photo_1_preview || defaultImage250" fluid></b-img>
													</div>
												</b-card-text>
												<b-card-text class="mt-1">
													<b-form-file v-model="file1" @change="onFileChange($event, 'banner_photo_1_preview')" 
													style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
													<b-button @click="file1 = null; banner_photo_1_preview = ''; banner_photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
												</b-card-text>
											</b-card>
										</b-col>
									</b-row>
									<b-row class="mt-4">
										<b-col>
											<strong>링크 #1</strong><b-form-input size="sm" v-model="banner.banner_photo_1_link" ></b-form-input>
										</b-col>
										<b-col></b-col>
									</b-row>
								</b-col>
								<b-col>
									<b-row>
										<b-col>
											<b-card>
												<h6><strong>배너 #2</strong></h6>
												<b-card-text class="ino-250-420-wrap mb-1">
													<div>
														<b-img :src="banner_photo_2_preview || defaultImage250" fluid></b-img>
													</div>
												</b-card-text>
												<b-card-text class="mt-1">
													<b-form-file v-model="file2" @change="onFileChange($event, 'banner_photo_2_preview')" 
													style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
													<b-button @click="file2 = null; banner_photo_2_preview = ''; banner_photo_2_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
												</b-card-text>
											</b-card>
										</b-col>
									</b-row>
									<b-row class="mt-4">
										<b-col>
											<strong>링크 #2</strong><b-form-input size="sm" v-model="banner.banner_photo_2_link" ></b-form-input>
										</b-col>
										<b-col></b-col>
									</b-row>
								</b-col>
							</b-row>
						</b-card>
					</b-card-text>
					
					<b-card-text>
						<b-button href="#" variant="primary" size="sm" @click="sideBannerUpdate" class="inoBtn-150">저장</b-button>
						<b-button href="#" variant="danger" size="sm" @click="getList" class="inoBtn-150">취소</b-button>
					</b-card-text>
				</b-card>
			</b-col>
		</b-row>
		
		<b-row class="mt-3">
			<b-col>
				<b-card>
						<b-card-text>
							<b-card>
								<template #header><h6><strong>하단 배너 추가</strong></h6></template>
								<b-row>
									<b-col>
										<b-button variant="primary" size="sm" @click="openReset"><b-icon-plus></b-icon-plus>배너 추가</b-button>
										<b-table :fields="fields" :items="banner['bottom_banner']" bordered head-variant="light" small class="mt-1">
											<template #cell(id)="row">
												<div class="text-center">{{row.item.id}}</div>
											</template>
											<template #cell(order)="row">
												<div class="text-center">{{row.item.order}}</div>
											</template>
											<template #cell(manageBtn)="row">
												<div class="text-center">
													<b-button size="sm" variant="outline-success" @click="updatePopup($event.target, row.item, row.index)">
														<b-icon-pencil-square></b-icon-pencil-square> 수정
													</b-button>
													<b-button size="sm" variant="outline-danger" @click="deletePopup(row.item, row.index, $event.target)">
														<b-icon-trash2-fill></b-icon-trash2-fill> 삭제
													</b-button>
												</div>
											</template>
										</b-table>
									</b-col>
								</b-row>
							</b-card>
						</b-card-text>
					</b-card>
			</b-col>
		</b-row>

		<!-- 하단배너 추가/수정 -->
		<b-modal v-model="bottomBanner" hide-footer ref="bottomBanner-modal" title="하단 배너">
			<b-row>
				<b-col cols="3">순서</b-col>
				<b-col cols="9"><b-form-input type="number" v-model="order" size="sm" placeholder="0" style="margin-bottom: 5px;"></b-form-input></b-col>
			</b-row>
			<b-row>
				<b-col cols="3">배너명</b-col>
				<b-col cols="9"><b-form-input v-model="name" size="sm" style="margin-bottom: 5px;"></b-form-input></b-col>
			</b-row>
			<b-card no-body>
				<b-tabs card>
					<b-tab title="국문" active>
						<b-card-text>
							<b-input-group size="sm" prepend="이동할 웹주소" style="margin-bottom: 5px;">
								<b-form-input v-model="link" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
							</b-input-group>
							<b-card-text class="ino-180-70-wrap mb-1">
								<div>
									<b-img :src="photo_1_url||previewUrl1" fluid></b-img>
								</div>
							</b-card-text>
							<b-row class="mt-2">
								<b-col>
									<b-form inline>
										<b-form-file v-model="photo_1" @change="onFileChange($event, 'photo_1_url')"
											style="max-width:320px;" class="mr-2" size="sm">
										</b-form-file>
										<b-button @click="photo_1 = null; photo_1_url=null;" size="sm" variant="danger">이미지 삭제</b-button>
									</b-form>
								</b-col>
							</b-row>
						</b-card-text>
					</b-tab>
					<b-tab title="영문">
						<b-card-text>
							<b-input-group size="sm" prepend="이동할 웹주소" style="margin-bottom: 5px;">
								<b-form-input v-model="link_en" placeholder="반드시 http:// 를 입력해주세요."></b-form-input>
							</b-input-group>
							<b-card-text class="ino-180-70-wrap mb-1">
								<div>
									<b-img :src="photo_1_en_url||previewUrl1" fluid></b-img>
								</div>
							</b-card-text>
							<b-row class="mt-2">
								<b-col>
									<b-form inline>
										<b-form-file v-model="photo_1_en" @change="onFileChange($event, 'photo_1_en_url')"
											style="max-width:320px;" class="mr-2" size="sm">
										</b-form-file>
										<b-button @click="photo_1_en = null; photo_1_en_url=null;" size="sm" variant="danger">이미지 삭제</b-button>
									</b-form>
								</b-col>
							</b-row>
						</b-card-text>
					</b-tab>
				</b-tabs>

			</b-card>
			<b-row class="mt-1">
				<b-col>
					<b-button class="mt-1 inoBtn-150" variant="primary" size="sm" @click="save">저장</b-button>
					<b-button class="mt-1 inoBtn-150" variant="danger" size="sm" @click="hideModal('bottomBanner-modal')">취소</b-button>
				</b-col>
			</b-row>
		</b-modal>
		
	</section>
</template>

<script>
export default {
	name: 'banner',
	data: function () {
		return {
			event_id: 0,
			// apiUrl: `${this.api_url}/banner`,
			url: null,
			defaultImage250: this.$store.getters.dummy_image_url(['250x420']),
			banner: {
				banner_photo_1: null,
				banner_photo_1_en: null,
				banner_photo_2: null,
				banner_photo_2_en: null,

				banner_photo_1_link: null,
				banner_photo_1_link_en: null,
				banner_photo_2_link: null,
				banner_photo_2_link_en: null,

				bottom_banner: []
			},
			file1: null,
			file2: null,
			banner_photo_1_preview: null,
			banner_photo_2_preview: null,
			banner_photo_1_del: false,
			banner_photo_2_del: false,

			previewUrl1: this.$store.getters.dummy_image_url(['180x70']),
			previewUrl2: this.$store.getters.dummy_image_url(['180x70']),
			
			fields: [
				{ key: 'id', label: '번호' },
				{ key: 'name', label: '배너명' },
				{ key: 'order', label: '순서' },
				{ key: 'manageBtn', label: '관리항목' },
			],
			
			confirm: false,
			deleteItem:  null,
			bottomBanner: false,

			order: 0,
			name: null,
			link: null,
			link_en: null,
			photo_1: null,
			photo_1_url: this.$store.getters.dummy_image_url(['180x70']),
			photo_1_en: null,
			photo_1_en_url: this.$store.getters.dummy_image_url(['180x70']),
			
			api_url: '',
			isNew: true,
			banner_id: null

			}
	},
	mounted() {
		this.$nextTick(function () {
			this.event_id = this.$store.getters.event_id;
			this.api_url = this.$store.getters.api_url;
			this.getList();
		})
	},
	methods: {
		getList: async function() {
			let url = `${this.api_url}/event/main_banner?event_id=${this.event_id}`;
			this.banner = (await axios.get(url)).data.result;
			this.banner_photo_1_preview = this.banner.banner_photo_1; // file 전송파라미터를 file url과 함께쓰고 있어서 복잡해짐.
			this.banner_photo_2_preview = this.banner.banner_photo_2;
		},
		onFileChange (e, url) {
			const file = e.target.files[0];
			this[url] = URL.createObjectURL(file);
		},
		sideBannerUpdate: async function() {
			let url = `${this.api_url}/event/${this.event_id}`;
			
			var formData = new FormData();
				console.log("@!!!" , this.banner_photo_2_del);
				!this.file1 && this.banner_photo_1_del ? formData.append('banner_photo_1_del', 'Y') : formData.append('banner_photo_1', this.file1);
				!this.file2 && this.banner_photo_2_del ? formData.append('banner_photo_2_del', 'Y') : formData.append('banner_photo_2', this.file2);

				formData.append("banner_photo_1_link", this.banner.banner_photo_1_link);
				formData.append("banner_photo_2_link", this.banner.banner_photo_2_link);
				
			let rs = await axios.post(url, formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
				});
				
			this.getList();
			this.$showMsgBoxTwo(rs.status);
		},
		

		hideModal(id) {
			this.$refs[id].hide()
		},
		openReset() {
			this.isNew = true;
			this.order= 0;
			this.name= null;
			this.link= null;
			this.link_en= null;
			this.photo_1= null;
			this.photo_1_url= this.$store.getters.dummy_image_url(['180x70']);
			this.photo_1_en= null;
			this.photo_1_en_url= this.$store.getters.dummy_image_url(['180x70']);
			this.bottomBanner = !this.bottomBanner;
		},
		
		updatePopup (target, item) {
			this.isNew = false;
			this.banner_id = item.id;
			this.order = item.order;
			this.name = item.name;
			this.link = item.link;
			this.link_en = item.link_en;
			this.photo_1_url = item.photo_1 ? item.photo_1 : this.defaultImage250;
			this.photo_1__url_en = item.photo_1_en ? item.photo_1_en : this.defaultImage250;
			this.bottomBanner = true;
		},
		deletePopup: async function (item, index, target) {
			if (confirm('삭제하시겠습니까?')) {
				this.deleteItem = item;
				this.confirm = true;
				let rs = await axios.delete(`${this.api_url}/banner/${item.id}`);
				this.getList();
				this.bottomBanner = false;
				this.$showMsgBoxTwo(rs.status);
			}
		},
		save: async function () {
			var formData = new FormData();
				formData.append("event_id", this.event_id);
				formData.append("order", this.order);
				formData.append("name", this.name);
				
				if (!this.link.includes('http') && this.link) {
                    this.link = `http://${this.link}`;
                }
                if (!this.link_en.includes('http') && this.link) {
                    this.link_en = `http://${this.link_en}`;
                }
				formData.append("link", this.link);
				formData.append("link_en", this.link_en);
				
				if (this.photo_1) {
					formData.append("photo_1", this.photo_1);
				} else {
					formData.append("photo_1_del", 'Y');
				}

				if (this.photo_1_en) {
					formData.append("photo_1_en", this.photo_1_en);
				} else {
					formData.append("photo_1_en_del", 'Y');
				}
			
			let url = this.isNew ? `${this.api_url}/banner` : `${this.api_url}/banner/${this.banner_id}`;
			await axios.post(url, formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
				});
				
			this.getList();
			this.hideModal('bottomBanner-modal');
		},
		async deleteBanner() {
			try {
				let result = await axios.delete(`${this.api_url}/banner/${this.deleteItem.id}`);
				this.getList();
				this.hideModal('bottomBanner-modal');
			} catch (error) {
				console.error(error);
			} finally {
				this.confirm = false;
			}
		}

	}
}
</script>
