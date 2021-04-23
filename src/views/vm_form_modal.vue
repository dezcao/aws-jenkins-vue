<template>
  <div>
    <b-card no-body class="p-1" :border-variant="modal1_border" v-show="form_page == 1">
      <b-tabs card>
        <b-tab title="국문" active>
          <b-form-group label="Event title" label-variant="primary">
            <b-form-input v-model="form.name" size="sm" :state="form.name ? true: false"></b-form-input>
          </b-form-group>
          <b-form-group label="Sub title">
            <b-form-input v-model="form.sub_title" size="sm"></b-form-input>
          </b-form-group>
          <b-form-group label="Venue">
            <b-form-input v-model="form.venue" size="sm" :state="form.venue ? true: false">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Host">
            <b-form-input v-model="form.host" size="sm" :state="form.host ? true: false"></b-form-input>
          </b-form-group>
        </b-tab>
        <b-tab title="영문">
          <b-form-group label="Event title" label-variant="primary">
            <b-form-input v-model="form.name_en" size="sm"></b-form-input>
          </b-form-group>
          <b-form-group label="Sub title">
            <b-form-input v-model="form.sub_title_en" size="sm"></b-form-input>
          </b-form-group>
          <b-form-group label="Venue">
            <b-form-input v-model="form.venue_en" size="sm"></b-form-input>
          </b-form-group>
          <b-form-group label="Host">
            <b-form-input v-model="form.host_en" size="sm"></b-form-input>
          </b-form-group>
        </b-tab>
      </b-tabs>
      <hr class="mt-0">
      <b-form-group label="Event Size (최대 예상인원, 누적 인원 수)">
        <b-button size="sm" style="width: 80px;" :variant="event_size == 100 ? 'warning' : 'outline-warning'"
          @click="event_size = 100">100
        </b-button>
        <b-button size="sm" style="width: 80px;" :variant="event_size == 200 ? 'warning' : 'outline-warning'"
          @click="event_size = 200">200
        </b-button>
        <b-button size="sm" style="width: 80px;" :variant="event_size == 500 ? 'warning' : 'outline-warning'"
          @click="event_size = 500">500
        </b-button>
        <b-button size="sm" style="width: 80px;" :variant="event_size == 1000 ? 'warning' : 'outline-warning'"
          @click="event_size = 1000">1000
        </b-button>
        <b-button size="sm" style="width: 80px;" :variant="event_size == 2500 ? 'warning' : 'outline-warning'"
          @click="event_size = 2500">2500
        </b-button>
      </b-form-group>
      <b-row>
        <b-col>
          <b-form-group label="Date">
            <b-form-datepicker v-model="form.date" locale="ko" :min="min"
              :normal="datepicker_state == 'normal' ? true : false"
              :readonly="datepicker_state == 'readonly' ? true : false" size="sm"></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="시간">
            <b-input-group>
              <b-form-input v-model="start_time" :state="start_time ? true: false" type="text" placeholder="HH:mm"
                size="sm"></b-form-input>
              <b-input-group-append>
                <b-form-timepicker v-model="start_time" size="sm" locale="kr" button-only></b-form-timepicker>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="진행시간(분)">
            <b-form-input v-model="form.time" :state="form.time ? true: false" type="number" size="sm"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Event Logo">
            <b-card no-body>
              <b-card-text class="ino-180-180-wrap mt-1">
                <div>
                  <b-img :src="form.logo||logo_prev" fluid></b-img>
                </div>
              </b-card-text>
              <b-card-text class="mt-1 pl-1 pb-1">
                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                <b-input-group>
                  <b-form-file v-model="logo_file" @change="onFileChange($event, 'logo', form)" size="sm">
                  </b-form-file>
                  <b-input-group-append>
                    <b-button @click="logo_file = null; form.logo=''; logo_del=true;" size="sm" variant="danger">삭제
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-card-text>
            </b-card>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Sponsor Banner">
            <b-card no-body>
              <b-card-text class="ino-180-180-wrap mt-1">
                <div>
                  <b-img :src="form.banner||banner_prev" fluid></b-img>
                </div>
              </b-card-text>
              <b-card-text class="mt-1 pl-1 pb-1">
                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                <b-input-group>
                  <b-form-file v-model="banner_file" @change="onFileChange($event, 'banner', form)" size="sm">
                  </b-form-file>
                  <b-input-group-append>
                    <b-button @click="banner_file = null; form.banner=''; banner_del=true;" size="sm" variant="danger">
                      삭제</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-card-text>
            </b-card>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Event Background Image">
            <b-card no-body>
              <b-card-text class="ino-180-180-wrap mt-1">
                <div>
                  <b-img :src="form.background||background_prev" fluid></b-img>
                </div>
              </b-card-text>
              <b-card-text class="mt-1 pl-1 pb-1">
                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                <b-form-file v-model="background_file" @change="onFileChange($event, 'background', form)"
                  style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                <b-button @click="background_file = null; form.background=''; background_del=true;" size="sm"
                  variant="danger">삭제</b-button>
              </b-card-text>
            </b-card>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Intro Background Image">
            <b-card no-body>
              <b-card-text class="ino-180-180-wrap mt-1">
                <div>
                  <b-img :src="form.intro_background||background_prev" fluid></b-img>
                </div>
              </b-card-text>
              <b-card-text class="mt-1 pl-1 pb-1">
                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                <b-form-file v-model="intro_background_file" @change="onFileChange($event, 'intro_background', form)"
                  style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                <b-button @click="intro_background_file = null; form.intro_background=''; intro_background_del=true;"
                  size="sm" variant="danger">삭제</b-button>
              </b-card-text>
            </b-card>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-group label="Languages">
        <b-input-group v-for="(item, index) in select_arr" :key="item.user_id" class="mb-1">
          <b-form-input v-model="item.language" type="text" size="sm"></b-form-input>
          <b-form-select size="sm" v-model="item.user_id" @change.native="selectedChange($event, item, index)">
            <b-form-select-option size="sm" v-for="(user) in item.available" :key="user.user_id" :value="user.user_id" @click="selectedChange">{{ user.name }}</b-form-select-option>
          </b-form-select>

          <b-input-group-append>
            <b-button size="sm" variant="danger" @click="removeList(item, index)">X</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-row class="text-center">
          <b-col>
            <b-button size="sm" variant="info" @click="addList">
              <b-icon-plus></b-icon-plus> 언어추가
            </b-button>
          </b-col>
        </b-row>
      </b-form-group>
    </b-card>

    <b-card no-body class="p-1" :border-variant="modal1_border" v-show="form_page == 2">
      <b-form-group label="Event type">
        <b-form-checkbox v-model="form.is_login_attendee" unchecked-value="1" value="0" variant="success">
          Attendee 로그인 계정 불필요
        </b-form-checkbox>
        <b-form-checkbox v-model="form.is_login_attendee" unchecked-value="0" value="1" variant="success">
          Attendee 로그인 계정 필요
        </b-form-checkbox>
        <div class="pl-4" v-show="form.is_login_attendee == 1">
          <p class="m-0" style="color: silver; font-size: 10pt;">- Attendee에 참가등록 이메일을 전송합니다.</p>
          <p class="m-0" style="color: silver; font-size: 10pt;">(참가등록 알림을 수령한 이메일로만 로그인 가능합니다.)</p>
          <b-form-checkbox v-model="form.is_type_attendee" unchecked-value="1" value="0" variant="success">
            비밀번호 없이 이메일 ID로만 로그인 합니다.
          </b-form-checkbox>
          <b-form-checkbox v-model="form.is_type_attendee" unchecked-value="0" value="1" variant="success">
            이메일 ID + Passcode로 로그인 합니다.
          </b-form-checkbox>
          <b-form-input v-show="form.is_type_attendee == 1" v-model="form.attendee_password"
            placeholder="Passcode를 입력하세요.(6자리 숫자)" size="sm" type="number" :max="6"></b-form-input>
        </div>
      </b-form-group>
      <b-form-group label="Event 정책설정">
        <b-form-checkbox v-model="form.is_event_chatting" unchecked-value="1" value="0" variant="success">
          Event Chatting
        </b-form-checkbox>
        <div class="pl-4">
          <p class="m-0" style="color: silver; font-size: 10pt;">- Attendees 사이에 chatting할 수 있습니다.</p>
        </div>
        <b-form-checkbox v-model="form.is_qna_chat" unchecked-value="0" value="1" variant="success">
          Q&A / Chat
        </b-form-checkbox>
        <p class="pl-4 m-0" style="color: silver; font-size: 10pt;">- Attendees 가 Moderators와 Presenters에
          질문할 수 있습니다.</p>
        <div class="pl-4" v-show="form.is_qna_chat==1">
          <b-form-checkbox v-model="form.is_question_anonymous" unchecked-value="0" value="1" variant="success">
            익명질문을 허용합니다.
          </b-form-checkbox>
          <b-form-checkbox v-model="form.is_question_auto" unchecked-value="0" value="1" variant="success">
            질문을 자동으로 승인합니다.
          </b-form-checkbox>
        </div>

        <b-form-checkbox v-model="form.is_show_attendee_count" unchecked-value="0" value="1" variant="success">
          Live Attendee
        </b-form-checkbox>

        <b-form-checkbox v-model="form.is_play_music" unchecked-value="0" value="1" variant="success">
          Welcome Music Play
        </b-form-checkbox>
        <div class="pl-4">
          <p class="m-0" style="color: silver; font-size: 10pt;">- Broadcast 시작 전 Attendee를 위해 music play
          </p>
        </div>
      </b-form-group>
      <b-form-group label="Survey">
        <b-form-checkbox v-model="form.is_use_survey" unchecked-value="0" value="1" variant="success">
          Attendee가 종료 후 사전 설정된 survey에 참여토록 합니다.
        </b-form-checkbox>
        <div class="pl-4" v-show="form.is_use_survey == 1">
          <b-form-input size="sm" v-model="form.survey_link" placeholder="https://(servey 링크를 입력하세요)">
          </b-form-input>
        </div>
      </b-form-group>
    </b-card>
    <b-row class="text-right mt-1">
      <b-col>
        <b-button size="sm" variant="info" @click="goNext" v-show="form_page == 1">Next
          <b-icon-chevron-right></b-icon-chevron-right>
        </b-button>
      </b-col>
    </b-row>
    <b-row class="text-right mt-1">
      <b-col>
        <b-button size="sm" variant="info" @click="form_page = 1" v-show="form_page == 2">
          <b-icon-chevron-left></b-icon-chevron-left> Previous
        </b-button>
        <b-button size="sm" variant="primary" @click="storeData" v-show="form_page == 2 && !form.id"> Done
        </b-button>
        <b-button size="sm" variant="success" @click="update" v-show="form_page == 2 && form.id"> Update
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "vm_form_modal",
    props: ['params'],
    data: function () {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate = new Date(today);

      return {
        event_id: 0,
        api_url: '',

        conference_item: this.params.conference_item, // 선택된 아이템이 있으면 수정폼이 되게 된다.

        lang_options: [], // 로딩 되면, 유저목록을 가져온다. getUserList()
        lang_options_obj: {},
        lang_options_values: [],
        select_arr: [], // {user_id, language, available}
        available: [],

        modal1_border: "primary",
        form_page: 1,
        datepicker_state: "normal", // disabled, readonly, normal

        event_size: 0, // 예상 참가자 수

        login: 0,
        login_type: 0,
        event_chat: 0,
        qna: 0,
        qna_noname: 0,
        qna_auto: 0,

        show_count: 0,
        music: 0,

        survey: 0,
        survey_link: "",

        form_date: "",
        start_time: "",
        form: {},
        min: minDate,

        logo_file: null,
        logo_prev: this.$store.getters.dummy_image_url(["480x60"]),
        logo_del: false,

        banner_file: null,
        banner_prev: this.$store.getters.dummy_image_url(["100x600"]),
        banner_del: false,

        background_file: null,
        background_prev: this.$store.getters.dummy_image_url(["480x60"]),
        background_del: false,

        intro_background_file: null,
        intro_background_del: false
      };
    },
    created: async function () {
      this.event_id = this.$store.getters.event_id;
      this.api_url = this.$store.getters.api_url;
      await this.getUserList();
    },
    computed: {
      validation: function () {
        return (
          this.form.name &&
          this.form.venue &&
          this.form.host &&
          this.event_size &&
          this.form.date &&
          this.start_time &&
          this.form.time
        );
      }
    },
    methods: {
      getUserList: async function () {
        let url = `${this.api_url}/user/in_event?event_id=${this.event_id}`;
        let rs = await axios.get(url);
        let arr = rs.data.result;
        this.lang_options = [];
        this.lang_options_values = [];
        this.lang_options_obj = {};
        for (var i = 0; i < arr.length; i++) {
          this.lang_options.push({
            user_id: arr[i].id,
            name: arr[i].name
          }); // select 박스의 옵션에서 꺼내기 좋은 형태로
          this.lang_options_values.push(arr[i].id); // user_id만
          arr[i].user_id = arr[i].id; // 아아아.... this.conference_item.language 속에 user_id로 들어있어서 통일함.
          this.lang_options_obj[arr[i].id] = arr[i]; // user_id를 키로하는 object
        }
        
        this.conference_item ? this.setOldForm() : this.setNewForm();
        this.form_page = 1;
      },
      storeData: async function () {
        console.log(this.form);

        let url = `${this.api_url}/conference`;
        let formData = new FormData();
        formData.append("event_id", this.event_id);

        // language
        let language = [];
        this.select_arr.forEach((el) => {
          language.push({
            user_id: el.user_id,
            language: el.language
          });
        });

        formData.append("language", JSON.stringify(language));
        console.log("save language - ", JSON.stringify(language));

        // event size
        formData.append("event_size", this.event_size);

        if (this.form.survey_link && !this.form.survey_link.includes("http")) {
          this.form.survey_link = `http://${this.form.survey_link}`;
        }
        // etc
        for (let item in this.form) {
          formData.append(item, this.form[item]);
        }

        // files
        formData.delete("logo");
        formData.delete("banner");
        formData.delete("background");

        let date = `${this.form.date} ${this.start_time ? this.start_time.substr(0, 5) : "00:00"}`;
        formData.append("date", date); // date 리셋

        !this.logo_file && this.logo_del ?
          formData.append("logo_del", "Y") :
          formData.append("logo", this.logo_file);
        !this.banner_file && this.banner_del ?
          formData.append("banner_del", "Y") :
          formData.append("banner", this.banner_file);
        !this.background_file && this.background_del ?
          formData.append("background_del", "Y") :
          formData.append("background", this.background_file);
        !this.intro_background_file && this.intro_background_del ?
          formData.append("intro_background_del", "Y") :
          formData.append("intro_background", this.intro_background_file);

        // form submit
        try {
          let rs = await axios.post(url, formData, {
            Headers: {
              "Content-Type": "multipart/form-data"
            },
          });

          // function callback () {
          //     this.$router.go(-1);
          // }
          // this.getList();
          function callback () {
              this.$emit('get-list'); // 이름이 같으면 동작 안된다.
          }
          this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
        } catch (error) {
          this.$showMsgBoxTwo(error.response.status, "", error.response.statusText);
        } finally {
          // this.$parent.modal1 = false;
          // this.modal1 = false;
        }
      },
      update: async function () {
        let url = `${this.api_url}/conference/${this.form.id}`;
        let formData = new FormData();

        // event size
        formData.append("event_size", this.event_size);

        if (this.form.survey_link && !this.form.survey_link.includes("http")) {
          this.form.survey_link = `http://${this.form.survey_link}`;
        }
        // etc
        let skips = ["language", "date", "intro_background"];
        for (let item in this.form) {
          if (!skips.includes(item)) {
            formData.append(item, this.form[item]);
          }
        }
        // language
        let language = [];
        console.log(this.select_arr);
        this.select_arr.forEach((el) => {
          language.push({
            user_id: el.user_id,
            language: el.language
          });
        });

        
        formData.append("language", JSON.stringify(language));

        // files
        formData.delete("logo");
        formData.delete("banner");
        formData.delete("background");

        let date = `${this.form.date} ${this.start_time ? this.start_time.substr(0, 5) : "00:00"}`;
        formData.append("date", date); // date 리셋

        !this.logo_file && this.logo_del ?
          formData.append("logo_del", "Y") :
          formData.append("logo", this.logo_file);
        !this.banner_file && this.banner_del ?
          formData.append("banner_del", "Y") :
          formData.append("banner", this.banner_file);
        !this.background_file && this.background_del ?
          formData.append("background_del", "Y") :
          formData.append("background", this.background_file);
        !this.intro_background_file && this.intro_background_del ?
          formData.append("intro_background_del", "Y") :
          formData.append("intro_background", this.intro_background_file);

        // form submit
        try {
          let rs = await axios.post(url, formData, {
            Headers: {
              "Content-Type": "multipart/form-data"
            },
          });
          console.log(rs);

          function callback () {
              this.$emit('get-list'); // 이름이 같으면 동작 안된다.
          }
          this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
          // this.$showMsgBoxTwo(rs.status);
          // await this.getList();
          
          
        } catch (error) {
          this.$showMsgBoxTwo(error.response.status, "", error.response.statusText);
        } finally {
          // this.modal1 = false;
          // console.log(this.$parent.modal);
          // this.$parent.modal1 = false;
        }
      },
      
      setNewForm: function () {
        this.modal1_border ='primary';
        this.select_arr = [];
        this.form = {};
        const now = new Date();
        let month = now.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;

        let date = now.getDate();
            date = date < 10 ? `0${date}` : date;

        this.form.date = `${now.getFullYear()}-${month}-${date}`;
        this.form.is_login_attendee = 0;
        this.event_size = 100;
      },
      setOldForm: function () {
        this.modal1_border ='success';
        this.form = {...this.conference_item};
        let times = this.form.date.split(" ");
        this.form.date = times[0];
        this.start_time = times[1];
        this.event_size = this.form.event_size;
        
        if (this.conference_item.language && !this.conference_item.language.length) {
          return;
        }
        
        this.select_arr = []; // 목록을 준비한다.
        let save_array = this.conference_item.language; // 저장되어 있는 목록
        let selected_value = []; // 저장된 아이디만 추려냄
        save_array.forEach((el) => {
          selected_value.push(el.user_id);
        });

        let vanila_available = []; // 저장안된 아이디 목록 [value, value, value]
        for (let item of this.lang_options_values) {
          // 전체목록을 순회하면서 저장되지 않은 값은 저장 안된 목록에 추가
          if (!selected_value.includes(item)) {
            vanila_available.push(this.lang_options_obj[item]);
          }
        }
        console.log('저장 안된 목록 (선택 가능하다.) : ', vanila_available);

        // select_arr 저장된 아이디를 토대로 화면에 그려줄 셀렉트 옵션 배열을 만들어 준다.
        save_array.forEach((el) => {
          // el = 이미 저장된 값의 본체
          let net_obj = this.lang_options_obj[el.user_id];
          let availabe = [net_obj, ...vanila_available]; // 저장된 본체(자기자신) + 전혀 선택되지 않은 값.
          this.select_arr.push({
            user_id: el.user_id,
            name: net_obj.name,
            language: el.language,
            available: availabe
          });
        });
        console.log('새로 구성된 목록 : ', this.select_arr);
      },
      
      reset_available: function (type) {
        if (this.select_arr[0].available.length == 0) { // 가능한 목록이 없으면 그만한다.
          return;
        }
        let selected_value = [];
        for (let item of this.select_arr) {
          selected_value.push(item.user_id);
        }
        console.log('selected ', selected_value);
        
        let vanila_values = []; // [value, value, value]
        for (let item of this.lang_options_values) {
          if (!selected_value.includes(item)) {
            vanila_values.push(item);
          }
        }
        console.log('vanila_values ', vanila_values);

        let vanila_available = [];
        for (let item of this.lang_options) {
          if (vanila_values.includes(item.user_id)) {
            vanila_available.push(item);
          }
        }
        console.log('vanila_available ', vanila_available);


        if (type == 'add') {
          console.log('add, ', vanila_available);
          selected_value.push(vanila_available[0].user_id); // 추가할 아이템 넣어준다.
          vanila_available.splice(0, 1); // 바닐라에서 하나 빼준다.
        }
        let new_arr = []; // init
        for (var i = 0; i < selected_value.length; i++) {
          let value = selected_value[i];
          let item_available = [this.lang_options_obj[value], ...vanila_available]; // 자기 자신과 바닐라 = 리스트별 선택 가능목록
          let language = this.lang_options_obj[value].language;
          if (this.select_arr[i]) {
            language = this.select_arr[i].language;
          }
          let new_item = {user_id: value, name: this.lang_options_obj[value].name, language, available: item_available};
          new_arr.push(new_item);
        }
        this.select_arr = new_arr;
      },
      selectedChange: function (event, item, index) {
        console.log('event  ', event.target.value);
        item.user_id = event.target.value*1; // 순수한 숫자를 key에 해당하는 id로 사용할 경우, 오류가 발생한다.
        // key값을 단순 숫자 나열로 쓰지말았으면 좋겠다......
        this.reset_available();
      },
      addList: function () {
        if (this.select_arr.length == 0) {
          console.log('this.lang_options[0] - ', this.lang_options[0]);
          console.log('this.lang_options - ', this.lang_options);
          let user_id = this.lang_options[0].user_id;
          let name = this.lang_options[0].name;
          let language = '';
          let available = [...this.lang_options];
          
          this.select_arr.push({user_id, name, language, available});
          console.log(this.select_arr);
          return;
        }
        // 최초순환 끝
      
        // 두번째부터 수행 -- available을 모두 재생산 하는것이 관건이다.
        this.reset_available('add');
        

      },
      removeList: function (item, index) {
        this.select_arr.splice(index, 1);
        let revive = { user_id: item.user_id, name: item.name, language: item.language }; // 되살릴 아이템 구성
        for (let item of this.select_arr) {
          item.available.push(revive); // 남은 목록 안에 선택 가능한 옵션으로 되살린 아이템 넣어준다.
        }
      },
      goNext: function () {
        if (this.validation) {
          this.form_page = 2;
        } else {
          this.$toast("Alert", "폼을 모두 입력해 주세요.", "danger");
        }
      }
    }
  };
</script>
