<template>
	<section>
		<b-row>
			<b-col>
				<h6><b>상세검색</b></h6>
			</b-col>
		</b-row>
		<br>

		<b-row>
			<b-col cols="2">
				<b-form-select v-model="selected" :options="options" size="sm"></b-form-select>
			</b-col>
			<b-col cols="6">
				<b-form inline size="sm">
					
					<b-input-group size="sm">
						<b-form-input
							id="example-input"
							v-model="date1"
							type="text"
							placeholder="YYYY-MM-DD"
							autocomplete="off"
						></b-form-input>
						<b-input-group-append>
							<b-form-datepicker
								v-model="date1"
								button-only
								right
								locale="en-US"
								aria-controls="example-input"
								@context="onContext"
								size="sm"
							></b-form-datepicker>
						</b-input-group-append>
					</b-input-group>

					&nbsp;-&nbsp;

					<b-input-group size="sm">
								<b-form-input
									id="example-input2"
									v-model="date2"
									type="text"
									placeholder="YYYY-MM-DD"
									autocomplete="off"
								></b-form-input>
								<b-input-group-append>
									<b-form-datepicker
										v-model="date2"
										button-only
										right
										locale="en-US"
										aria-controls="example-input2"
										@context="onContext"
										size="sm"
									></b-form-datepicker>
								</b-input-group-append>
							</b-input-group>

				</b-form>

			</b-col>
			<b-col cols="4">
				<b-input-group size="sm" align-v="baseline">
					<b-form-input aria-placeholder="검색어를 입력하세요."></b-form-input>
					<b-input-group-append>
						<b-button variant="info" size="sm">검색하기</b-button>
					</b-input-group-append>
				</b-input-group>
			</b-col>
		</b-row>
		<br>

		<b-row>
			<b-col>
				<b-table small :fields="fields" :items="items" responsive="sm">
					<template #cell(manageBtn)="row">
						<b-button size="sm" pill variant="outline-success" @click="loginInfo(row.item, row.index, $event.target)">상세보기</b-button>
					</template>
				</b-table>
			</b-col>
		</b-row>
	</section>
</template>

<script>
export default {
	name: "statsLogin",
	data: function () {
		const now = new Date()
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		// 15th two months prior
		const minDate = new Date(today)
		minDate.setMonth(minDate.getMonth() - 2)
		minDate.setDate(15)
		// 15th in two months
		const maxDate = new Date(today)
		maxDate.setMonth(maxDate.getMonth() + 2)
		maxDate.setDate(15)

		return {
			date1: '',
			date2: '',
			formatted: '',
			selectedDate: '',

			selected: null,
			options: [
				{ value: null, text: '전체' },
				{ value: 'buyer', text: '바이어' },
				{ value: 'seller', text: '셀러' }
			],
			fields: [
				{ key: 'id', label: '번호' },
				{ key: 'type', label: '구분' },
				{ key: 'company', label: '업체' },
				{ key: 'email', label: '아이디' },
				{ key: 'loginCnt', label: '총 로그인 횟수' },
				{ key: 'manageBtn', label: '상세보기' }
			],
			items: [
				{ id: 6, type: '셀러', company: '기업 #1', email: 'admin@companyA.com', loginCnt: 12 },
				
			]

		};
	},
	methods: {
		loginInfo (item, index, target) {
			console.log(item, index, target);
		},
		onContext(ctx) {
			// The date formatted in the locale, or the `label-no-date-selected` string
			this.formatted = ctx.selectedFormatted
			// The following will be an empty string until a valid date is entered
			this.selectedDate = ctx.selectedYMD
			console.log(ctx.selectedYMD);
		}
	},
};
</script>
