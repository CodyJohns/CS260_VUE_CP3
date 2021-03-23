<template>
    <div class="container" v-if="round == 1">
		<div id="howto">Enter all contestants names in the brackets below. You can add more brackets by clicking on "Add Bracket". Play round 1 before clicking the Next Round button.
		Names can only be changed on round 1.</div>
        <div class="fdiv">
            <h2>Round {{round}}</h2>
            <div id="bitem" v-for="brack in bracklist" :key="brack.id">
                <div id="spacer" @click="remBrack(brack)">X</div>
                <input type="text" name="playera" v-model="brack.playera" v-bind:value="brack.playera" >
                <p>vs</p>
                <input type="text" name="playerb" v-model="brack.playerb" v-bind:value="brack.playerb" >
                <br><br>
                <label for="winnr">Winner: {{brack.winner}}</label>
                <select name="winnr" v-model="brack.winner">
                  <option disabled value="">Choose winner:</option>
                  <option>{{brack.playera}}</option>
                  <option>{{brack.playerb}}</option>
                </select>
            </div>
			<br><br>
            <p @click="addBracket()" style="cursor:pointer;">Add Bracket</p>
        </div>
    </div>
    
    <div class="container" v-else-if="round > 1 && !done">
        <div class="fdiv"> 
            <h2>Round {{round}}</h2>
            <div id="bitem" v-for="brack in bracklist" :key="brack.id">
                    <input type="text" name="playera" v-bind:value="brack.playera" disabled="disabled">
                    <p>vs</p>
                    <input type="text" name="playerb" v-bind:value="brack.playerb" disabled="disabled">
                    <p v-if="brack.playerc">vs</p>
                    <input v-if="brack.playerc" type="text" name="playerc" v-bind:value="brack.playerc" disabled="disabled">
                    <br><br>
                    <label for="winnr">Winner: {{brack.winner}}</label>
                    <select name="winnr" v-model="brack.winner">
                      <option disabled value="">Choose winner:</option>
                      <option>{{brack.playera}}</option>
                      <option>{{brack.playerb}}</option>
                      <option v-if="brack.playerc">{{brack.playerc}}</option>
                    </select>
            </div>
        </div>
    </div>
    
    <div class="container" v-else>
      <center><h1>Congratz {{this.$root.$data.brackets[this.$root.$data.brackets.length - 1].winner}}!</h1></center>
    </div>
</template>

<script>
export default {
  name: 'BracketsApp',
  props: {
    blist: Array
  },
  computed: {
    round() {
      return this.$root.$data.roundn;
    },
    bracklist() {
      return this.$root.$data.brackets.filter(brackets => brackets.roundnum == this.$root.$data.roundn);
    },
    done() {
      return this.$root.$data.tdone;
    }
  },
  methods: {
    addBracket() {
      let newbr = {
        id: this.$root.$data.bnums + 1,
        playera: "Player A name here",
        playerb: "Player B name here",
        winner: "",
        roundnum: 1
      };  
      this.$root.$data.brackets.push(newbr);
    },
    remBrack(value) {
      if(this.$root.$data.brackets.length > 1) {
          this.$root.$data.brackets = this.$root.$data.brackets.filter(function(item) {
            return item !== value;
          });
      }
    }
  }
}
</script>