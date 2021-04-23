<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	Suervey > 결과</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-card>
        <b-row class="mb-1">
            <b-col>
                <p>
                    본 교육평가는 교육참가자 여러분의 의견을 반영해 보다 좋은 교육을 만드는 데 그 목적이 있습니다. 교육평가서는 교육에 대한 전반적 평가와 개별 강의 및 강사 평가로 이루어 집니다. 느끼신 바대로 솔직하게 응답해 주시기 바랍니다.
                </p>
                <b-button href="#" variant="primary" size="sm" @click="excelDownload">
                    <b-icon-download></b-icon-download> 엑셀 다운로드
                </b-button>
                <b-button href="#" variant="danger" size="sm" @click="resetServey">
                    <b-icon-x-octagon></b-icon-x-octagon> 설문확인 데이터 초기화
                </b-button>
            </b-col>
        </b-row>
        <b-card v-for="item in items" v-bind:key="item.index" class="mb-1">
            <b-card-title>
                {{item.index}}. {{item.question}}
            </b-card-title>
            <b-card-text v-if="item.type == 1">
                <div v-for="answer_item in item.answers" v-bind:key="answer_item.index">
                    <strong> {{answer_item.index}}) {{answer_item.answer}}</strong>
                    <b-progress :max="max" show-progress class="mb-1">
                        <b-progress-bar :value="answer_item.rate" :variant="answer_item.variant">
                            <span><strong>{{ answer_item.count }} ({{answer_item.rate}}%)</strong></span>
                        </b-progress-bar>
                    </b-progress>
                </div>
            </b-card-text>
            <b-card-text v-if="item.type == 2">
                <p>자유 서술형 문항입니다. 다른 페이지에서 확인해주세요.</p>
                <b-button size="sm" variant="primary">이동하기</b-button>
            </b-card-text>
        </b-card>
    </b-card>
</section>
</template>

<script>
export default {
    name: "survey_result",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            id: 0,
            items: [],
            max: 100
        };
    },
    mounted: async function () {
        this.$nextTick(async function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.id = this.$route.query.id;
            await this.getData();
        });
    },
    methods: {
        getData: async function () { // 데이터 가져오기
            let url = `${this.api_url}/survey/${this.id}/statistics`;
            let rs = await axios.get(url);
            let data = rs.data.result[this.id];
            this.items = this.surveyReformat(data.question, Object.values(data.answers));
        },
        variantSetter: function (rate) {
            let variant = '';
            if (5 < rate && rate <= 10) {
                variant = 'secondary';
            } else if (10 < rate && rate <= 25) {
                variant = 'primary';
            } else if (25 < rate && rate <= 50) {
                variant = 'danger';
            } else if (50 < rate && rate <= 60) {
                variant = 'warning';
            } else if (60 < rate && rate <= 75) {
                variant = 'info';
            } else if (75 < rate) {
                variant = 'success';
            } else {
                variant = 'dark';
            }
            return variant;
        },
        surveyReformat: function (question, answers) {
            if (!question || !answers) {
                return [];
            }

            let items = [];
            for (var i = 0; i < question.length; i++) {
                let q = question[i];
                let a = answers[i];
                let count = a.count;
                let cases = a.cases;
                let answer_array = []; // wefwe: 3, wfwe: 7
                if (q.type == 1) {
                    let keys = Object.keys(cases);
                    for (var j = 0; j < keys.length; j++) {
                        let key = keys[j];
                        let val = cases[key];
                        let index = j+1;
                        let rate = (val/count).toFixed(2)*100;
                        let variant = this.variantSetter(rate);
                        let obj = {
                            index: index,
                            answer: key,
                            count: val,
                            rate: rate,
                            variant: variant
                        }
                        answer_array.push(obj);
                    }
                } else { // 주관식임
                    for (var j = 0; j < cases.length; j++) {
                        let val = cases[j];
                        let index = j+1;
                        let rate = (1/count).toFixed(2)*100;
                        let obj = {
                            index: index,
                            answer: val,
                            count: 1,
                            rate: rate // 답변 한 비율
                        }
                        answer_array.push(obj);
                    }
                }
                
                let survey = {
                    index: i+1,
                    question: q.title,
                    type: q.type,
                    answers: answer_array,
                    reply_cnt: count
                }
                items.push(survey);
            }

            return items;
        },
        excelDownload: function () {
            window.location.href = `${this.api_url}/survey/${this.id}/excel`;
        },
        resetServey: async function () {
            if (confirm('유저가 설문에 응답한 데이터를 삭제하시겠습니까?')) {
                try {
                    let rs = await axios.get(`${this.api_url}/survey/reset_survey?survey_id=${this.id}`);
                    function callback () {
                        this.$router.go(-1);
                    }
                    this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
        }
    }
};
</script>
