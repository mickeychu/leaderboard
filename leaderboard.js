PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){

  Template.leaderboard.helpers({
    'player': function(){
        return PlayersList.find({}, {sort: {score: -1, name: 1} })
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
          return "selected"
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    }
  });
  
  Template.addPlayerForm.events({
	  'submit form': function(){
		event.preventDefault();
		var playerNameVar = event.target.playerName.value;
		console.log(playerNameVar);
		PlayersList.insert({
			name: playerNameVar,
			score: 0
		});
		event.target.playerName.value = "";
	  }
	  
  });

}

if(Meteor.isServer){
    // this code only runs on the server
}