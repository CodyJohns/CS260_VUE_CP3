import Vue from 'vue'
import App from './App.vue'
import router from './router'
import sample from './mock-data.js'

Vue.config.productionTip = false

let data = {
  brackets: sample,
  roundn: 1,
  bnums: 3,
  lastround: 0,
  tdone: false,
  genMaxRounds(num) {
      if(num >= 1) {
        this.lastround++;
        this.genMaxRounds(Math.floor(num / 2));
      } else {
        console.log("Max rounds: " + this.lastround);
        return;
      }
    }
};

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
