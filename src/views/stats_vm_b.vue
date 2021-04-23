<template>
	<section>
		<b-row>
			<b-col>
				<h6><b>상세검색</b></h6>
			</b-col>
		</b-row>
		<br>

		<b-row>
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
			<b-col cols="2">
				<b-button variant="info" size="sm"><b-icon-download></b-icon-download> 엑셀 다운로드</b-button>
			</b-col>
		</b-row>
		<br>

		<b-row>
			<b-col>
				<b-table small :fields="fields" :items="items" responsive="sm">
					<template #cell(manageBtn)="row">
						<b-button size="sm" pill variant="outline-success" @click="info(row.item, row.index, $event.target)">상세보기</b-button>
					</template>
				</b-table>
			</b-col>
		</b-row>
	</section>
</template>

<script>
export default {
	name: "statsVmB",
	data: function () {
		
		return {
			date1: '',
			date2: '',
			formatted: '',
			selectedDate: '',

			fields: [
				{ key: 'id', label: '번호' },
				{ key: 'type', label: '구분' },
				{ key: 'company', label: '업체' },
				{ key: 'vmBTime', label: '총 상담 진행 시간(분)' },
				{ key: 'manageBtn', label: '상세보기' }
			],
			items: [
				{ id: 6, type: '바이어', company: '기업 #1', vmBTime: '120분' },
				
			]

		};
	},
	methods: {
		info (item, index, target) {
			console.log(item, index, target);
		},
		onContext(ctx) {
			// The date formatted in the locale, or the `label-no-date-selected` string
			this.formatted = ctx.selectedFormatted
			// The following will be an empty string until a valid date is entered
			this.selectedDate = ctx.selectedYMD
		}
	},
};
</script>
