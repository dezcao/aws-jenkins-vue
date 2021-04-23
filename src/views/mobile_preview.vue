<template>
	<b-card title="Mobile버전 보기" sub-title="* 국문페이지만 보기가 가능합니다.">
		<b-card-text>
			<b-row>
				<b-col>
					<b-button v-b-toggle.collapse-1 variant="outline-primary" size="sm">
						<b-icon-list v-show="!isJustShown"></b-icon-list>
						<b-icon-chevron-left v-show="isJustShown"></b-icon-chevron-left>
					</b-button>
					<b-img v-show="!isJustShown" :src="url.logo" fluid alt="Responsive image" style="max-width:250px;"></b-img>
					<span v-show="isJustShown" style="font-size: 10pt; padding-left:270px;">로그인 | 회원가입</span>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-collapse id="collapse-1" class="mt-2">
						<b-card>
							<p class="card-text">
								<b-form inline style="padding-bottom:5px;">
									<span style="width:70%;">카테고리</span>
									<b-form-select v-model="selected" :options="['Korea', 'English']" size="sm"></b-form-select>
								</b-form>
								<b-list-group>
									<b-list-group-item>메뉴예시 1  ></b-list-group-item>
									<b-list-group-item>메뉴예시 2  ></b-list-group-item>
									<b-list-group-item>메뉴예시 3  ></b-list-group-item>
									<b-list-group-item>메뉴예시 4  ></b-list-group-item>
								</b-list-group>
							</p>
							<hr>
							<p class="card-text">
								<b-form inline style="padding-bottom:5px;">
									<span style="width:70%;">기타</span>
									<b-img :src="url.url6" fluid alt="Responsive image" style="max-width:20px;"></b-img>&nbsp;
									<b-img :src="url.url7" fluid alt="Responsive image" style="max-width:20px;"></b-img>&nbsp;
									<b-img :src="url.url8" fluid alt="Responsive image" style="max-width:20px;"></b-img>
								</b-form>
								<b-list-group>
									<b-list-group-item>메뉴예시 1  ></b-list-group-item>
									<b-list-group-item>메뉴예시 2  ></b-list-group-item>
								</b-list-group>
							</p>
						</b-card>
					</b-collapse>
				</b-col>
			</b-row>
		</b-card-text>

	</b-card>
  
</template>


<script>
export default {
  name: "mo",
	props: [ 'url' ],
  data: function () {
    return {
      selected: 'Korea',
			isJustShown: false,
    };
  },
	mounted() {
		this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
				this.isJustShown = isJustShown;
		})
	},
  methods: {
    
  },
};
</script>