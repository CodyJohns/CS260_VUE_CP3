<template>
  <div class="container">
    <center><button @click="advRound()" id="nround">Next Round</button></center>
    <BracketsApp :blist="blist" />
  </div>
</template>

<script>
// @ is an alias to /src
import BracketsApp from '@/components/BracketsApp.vue'

export default {
  name: 'Brackets',
  components: {
    BracketsApp
  },
  computed: {
    blist() {
      return this.$root.$data.brackets;
    }
  },
  methods: {
    advRound() {
      if(this.$root.$data.lastround == 0) {
        this.$root.$data.genMaxRounds(this.$root.$data.brackets.length);
      }
    
      let ready = 1;
      
      for(let o of this.$root.$data.brackets) {
        if(o.winner === "") {
          ready = 0;
        }
      } 

      if(ready == 1) {
        
        let winners = [];
        
        for(let o of this.$root.$data.brackets) {
          if(o.roundnum == this.$root.$data.roundn) {
            winners.push(o.winner);
          }
        } 
        
        console.log(winners);
        
        this.$root.$data.roundn += 1;
        
        if(this.$root.$data.roundn <= this.$root.$data.lastround) {
            if((winners.length % 2) == 0) {
              console.log("Even amount of winners");
              for(let i = 0; i < winners.length; i += 2) {
                let newbr = {
                  id: this.$root.$data.bnums + 1,
                  playera: winners[i],
                  playerb: winners[i + 1],
                  winner: "",
                  roundnum: this.$root.$data.roundn
                };
                
                this.$root.$data.bnums++;
                
                console.log(newbr);
                
                this.$root.$data.brackets.push(newbr);
              }
            } else {
              console.log("Odd amount of winners");
              for(let i = 0; i < (winners.length - 1); i += 2) {
                let newbr = {
                  id: this.$root.$data.bnums + 1,
                  playera: winners[i],
                  playerb: winners[i + 1],
                  winner: "",
                  roundnum: this.$root.$data.roundn
                };
                
                this.$root.$data.bnums++;
                
                console.log(newbr);
                
                this.$root.$data.brackets.push(newbr);
              }
              
              console.log("Adding 3rd players to last bracket " + winners[winners.length - 1]);
              
              this.$root.$data.brackets[this.$root.$data.brackets.length - 1].playerc = winners[winners.length - 1];
            }
            
            console.log(this.$root.$data.brackets);
        } else {
          this.$root.$data.tdone = true;
        }
      }
    }
  }
}
</script>
