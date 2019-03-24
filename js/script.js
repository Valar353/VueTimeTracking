Vue.component('table-item',{
  props: ['item'],
  template: '<tr> <td class="title" v-on:click="$emit(\'change\')">{{ item.title}} {{item.iter}}</td> <td class="start">{{item.start}}</td> <td class="end">{{item.end}}</td><td class="time">{{item.time}}</td><td class="del" v-on:click="$emit(\'remove\')">x</td></tr>'




})
var timeTracking = new Vue({
  el: '#timeTracking',
  data: {
    sec: 0,
    min: 0,
    timer: 0,
    iter:0,
    start:0,
    time: '00:00',
    allTime: '00:00',
    timeList: [
      // { title: 'Интервал', iter: 5, start: '11:56:29', end:'11:56:29', time: '00:30'},
    ],
  },
  methods: {
    startTimer(){
      if(!this.timer){
        this.start = this.retTime();
        this.updatePosts();
      }
    },
    stopTimer(){
      if(this.timer){
        this.timeList.push({
          title: 'Интервал',
          iter:this.iter,
          start:this.start,
          end: this.retTime(),
          time:this.printTime()
        });
        this.dropping();
        this.iter++;
        clearInterval(this.timer);
        this.timer = false;
      }
    },
    updatePosts () {
      this.timer = setInterval(()=>{
        this.sec++;
        this.time = this.printTime();
      }, 1000);
    },
    retTime(){
      const t = new Date();
      const h = t.getHours()>9?t.getHours():'0'+t.getHours();
      const m = t.getMinutes()>9?t.getMinutes():'0'+t.getMinutes();
      const s = t.getSeconds()>9?t.getSeconds():'0'+t.getSeconds();
      return h+':'+m+':'+s;
    },
    printTime(){
      if(this.sec>59){
        this.sec = 0;
        this.min++;
      }
      let retsec = this.sec;
      if(this.sec< 10) retsec = '0'+this.sec;
      let retmin = this.min;
      if(this.min< 10) retmin = '0'+this.min;
      return retmin+':'+retsec;
    },
    dropping(){
      this.min = 0;
      this.sec = 0;
      this.time = '00:00';
    },
    changeTitle(i){
      const result = prompt('Назовите интервал', 'Интервал '+this.iter);
      this.timeList[i].iter = '';
      this.timeList[i].title = result;
    }
  },
  computed: {
    printAllTime: function(){
      let s = 0;
      let m = 0;
      this.timeList.forEach(function(item){
        m+= +item.time.split(':')[0];
        if(s + +item.time.split(':')[1] > 59){
          m++;
          s += +item.time.split(':')[1]-60;
        }else{
          s += +item.time.split(':')[1];
        }
      });
      m = m>9?m:'0'+m;
      s = s>9?s:'0'+s;
      return m+':'+s
    }
  }
})
