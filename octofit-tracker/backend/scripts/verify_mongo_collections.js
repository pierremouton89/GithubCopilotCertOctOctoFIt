use octofit_db;
print('Collections:');
printjson(db.getCollectionNames());
['users', 'teams', 'activities', 'leaderboard', 'workouts'].forEach(function(coll) {
  print('Sample from ' + coll + ':');
  printjson(db[coll].findOne());
});