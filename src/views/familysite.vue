<template>
	<section>
		<b-row>
			<b-col>
				<b-button variant="primary" size="sm" @click="familyPost = !familyPost; url=api_url;"><b-icon-plus></b-icon-plus>사이트 추가</b-button>
				<b-modal v-model="familyPost" hide-footer ref="familysite-modal" title="사이트 추가">
					<b-form inline>순서&nbsp;<b-form-input v-model="order" size="sm" placeholder="0"></b-form-input></b-form>
					<b-card no-body class="mt-3">
						<b-tabs card content-class="mt-3">
							<b-tab title="국문" active>
								<b-card-text>
									<b-input-group size="sm" prepend="제목" style="margin-bottom: 5px;">
										<b-form-input v-model="name"></b-form-input>
									</b-input-group>
									<b-input-group size="sm" prepend="링크">
										<b-form-input v-model="link"></b-form-input>
									</b-input-group>
								</b-card-text>
							</b-tab>
							<b-tab title="영문">
								<b-card-text>
									<b-input-group size="sm" prepend="제목" style="margin-bottom: 5px;">
										<b-form-input v-model="name_en"></b-form-input>
									</b-input-group>
									<b-input-group size="sm" prepend="링크">
										<b-form-input v-model="link_en"></b-form-input>
									</b-input-group>
								</b-card-text>
							</b-tab>
						</b-tabs>
					</b-card>
					<b-row class="mt-3">
						<b-col>
							<b-button variant="primary" size="sm" @click="save" class="inoBtn-150">저장</b-button>
							<b-button variant="danger" size="sm" @click="hideModal('familysite-modal')" class="inoBtn-150">취소</b-button>
						</b-col>
					</b-row>
				</b-modal>
			</b-col>
		</b-row>
		
		<b-row class="mt-1">
			<b-col>
				<b-table small :fields="fields" :items="items" bordered head-variant="light">
					<!-- A virtual column -->
					<template #cell(id)="row">
						<div class="text-center">{{row.item.id}}</div>
					</template>
					<template #cell(order)="row">
						<div class="text-center">{{row.item.order}}</div>
					</template>
					<template #cell(manageBtn)="row">
						<div class="text-center">
							<b-button size="sm" variant="outline-success" @click="updatePopup(row.item, row.index, $event.target)">
								<b-icon-pencil-square></b-icon-pencil-square> 수정
							</b-button>
							<b-button size="sm" variant="outline-danger" @click="deletePopup(row.item, row.index, $event.target)">
								<b-icon-trash2-fill></b-icon-trash2-fill> 삭제
							</b-button>
						</div>
					</template>
				</b-table>
				<b-modal id="confirm" v-model="confirm" hide-footer>
					<p class="my-4">삭제 하시겠습니까?</p>
					<b-button class="mt-2" variant="outline-primary" @click="confirm=false; confirm=false;">취소</b-button>
					<b-button class="mt-2" variant="outline-danger" @click="deleteFamilySite">삭제</b-button>
				</b-modal>
			</b-col>
		</b-row>
	</section>
</template>

<script>
export default {
	name: 'familySite',
	data: function () {
	return {
		event_id: null,
		api_url: '',
		// apiUrl: `${api_url}/familysite`,
		url: null,
		familyPost: false,
		
		order: 0,
		name: null,
		name_en: null,
		link: null,
		link_en: null,

		fields: [
			{ key: 'id', label: '번호' },
			{ key: 'order', label: '순서' },
			{ key: 'name', label: '제목' },
			{ key: 'link', label: '링크' },
			{ key: 'manageBtn', label: '관리항목' },
		],
		items: [],
		confirm: false,
		deleteItem:  null
		}
	},
	mounted() {
		this.$nextTick(function () {
			this.event_id = this.$store.getters.event_id;
			this.api_url = this.$store.getters.api_url;
			console.log(this.api_url);
			this.getList();
		})
	},
	methods: {
		getList: async function() {
			let url = `${this.api_url}/familysite?event_id=${this.event_id}`;
			this.items = (await axios.get(url)).data.result.familysite;
		},
		save: async function () {
			
			var formData = new FormData();
				formData.append("event_id", this.event_id);
				formData.append("order", this.order);
				formData.append("name", this.name);
				formData.append("link", this.link);
				formData.append("name_en", this.name_en);
				formData.append("link_en", this.link_en);
			
			await axios.post(this.url, formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				
			this.getList();
			this.hideModal('familysite-modal');
		},
		hideModal(id) {
			this.$refs[id].hide()
		},
		updatePopup(item, index, target) {
			this.url = `${this.api_url}/familysite/${item.id}`;
			this.order = item.order;
			this.name = item.name;
			this.name_en = item.name_en;
			this.link = item.link;
			this.link_en = item.link_en;
			this.familyPost = true;
		},
		async deletePopup(item, index, target) {
			this.confirm = true;
			this.deleteItem = item;
		},
		async deleteFamilySite() {
			try {
				let result = await axios.delete(`${this.api_url}/familysite/${this.deleteItem.id}`);
				this.getList();
				this.hideModal('familysite-modal');
			} catch (error) {
				console.error(error);
			} finally {
				this.confirm = false;
			}
		}
	}
}
</script>
